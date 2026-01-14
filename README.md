# DevWorld v2

## Overview 
- 티스토리나 벨로그에서 기술 블로그를 운영하며, 나만x의 공간을 직접 만들어보고 싶다는 생각이 들었습니다. 또한, 스터디 리더로 활동하며 다른 개발자들과 지식을 나누는 경험도 더해져, 여러 사람이 함께 글을 쓰고 성장할 수 있는 공간을 만들고자 DevWorld 프로젝트를 시작했습니다. 

- DevWorld v2 프로젝트는 v1에서 드러난 확장성 한계와 유지보수 어려움을 해결하기 위해 시작한 리뉴얼 프로젝트입니다. 에디터 패키지의 버전 종속성, 비효율적인 상태 관리 구조, 통일되지 않은 UI 등 주요 문제를 해결하고자 모노레포 전환과 마이크로 프론트엔드 아키텍처를 도입했습니다.
- [DevWorld v1](https://github.com/HOJOON07/Blog_Client)



## Architecture
모노레포 기반 마이크로 프론트엔드 아키텍처로, 각 앱의 독립성과 확장성을 보장하며 공통 패키지를 통해 사용자 경험과 코드 일관성을 유지했습니다.
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

## Trouble Shooting
### 1. 모노레포 전환
#### AS-IS
기존에는 FSD 폴더 구조를 도입했으나, 시간이 지날수록 유지보수 복잡도가 증가했습니다. 그 과정에서 API 호출 로직, 데이터 페칭 훅, 유틸 함수 등이 기능별 폴더에 중복 구현되며 재사용성과 일관성이 저하됐습니다. 여기에 디자인 시스템 부재로 화면마다 UI 스타일이 제각각이었고, Plate.js 라이브러리가 특정 버전에 강하게 종속되어 버전 불일치 시 기능이 정상 동작하지 않는 등 유지보수에도 어려움이 있었습니다.

#### TO-BE
PNPM과 Turborepo를 도입해 의존성 관리와 빌드 캐싱을 최적화하고, 변경된 패키지만 선택적으로 빌드·배포할 수 있는 환경을 구축했습니다. 디자인 시스템은 별도 패키지로 분리해 UI 스타일과 컴포넌트를 표준화했고, Plate.js 에디터 기능도 독립 패키지로 구성해 버전 종속성 문제를 최소화했습니다. 또한 axios-client, query-client, 디자인 시스템 등 공통 모듈을 패키지 단위로 관리함으로써 중복 코드를 제거하고, UI 일관성과 확장성을 강화했습니다.

### 2. 마이크로 프론트엔드 아키텍처 도입
DevWorld v2에서는 하나의 Shell 앱과 4개의 마이크로 앱(Remote)이 독립적으로 개발·배포되면서도, 사용자가 마치 하나의 서비스처럼 느낄 수 있도록 설계했습니다. Module Federation 기반 Shell–Remote 구조를 도입하고, Shell과 Remote 간 라우팅·상태 동기화를 CustomEvent와 useShellEvent, useAppEvent 훅으로 표준화했습니다. injectFactory로 Remote 앱의 마운트·언마운트 라이프사이클을 관리하며, 앱 단위 런타임 코드 스플리팅을 적용했습니다.  또한, 초기 Shell 번들에서 Remote 앱 코드를 완전히 분리하고, remoteEntry + importRemote 방식으로 필요한 시점에만 로드하도록 변경해 초기 로딩 속도를 개선하고 신규 앱 온보딩 속도를 높였습니다.

### 3. 마이크로 프론트엔드 환경의 라우팅·상태·이벤트 동기화
#### Problem 
Shell앱이 전체 라우팅의 진입점 역할을 했지만, 각 Remote 앱이 독립적인 라우팅을 사용했습니다. Auth앱에서 Feed앱으로 전환하는 것처럼 Cross-App 이동이 필요할 때, navigate는 현재 앱의 라우터 기준으로만 동작해 다른 앱 경로를 인식하지 못하는 문제가 있었습니다. 결국 location.href 방식으로 전체 페이지를 새로고침해야 했고, 이로 인해 SPA의 부드러운 전환 경험이 깨지고, Toast등 전역 상태가 초기화되는 문제가 있었습니다.

#### Solve
Shell에 전역 네비게이션 이벤트 리스너를 추가하고, 각 마이크로앱에서 globalNavigate(path) 함수를 호출하면 Shell이 해당 경로로 React Router를 통해 SPA 방식으로 이동하도록 개선했습니다.  이 방식은 마이크로앱 간 이동에서도 페이지 리로드 없이 SPA UX를 유지하고, 전역 UI 상태를 보존하며, 기존 Shell Event/App Event 구조와 충돌 없이 병행할 수 있습니다.  또한, 신규 앱 연결 시에도 동일한 패턴을 적용해 빠르게 크로스앱 라우팅을 구현할 수 있습니다.

### 4. 인증 관리 설계
#### Problem 
마이크로 프론트엔드 환경에서 로그인·로그아웃과 같은 인증 이벤트가 발생하면 Shell과 Remote 간 인증 상태를 안정적으로 주고받고, 관리하며, 동기화하는 방법이 필요했습니다. Shell은 라우팅의 진입점이자 인증 여부만(isAuthenticated의 true/false) 판단하는 책임을 가지지만, 각 Remote 앱은 독립적으로 동작하기 때문에 이벤트를 어떻게 표준화해 전달하고, 전역적으로 일관된 상태를 유지할지가 과제였습니다. 또한, Zustand나 Redux와 같은 전역 상태 관리 라이브러리는 Module Federation 환경에서 번들 격리로 인스턴스가 앱별로 중복 생성될 수 있고, 이는 결합도를 높여 MFE 철학(독립성 유지)에 어긋난다고 판단했습니다.

#### Solve
Shell은 인증 여부(isAuthenticated)만 관리하고, 접근 제어는 Route Guard 패턴으로 처리했습니다. 인증 이벤트의 안정적인 수집·전파를 위해 BroadcastChannel 기반의 이벤트 버스 패턴을 설계하고, auth-change라는 표준 이벤트를 발행·구독하는 구조를 도입했습니다. 이를 통해 Remote 앱은 단순히 이벤트를 emit하거나 on으로 수신하는 것만으로 Shell과 실시간으로 인증 상태를 동기화할 수 있으며, 탭 간·앱 간 일관성이 보장됩니다. 이 패턴은 결합도를 최소화해 신규 앱 추가 시에도 바로 적용 가능하며, MFE 철학을 유지하면서도 확장성과 유지보수성을 높였습니다.

## 회고
이번 프로젝트는 기존에 개발된 서비스를 다시 분석하면서 시작되었습니다. 단순한 기능 개선이 아니라, “무엇이 문제인지”와 “어떻게 해결할지”를 깊이 고민하는 과정이었고, 이를 통해 문제 해결을 위한 설계 역량을 키울 수 있었습니다. 이 과정에서 모노레포 전환, 마이크로 프론트엔드 아키텍처 설계, 컴포넌트 리팩토링을 직접 수행하며 구조적 개선의 중요성을 체감했습니다. 또한 여러 번들러의 동작 원리를 학습하고, 상황에 맞는 기술을 선택하는 판단력을 기를 수 있었던 뜻깊은 경험이었습니다.




