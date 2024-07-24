import { variant, variantResponse } from './category.model';

interface productCreateRequest {
  name: string;
  description: string;
  category: number;
  images: File[];
  variants: variant[];
}

interface productsDtos {
  id: number;
  name: string;
  image: string;
  category: number;
}

interface productsUpdateDtos {
  id: number;
  name: string;
  images: imageDtos[];
  variant: variantResponse[];
  category: number;
  description: string;
  colors: colorDtos[];
  files: filesDtos[];
}
interface imageDtos {
  id: number;
  link: string;
  isActive: boolean;
}
interface pagesDtos {
  page: number;
  name: string;
}

interface colorDtos {
  id: number;
  code: string;
}

interface filesDtos {
  id: number;
  productId: number;
  link: string;
}
class productsModel {
  static formRequest(
    name: string,
    description: string,
    variants: variant[],
    category: string
  ): FormData {
    let formData: FormData = new FormData();
    formData.append('model.Name', name);
    formData.append('model.Category', category);
    formData.append('model.Description', description);
    for (let item of variants) {
      formData.append('model.Variants', JSON.stringify(item));
    }
    return formData;
  }

  static MapToVariant(model: variant): variantResponse {
    return {
      id: Number(model.id),
      size: Number(model.size),
      price: Number(model.price),
      quantity: Number(model.quantity),
      status: true,
    };
  }
  static MapperToFormData(name: string | undefined): FormData {
    let form = new FormData();
    form.append('name', name || '');
    return form;
  }
}
export {
  productCreateRequest,
  productsModel,
  productsDtos,
  productsUpdateDtos,
  variantResponse,
  imageDtos,
  pagesDtos,
  colorDtos,
  filesDtos,
};
