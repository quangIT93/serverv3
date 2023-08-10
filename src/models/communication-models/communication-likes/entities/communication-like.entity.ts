import { Profile } from 'src/models/profile-models/profiles/entities';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('communication_likes')
export class CommunicationLike {
    @PrimaryColumn({ name: 'communication_id' })
    communicationId!: number;

    @PrimaryColumn({ name: 'account_id' })
    accountId!: string;

    @Column({ default: 1 })
    status!: number;

    @Column({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    @Column({ name: 'updated_at', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt!: Date;

    @ManyToOne(() => Profile, profile => profile.communicationLikes) 
    @JoinColumn({ name: 'account_id', referencedColumnName: 'accountId' })
    profile!: Profile;

}
