import { Injectable } from '@nestjs/common';
import { DataSource, } from 'typeorm';

// import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class SiteService {
  constructor(private readonly dataSource: DataSource) {}

  // Count all posts
  async countAllPosts(): Promise<number> {
    const query = `
            SELECT
            COUNT(id) AS total
            FROM
            posts
        `;
    const result = await this.dataSource.query(query);
    // console.log(result[0].total);
    return +result[0].total;
  }
}
