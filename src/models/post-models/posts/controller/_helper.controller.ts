import { AWSService } from "src/services/aws/aws.service";
import { PostsImagesService } from "../../posts-images/posts-images.service";
import { ImagesTransformed } from "src/common/helper/transform/image.transform";
import { Injectable } from "@nestjs/common";
import { CreatePostsImageDto } from "../../posts-images/dto/create-posts-image.dto";
import { BUCKET_IMAGE_POST } from "src/common/constants";
import { CreatePostByAdminDto } from "../dto/admin-create-post.dto";
import { PostResourceService } from "../../post-resource/post-resource.service";
import { CreatePostResourceDto } from "../../post-resource/dto/create-post-resource.dto";
import { CreatePostCategoriesDto } from "../../posts-categories/dto/create-posts-categories.dto";
import { PostsCategoriesService } from "../../posts-categories/posts-categories.service";

@Injectable()
export class HelperController {

    awsService!: AWSService;

    constructor(
    ) { 

    }

    /**
     * 
     * @param images 
     * @param postId 
     * 
     * @description
     * save images to aws s3 -> image_id
     * save image_id to database
     */
    async saveImagesForPost(
        images: ImagesTransformed | undefined, 
        postId: number,
        awsService: AWSService,
        postImageService: PostsImagesService
    ) {
        try {
            const urlImagesUploaded = await awsService.uploadImagesForPost(images as any, postId)

            // create post images
            const postImagesDto = new CreatePostsImageDto(postId, urlImagesUploaded.map((image: { originalname: string; }) => image.originalname));

            // save post images to database
            const imagesResult = await postImageService.createPostsImage(postImagesDto);

            return  imagesResult.map((image) => {
                return {
                    ...image,
                    image: BUCKET_IMAGE_POST + '/' + postId + '/' + image.image,
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async savePostResourceForPost(
        postId: number,
        dto: CreatePostByAdminDto,
        postResourceService: PostResourceService
    ) {
        try {
            const postResourceDto: CreatePostResourceDto = new CreatePostResourceDto(postId, dto.siteUrl, dto.companyResourceId);

            const postResource = await postResourceService.create(postResourceDto)

            return postResource;
        } catch (error) {
            throw error;
        }
    }

    async savePostCategoriesForPost(
        postId: number,
        dto: CreatePostByAdminDto,
        postCategoriesService: PostsCategoriesService
    ) {
        try {

            let postCategories: CreatePostCategoriesDto | CreatePostCategoriesDto[];

            if (Array.isArray(dto.categoriesId)) {
                postCategories = dto.categoriesId.map((category) => {
                    return new CreatePostCategoriesDto(postId, +category);
                })
            } else {
                postCategories = new CreatePostCategoriesDto(postId, +dto.categoriesId);
            }

            const postCategoriesResult = await postCategoriesService.create(postCategories);

            return postCategoriesResult;
            
        } catch (error) {
            throw error;
        }
    }
}