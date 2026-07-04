import { AxiosError } from 'axios';

/** 백엔드 공통 에러 응답 포맷 (ErrorResponse). */
export interface FieldError {
  field: string;
  reason: string;
}

export interface ApiErrorResponse {
  status: number;
  code: string;
  message: string;
  path?: string;
  errors?: FieldError[];
  timestamp: string;
}

type ApiAxiosError = AxiosError<ApiErrorResponse>;

/** 에러에서 공통 메시지를 추출한다. (없으면 fallback) */
export function getErrorMessage(error: unknown, fallback = '오류가 발생했습니다'): string {
  const axiosError = error as ApiAxiosError;
  return axiosError?.response?.data?.message || fallback;
}

/**
 * 검증 실패(errors 배열)를 { 필드명: 메시지 } 형태로 변환한다.
 * 같은 필드에 여러 메시지가 오면 첫 번째만 사용한다.
 */
export function getFieldErrors(error: unknown): Record<string, string> {
  const axiosError = error as ApiAxiosError;
  const fieldErrors = axiosError?.response?.data?.errors;
  if (!fieldErrors) {
    return {};
  }
  return fieldErrors.reduce<Record<string, string>>((acc, { field, reason }) => {
    if (!acc[field]) {
      acc[field] = reason;
    }
    return acc;
  }, {});
}
