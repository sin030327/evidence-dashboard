/* Supabase 연결 설정 — Supabase 대시보드 → 상단 [Connect] 창에서 복사한다.
 *
 * 여기에는 publishable 키(sb_publishable_…)만 넣는다. 브라우저에 공개되어도 되는 키이며,
 * 이 키로 들어온 요청은 RLS 정책이 허용한 행만 읽고 쓴다.
 *
 * secret 키(sb_secret_…)·service_role 키(eyJ…)는 절대 넣지 않는다.
 * RLS 를 건너뛰는 키라서, 저장소에 한 번 올라가면 파일에서 지워도 커밋 기록에 남는다.
 * (넣으면 index.html 이 연결을 거부하고 경고를 띄운다.)
 */
window.SUPABASE_CONFIG = {
  url: 'https://ydihasmkrppozbkecezf.supabase.co',
  publishableKey: 'sb_publishable_yP3gEKMpjjmCRudoHOHcPw_0b5ab9Zp'
};
