import { z } from 'zod'

export const PageParamsDtoSchema = z.object({
  cr: z.number().default(-1),
  sz: z.number().default(20),
})
