/**
 * Category translator
 * 
 */


import { Language } from 'src/common/enum';
import { ChildCategory } from 'src/models/categories/children/entities/child.entity';
import { ParentCategory } from 'src/models/categories/parents/entities/parent.entity';

class ChildCategoryResponse {
    id!: number;
    name!: string;
    parentCategory: ParentCategoryResponse | null = null;
}

class ParentCategoryResponse {
    id!: number;
    name!: string;
}


export function categoryTranslator(
    category: ChildCategory | ParentCategory, 
    lang: Language
) {
    if (!category) return null;
    if (category instanceof ChildCategory) {
        const childCategory = category as ChildCategory;
        const childCategoryResponse = new ChildCategoryResponse();
        childCategoryResponse.id = childCategory.id;
        childCategoryResponse.name = lang === Language.VI ? childCategory.name : lang === Language.EN ? childCategory.nameEn : childCategory.nameKor;
        if (childCategory.parentCategory) {
            const parentCategory = childCategory.parentCategory;
            const parentCategoryResponse = new ParentCategoryResponse();
            parentCategoryResponse.id = parentCategory.id;
            parentCategoryResponse.name = lang === Language.VI ? parentCategory.name : lang === Language.EN ? parentCategory.nameEn : parentCategory.nameKor;
            childCategoryResponse.parentCategory = parentCategoryResponse;
        }
        return childCategoryResponse;
    }
    if (category instanceof ParentCategory) {
        const parentCategory = category as ParentCategory;
        const parentCategoryResponse = new ParentCategoryResponse();
        parentCategoryResponse.id = parentCategory.id;
        parentCategoryResponse.name = lang === Language.VI ? parentCategory.name : lang === Language.EN ? parentCategory.nameEn : parentCategory.nameKor;
        return parentCategoryResponse;
    }
    return null;
}