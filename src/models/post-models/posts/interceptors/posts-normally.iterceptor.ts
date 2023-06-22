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

        let bookmarks: number[] = [];

        if (user_id) {
            await this.bookmarksService.findByUserId(user_id)
            .then((res) => {
                for (let i = 0; i < res.length; i++) {
                    bookmarks.push(res[i].postId);
                }
            })
        }

        return next.handle().pipe(
            map((posts: Post[]) => {
                return posts.map((post) => {
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
                    postNormally['image'] = post.postImages
                        ? post.postImages[0].image
                        : post.categories
                            ? post.categories[0].parentCategory?.defaultPostImage
                            : null;

                    postNormally['jobType'] = {
                        id: post.jobTypeData?.id,
                        name: post.jobTypeData?.name,
                    }

                    postNormally['salaryType'] = {
                        id: post.salaryTypeData?.id,
                        name: post.salaryTypeData?.value,
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

                    postNormally['bookmarked'] = bookmarks.includes(post.id);

                    return postNormally;
                });
            }),
        );
    }
}
