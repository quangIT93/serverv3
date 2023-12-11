export class CreatePostViewDto {
    postId!: number;
    accountId!: string;

    constructor(postId: number, accountId: string) {
        this.postId = postId;
        this.accountId = accountId;
    }
}
