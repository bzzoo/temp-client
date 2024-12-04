'use client'

import { z } from 'zod'
import axios, { AxiosError } from 'axios'

const baseURL = 'http://localhost:9090/api'

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
})

axiosInstance.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => Promise.reject(error),
)

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!axios.isAxiosError(error)) {
      return Promise.reject(error)
    }

    return Promise.reject(handleGenericError(error))
  },
)

export function handleGenericError(error: AxiosError) {
  const validation = GenericErrorSchema.safeParse(error.response?.data)

  if (validation.error) {
    return error
  }

  const message = formatValidationErrors(validation.data)

  return new AxiosError(
    message,
    error.code,
    error.config,
    error.request,
    error.response,
  )
}

const GenericErrorSchema = z.object({
  errors: z.record(z.string(), z.array(z.string())),
})

type GenericError = z.infer<typeof GenericErrorSchema>

function formatValidationErrors(data: GenericError): string {
  return Object.entries(data.errors)
    .map(([field, messages]) =>
      messages.map((message) => `${field}: ${message}`).join('\n'),
    )
    .join('\n')
}
