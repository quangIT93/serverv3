import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommunicationImage } from '../../communication-images/entities/communication-image.entity';
import { CommunicationCategory } from '../../communication-categories/entities/communication.entity';
import { Profile } from 'src/models/profile-models/profiles/entities';
import { CommunicationLike } from '../../communication-likes/entities/communication-like.entity';
import { CommunicationView } from '../../communication-views/entities/communication-view.entity';
import { CommunicationComment } from '../../communication-comments/entities/communication-comment.entity';

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

  @OneToMany(
    () => CommunicationImage,
    (communicationImage) => communicationImage.communication,
  )
  communicationImages!: CommunicationImage[];

  @OneToMany(
    () => CommunicationCategory,
    (communicationCategory) => communicationCategory.communication,
  )
  communicationCategories!: CommunicationCategory[];

  @ManyToOne(() => Profile, (profile) => profile.communications)
  @JoinColumn({ name: 'account_id', referencedColumnName: 'accountId' })
  profile!: Profile;

  @OneToMany(
    () => CommunicationLike,
    (communicationLike) => communicationLike.communication,
  )
  communicationLikes!: CommunicationLike[];

  @OneToMany(
    () => CommunicationImage,
    (communicationImage) => communicationImage.communication,
  )
  communicationViews!: CommunicationView[];

  @OneToMany(
    () => CommunicationComment,
    (communicationComment) => communicationComment.communications,
  )
  communicationComments!: CommunicationComment[];
}
