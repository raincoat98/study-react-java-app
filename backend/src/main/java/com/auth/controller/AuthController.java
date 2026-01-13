package com.auth.controller;

import com.auth.dto.*;
import com.auth.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
@Tag(name = "Authentication", description = "사용자 인증 API")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    @Operation(summary = "로그인", description = "이메일과 비밀번호로 로그인합니다")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "로그인 성공",
            content = @Content(schema = @Schema(implementation = AuthResponse.class))),
        @ApiResponse(responseCode = "400", description = "로그인 실패",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            AuthResponse response = authService.login(loginRequest);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse("로그인 실패: " + e.getMessage()));
        }
    }

    @PostMapping("/register")
    @Operation(summary = "회원가입", description = "새로운 사용자를 등록합니다")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "회원가입 성공",
            content = @Content(schema = @Schema(implementation = AuthResponse.class))),
        @ApiResponse(responseCode = "400", description = "회원가입 실패",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        try {
            AuthResponse response = authService.register(registerRequest);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse("회원가입 실패: " + e.getMessage()));
        }
    }

    @GetMapping("/me")
    @Operation(summary = "현재 사용자 정보", description = "인증된 사용자의 정보를 조회합니다")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "조회 성공",
            content = @Content(schema = @Schema(implementation = UserResponse.class))),
        @ApiResponse(responseCode = "400", description = "조회 실패",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
        @ApiResponse(responseCode = "401", description = "인증 필요")
    })
    public ResponseEntity<?> getCurrentUser(Authentication authentication) {
        try {
            String email = authentication.getName();
            UserResponse user = authService.getUserInfo(email);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse("사용자 정보 조회 실패: " + e.getMessage()));
        }
    }
}
