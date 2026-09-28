<#
.SYNOPSIS
  커밋에 인증키가 섞이지 않았는지 파일을 열어 확인하고, 확인한 기록을 한 줄 남긴다.

.DESCRIPTION
  4주차 과제 ④ — '커밋 내용에 키 문자열이 없는지 확인한 기록을 한 줄 남김'.
  Supabase secret 키(sb_secret_) · service_role 키 · DB 접속 문자열을 먼저 찾는다.

  저장소가 추적하는 텍스트 파일을 실제로 열어 인증키로 보이는 문자열을 찾는다.
  찾은 것이 없으면 그 사실을, 찾았으면 파일과 줄 번호를 data/key-scan.log 에 한 줄로 적는다.
  '확인했다'는 말만 남기지 않고 무엇을 몇 개 열어 봤는지까지 적는 것이 기록의 요점이다.

  법제처가 활용가이드에 공개해 둔 공용 계정 'test' 는 비밀이 아니므로 허용 목록에 둔다.
  본인 인증값을 쓰기 시작하면 그 값이 결과 파일·URL·커밋 메시지에 섞이기 쉬우므로
  커밋 전에 이 스크립트를 돌리는 습관이 필요하다.

.PARAMETER Staged
  git 에 스테이징된 파일만 검사한다. 커밋 직전 점검에 쓴다.

.PARAMETER OC
  본인 인증값. 주면 그 값이 파일에 박혀 있는지 정확히 찾아 준다.
  (값 자체는 로그에 적지 않는다.)

.PARAMETER Quiet
  검출이 없으면 아무것도 출력하지 않는다.

.EXAMPLE
  .\tools\key-scan.ps1

.EXAMPLE
  .\tools\key-scan.ps1 -Staged -OC myid
#>
#Requires -Version 5.1
[CmdletBinding()]
param(
  [switch]$Staged,
  [string]$OC,
  [switch]$Quiet,
  [string]$Log
)

$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
if (-not $Log) { $Log = Join-Path $root 'data\key-scan.log' }

# 비밀이 아닌 값. 법제처 OPEN API 활용가이드가 샘플 URL에 그대로 적어 둔 공용 계정이다.
$ALLOW = @('OC=test', "OC='test'", 'OC="test"', '"인증값": "test"', '-OC test', "OC = 'test'")

# 찾을 것들. 이름이 아니라 '값이 붙어 있는 꼴'을 찾는다 —
# 'OC' 라는 낱말만 보고 걸면 설명 문장이 전부 걸린다.
$PATTERNS = @(
  # Supabase — 브라우저에 두면 안 되는 두 가지. publishable 키(sb_publishable_)는 공개 키라 찾지 않는다.
  @{ 이름 = 'Supabase secret 키'; 정규식 = '\bsb_secret_[A-Za-z0-9_\-]{6,}' },
  @{ 이름 = 'Supabase service_role 키(JWT)'; 정규식 = 'eyJ[A-Za-z0-9_\-]{10,}\.[A-Za-z0-9_\-]*(?:c2VydmljZV9yb2xl|NlcnZpY2Vfcm9sZ|zZXJ2aWNlX3JvbG)[A-Za-z0-9_\-]*\.[A-Za-z0-9_\-]{10,}' },
  @{ 이름 = 'Postgres 접속 문자열(비밀번호 포함)'; 정규식 = 'postgres(?:ql)?://[^:\s]+:[^@\s<]{6,}@' },
  @{ 이름 = '법령 API 인증값(OC)'; 정규식 = '(?i)\bOC\s*[=:]\s*["'']?(?!test\b)[A-Za-z0-9_.\-]{2,}' },
  @{ 이름 = '공공데이터포털 serviceKey'; 정규식 = '(?i)\bservice[_-]?key\s*[=:]\s*["'']?[A-Za-z0-9%+/=_.\-]{20,}' },
  @{ 이름 = '일반 API 키'; 정규식 = '(?i)\b(api[_-]?key|apikey|access[_-]?token|auth[_-]?token|client[_-]?secret)\s*[=:]\s*["'']?[A-Za-z0-9_.\-]{16,}' },
  @{ 이름 = 'GitHub 토큰'; 정규식 = '\bgh[pousr]_[A-Za-z0-9]{16,}' },
  @{ 이름 = 'AWS 액세스 키'; 정규식 = '\bAKIA[0-9A-Z]{16}\b' },
  @{ 이름 = 'Google API 키'; 정규식 = '\bAIza[0-9A-Za-z_\-]{35}\b' },
  @{ 이름 = 'Slack 토큰'; 정규식 = '\bxox[baprs]-[A-Za-z0-9\-]{10,}' },
  @{ 이름 = '개인키 파일'; 정규식 = '-----BEGIN (?:RSA |EC |OPENSSH |PGP )?PRIVATE KEY-----' },
  @{ 이름 = '비밀번호'; 정규식 = '(?i)\b(password|passwd|pwd)\s*[=:]\s*["'']?\S{6,}' }
)

if ($OC) {
  $PATTERNS += @{ 이름 = '본인 인증값(직접 지정)'; 정규식 = [regex]::Escape($OC) }
}

# 텍스트가 아닌 것은 열어 봐야 소용이 없다
$SKIP_EXT = @('.png','.jpg','.jpeg','.gif','.ico','.pdf','.zip','.hwp','.xlsx','.docx','.pptx','.woff','.woff2','.ttf','.otf')

# ---------------------------------------------------------------- 검사 대상

Push-Location $root
try {
  $isGit = $false
  try { git rev-parse --is-inside-work-tree 2>$null | Out-Null; $isGit = $LASTEXITCODE -eq 0 } catch { }

  if ($isGit) {
    # core.quotepath=false 가 없으면 한글 파일명이 "\355\231\224…" 로 나와 경로가 깨진다
    # 아직 git add 하지 않은 새 파일이 오히려 위험하므로 기본 검사에 포함한다.
    # --exclude-standard 가 .gitignore 로 걸러진 것은 빼 준다.
    $files = if ($Staged) {
      git -c core.quotepath=false diff --cached --name-only --diff-filter=ACM
    } else {
      git -c core.quotepath=false ls-files --cached --others --exclude-standard
    }
    $범위 = if ($Staged) { '스테이징된 파일' } else { '추적 파일과 새 파일' }
  } else {
    # git 저장소가 아니면 폴더를 그대로 훑는다
    $files = Get-ChildItem -Recurse -File |
             Where-Object { $_.FullName -notmatch '\\\.git\\' } |
             ForEach-Object { $_.FullName.Substring($root.Length + 1) }
    $범위 = '폴더 내 파일'
  }

  $files = @($files | Where-Object { $_ -and (Test-Path (Join-Path $root $_)) })

  $열어본수 = 0
  $건너뛴수 = 0
  $검출 = @()
  $허용된수 = 0

  foreach ($rel in $files) {
    $full = Join-Path $root $rel
    if ($SKIP_EXT -contains [IO.Path]::GetExtension($rel).ToLower()) { $건너뛴수++; continue }
    if ((Get-Item $full).Length -gt 5MB) { $건너뛴수++; continue }

    $lines = try { [IO.File]::ReadAllLines($full, [Text.Encoding]::UTF8) } catch { $건너뛴수++; continue }
    $열어본수++

    for ($i = 0; $i -lt $lines.Count; $i++) {
      $line = $lines[$i]
      if (-not $line) { continue }

      foreach ($p in $PATTERNS) {
        $m = [regex]::Match($line, $p.정규식)
        if (-not $m.Success) { continue }

        # 공용 계정이나 설명용 자리표시자는 비밀이 아니다
        $hit = $m.Value
        if ($ALLOW | Where-Object { $line -like "*$_*" }) { $허용된수++; continue }
        if ($hit -match '본인_인증값|내아이디|myid|your[_-]?key|<.+>|\.\.\.') { $허용된수++; continue }

        # 값 자체는 로그에 남기지 않는다. 남기면 로그가 또 하나의 유출 경로가 된다.
        $가린값 = if ($hit.Length -gt 12) { $hit.Substring(0, 8) + '…(' + $hit.Length + '자)' } else { '…(' + $hit.Length + '자)' }

        $검출 += [pscustomobject]@{
          파일 = $rel
          줄   = $i + 1
          종류 = $p.이름
          표시 = $가린값
        }
      }
    }
  }
} finally {
  Pop-Location
}

# ---------------------------------------------------------------- 기록

$stamp = (Get-Date).ToString('yyyy-MM-dd HH:mm')
$한줄 = if ($검출.Count -eq 0) {
  # '허용 처리'는 패턴에 걸렸으나 공용 계정·자리표시자라 넘긴 건수다.
  # OC=test 처럼 애초에 패턴이 비켜 가는 것은 여기 세지 않는다.
  "$stamp · 인증키 점검 · $범위 $($열어본수)개를 열어 확인 · 검출 0건 · 허용 처리 $($허용된수)건(공용 계정·자리표시자) · 건너뜀 $($건너뛴수)개(바이너리·대용량)"
} else {
  $요약 = ($검출 | ForEach-Object { "$($_.파일):$($_.줄) $($_.종류)" }) -join ' / '
  "$stamp · 인증키 점검 · $범위 $($열어본수)개를 열어 확인 · 검출 $($검출.Count)건 — $요약"
}

$logDir = Split-Path -Parent $Log
if (-not (Test-Path $logDir)) { New-Item -ItemType Directory -Path $logDir -Force | Out-Null }
if (Test-Path $Log) { $기존 = [IO.File]::ReadAllText($Log, [Text.Encoding]::UTF8) } else { $기존 = '' }
[IO.File]::WriteAllText($Log, $기존 + $한줄 + "`r`n", (New-Object Text.UTF8Encoding $true))

if (-not ($Quiet -and $검출.Count -eq 0)) {
  Write-Host ''
  if ($검출.Count -eq 0) {
    Write-Host $한줄 -ForegroundColor Green
    Write-Host ''
    Write-Host '커밋 메시지에 붙일 한 줄:' -ForegroundColor Cyan
    Write-Host "  인증키 점검 — $범위 $($열어본수)개 확인, 검출 없음 ($stamp)" -ForegroundColor Gray
  } else {
    Write-Host $한줄 -ForegroundColor Red
    Write-Host ''
    Write-Host '커밋하기 전에 아래를 지우거나 .gitignore 에 넣으세요:' -ForegroundColor Yellow
    $검출 | Format-Table 파일, 줄, 종류, 표시 -AutoSize | Out-String | Write-Host
  }
  Write-Host "기록  $Log" -ForegroundColor DarkGray
  Write-Host ''
}

if ($검출.Count -gt 0) { exit 1 }
