import { AxiosHeaders, AxiosResponse } from 'axios'
import { ZodType, ZodTypeAny } from 'zod'
import { AxiosValidationError } from './axios-validator-error'
import {
  ApiResponseSchema,
  CursorResultType,
  PaginatedApiResponseSchema,
} from '@/shared/api/common/response.contracts'

export class AxiosContracts {
  static responseContract<Data>(schema: ZodType<Data>) {
    return (response: AxiosResponse<unknown>): Data => {
      const apiSchema = ApiResponseSchema(schema)
      const validation = apiSchema.safeParse(response.data)
      console.log(response.data)
      if (validation.error) {
        throw new AxiosValidationError(
          response.config,
          response.request,
          response,
          validation.error.errors,
        )
      }

      return validation.data.data as Data
    }
  }

  static responseContract2<Data>(schema: ZodType<Data>) {
    return (response: AxiosResponse<unknown>): AxiosResponse<Data> => {
      const validation = schema.safeParse(response.data)

      if (validation.error) {
        throw new AxiosValidationError(
          response.config,
          response.request,
          response,
          validation.error.errors,
        )
      }
      return { ...response, data: validation.data }
    }
  }

  static pageResponseContract<Data extends ZodTypeAny>(schema: Data) {
    return (response: AxiosResponse<unknown>): CursorResultType<Data> => {
      const pagedSchema = PaginatedApiResponseSchema(schema)
      const validation = pagedSchema.safeParse(response.data)
      console.log(response.data)
      if (validation.error) {
        throw new AxiosValidationError(
          response.config,
          response.request,
          response,
          validation.error.errors,
        )
      }
      // @ts-ignore
      return response.data.data as CursorResultType<Data>
    }
  }

  static requestContract<Data>(schema: ZodType<Data>, data: unknown) {
    const validation = schema.safeParse(data)

    if (validation.error) {
      throw new AxiosValidationError(
        { headers: new AxiosHeaders() },
        undefined,
        undefined,
        validation.error.errors,
      )
    }

    return validation.data
  }
}
