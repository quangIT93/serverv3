import { CustomRequest } from "src/common/interfaces/customRequest.interface";
import { CreatePostByAdminDto } from "../dto/admin-create-post.dto";
import { Response } from "express";
import { PostsService } from "../posts.service";
import { PostsImagesService } from "../../posts-images/posts-images.service";
import { AWSService } from "src/services/aws/aws.service";
import { ImagesTransformed } from "src/common/helper/transform/image.transform";
import { HelperController } from "./_helper.controller";
import { HttpStatus } from "@nestjs/common";
import { PostResourceService } from "../../post-resource/post-resource.service";

/**
 * 
 * @param _createPostByAdminDto 
 * @param req
 * @returns
 * 
 * @description
 * create post by admin
 * save post to database -> post_id
 * 
 * save images to aws s3 -> image_id
 */
export async function createPostByAdminController(params: {
    dto: CreatePostByAdminDto,
    req: CustomRequest,
    res: Response,
    images: ImagesTransformed | undefined,
    postsService: PostsService,
    awsService: AWSService,
    postImageService: PostsImagesService,
    postResourceService: PostResourceService
}) {
    const { dto, req, res, images, postsService, awsService, postImageService, postResourceService } = params;
    try {

        // validate dto
        const isValidDto = dto.validate();

        if (isValidDto instanceof Error) {
            return res.status(400).json({
                statusCode: 400,
                message: isValidDto.message,
                error: isValidDto.name,
            });
        }
        // get user id

        // add user id to dto
        dto.addData(req.user!.id)

        // create post
        const postCreated = await postsService.create(dto);

        // get post id
        const newPostId = postCreated.id;
        
        // define helper controller
        const helperController = new HelperController(awsService, postImageService, postResourceService);

        // save images to aws s3 -> image_id
        const imagesResult = await helperController.saveImagesForPost(images, newPostId);

        const postResource = await helperController.savePostResourceForPost(newPostId, dto);

        postCreated.postImages = imagesResult;

        postCreated.postResource = postResource;

        // return post created
        return res.status(HttpStatus.CREATED).json({
            statusCode: HttpStatus.CREATED,
            message: 'Create post successfully',
            data: postCreated,
        });
    } catch (error: any) {
        return res.status(HttpStatus.BAD_REQUEST).json({ 
            statusCode: HttpStatus.BAD_REQUEST,
            message: error?.message ?? 'Bad Request',
         });
    }
}