import { Client } from '@googlemaps/google-maps-services-js';
import { Provider } from '@nestjs/common';

export const GoogleMapProvider: Provider = {
  provide: 'GOOGLE_MAPS_CLIENT',
  useFactory: () => {
    return new Client({});
  },
};
