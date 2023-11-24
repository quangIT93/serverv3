import { District } from 'src/models/locations/districts/entities';
import { Province } from 'src/models/locations/provinces/entities';
import { Ward } from 'src/models/locations/wards/entities';

class FormatAddress {
  location?: Ward | District | Province;
  address?: string;
}

export const addressTranslator = ({ location, address }: FormatAddress) => {
  if (!location) return null;

  let textAddress = address ? `${address}, ` : '';

  if (location instanceof Ward) {
    const ward = location as Ward;
    textAddress += ward.fullName;

    if (ward.district) {
      textAddress += `, ${ward.district.fullName}`;

      if (ward.district.province) {
        textAddress += `, ${ward.district.province.fullName}`;
      }
    }

    return textAddress;
  }

  if (location instanceof District) {
    const district = location as District;
    textAddress += district.fullName;

    if (district.province.fullName) {
      textAddress += `, ${district.province.fullName}`;
    }
    return textAddress;
  }

  if (location instanceof Province) {
    const province = location as Province;
    return (textAddress += province.fullName);
  }

  return textAddress;
};
