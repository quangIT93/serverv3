import {
    CallHandler,
    ExecutionContext,
    Injectable,
    // Logger,
    NestInterceptor,
} from '@nestjs/common';
import { PostNormally } from './../class/normallyPost.class';
import { Observable, map } from 'rxjs';
import { Post } from '../entities';
import { timeToTextTransform } from 'src/common/helper/transform/timeToText.tranform';
// import { SalaryType } from 'src/models/salary-types/entities/salary-type.entity';
import { MoneyType } from 'src/common/enum';
import { BookmarksService } from 'src/models/bookmarks/bookmarks.service';
import { BUCKET_IMAGE_COMPANY_ICON, BUCKET_IMAGE_POST } from 'src/common/constants';
// import { Bookmark } from 'src/models/bookmarks/entities/bookmark.entity';

@Injectable()
export class PostNormallyInterceptor implements NestInterceptor {

    constructor(
        private bookmarksService: BookmarksService
    ) { }

    async intercept(
        _context: ExecutionContext,
        next: CallHandler<any>,
    ): Promise<Observable<any>> {
        const lang = _context.switchToHttp().getRequest()['lang'];

        const user_id = _context.switchToHttp().getRequest()['user']?.id;

        // console.log(_context.switchToHttp().getRequest().checkOverLimit)

        let bookmarks: number[] = [];

        if (user_id) {
            await this.bookmarksService.findByUserId(user_id)
            .then((res) => {
                for (let i = 0; i < res.length; i++) {
                    bookmarks.push(res[i].postId);
                }
            })
        }

        // return if posts is empty


        return next.handle().pipe(
            map((posts: Post[]) => {

                const length = posts.length;

                posts.pop();                
                
                if (length === 0) {
                    return {
                        status: _context.switchToHttp().getResponse().statusCode,
                        data: [],
                        message: _context.switchToHttp().getResponse().statusMessage,
                        is_over: true,
                    }
                }

                const data = posts.map((post) => {
                    const postNormally = new PostNormally();
                    postNormally.id = post.id;
                    postNormally.title = post.title;
                    postNormally.accountId = post.accountId;
                    postNormally.companyName = post.companyName;
                    postNormally.address = post.address;
                    postNormally.salaryMin = post.salaryMin;
                    postNormally.salaryMax = post.salaryMax;
                    postNormally.createdAtText = timeToTextTransform(
                        post.createdAt,
                        lang,
                    );
                    postNormally['moneyType'] = post.moneyType === MoneyType.VND ? 'VND' : 'USD';
                    postNormally['image'] = post.postImages && post.postImages.length > 0
                        ? `${BUCKET_IMAGE_POST}/${post.id}/${post.postImages[0].image}`
                        : post.categories
                            ? post.categories[0]?.parentCategory?.defaultPostImage
                            : null;

                    postNormally['jobType'] = {
                        id: post.jobTypeData?.id,
                        name: 
                            lang === 'vi' ? post.jobTypeData?.name :
                            lang === 'en' ? post.jobTypeData?.nameEn : post.jobTypeData?.nameKo,
                    }

                    postNormally['salaryType'] = {
                        id: post.salaryTypeData?.id,
                        name: 
                            lang === 'vi' ? post.salaryTypeData?.value : 
                            lang === 'en' ? post.salaryTypeData?.valueEn : post.salaryTypeData?.valueKo,
                    }

                    postNormally['location'] = {
                        ward: {
                            id: post.ward?.id,
                            fullName: lang === 'vi' ? post.ward?.fullName : post.ward?.fullNameEn,
                        },
                        district: {
                            id: post.ward?.district?.id,
                            fullName: lang === 'vi' ? post.ward?.district?.fullName : post.ward?.district?.fullNameEn,
                        },
                        province: {
                            id: post.ward?.district?.province?.id,
                            fullName: lang === 'vi' ? post.ward?.district?.province?.fullName : post.ward?.district?.province?.fullNameEn,
                        },
                    }

                    postNormally['companyResourceData'] = {
                        ...post.postResource?.companyResource,
                        logo: `${BUCKET_IMAGE_COMPANY_ICON}/${post.postResource?.companyResource?.logo}`
                    }

                    postNormally['bookmarked'] = bookmarks.includes(post.id);

                    return postNormally;
                });
                return {
                    status: _context.switchToHttp().getResponse().statusCode,
                    message: _context.switchToHttp().getResponse().statusMessage,
                    is_over: length < _context.switchToHttp().getRequest().checkOverLimit,
                    data,
                }
            }),

            
        );
    }
}
