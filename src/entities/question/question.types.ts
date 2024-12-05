import { z } from 'zod'

import {
  FilterSchema,
  TabFilterSchema,
  QuestionSchema,
  QuestionsSchema,
} from '@/entities/question/question.contracts'
import { CursorResultType } from '@/shared/api/common/response.contracts'
import { InfiniteData } from '@tanstack/query-core'

export type Question = z.infer<typeof QuestionSchema>
export type Questions = z.infer<typeof QuestionsSchema>
export type TabFilter = z.infer<typeof TabFilterSchema>
export type QuestionFilter = z.infer<typeof FilterSchema>
export type InfiniteQuestions = InfiniteData<
  CursorResultType<typeof QuestionsSchema>
>
