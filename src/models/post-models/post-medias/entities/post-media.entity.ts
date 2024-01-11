import { Company } from 'src/models/company-models/companies/entities/company.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from '../../posts/entities';

@Entity('post-medias')
export class PostMedia {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ type: 'int', nullable: false, name: 'company_id' })
  companyId!: number;

  @Column({ type: 'int', name: 'post_id', nullable: false })
  postId!: number;

  @Column({ type: 'varchar', name: 'link_tiktok' })
  linkTiktok!: string;

  @Column({ type: 'varchar', name: 'link_youtube' })
  linkYoutube!: string;

  @Column({ type: 'varchar', name: 'image' })
  image!: string;

  @Column({ type: 'varchar', name: 'video' })
  video!: string;

  @Column({ type: 'int', name: 'status', default: 1 })
  status!: number;

  @Column({
    type: 'datetime',
    nullable: false,
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date;

  @Column({
    type: 'datetime',
    nullable: false,
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt!: Date;

  @OneToOne(() => Company, (company) => company)
  @JoinColumn({ name: 'company_id' })
  company!: Company;

  @OneToOne(() => Post, (post) => post)
  @JoinColumn({ name: 'post_id' })
  post!: Post;
}
