import { z } from 'zod'
import {
  QuestionDtoSchema,
  QuestionListDtoSchema,
  CreateQuestionDtoSchema,
  UpdateQuestionDtoSchema,
  QuestionQueryDtoSchema,
} from './question.contracts'

export type QuestionOverViewDto = z.infer<typeof QuestionDtoSchema>
export type QuestionOverViewListDto = z.infer<typeof QuestionListDtoSchema>
export type CreateQuestionDto = z.infer<typeof CreateQuestionDtoSchema>
export type UpdateQuestionDto = z.infer<typeof UpdateQuestionDtoSchema>
export type QuestionQueryDto = z.infer<typeof QuestionQueryDtoSchema>
