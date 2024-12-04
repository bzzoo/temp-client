'use client'

import { z } from 'zod'
import {
  CreateQuestionDtoSchema,
  QuestionDtoSchema,
  QuestionListDtoSchema,
  UpdateQuestionDtoSchema,
} from './question.contracts'
import { AxiosContracts, axiosInstance } from '@/shared/lib/axios'
import {
  CreateQuestionDto,
  QuestionQueryDto,
  UpdateQuestionDto,
} from './question.types'

export class QuestionService {
  static createMutation(data: { createQuestionDto: CreateQuestionDto }) {
    const dto = AxiosContracts.requestContract(
      CreateQuestionDtoSchema,
      data.createQuestionDto,
    )
    return axiosInstance
      .post('/questions', dto)
      .then(AxiosContracts.responseContract(z.number()))
  }

  static updateMutation(data: {
    id: number
    updateQuestionDto: UpdateQuestionDto
  }) {
    const dto = AxiosContracts.requestContract(
      UpdateQuestionDtoSchema,
      data.updateQuestionDto,
    )
    return axiosInstance
      .post(`/questions/${data.id}`, dto)
      .then(AxiosContracts.responseContract(z.number()))
  }

  static deleteMutation(data: { id: number }) {
    return axiosInstance
      .put(`/questions/${data.id}`)
      .then(AxiosContracts.responseContract(z.null()))
  }

  static upvoteMutation(id: number) {
    return axiosInstance
      .post(`/questions/${id}/upvote`)
      .then(AxiosContracts.responseContract(z.null()))
  }

  static downvoteMutation(id: number) {
    return axiosInstance
      .post(`/questions/${id}/downvote`)
      .then(AxiosContracts.responseContract(z.null()))
  }

  static fetchQuestion(id: number) {
    return axiosInstance
      .get(`/questions/${id}`)
      .then(AxiosContracts.responseContract2(QuestionDtoSchema))
  }

  static fetchQuestionList(config?: { params: QuestionQueryDto }) {
    return axiosInstance
      .get('/questions', config)
      .then(AxiosContracts.pageResponseContract(QuestionListDtoSchema))
  }
}
