# smilegate_dev_camp_test

스마일게이트 DEV CAMP 2기 과제 전형

## 사용중인 라이브러리

```
-   express(v4.17.1) : mock api를 위한 라이브러리
    - cors(v2.8.5) : cors 오류 해결을 위한 라이브러리
-   vue-router(v3.5.3) : 라우터 작업을 위한 라이브러리
-   axios(v0.24.0) : api 통신을 위한 라이브러리
-   vuex(v3.6.2) : 상태 관리 라이브러리
```

## express 서버 명령어

```
package.json
...
"start": "cd server && node server.js"
...
```

-   yarn start

### Vue 프로젝트 수행 명령어

```
package.json
...
"serve": "vue-cli-service serve"
...
```

-   yarn serve

## 요구 사항

### 필수 요구 사항

-   [ ] 메인 페이지
-   [ ] 글 쓰기 수정 기능
-   [ ] 글 목록 삭제 기능
-   [ ] 댓글 기능

### 선택 요구 사항

-   [ ] UI 디자인
-   [ ] 관리자 도구
-   [ ] Trackback
-   [ ] RSS

### 2021.10.30(토)

```
-   Vue 초기 프로젝트 설정
```

### 2021.11.01(월)

진행 사항

```
1. 게시글

-   게시글 등록 기능 구현 및 API 작성
-   게시글 보기 기능 구현 및 API 작성
-   게시글 수정 기능 구현 및 API 작성
-   게시글 삭제 기능 구현 및 API 작성


2. 댓글

-   댓글 등록 기능 구현 및 API 작성
-   댓글 삭제 기능 구현 및 API 작성
-   댓글 수정 기능 구현 및 API 작성
```

### 2021.11.02(화)

<!-- https://codesandbox.io/s/3v0m1?file=/src/components/board/BoardDetail.vue:789-799 -->

## 고민하던 점

-   API 작성시 댓글 API 와 답글 API를 나눠서 작성해야하는가?
    -   댓글 수정, 삭제, 등록
    -   답글 수정, 삭제, 등록

진행 사항

```
1. 답글
-   답글 등록 기능 구현 및 API 작성
-   답글 삭제 기능 구현 및 API 작성
-   답글 수정 기능 구현 및 API 작성

2. vuex로 변경 적용
-   메인 페이지, 수정 페이지, 상세 페이지

```
