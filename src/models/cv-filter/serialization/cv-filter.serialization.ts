import { Exclude, Expose, Transform } from 'class-transformer';
import { Language } from 'src/common/enum';
import { categoryTranslator } from 'src/common/helper/translators';
import { AcedemicTypesSerialization } from 'src/models/academic_types/serialization/acedemic_types.serialization';
import { ChildCategory } from 'src/models/categories/children/entities/child.entity';
import { DistrictSerializer } from 'src/models/locations/districts/districts.serialization';
import { ProfilesEducation } from 'src/models/profile-models/profiles-educations/entities/profiles-education.entity';
import { Profile } from 'src/models/profile-models/profiles/entities';

export class CVFilterSerializtion extends Profile {
  @Exclude()
  lang: Language;

  constructor(profile: Profile, lang: Language) {
    super();
    Object.assign(this, profile);
    this.lang = lang;
  }

  @Exclude({ toPlainOnly: true })
  override introduction!: string;

  @Exclude({ toPlainOnly: true })
  override gender!: number;

  @Exclude({ toPlainOnly: true })
  override linkedin!: string;

  @Exclude({ toPlainOnly: true })
  override facebook!: string;

  @Exclude({ toPlainOnly: true })
  override createdAt!: Date;

  @Transform(({ value }) => value?.getTime())
  override updatedAt!: Date;

  @Exclude({ toPlainOnly: true })
  override isSearch!: number;

  @Exclude({ toPlainOnly: true })
  override jobTypeId!: number;

  @Exclude({ toPlainOnly: true })
  override jobTypeName!: string;

  @Exclude({ toPlainOnly: true })
  override childCategories!: ChildCategory[];

  @Exclude({ toPlainOnly: true })
  override profilesLocations!: any[];

  @Exclude({ toPlainOnly: true })
  override profilesEducations!: ProfilesEducation[];

  @Expose()
  get childCategoriesData() {
    if (!this.childCategories) return null;
    return this.childCategories.map((category) => {
      return {
        id: categoryTranslator(category.parentCategory, this.lang)?.id,
        name: categoryTranslator(category.parentCategory, this.lang)?.fullName,
      };
    });
  }

  @Expose()
  get profilesLocationsData() {
    if (!this.profilesLocations) return null;
    return this.profilesLocations.map((location) => {
      return new DistrictSerializer(location, this.lang);
    });
  }

  @Expose()
  get profilesEducationsData() {
    if (!this.profilesEducations) return null;
    const result = this.profilesEducations.map((education) => {
      return new AcedemicTypesSerialization(education.academicType, this.lang);
    });
    const uniqueArray = [];
    const seenIds = new Set();
    for (const item of result) {
        if (!seenIds.has(item.id)) {
            seenIds.add(item.id);
            uniqueArray.push(item);
        }
    }

    return uniqueArray;
  }
}
