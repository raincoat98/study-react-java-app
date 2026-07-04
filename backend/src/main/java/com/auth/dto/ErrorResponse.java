package com.auth.dto;

import com.auth.exception.ErrorCode;
import com.fasterxml.jackson.annotation.JsonInclude;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 공통 에러 응답 포맷.
 * <pre>
 * {
 *   "status": 400,
 *   "code": "INVALID_INPUT",
 *   "message": "입력값이 올바르지 않습니다",
 *   "path": "/api/auth/register",
 *   "errors": [{ "field": "email", "reason": "올바른 이메일 형식이 아닙니다" }],
 *   "timestamp": "2026-06-30T12:00:00"
 * }
 * </pre>
 * {@code path}, {@code errors}는 값이 없으면 응답 본문에서 생략된다.
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ErrorResponse {
    private int status;
    private String code;
    private String message;
    private String path;
    private List<FieldError> errors;
    private LocalDateTime timestamp;

    public ErrorResponse() {
    }

    public ErrorResponse(int status, String code, String message, String path,
                         List<FieldError> errors, LocalDateTime timestamp) {
        this.status = status;
        this.code = code;
        this.message = message;
        this.path = path;
        this.errors = errors;
        this.timestamp = timestamp;
    }

    /** ErrorCode의 기본 메시지로 응답을 생성한다. */
    public static ErrorResponse of(ErrorCode errorCode) {
        return of(errorCode, errorCode.getDefaultMessage());
    }

    /** ErrorCode와 커스텀 메시지로 응답을 생성한다. */
    public static ErrorResponse of(ErrorCode errorCode, String message) {
        return new ErrorResponse(
                errorCode.getStatus().value(),
                errorCode.name(),
                message,
                null,
                null,
                LocalDateTime.now()
        );
    }

    /** ErrorCode와 필드 검증 에러 목록으로 응답을 생성한다. */
    public static ErrorResponse of(ErrorCode errorCode, List<FieldError> errors) {
        ErrorResponse response = of(errorCode);
        response.errors = errors;
        return response;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public List<FieldError> getErrors() {
        return errors;
    }

    public void setErrors(List<FieldError> errors) {
        this.errors = errors;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    /** 필드 단위 검증 실패 정보. */
    public static class FieldError {
        private String field;
        private String reason;

        public FieldError() {
        }

        public FieldError(String field, String reason) {
            this.field = field;
            this.reason = reason;
        }

        public String getField() {
            return field;
        }

        public void setField(String field) {
            this.field = field;
        }

        public String getReason() {
            return reason;
        }

        public void setReason(String reason) {
            this.reason = reason;
        }
    }
}
