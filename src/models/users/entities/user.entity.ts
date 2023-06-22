import { BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IUser } from "../interfaces/users.interface";
import { Post } from "src/models/post-models/posts/entities/post.entity";
import { Bookmark } from "src/models/bookmarks/entities/bookmark.entity";


// The @Entity() decorator tells TypeORM that this class is an entity.
// The @PrimaryGeneratedColumn() decorator tells TypeORM that the id property will be generated automatically.
// The @Column() decorator tells TypeORM that the property will be a column in the database.
// The @CreateDateColumn() decorator tells TypeORM that the property will be a timestamp that will be set on creation.

// User Entity

@Entity('accounts')
export class User extends BaseEntity implements IUser {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    email?: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    phone?: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    gg_id?: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    fb_id?: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    apple_id?: string;

    @Column({ type: 'int', nullable: true })
    role?: number;

    @Column({ type: 'datetime', nullable: true, default: () => 'CURRENT_TIMESTAMP' })
    created_at!: Date;

    @Column({ type: 'datetime', nullable: true, default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at!: Date;

    @OneToMany(() => Post, post => post.account)
    posts!: Post[];

    @OneToMany(() => Bookmark, bookmark => bookmark.user)
    @JoinColumn({ name: 'account_id' })
    bookmarks!: Bookmark[];
}