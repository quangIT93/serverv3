import { Entity, PrimaryColumn } from "typeorm";

@Entity({ name: 'post_view' })
export class PostView {
    @PrimaryColumn({ name: 'account_id', type: 'varchar', length: 50 })
    accountId!: string;

    @PrimaryColumn({ name: 'post_id', type: 'int'})
    postId!: number;
}
