package com.auth.exception;

/**
 * 비즈니스 로직에서 발생하는 예외.
 * {@link ErrorCode}를 담아 전역 핸들러에서 일관된 응답으로 변환한다.
 */
public class BusinessException extends RuntimeException {
    private final ErrorCode errorCode;

    public BusinessException(ErrorCode errorCode) {
        super(errorCode.getDefaultMessage());
        this.errorCode = errorCode;
    }

    public BusinessException(ErrorCode errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
    }

    public ErrorCode getErrorCode() {
        return errorCode;
    }
}
