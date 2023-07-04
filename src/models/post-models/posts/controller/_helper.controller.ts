import { AWSService } from "src/services/aws/aws.service";
// import { PostsService } from "../posts.service";
import { PostsImagesService } from "../../posts-images/posts-images.service";
import { ImagesTransformed } from "src/common/helper/transform/image.transform";
import { Injectable } from "@nestjs/common";
import { CreatePostsImageDto } from "../../posts-images/dto/create-posts-image.dto";
import { BUCKET_IMAGE_POST } from "src/common/constants";
import { CreatePostByAdminDto } from "../dto/admin-create-post.dto";
import { PostResourceService } from "../../post-resource/post-resource.service";
import { CreatePostResourceDto } from "../../post-resource/dto/create-post-resource.dto";

@Injectable()
export class HelperController {
    constructor(
        // private readonly postsService: PostsService,
        private readonly awsService: AWSService,
        private readonly postImageService: PostsImagesService,
        private readonly postResourceService: PostResourceService,
    ) { }

    /**
     * 
     * @param images 
     * @param postId 
     * 
     * @description
     * save images to aws s3 -> image_id
     * save image_id to database
     */
    async saveImagesForPost(images: ImagesTransformed | undefined, postId: number) {
        try {
            const urlImagesUploaded = await this.awsService.uploadImagesForPost(images as any, postId)

            // create post images
            const postImagesDto = new CreatePostsImageDto(postId, urlImagesUploaded.map((image: { originalname: string; }) => image.originalname));

            // save post images to database
            const imagesResult = await this.postImageService.createPostsImage(postImagesDto);

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

    async savePostResourceForPost(postId: number, dto: CreatePostByAdminDto) {
        try {
            const postResourceDto: CreatePostResourceDto = new CreatePostResourceDto(postId, dto.siteUrl, dto.companyResourceId);

            const postResource = await this.postResourceService.create(postResourceDto)

            return postResource;
        } catch (error) {
            throw error;
        }
    }
}