'use client'

import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query'
import { QuestionService } from '@/shared/api/question/question.service'
import { queryClient } from '@/shared/lib/react-query/query-client'
import {
  Question,
  Questions,
  InfiniteQuestions,
  QuestionFilter,
} from './question.types'
import {
  transQuestionDtoToQuestion,
  transQuestionsDtoDtoToQuestion,
} from '@/entities/question/question.lib'

export class QuestionQueries {
  static readonly keys = {
    root: ['question'] as const,
    rootById: ['question', 'by-id'] as const,
    rootInfinity: ['question', 'infinite-questions'] as const,
    questionByMember: ['question', 'profile'] as const,
  }

  static questionQuery(id: number) {
    const queryKey = [...this.keys.root, id] as string[]
    return queryOptions({
      queryKey: [...this.keys.root, id],
      queryFn: async () => {
        const res = await QuestionService.fetchQuestion(id)
        return transQuestionDtoToQuestion(res.data)
      },
      initialData: () => this.getInitialData<Question>(queryKey),
      initialDataUpdatedAt: () => this.getQueryDataUpdateAt(queryKey),
    })
  }

  static questionsInfiniteQuery(filter?: QuestionFilter) {
    const { tabFilter, tags } = filter || {}

    const queryKey = [
      ...this.keys.rootInfinity,
      'by-filter',
      { tabFilter },
      ...(tags?.length ? [tags] : []),
    ].filter(Boolean) as string[]

    return infiniteQueryOptions({
      queryKey,
      queryFn: async ({ pageParam = -1 }) => {
        const params = {
          sortBy: tabFilter,
          tag: tags?.length ? tags : undefined,
          cursor: pageParam as number,
          size: 20,
        }

        const response = await QuestionService.fetchQuestionList({ params })
        const questions = transQuestionsDtoDtoToQuestion(response.content)

        this.setArticleData(questions)

        return {
          content: questions,
          nextCursor: response.nextCursor,
          isLast: response.isLast,
        }
      },
      initialPageParam: -1,
      getNextPageParam: (lastPage) =>
        lastPage.isLast ? null : lastPage.nextCursor,
      initialData: () => this.getInitialData<InfiniteQuestions>(queryKey),
      initialDataUpdatedAt: () => this.getQueryDataUpdateAt(queryKey),
    })
  }

  private static getInitialData<T>(queryKey: string[]) {
    return queryClient.getQueryData<T>(queryKey)
  }

  private static getQueryDataUpdateAt<T>(id: string[]) {
    return queryClient.getQueryState<T>(id)?.dataUpdatedAt
  }

  private static setArticleData(questions: Questions) {
    questions.forEach((question) => {
      queryClient.setQueryData([...this.keys.root, question.id], question)
    })
  }
}
