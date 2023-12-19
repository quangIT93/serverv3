// import { Entity } from 'typeorm';
import { ChildCategory } from 'src/models/categories/children/entities/child.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('category_description_templates')
export class CategoryDescriptionTemplate {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ type: 'int', nullable: false, name: 'child_category_id' })
  childCategoryId!: number;

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

  @ManyToOne(() => ChildCategory, (childCategory) => childCategory.templates)
  @JoinColumn({ name: 'child_category_id' })
  childCategory!: ChildCategory;
}
