package com.auth.controller;

import com.auth.dto.TodoRequest;
import com.auth.dto.TodoResponse;
import com.auth.dto.ErrorResponse;
import com.auth.service.TodoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
@Tag(name = "Todos", description = "할 일 관리 API")
public class TodoController {
    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping
    @Operation(summary = "할 일 목록 조회", description = "현재 사용자의 모든 할 일을 조회합니다")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "조회 성공",
            content = @Content(schema = @Schema(implementation = TodoResponse.class))),
        @ApiResponse(responseCode = "401", description = "인증 필요"),
        @ApiResponse(responseCode = "400", description = "조회 실패",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public ResponseEntity<?> getTodos(Authentication authentication) {
        try {
            String email = authentication.getName();
            List<TodoResponse> todos = todoService.getTodosByEmail(email);
            return ResponseEntity.ok(todos);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse("할 일 조회 실패: " + e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    @Operation(summary = "할 일 상세 조회", description = "특정 할 일을 조회합니다")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "조회 성공",
            content = @Content(schema = @Schema(implementation = TodoResponse.class))),
        @ApiResponse(responseCode = "401", description = "인증 필요"),
        @ApiResponse(responseCode = "404", description = "할 일을 찾을 수 없음",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
        @ApiResponse(responseCode = "400", description = "조회 실패",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public ResponseEntity<?> getTodoById(@PathVariable Long id, Authentication authentication) {
        try {
            String email = authentication.getName();
            TodoResponse todo = todoService.getTodoById(id, email);
            return ResponseEntity.ok(todo);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse("할 일 조회 실패: " + e.getMessage()));
        }
    }

    @PostMapping
    @Operation(summary = "할 일 생성", description = "새로운 할 일을 생성합니다")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "생성 성공",
            content = @Content(schema = @Schema(implementation = TodoResponse.class))),
        @ApiResponse(responseCode = "401", description = "인증 필요"),
        @ApiResponse(responseCode = "400", description = "생성 실패",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public ResponseEntity<?> createTodo(@RequestBody TodoRequest request, Authentication authentication) {
        try {
            String email = authentication.getName();
            TodoResponse todo = todoService.createTodo(request, email);
            return ResponseEntity.status(HttpStatus.CREATED).body(todo);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse("할 일 생성 실패: " + e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    @Operation(summary = "할 일 수정", description = "기존의 할 일을 수정합니다")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "수정 성공",
            content = @Content(schema = @Schema(implementation = TodoResponse.class))),
        @ApiResponse(responseCode = "401", description = "인증 필요"),
        @ApiResponse(responseCode = "404", description = "할 일을 찾을 수 없음",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
        @ApiResponse(responseCode = "400", description = "수정 실패",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public ResponseEntity<?> updateTodo(@PathVariable Long id, @RequestBody TodoRequest request, Authentication authentication) {
        try {
            String email = authentication.getName();
            TodoResponse todo = todoService.updateTodo(id, request, email);
            return ResponseEntity.ok(todo);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse("할 일 수정 실패: " + e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "할 일 삭제", description = "기존의 할 일을 삭제합니다")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "삭제 성공"),
        @ApiResponse(responseCode = "401", description = "인증 필요"),
        @ApiResponse(responseCode = "404", description = "할 일을 찾을 수 없음",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
        @ApiResponse(responseCode = "400", description = "삭제 실패",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public ResponseEntity<?> deleteTodo(@PathVariable Long id, Authentication authentication) {
        try {
            String email = authentication.getName();
            todoService.deleteTodo(id, email);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse("할 일 삭제 실패: " + e.getMessage()));
        }
    }
}
