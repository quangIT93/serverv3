export class CreatePostsImageDto {
    postId!: number ;

    image: string;  
    
    constructor(postId: number, image: string) {
        this.postId = postId;
        this.image = image;
    }
}
