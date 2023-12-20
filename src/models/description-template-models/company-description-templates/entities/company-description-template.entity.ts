import { ParentCategory } from 'src/models/categories/parents/entities/parent.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('company_description_templates')
export class CompanyDescriptionTemplate {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ type: 'int', nullable: false, name: 'parent_category_id' })
  parentCategoryId!: number;

  @Column({ type: 'varchar', nullable: false, name: 'title' })
  title!: string;

  @Column({ type: 'text', nullable: false, name: 'content' })
  content!: string;

  @Column({ type: 'int', nullable: false, name: 'status', default: 1 })
  status!: number;

  @Column({
    type: 'datetime',
    nullable: false,
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt!: Date;

  @Column({
    type: 'datetime',
    nullable: false,
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt!: Date;

  @ManyToOne(() => ParentCategory, (parentCategory) => parentCategory)
  @JoinColumn({ name: 'parent_category_id' })
  parentCategory!: ParentCategory;
}
