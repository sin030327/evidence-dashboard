# 근거노트 대시보드

근거노트(항목 · 값 · 단위 · 출처 · 조회일)를 **Supabase의 `evidence` 표**에 저장하고, 표에서 다시 받아 온 행으로만 화면을 그리는 단일 페이지 대시보드입니다. 4주차 비교과 과제물입니다.

3주차 [법령 · 조례 검증 대시보드](https://github.com/sin030327/law-ordinance-dashboard)의 조례 카드는 새로고침해도 남았지만, 그것은 값을 파일에 박아 둔 **하드코딩**이었습니다. 값 하나를 고치려면 코드를 고쳐 다시 배포해야 했습니다. 이 사이트는 그 네 칸을 **서버 표의 한 행**으로 옮깁니다.

## 이 사이트의 규칙

- **화면에 보이는 값은 저장의 증거가 아니다** — 목록과 카드는 insert 응답이 아니라 `select`로 표를 다시 조회한 결과로만 그립니다. 코드 안에 적힌 지표 값은 하나도 없습니다.
- **다섯 칸이 모두 차야 저장한다** — 폼이 먼저 막고, 표의 `NOT NULL` · `CHECK` 제약이 한 번 더 막습니다. 빈칸 금지가 화면 규칙에만 있으면 다른 경로로 들어온 요청은 막지 못하기 때문입니다.
- **값과 단위는 갈라 적는다** — `value`는 `numeric`입니다. `300% 이하`를 통째로 넣으면 글자가 되어 정렬(`"1200" < "350"`)과 평균이 틀어집니다.
- **브라우저에는 publishable 키만 둔다** — `sb_secret_…` · `service_role` 키는 RLS를 건너뜁니다. `config.js`에 넣으면 페이지가 연결을 거부합니다.

## 구성

```
index.html              화면 — 지표 카드 · 입력 폼 · 근거 목록 · 저장 확인 · 키 점검
config.js               Supabase Project URL 과 publishable 키 (공개되어도 되는 값만)
sql/01_evidence.sql     표 · 제약 · RLS 정책 — Supabase SQL Editor 에서 실행
data/ordin-values.js    3주차에 조회한 전국 196곳 조례의 용도지역 21종 값 — 폼 자동 채우기용
data/key-scan.log       커밋 전 키 점검 기록 (tools/key-scan.ps1 이 쌓음)
tools/key-scan.ps1      커밋에 키 문자열이 섞였는지 파일을 열어 확인하고 한 줄 기록
server/                 로컬 웹서버 · 실행용 배치 파일
```

## 표 설계 — 근거노트 다섯 칸이 그대로 열이 된다

| 열 | 자료형 | 뜻 | 예시 |
|---|---|---|---|
| `id` | bigint · 자동 | 행 번호 | 1 |
| `created_at` | timestamptz · 자동 | 저장 시각 | 2026-09-28 21:03 |
| `item` | text | 항목 이름 | 천안시 제3종일반주거지역 용적률 |
| `value` | numeric | 값 (숫자만) | 300 |
| `unit` | text | 단위 (상한/하한 포함) | % 이하 |
| `source` | text | 조문 · 조례번호 · 시행일 | 천안시 도시계획 조례 제61조제1항제5호 (조례 제2613호, 시행 2024-05-17) |
| `queried_on` | date | 조회일 | 2026-09-21 |

RLS는 켜 두고 **읽기(select)와 추가(insert)** 정책만 둡니다. 수정 · 삭제 정책이 없으므로 브라우저에서는 행을 고치거나 지울 수 없고, 잘못 넣은 행은 Table Editor(관리자 화면)에서 지웁니다.

`evidence_check` 표는 과제 ③의 확인 기록용입니다. 각 브라우저에서 '보임 — 기록'을 누르면 그 순간 서버에서 센 행 수와 기기 정보가 한 행으로 남습니다.

## 처음 설정

1. Supabase에서 프로젝트를 만든다.
2. **SQL Editor**에 `sql/01_evidence.sql`을 통째로 붙여 넣고 Run.
3. 상단 **Connect** 창에서 Project URL과 **publishable** 키(`sb_publishable_…`)를 복사해 `config.js`에 넣는다.
4. `index.html`을 연다 (`server/대시보드 실행.bat` 또는 배포 주소).

## 전국 조례에서 불러오기

3주차에 법제처 자치법규 API로 받아 둔 전국 196곳 도시 · 군계획 조례의 용도지역 21종 건폐율 · 용적률을 `data/ordin-values.js`로 묶어 두었습니다. 지자체 · 용도지역 · 지표를 고르면 다섯 칸이 채워지고, **저장은 버튼을 눌러야** 일어납니다. 조회일은 오늘이 아니라 **실제로 조례를 조회한 날(2026-09-21)** 이 들어갑니다.

'전국 일괄 저장'은 고른 용도지역 · 지표를 값이 있는 모든 지자체에 대해 한 번에 insert합니다. 같은 항목 · 같은 조회일의 행이 이미 있으면 건너뜁니다.

## 키 점검

```powershell
.\tools\key-scan.ps1            # 추적 파일과 새 파일 전체
.\tools\key-scan.ps1 -Staged    # 커밋 직전, 스테이징된 것만
```

`sb_secret_` · `service_role` JWT · 비밀번호가 든 Postgres 접속 문자열 등을 찾고, 결과를 `data/key-scan.log`에 한 줄로 남깁니다. `sb_publishable_` 키는 공개 키라서 찾지 않습니다. 화면의 SECTION 5도 배포된 `config.js` · `index.html`을 다시 열어 같은 검사를 합니다.

## 데이터 출처

- Supabase Docs — Tables · API keys · Row Level Security (조회 2026-09-26)
- 조례 값 — 국가법령정보 공동활용(법제처) OPEN API, 3주차 조회분(2026-09-21). 조문 원문만 파싱했으며 별표 · 지구단위계획에 따른 개별 완화는 반영하지 않았습니다.
