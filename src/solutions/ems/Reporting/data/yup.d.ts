import * as yup from 'yup';

declare module 'yup' {
  interface NumberSchema {
    // product
    unitId_unique(message?: string): this;
    unitId_require(message?: string): this;
    unitsNumber_require(message?: string): this;

    // unit
    processId_unique(message?: string): this;
    processId_require(message?: string): this;
  }

  interface ValidateOptions<TContext = {}> {
    index: number;
  }
}
