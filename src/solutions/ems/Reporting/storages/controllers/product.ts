import { queryClient } from '@app/DataAccessAdapter';
import { api } from '@core/api';
import { apiDeleteFile, apiUploadFile } from '@core/api/entities/files';
import { FilesInput } from '@core/api/types';
import { pack } from '@core/utils/pack';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import {
  apiCreateProduct,
  apiCreateProductUnit,
  apiDeleteProduct,
  apiDeleteProductUnit,
  apiGetFile,
  apiGetProduct,
  apiUpdateProduct,
} from '../../api/entities/product';
import { apiGetUnit } from '../../api/entities/unit';
import { Product, ProductInput, ProductUnit } from '../../data/product';

const CONTROLLER = 'products';

class ProductController {
  product?: Product[];
  removeHandler?: (product: Partial<Product>) => void;

  static async invalidate() {
    return queryClient.invalidateQueries([CONTROLLER]);
  }

  hasData(): boolean {
    return !!this.product;
  }

  getData(): Product[] {
    return this.product!;
  }

  remove(product: Partial<Product>) {
    this.removeHandler?.(product);
  }

  constructor(product?: Product[], removeHandler?: (product: Partial<Product>) => void) {
    this.product = product;
    this.removeHandler = removeHandler;
  }
}

const IMAGE_TYPE = 5;
const IMAGE_FILE_NAME = 'product';

export const useImage = (product?: Partial<Product>) => {
  const imageQueryKey = ['product:image', product?.productId];

  const [imageFile, setImageFile] = React.useState<File | null>();

  const { data: imageFileRecord } = useQuery(
    imageQueryKey,
    () =>
      apiGetFile({
        type: IMAGE_TYPE,
        // objectId: product?.productId?.toString(),
        name: IMAGE_FILE_NAME,
        getUrl: true,
      }),
    {
      enabled: !!product,
    },
  );

  const mtUpload = useMutation((file: File) => {
    return apiUploadFile({
      file,
      filter: {
        type: IMAGE_TYPE,
        objectId: product?.productId?.toString(),
        name: IMAGE_FILE_NAME,
      },
    });
  });

  const mtDelete = useMutation((filter: FilesInput) => apiDeleteFile(filter));

  const getUrl = (productId: number = 0): string | undefined => {
    if (imageFile) return URL.createObjectURL(imageFile);
    if (imageFile === null) return undefined;
    if (!imageFileRecord?.filter((f) => Number(f.objectId) === productId)[0]) return undefined;

    return imageFileRecord.filter((f) => Number(f.objectId) === productId)[0].url;
  };

  const setFile = (file: File | null) => {
    setImageFile(file);
  };

  const update = async (productId: number) => {
    if (imageFile) {
      // If it is add product, it will not work.
      // Because mtUpload don't get objectId it always is undenfind on 'add product'.

      // await mtUpload.mutateAsync(uploadData);
      await apiUploadFile({
        file: imageFile,
        filter: {
          type: IMAGE_TYPE,
          objectId: productId?.toString(),
          name: IMAGE_FILE_NAME,
        },
      });
      await queryClient.invalidateQueries(imageQueryKey);
      await queryClient.invalidateQueries(['product:image', 'all']);
    } else if (imageFile === null) {
      await mtDelete.mutateAsync({
        fileId: imageFileRecord?.filter((f) => Number(f.objectId) === productId)[0].fileId,
      });
      await queryClient.invalidateQueries(imageQueryKey);
      await queryClient.invalidateQueries(['product:image', 'all']);
    }
  };

  return { getUrl, setFile, update };
};

export const useProducts = (filter: ProductInput) => {
  const imageQueryKey = ['product:image', 'all'];

  const { data: imageFileRecord } = useQuery(imageQueryKey, () =>
    apiGetFile({
      type: IMAGE_TYPE,
      // objectId: product?.productId?.toString(),
      name: IMAGE_FILE_NAME,
      getUrl: true,
    }),
  );

  const useFilter = pack(filter);

  const { data } = useQuery([CONTROLLER, ...Object.values(useFilter)], () => apiGetProduct(useFilter), {
    enabled: !!filter.locationId,
  });

  if (imageFileRecord && data) {
    data.map((p) => {
      const url = imageFileRecord.filter((image) => image.objectId === p.productId.toString())[0]?.url;
      p.files = [{ url: url }];
    });
  }

  const mtRemove = useMutation(apiDeleteProduct);
  const remove = async (item: Partial<Product>) => {
    await mtRemove.mutateAsync(item);
    await ProductController.invalidate();
  };

  return new ProductController(data, remove);
};

export const useProduct = (product: Partial<Product>) => {
  const mtAddProduct = useMutation(apiCreateProduct);
  const mtAddProductUnit = useMutation(apiCreateProductUnit);
  const mtUpdateProduct = useMutation(apiUpdateProduct);
  const mtRemove = useMutation(apiDeleteProduct);
  const mtRemoveProductUnit = useMutation(apiDeleteProductUnit);

  const image = useImage(product);

  const get = (filter: Partial<ProductInput>) => {
    const { data } = useQuery([CONTROLLER, filter], () => apiGetProduct(filter), {
      // without startDate and endDate would get expired part setting.
      staleTime: Infinity,
      cacheTime: Infinity,
    });

    return data;
  };

  const getUnit = (filter: Partial<ProductUnit>) => {
    const { data } = useQuery(['unitOption', filter], () => apiGetUnit(filter), {
      staleTime: Infinity,
      cacheTime: 0,
    });

    return data;
  };

  const add = async (productData: Partial<Product>, unitData: { unitId: number; unitsNumber: number }[] | []) => {
    // Create product
    const { productId } = await mtAddProduct.mutateAsync(productData);
    product.productId = productId;

    // Create Unit Process
    unitData.map(async (unit) => {
      const queryProductUnit = {
        productId: productId,
        locationId: product.locationId,
        unitId: unit.unitId,
        unitsNumber: unit.unitsNumber,
      };

      await mtAddProductUnit.mutateAsync(queryProductUnit);
    });

    await image.update(product.productId);

    await ProductController.invalidate();
  };

  const update = async (
    productData: Partial<Product>,
    unitData: { old: { unitId: number; unitsNumber: number }[]; new: { unitId: number; unitsNumber: number }[] },
  ) => {
    // Update unit
    await mtUpdateProduct.mutateAsync(productData);

    const oldUnitIdArr = unitData.old.map((u) => u.unitId);
    const newUnitIdArr = unitData.new.map((u) => u.unitId);

    const intersection = newUnitIdArr.filter((n) => {
      return oldUnitIdArr && oldUnitIdArr.indexOf(n) > -1;
    });

    // Create Unit Process
    unitData.new.map(async (u) => {
      if (
        intersection.includes(u.unitId) &&
        unitData.old.filter((old_u) => old_u.unitId === u.unitId)[0].unitsNumber === u.unitsNumber
      )
        return false;

      const queryProductUnit = {
        locationId: productData.locationId,
        productId: productData.productId,
        unitId: u.unitId,
        unitsNumber: u.unitsNumber,
      };

      await mtAddProductUnit.mutateAsync(queryProductUnit);
    });

    // Delete Unit Process
    unitData.old &&
      unitData.old.map(async (u) => {
        if (!intersection.includes(u.unitId)) {
          const queryProductUnit = {
            locationId: productData.locationId,
            productId: productData.productId,
            unitId: u.unitId,
          };

          await mtRemoveProductUnit.mutateAsync(queryProductUnit);
        }
      });

    if (productData.productId) await image.update(productData.productId);

    await ProductController.invalidate();
    await queryClient.invalidateQueries(['unitOption']);
  };

  const remove = async (item: Partial<Product>) => {
    await mtRemove.mutateAsync(item);
    await ProductController.invalidate();
  };

  return {
    get,
    getUnit,
    add,
    update,
    remove,
    getImage: image.getUrl,
    setImage: image.setFile,
    clearImage: () => image.setFile(null),
  };
};
