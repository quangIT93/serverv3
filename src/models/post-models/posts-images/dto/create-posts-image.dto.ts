export class CreatePostsImageDto {
    postId!: number ;

    images: string[] = [];  
    
    constructor(postId: number, images: string[]) {
        this.postId = postId;
        this.images = images;
    }
}
