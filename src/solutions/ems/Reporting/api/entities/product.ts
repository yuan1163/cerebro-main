import { api } from '@core/api';
import { FileRecord, FilesInput, FilesOutput, ResultOutput } from '@core/api/types';
import { Product, ProductInput, ProductOutput, ProductUnit } from '../../data/product';

export async function apiGetProduct(filter: ProductInput): Promise<Product[] | []> {
  const query = new URLSearchParams(filter);

  return api
    .get<void, ProductOutput>(`product?${query}`)
    .then(api.checkResulCode)
    .then((response) => (response.products ? response.products : []));
}

export async function apiCreateProduct(data: Partial<Product>): Promise<{ productId: number }> {
  return api
    .post<{ product: Partial<Product> }, ResultOutput & { productId: number }>(
      `product?locationId=${data.locationId}`,
      {
        product: { ...data },
      },
    )
    .then(api.checkResulCode);
}

export async function apiCreateProductUnit(data: Partial<ProductUnit>): Promise<unknown> {
  return api
    .put<void, ResultOutput>(
      `productUnit?locationId=${data.locationId}&productId=${data.productId}&unitId=${data.unitId}&unitsNumber=${data.unitsNumber}`,
    )
    .then(api.checkResulCode);
}

export async function apiUpdateProduct(data: Partial<Product>): Promise<unknown> {
  return api
    .put<{ product: Partial<Product> }, ResultOutput>(
      `product?locationId=${data.locationId}&productId=${data.productId}`,
      {
        product: { name: data.name },
      },
    )
    .then(api.checkResulCode);
}

export async function apiDeleteProduct(data: Partial<Product>): Promise<unknown> {
  return api
    .delete<void, ResultOutput>(`product?locationId=${data.locationId}&productId=${data.productId}`)
    .then(api.checkResulCode);
}

export async function apiDeleteProductUnit(data: Partial<ProductUnit>): Promise<unknown> {
  return api
    .delete<void, ResultOutput>(
      `productUnit?locationId=${data.locationId}&productId=${data.productId}&unitId=${data.unitId}`,
    )
    .then(api.checkResulCode);
}

export async function apiGetFile(filter: FilesInput): Promise<FileRecord[] | null> {
  const query = new URLSearchParams(filter);
  return api
    .get<void, FilesOutput>(`file?${query}`)
    .then(api.checkResulCode)
    .then((response) => (response.files && response.files.length ? response.files : null));
}
