import { Entity, PrimaryColumn } from "typeorm";

@Entity('communication_likes')
export class CommunicationLike {

    @PrimaryColumn({ type: 'int', nullable: false, name: 'communication_id' })
    communicationId!: number;

    @PrimaryColumn({ type: 'varchar', length: 50, nullable: false, name: 'account_id' })
    accountId!: string;

    @PrimaryColumn({ type: 'date', nullable: false, name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

}
