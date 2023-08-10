import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CommunicationImage } from '../../communication-images/entities/communication-image.entity';
import { CommunicationCategory } from '../../communication-categories/entities/communication.entity';

@Entity('communications')
export class Communication {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ type: 'varchar', length: 50, nullable: false, name: 'account_id' })
  accountId!: string;

  @Column({ type: 'varchar', length: 500, nullable: false, name: 'title' })
  title!: string;

  @Column({ type: 'text', nullable: false, name: 'content' })
  content!: string;

  @Column({ type: 'tinyint', nullable: false, name: 'status', default: 1 })
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

  @OneToMany(() => CommunicationImage, communicationImage => communicationImage.communication)
  communicationImages!: CommunicationImage[];

  @OneToMany(() => CommunicationCategory, communicationCategory => communicationCategory.communication)
  communicationCategories!: CommunicationCategory[];
}
