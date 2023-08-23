import { DataSource } from "typeorm";

export class NotificationRepository {

    
    constructor(
        private readonly dataSource: DataSource 
    ) {}

    async findAll() {
        const query = `
            SELECT
                id,
                communication_id AS "communicationId",
                comment_id AS "commentId",
                status,
                created_at AS "createdAt",
                updated_at AS "updatedAt"
            FROM
                communication_notifications
        `;
        const result = await this.dataSource.query(query);
        return result;
    }

}