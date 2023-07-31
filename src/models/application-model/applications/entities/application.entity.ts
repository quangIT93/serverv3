// import { Post } from 'src/models/post-models/posts/entities';
import {
    Column,
    Entity,
    //   JoinColumn,
    //   ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('applications')
export class Application {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ type: 'int', name: 'post_id' })
    postId!: number;

    @Column({ type: 'varchar', length: 50, name: 'account_id' })
    accountId!: string;

    @Column({ type: 'tinyint', default: 0, name: 'status' })
    status!: number;

    // @ManyToOne(() => Post, post => post.applications)
    // @JoinColumn({ name: 'post_id', referencedColumnName: 'id' })
    // post!: Post;
}
