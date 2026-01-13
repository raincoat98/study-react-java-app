# Study React + Java Auth App

React + Vite와 Spring Boot를 이용한 로그인 인증 시스템입니다.

## 프로젝트 구조

```
study-react-java-app/
├── frontend/           # React + Vite 프론트엔드
│   ├── src/
│   │   ├── api/       # Axios 설정
│   │   ├── store/     # Zustand 상태 관리
│   │   ├── components/# React 컴포넌트 (Login, Register)
│   │   ├── pages/     # 페이지 컴포넌트 (Dashboard)
│   │   ├── utils/     # JWT 유틸리티
│   │   └── App.jsx    # 메인 앱 (라우팅 설정)
│   └── package.json
│
└── backend/           # Spring Boot 백엔드
    ├── src/main/java/com/auth/
    │   ├── entity/    # JPA Entity (User)
    │   ├── repository/# Repository
    │   ├── service/   # 비즈니스 로직
    │   ├── controller/# REST Controller
    │   ├── security/  # JWT 및 Security 설정
    │   ├── dto/       # Data Transfer Object
    │   ├── config/    # Spring Security 설정
    │   └── AuthServerApplication.java
    └── pom.xml
```

## 기술 스택

### 프론트엔드
- **React 19** - UI 라이브러리
- **Vite** - 빌드 도구
- **React Router** - 라우팅
- **React Query** - 데이터 페칭 및 캐싱
- **Axios** - HTTP 클라이언트
- **Tailwind CSS** - CSS 프레임워크
- **Zustand** - 전역 상태 관리
- **JWT Decode** - JWT 토큰 디코드

### 백엔드
- **Spring Boot 3.2** - 애플리케이션 프레임워크
- **Spring Security** - 보안
- **Spring Data JPA** - ORM
- **JWT (JJWT)** - 토큰 기반 인증
- **H2 Database** - 개발용 DB (프로덕션은 MySQL)
- **Lombok** - 코드 간소화

## 시작하기

### 요구사항
- Node.js 18 이상
- Java 17 이상
- Maven 3.8 이상

### 프론트엔드 실행

```bash
cd frontend
npm install
npm run dev
```

프론트엔드는 `http://localhost:5173`에서 실행됩니다.

### 백엔드 실행

```bash
cd backend
mvn spring-boot:run
```

백엔드는 `http://localhost:8080`에서 실행됩니다.

## API 엔드포인트

### 인증 (Authentication)

#### 1. 로그인
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**응답:**
```json
{
  "token": "eyJhbGc...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

#### 2. 회원가입
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123"
}
```

**응답:**
```json
{
  "token": "eyJhbGc...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

#### 3. 현재 사용자 정보 조회
```http
GET /api/auth/me
Authorization: Bearer <token>
```

**응답:**
```json
{
  "id": 1,
  "email": "user@example.com",
  "name": "John Doe"
}
```

## 주요 기능

### 프론트엔드

1. **로그인 페이지** (`/components/Login.jsx`)
   - 이메일과 비밀번호로 로그인
   - JWT 토큰 저장
   - 에러 메시지 표시
   - React Query를 사용한 API 호출

2. **회원가입 페이지** (`/components/Register.jsx`)
   - 사용자 정보 입력
   - 비밀번호 확인
   - 유효성 검사
   - 회원가입 후 로그인 페이지로 리다이렉트

3. **대시보드 페이지** (`/pages/Dashboard.jsx`)
   - 로그인된 사용자만 접근 가능
   - 사용자 정보 표시
   - 로그아웃 기능

4. **전역 상태 관리** (`/store/authStore.js`)
   - Zustand를 사용한 인증 상태 관리
   - 토큰 저장 및 검증
   - 사용자 정보 관리

5. **JWT 인터셉터** (`/api/axiosConfig.js`)
   - 모든 요청에 JWT 토큰 자동 추가
   - 401 에러 시 로그인 페이지로 리다이렉트

### 백엔드

1. **사용자 엔티티** (`entity/User.java`)
   - UserDetails 구현
   - 권한(Authority) 자동 설정

2. **JWT 토큰 제공자** (`security/JwtTokenProvider.java`)
   - 토큰 생성
   - 토큰 검증
   - 토큰에서 이메일 추출

3. **JWT 인증 필터** (`security/JwtAuthenticationFilter.java`)
   - 요청 헤더에서 JWT 추출
   - 토큰 검증 및 사용자 인증

4. **Spring Security 설정** (`config/SecurityConfig.java`)
   - CORS 설정
   - CSRF 비활성화
   - 세션 상태 비저장
   - JWT 필터 등록

## 환경 변수 설정

### 프론트엔드 (.env)
```env
VITE_API_URL=http://localhost:8080/api
```

### 백엔드 (application.properties)
```properties
app.jwtSecret=mySecretKeyForJWTTokenGenerationPleaseChangeInProduction
app.jwtExpirationMs=86400000
```

## 데이터베이스

개발 단계에서는 **H2 Database**를 사용합니다.

### H2 콘솔 접근
- URL: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:testdb`
- 사용자명: `sa`
- 비밀번호: (빈 칸)

## 보안 주의사항

1. **JWT Secret 변경**: `application.properties`의 `app.jwtSecret` 값을 강력한 문자열로 변경하세요.
2. **CORS 설정**: 프로덕션 환경에서는 허용 도메인을 제한하세요.
3. **HTTPS 사용**: 프로덕션 환경에서는 HTTPS를 사용하세요.
4. **비밀번호 해싱**: BCrypt를 사용하여 비밀번호가 자동으로 해싱됩니다.

## 테스트 계정

프로젝트 시작 시 테스트 계정을 생성할 수 있습니다.

```
이메일: test@example.com
비밀번호: test123456
```

## 트러블슈팅

### 1. CORS 에러
- 백엔드의 CORS 설정을 확인하세요.
- 프론트엔드의 API URL이 정확한지 확인하세요.

### 2. JWT 토큰 만료
- 토큰 만료 시간(`app.jwtExpirationMs`)을 확인하세요.
- 기본값: 24시간 (86400000ms)

### 3. 로그인 실패
- 사용자가 등록되어 있는지 확인하세요.
- 비밀번호가 정확한지 확인하세요.
- 백엔드 로그를 확인하세요.

## 향후 개선사항

- [ ] 리프레시 토큰 구현
- [ ] 이메일 인증
- [ ] 비밀번호 재설정
- [ ] 사용자 프로필 수정
- [ ] 로그 아웃 시 토큰 블랙리스트 처리
- [ ] MySQL 데이터베이스 지원
- [ ] Docker 컨테이너화

## 라이선스

MIT

## 개발자

Study Project
