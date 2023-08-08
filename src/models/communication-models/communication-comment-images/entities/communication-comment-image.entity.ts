import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('communication_comment_images')
export class CommunicationCommentImage {
    
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ type: 'int', nullable: false, name: 'comment_id' })
    commentId!: number;

    @Column({ type: 'varchar', length: 255, nullable: false, name: 'image' })
    image!: string;

    @Column({ type: 'tinyint', nullable: false, name: 'status', default: 1 })
    status!: number;

    @Column({ type: 'date', nullable: false, name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    @Column({ type: 'date', nullable: false, name: 'updated_at', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt!: Date;
}