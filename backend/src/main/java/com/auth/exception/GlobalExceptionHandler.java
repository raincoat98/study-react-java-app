package com.auth.exception;

import com.auth.dto.ErrorResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.util.List;

/**
 * 컨트롤러 전역에서 발생하는 예외를 공통 {@link ErrorResponse} 포맷으로 변환한다.
 */
@RestControllerAdvice
public class GlobalExceptionHandler {
    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    /** 비즈니스 예외 - ErrorCode에 정의된 상태/코드/메시지로 응답한다. */
    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ErrorResponse> handleBusinessException(BusinessException e, HttpServletRequest request) {
        ErrorCode errorCode = e.getErrorCode();
        log.warn("BusinessException: {} - {}", errorCode.name(), e.getMessage());
        return build(ErrorResponse.of(errorCode, e.getMessage()), request);
    }

    /** Bean Validation(@Valid) 실패 - 필드별 에러 목록을 함께 반환한다. */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationException(MethodArgumentNotValidException e,
                                                                   HttpServletRequest request) {
        BindingResult bindingResult = e.getBindingResult();
        List<ErrorResponse.FieldError> fieldErrors = bindingResult.getFieldErrors().stream()
                .map(error -> new ErrorResponse.FieldError(error.getField(), error.getDefaultMessage()))
                .toList();
        log.warn("Validation failed: {}", fieldErrors);
        return build(ErrorResponse.of(ErrorCode.INVALID_INPUT, fieldErrors), request);
    }

    /** 요청 본문 JSON이 깨졌거나 파싱할 수 없는 경우. */
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ErrorResponse> handleNotReadable(HttpMessageNotReadableException e,
                                                           HttpServletRequest request) {
        log.warn("Malformed request body: {}", e.getMessage());
        return build(ErrorResponse.of(ErrorCode.INVALID_INPUT, "요청 본문을 읽을 수 없습니다"), request);
    }

    /** 쿼리 파라미터/경로 변수의 타입이 맞지 않는 경우 (예: 숫자 자리에 문자). */
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ErrorResponse> handleTypeMismatch(MethodArgumentTypeMismatchException e,
                                                            HttpServletRequest request) {
        String message = String.format("'%s' 파라미터의 형식이 올바르지 않습니다", e.getName());
        log.warn("Type mismatch: {}", message);
        return build(ErrorResponse.of(ErrorCode.INVALID_INPUT, message), request);
    }

    /** Spring Security 인증 실패 (잘못된 이메일/비밀번호 등). */
    @ExceptionHandler({BadCredentialsException.class, AuthenticationException.class})
    public ResponseEntity<ErrorResponse> handleAuthenticationException(AuthenticationException e,
                                                                       HttpServletRequest request) {
        log.warn("AuthenticationException: {}", e.getMessage());
        return build(ErrorResponse.of(ErrorCode.BAD_CREDENTIALS), request);
    }

    /** 그 외 처리되지 않은 모든 예외. */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(Exception e, HttpServletRequest request) {
        log.error("Unhandled exception", e);
        return build(ErrorResponse.of(ErrorCode.INTERNAL_ERROR), request);
    }

    /** 요청 경로(path)를 채우고 응답을 생성한다. */
    private ResponseEntity<ErrorResponse> build(ErrorResponse body, HttpServletRequest request) {
        body.setPath(request.getRequestURI());
        return ResponseEntity.status(body.getStatus()).body(body);
    }
}
