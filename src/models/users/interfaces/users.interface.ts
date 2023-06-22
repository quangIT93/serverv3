export interface IUser {
    id: string;
    email?: string;
    phone?: string;
    gg_id?: string;
    fb_id?: string;
    apple_id?: string;
    role?: number;
    created_at: Date;
    updated_at: Date;
    // status?: number;
    // deleted_at?: Date;
}