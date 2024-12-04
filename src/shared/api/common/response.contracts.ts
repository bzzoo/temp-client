import { z, ZodType } from 'zod'

export const CursorResultSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    nextCursor: z.number().nullable(),
    isLast: z.boolean(),
    content: itemSchema,
  })

export const ApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    result: z.string(),
    data: z.union([z.number(), dataSchema, z.null()]),
    error: z.string().optional(),
  })

export const PaginatedApiResponseSchema = <T extends z.ZodTypeAny>(
  dataSchema: T,
) =>
  z.object({
    result: z.string(),
    data: CursorResultSchema(dataSchema),
    error: z
      .object({
        message: z.string(),
      })
      .optional(),
  })

export type CursorResultType<T extends ZodType<any>> = z.infer<
  ReturnType<typeof CursorResultSchema<T>>
>
export type ApiResponseType<T extends ZodType<any>> = z.infer<
  ReturnType<typeof CursorResultSchema<T>>
>
export type PaginatedApiResponseType<T extends ZodType<any>> = z.infer<
  ReturnType<typeof PaginatedApiResponseSchema<T>>
>
