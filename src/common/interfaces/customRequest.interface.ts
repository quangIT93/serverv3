import { Request } from 'express';
import { JwtPayload } from './jwtPayload.interface';
import { Bookmark } from 'src/models/bookmarks/entities/bookmark.entity';

export interface CustomRequest extends Request {
    // Add custom properties here

    // default language is Vietnamese
    lang: string;

    user: JwtPayload | undefined;

    bookmarks?: Bookmark[] | undefined;
}