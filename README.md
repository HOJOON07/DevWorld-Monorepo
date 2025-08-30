# DevWorld v2

## Overview 
- 개발자들의 기술 블로그 플랫폼
- NEXT.js로 개발된 DevWorld 프로젝트를 모노레포 전환, 마이크로 프론트엔드 아키텍처 설계

## Architecture
- Root Config -> PNPM(모노레포 패키지 관리), Turborepo(빌드 캐싱·병렬 실행), Biome(린팅·포맷팅 단일화)로 개발
- Micro Frontends -> Shell-Remote 구조, Remote 앱 독립 배포
- Shared Packages -> API Client, Shell Router, Design System, Event Bus
- Backend -> Nest.js, TypeORM, PostgreSQL

![diagram-export-8-7-2025-9_07_54-PM](https://github.com/user-attachments/assets/46c6c8e4-289e-45d7-a404-2a40337da0c6)

## Tech Stacks 
- TypeScript
- React.js
- Nest.js
- Tanstack Query, Zustand, TailwindCSS
- PostgreSQL, TypeORM
- PNPM, Turborepo, Rspack, Biome

## 📁 Folder Structure

```
mfa/
├── apps/                          # 마이크로 프론트엔드 앱들
│   ├── shell/                     # 컨테이너 앱
│   ├── auth/                      # 인증 앱
│   ├── feed/                      # 피드 앱
│   ├── workspace/                 # 워크스페이스 앱
│   └── storybook/                 # 컴포넌트 문서화
│
├── packages/                      # 공통 패키지
│   ├── ui/                        # UI 컴포넌트 라이브러리
│   ├── shell-router/              # 라우팅 시스템
│   ├── axios-client/              # HTTP 클라이언트
│   ├── tanstack-query-client/     # 상태 관리
│   ├── event-bus/                 # 앱 간 통신
│   └── editor/                    # 리치 텍스트 에디터
│
├── server/                        # 백엔드 서비스
│   └── nest-api/                  # NestJS API 서버
│
├── dev-docs/                      # 개발 문서 (Nextra)
├── turbo.json                     # Turborepo 설정
└── pnpm-workspace.yaml           # 워크스페이스 설정
```

## 🎨 Key Features

### 🔐 Authentication (Auth App)
- 회원가입 플로우 (Funnel 패턴)
- OAuth 소셜 로그인 (GitHub, Google)
- 이메일 인증 및 JWT 토큰 관리
- 반응형 인증 폼

### 📰 Social Feed (Feed App)
- 무한 스크롤 아티클 피드
- 사용자 프로필 및 상호작용 (좋아요, 북마크, 댓글)
- 실시간 검색 기능
- 사이드 패널 기반 프리뷰 시스템

### 📝 Workspace (Workspace App)
- Plate.js 기반 리치 텍스트 에디터
- 문서 관리 및 CRUD 작업

### 접속 URL
- **Shell (Main)**: http://localhost:3000
- **Auth App**: http://localhost:3001
- **Feed App**: http://localhost:3002
- **Workspace App**: http://localhost:3003
- **Storybook**: http://localhost:3004

