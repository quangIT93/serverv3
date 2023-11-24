import { Inject, Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Client } from '@googlemaps/google-maps-services-js';
import { GoogleMapsError } from 'src/common/enum';

// import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class SiteService {
  constructor(
    private readonly dataSource: DataSource,
    @Inject('GOOGLE_MAPS_CLIENT')
    private readonly googleMapsClient: Client,
  ) {
    this.googleMapsClient = new Client({});
  }

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

  // async getCvTemplates(parent_category_id?: number) {
  //   const query = `
  //     SELECT * FROM cv_template
  //     WHERE status = 1
  //     ${parent_category_id ? `AND parent_category_id = ${parent_category_id}` : ''}
  //   `

  //   const result = await this.dataSource.query(query);

  //   console.log(result);

  //   return result;
  // }

  async googlemapGeocoding(address: string) {
    try {
      const key = process.env['FIREBASE_MAP_API_KEY'] as string;

      const response = await this.googleMapsClient.geocode({
        params: {
          address,
          key,
        },
      });

      if (response.status === 200 && response.data.status === 'OK') {
        return response.data;
      }

      return;
    } catch (error: any) {
      const errorCode = error.response.data.status;

      if (errorCode === GoogleMapsError.INVALID_REQUEST) {
        Logger.error('Error INVALID_REQUEST Google Maps API:');
        Logger.log(error.response.data);
        return error.response.data;
      }

      if (errorCode === GoogleMapsError.OVER_QUERY_LIMIT) {
        Logger.error('Error OVER_QUERY_LIMIT Google Maps API:');
        Logger.log(error.response.data);
        return error.response.data;
      }

      throw error;
    }
  }
}
