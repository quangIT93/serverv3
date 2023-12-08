import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IUser } from '../interfaces/users.interface';
import { Post } from 'src/models/post-models/posts/entities/post.entity';
import { Bookmark } from 'src/models/bookmarks/entities/bookmark.entity';
import { CommunicationBookmarked } from 'src/models/communication-models/communication-bookmarked/entities/communication-bookmarked.entity';
import { Profile } from 'src/models/profile-models/profiles/entities';
import { CompanyRating } from 'src/models/company-models/company-ratings/entities/company-rating.entity';
import { CompanyBookmarked } from 'src/models/company-models/company-bookmarked/entities/company-bookmarked.entity';

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

  @Column({ type: 'tinyint', nullable: true, default: 0 })
  type!: number;

  @Column({
    type: 'datetime',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at!: Date;

  @Column({
    type: 'datetime',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at!: Date;

    @Column({ type: 'tinyint', nullable: false, default: 1, name: 'status' })
    status!: number;

    @OneToMany(() => Post, post => post.account)
    posts!: Post[];

  @OneToMany(() => Bookmark, (bookmark) => bookmark.user)
  @JoinColumn({ name: 'account_id' })
  bookmarks!: Bookmark[];

  @OneToMany(
    () => CommunicationBookmarked,
    (communicationBookmarked) => communicationBookmarked.user,
  )
  @JoinColumn({ name: 'account_id' })
  communicationBookmarkeds!: CommunicationBookmarked[];

  @OneToOne(() => Profile, (profile) => profile.user)
  @JoinColumn({ name: 'id', referencedColumnName: 'accountId' })
  profile!: Profile;

  @OneToMany(() => CompanyRating, (companyRating) => companyRating.account)
  @JoinColumn({ name: 'account_id' })
  companyRatings!: CompanyRating[];

  @OneToMany(
    () => CompanyBookmarked,
    (companyBookmarked) => companyBookmarked.accountId,
  )
  @JoinColumn({ name: 'account_id' })
  bookmarkedCompany!: CompanyBookmarked[];

  @ManyToMany(() => Post, (post) => post.postViews)
  @JoinTable({
    name: 'post_view',
    joinColumn: {
      name: 'account_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'post_id',
      referencedColumnName: 'id',
    },
  })
  postViews!: Post[];
}
