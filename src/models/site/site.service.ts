import { HttpException, Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import {
  Client,
  GeocodeResponseData,
} from '@googlemaps/google-maps-services-js';
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

  async googlemapGeocoding(address: string): Promise<GeocodeResponseData> {
    try {
      const key = process.env['FIREBASE_MAP_API_KEY'] as string;

      const response = await this.googleMapsClient.geocode({
        params: {
          address,
          key,
        },
      });

      return response.data;
    } catch (error: any) {
      const errorCode = error.response.data.status;

      if (
        errorCode === GoogleMapsError.INVALID_REQUEST ||
        errorCode === GoogleMapsError.OVER_QUERY_LIMIT
      ) {
        throw new HttpException(
          `Google Map API: ${error.response.data.error_message}`,
          error.response.status,
        );
      }

      throw error;
    }
  }
}
