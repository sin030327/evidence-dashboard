/* 화면 문구 번역 — 한국어(기본) ↔ 이탈리아어
 *
 * STATIC  : index.html 에서 data-i18n="키" 가 붙은 요소의 이탈리아어 내용(HTML).
 *           한국어는 index.html 에 적힌 원래 내용을 그대로 쓰므로 여기에 다시 적지 않는다.
 * PH      : data-i18n-ph="키" — 입력칸 placeholder
 * DYN     : 스크립트가 그리는 문구. [한국어, 이탈리아어]. {0} {1} … 은 자리표시자.
 * TERMS   : 표에 저장된 값(항목 · 단위 · 출처)을 '보여줄 때만' 옮기는 용어.
 *           서버의 원본 행은 한국어 그대로 두고, 화면에 그릴 때만 바꾼다.
 */
window.I18N = {
  STATIC: {
    'hd.eyebrow': 'Pianificazione della smart city · Capstone design · Settimana 4 (attività extracurricolare)',
    'hd.title': 'Dashboard delle note di evidenza',
    'hd.lead': 'I valori non stanno sullo schermo ma nella <b>tabella del server</b>. Ogni nota di evidenza inserita nel modulo diventa una riga della tabella Supabase <code>evidence</code>, e l’elenco e le schede qui sotto sono disegnati solo con le <b>righe rilette</b> da quella tabella.',

    'in.title': 'Dove vivono i valori',
    'in.p1': '<b>Un valore visibile sullo schermo non prova che sia stato salvato</b> — le schede della settimana 3 sopravvivevano al ricaricamento solo perché i valori erano scritti direttamente nel codice (hardcoding). Oggi quelle quattro caselle diventano una riga della tabella.',
    'in.p2': '<b>Nel browser va solo la chiave publishable</b> — <code>sb_publishable_…</code> legge e scrive solo le righe consentite dalle policy RLS. <code>sb_secret_…</code> scavalca la RLS, quindi non va mai nel codice del browser né nel repository.',
    'w.h0': 'Dove sta il valore', 'w.h1': 'Ricaricamento', 'w.h2': 'Altro dispositivo', 'w.h3': 'Compagni di squadra',
    'w.var': 'Variabile · stato della pagina', 'w.ls': 'Archivio del browser', 'w.db': 'Tabella del server (Supabase)',
    'w.lost': 'Si perde', 'w.none': 'Assente', 'w.kept': 'Resta', 'w.keptrls': 'Resta · policy di lettura RLS',

    's1.tag': 'Indicatori', 's1.title': 'Schede degli indicatori',
    's1.p': 'Ogni scheda mostra <b>la riga più recente della tabella <code>evidence</code> il cui nome contiene quell’indicatore</b>. Nel codice non c’è nessun valore scritto a mano: se per un indicatore non esiste ancora una riga, la scheda non resta vuota ma indica <b>“In attesa di dati”</b>.',

    's2.tag': 'Inserimento → salvataggio', 's2.title': 'Salvare una nota di evidenza',
    's2.p': 'Il pulsante di salvataggio si attiva solo quando tutte e cinque le caselle sono compilate. La casella del valore accetta <b>solo numeri</b>: se si inserisce <code>300% 이하</code> tutto insieme, viene salvato come testo e non si può più ordinare né calcolare. Il divieto di caselle vuote è solo una regola dello schermo, quindi anche le colonne della tabella hanno <code>NOT NULL</code> e il server rifiuta una seconda volta.',
    'p.title': 'Carica dalle ordinanze nazionali',
    'p.city': 'Ente locale <em>ordinanze urbanistiche di tutto il paese consultate nella settimana 3</em>',
    'p.zone': 'Zona d’uso del suolo', 'p.metric': 'Indicatore',
    'p.far': 'Indice di edificabilità', 'p.bcr': 'Rapporto di copertura',
    'p.fill': 'Compila il modulo →', 'p.bulk': 'Salva per tutto il paese',
    'p.hint': 'Anche dopo aver compilato il modulo, il salvataggio avviene solo premendo il pulsante a destra. Il semplice caricamento non salva nulla.',
    'f.title': 'Aggiungi una riga alla tabella evidence',
    'f.item': 'item <em>text · nome della voce</em>', 'f.value': 'value <em>numeric · solo numeri</em>',
    'f.unit': 'unit <em>text · unità</em>', 'f.source': 'source <em>text · articolo · n. ordinanza · entrata in vigore</em>',
    'f.date': 'queried_on <em>date · data di consultazione</em>',
    'f.save': 'Salva nella tabella', 'f.reset': 'Svuota',

    's3.title': 'Righe restituite dal server',
    's3.p': 'Questo elenco non è ciò che lo schermo ricordava, ma <b>le righe rilette dalla tabella con select</b>. Se lo stesso elenco compare dopo il ricaricamento, su un altro dispositivo e nel browser di un compagno, il salvataggio e la condivisione sono completi. I valori consultati più di 180 giorni fa sono evidenziati in rosso: ecco perché la data di consultazione è di tipo <code>date</code>.',
    'l.reload': 'Rileggi dal server',

    's4.tag': 'Compito ③', 's4.title': 'Resta dopo il ricaricamento? — verifica in tre luoghi',
    's4.p': 'Per sapere se un valore resta bisogna guardarlo in tre luoghi. In ciascuno, apri questa pagina e, se nell’elenco compaiono le stesse righe, premi <b>“Visto — registra”</b>. In quel momento il numero di righe ricevute dal server viene salvato nella tabella <code>evidence_check</code>: anche la registrazione sta sul server e tutta la squadra la vede.',
    'c.title': 'Registro delle verifiche',
    'c.who': 'Chi verifica · dispositivo <em>es.: portatile di 신재훈, telefono di 신재훈, compagno ○○○</em>',
    'c.line': 'Riga di registro da consegnare', 'copy': 'Copia',

    's5.tag': 'Compito ④', 's5.title': 'Chiavi pubblicabili e chiavi segrete',
    's5.p': 'Nel browser si può mettere solo una chiave protetta dalla RLS. Questa pagina riapre i file che ha effettivamente caricato e cerca stringhe di chiavi; se esiste il registro della verifica prima del commit (<code>tools/key-scan.ps1</code>), lo mostra qui.',
    'k.pub': 'publishable · sb_publishable_⋯ — può stare nel browser',
    'k.pub1': 'Legge e scrive solo le righe consentite dalle policy RLS',
    'k.pub2': 'L’unica chiave presente in <code>config.js</code> di questo sito',
    'k.pub3': 'Può essere pubblica, ma con la RLS disattivata chiunque potrebbe modificare tutte le righe',
    'k.sec': 'secret · sb_secret_⋯ — solo nelle variabili d’ambiente del server',
    'k.sec1': 'Non è soggetta alla RLS: accede a tutte le righe',
    'k.sec2': 'Usata dal browser viene rifiutata con 401',
    'k.sec3': 'Vale anche per il vecchio nome <code>service_role</code> (eyJ⋯) · dismissione prevista a fine 2026',
    'k.scan': 'Controllo dei file caricati da questa pagina',

    'ft': 'Supabase (Postgres · Data API · Row Level Security) · Valori delle ordinanze: OPEN API del sistema nazionale di informazione legislativa (Ministero coreano della legislazione), consultazione della settimana 3<br>Fonti: Supabase Docs «Tables» «API keys» «Row Level Security» (consultati il 2026-09-26) · Pianificazione della smart city (Capstone design), settimana 4'
  },

  PH: {
    'pick-city': 'es.: 천안시, 강원 고성군, 서울특별시 (nome coreano)',
    'item': '천안시 · indice di edificabilità (esempio)',
    'unit': '% max',
    'source': 'articolo · n. ordinanza · data di entrata in vigore',
    'list-q': 'Filtra per voce · fonte — es.: 천안, 용적률',
    'who': 'Nome · dispositivo'
  },

  DYN: {
    'lang.btn': ['Italiano', '한국어'],
    'lang.title': ['이탈리아어로 보기', 'Mostra in coreano'],
    'conn.checking': ['연결 확인 중', 'Verifica della connessione'],
    'conn.setup': ['Supabase 설정 필요', 'Configurazione Supabase necessaria'],
    'conn.secret': ['비밀 키 감지 — 연결 거부', 'Chiave segreta rilevata — connessione rifiutata'],
    'conn.nolib': ['supabase-js를 불러오지 못함', 'Impossibile caricare supabase-js'],
    'conn.querying': ['{0} · 조회 중', '{0} · lettura in corso'],
    'conn.fail': ['조회 실패', 'Lettura non riuscita'],
    'conn.rows': ['{0} · {1}행', '{0} · {1} righe'],

    'setup.none': [
      '<b>아직 Supabase에 연결되지 않았습니다.</b> 표에서 받아 올 행이 없으므로 카드와 목록이 비어 있는 것이 정상입니다.<ol><li>Supabase 대시보드 → SQL Editor에서 <code>sql/01_evidence.sql</code>을 실행해 표와 RLS 정책을 만든다</li><li>상단 <b>Connect</b> 창에서 Project URL과 <b>publishable</b> 키를 복사한다</li><li><code>config.js</code>의 <code>url</code>과 <code>publishableKey</code>에 붙여 넣고 새로고침한다</li></ol>',
      '<b>Supabase non è ancora collegato.</b> Non ci sono righe da leggere, quindi è normale che schede ed elenco siano vuoti.<ol><li>Nel pannello Supabase → SQL Editor esegui <code>sql/01_evidence.sql</code> per creare tabelle e policy RLS</li><li>Dalla finestra <b>Connect</b> copia il Project URL e la chiave <b>publishable</b></li><li>Incollali in <code>url</code> e <code>publishableKey</code> di <code>config.js</code> e ricarica</li></ol>'
    ],
    'setup.secret': [
      '<b>config.js에 비밀 키({0})가 들어 있습니다. 연결하지 않았습니다.</b><br>RLS를 건너뛰는 키이므로 지우고 publishable 키(<code>sb_publishable_…</code>)로 바꾸세요. 이미 커밋했다면 파일에서 지워도 기록에 남으므로 Supabase 대시보드 → Settings → API Keys에서 그 키를 폐기하고 새로 발급하세요.',
      '<b>config.js contiene una chiave segreta ({0}). La connessione non è stata aperta.</b><br>Scavalca la RLS: eliminala e usa la chiave publishable (<code>sb_publishable_…</code>). Se è già stata committata, resta nella cronologia anche se la cancelli dal file: revocala e rigenerala in Supabase → Settings → API Keys.'
    ],
    'setup.legacy': [
      '<b>옛 방식 anon 키(eyJ…)입니다.</b> 동작은 하지만 2026년 말 지원 종료 예정이므로 Connect 창의 publishable 키(<code>sb_publishable_…</code>)로 바꾸세요.',
      '<b>È una vecchia chiave anon (eyJ…).</b> Funziona, ma il supporto termina a fine 2026: sostituiscila con la chiave publishable (<code>sb_publishable_…</code>) della finestra Connect.'
    ],

    'err.rls': ['RLS 정책이 막았습니다 — SQL Editor에서 sql/01_evidence.sql의 정책(팀 읽기 · 팀 추가)을 실행했는지 확인하세요.', 'Bloccato dalla policy RLS — verifica di aver eseguito nel SQL Editor le policy di sql/01_evidence.sql (lettura e inserimento per la squadra).'],
    'err.type': ['자료형이 맞지 않습니다 — value는 숫자만, queried_on은 날짜(YYYY-MM-DD)만 받습니다.', 'Tipo di dato errato — value accetta solo numeri, queried_on solo date (AAAA-MM-GG).'],
    'err.null': ['빈 칸이 있어 서버가 거부했습니다 — 다섯 칸을 모두 채우세요 (표의 NOT NULL · CHECK 제약).', 'Il server ha rifiutato perché c’è una casella vuota — compila tutte e cinque le caselle (vincoli NOT NULL · CHECK).'],
    'err.table': ['표를 찾지 못했습니다 — 표 이름이 코드의 from(\'{0}\')와 같은지, SQL을 실행했는지 확인하세요.', 'Tabella non trovata — controlla che il nome coincida con from(\'{0}\') nel codice e che lo SQL sia stato eseguito.'],
    'err.key': ['키가 거부되었습니다 — config.js의 publishable 키와 Project URL을 다시 복사해 넣으세요.', 'Chiave rifiutata — ricopia in config.js la chiave publishable e il Project URL.'],
    'err.net': ['서버에 닿지 못했습니다 — 인터넷 연결이나 Project URL을 확인하세요.', 'Server non raggiungibile — controlla la connessione o il Project URL.'],

    'card.기온': ['기온', 'Temperatura'],
    'card.인구밀도': ['인구밀도', 'Densità di popolazione'],
    'card.조례 용적률': ['조례 용적률', 'Indice di edificabilità (ordinanza)'],
    'card.용도지역 구성비': ['용도지역 구성비', 'Composizione delle zone d’uso'],
    'card.고시 이력': ['고시 이력', 'Storico degli avvisi pubblici'],
    'card.wait': ['조회 대기', 'In attesa di dati'],
    'card.waitHint': ['항목 이름에 「{0}」 낱말이 든 행을 저장하면 채워집니다.', 'Si compila quando salvi una riga il cui nome contiene «{0}».'],
    'card.meta': ['조회 {0} · 행 #{1}', 'consultato il {0} · riga #{1}'],
    'card.latest': [' · 같은 지표 {0}행 중 최신', ' · la più recente di {0} righe'],

    'list.none': ['Supabase에 연결되면 표의 행이 여기에 나타납니다.', 'Quando Supabase è collegato, qui compaiono le righe della tabella.'],
    'list.nc': ['미연결', 'non collegato'],
    'list.server': ['서버 {0}행', 'server: {0} righe'],
    'list.count': ['{0} / {1}행', '{0} / {1} righe'],
    'list.nomatch': ['거른 결과가 없습니다.', 'Nessun risultato per questo filtro.'],
    'list.empty': ['표에 아직 행이 없습니다 — SECTION 2에서 근거노트를 저장하세요.', 'La tabella non ha ancora righe — salva una nota di evidenza nella SECTION 2.'],
    'list.today': ['오늘', 'oggi'],
    'list.ago': ['{0}일 전', '{0} giorni fa'],
    'list.cap': ['마지막으로 서버에서 받은 시각 {0} · select * from evidence order by id desc', 'Ultima lettura dal server alle {0} · select * from evidence order by id desc'],
    'list.loading': ['불러오는 중', 'Caricamento'],
    'list.err': ['오류', 'errore'],

    'form.noconn': ['Supabase 연결 후 저장할 수 있습니다', 'Si potrà salvare dopo aver collegato Supabase'],
    'form.num': ['value에는 숫자만 — 단위는 unit 칸으로', 'In value solo numeri — l’unità va in unit'],
    'form.blank': ['빈 칸 {0}개', '{0} caselle vuote'],
    'form.saving': ['저장 중 — insert 요청을 보냈습니다', 'Salvataggio — richiesta insert inviata'],
    'form.saved': ['<b>표에 저장되었습니다 — 행 #{0}</b> · 서버 시각 {1}<br>아래 목록은 이 응답이 아니라 표를 다시 조회한 결과입니다. 새로고침해도 그대로 있는지 확인하세요.', '<b>Salvato nella tabella — riga #{0}</b> · ora del server {1}<br>L’elenco qui sotto non è questa risposta, ma una nuova lettura della tabella. Ricarica la pagina per verificare che resti.'],

    'pick.badge': ['{0}곳 · 조회 {1}', '{0} enti · consultati il {1}'],
    'pick.nodata': ['데이터 없음', 'nessun dato'],
    'pick.nodataMsg': ['data/ordin-values.js를 찾지 못했습니다. 폼에 직접 입력해도 저장은 됩니다.', 'data/ordin-values.js non trovato. Puoi comunque compilare il modulo a mano.'],
    'pick.prompt': ['지자체를 고르면 조례 값이 여기에 보입니다.', 'Scegli un ente locale per vedere qui il valore dell’ordinanza.'],
    'pick.missing': ['{0} {1} — <span style="color:var(--clay)">조례 미규정 또는 별표 참조</span>. 이 조례에는 조문으로 적힌 값이 없어 불러올 수 없습니다.', '{1} — {0}: <span style="color:var(--clay)">non previsto dall’ordinanza o rinviato a un allegato</span>. Il testo degli articoli non contiene un valore da caricare.'],
    'pick.checked': ['조회 {0}', 'consultato il {0}'],
    'pick.proviso': ['단서 — {0}', 'Clausola — {0}'],
    'bulk.none': ['새로 넣을 행이 없습니다 — 이미 표에 있거나 값이 있는 조례가 없습니다.', 'Nessuna nuova riga da inserire — sono già nella tabella o nessuna ordinanza ha un valore.'],
    'bulk.confirm': ['전국 {0}곳의 {1} {2}을 evidence 표에 {0}행으로 저장합니다.\n브라우저에서는 지울 수 없으니(삭제 정책 없음) 확인 후 진행하세요.', 'Verranno salvate {0} righe nella tabella evidence: {2} — {1} per {0} enti locali.\nDal browser non si possono cancellare (nessuna policy di eliminazione): conferma solo se sei sicuro.'],
    'bulk.saving': ['{0}행 저장 중…', 'Salvataggio di {0} righe…'],
    'bulk.saved': ['<b>{0}행을 저장했습니다.</b> 목록은 표를 다시 조회해 그렸습니다.', '<b>{0} righe salvate.</b> L’elenco è stato ridisegnato rileggendo la tabella.'],

    'place.새로고침': ['새로고침', 'Ricaricamento'],
    'place.다른 기기': ['다른 기기', 'Altro dispositivo'],
    'place.팀원 브라우저': ['팀원 브라우저', 'Browser di un compagno'],
    'how.새로고침': ['저장한 뒤 이 브라우저에서 F5. 목록에 같은 행이 다시 보이면 기록.', 'Dopo il salvataggio premi F5 in questo browser. Se ricompaiono le stesse righe, registra.'],
    'how.다른 기기': ['휴대폰 등 다른 기기에서 배포 주소를 열어 같은 행이 보이면 기록.', 'Apri l’indirizzo pubblicato da un altro dispositivo (es. telefono). Se vedi le stesse righe, registra.'],
    'how.팀원 브라우저': ['팀원이 자기 노트북으로 배포 주소를 열어 같은 행이 보이면 팀원이 기록.', 'Un compagno apre l’indirizzo pubblicato dal proprio portatile; se vede le stesse righe, registra lui.'],
    'chk.reloaded': ['지금 이 페이지는 새로고침으로 열렸습니다.', 'Questa pagina è stata appena aperta tramite ricaricamento.'],
    'chk.ok': ['확인됨', 'Verificato'],
    'chk.no': ['미확인', 'Da verificare'],
    'chk.rec': ['{0} · 그때 서버 {1}행', '{0} · in quel momento il server aveva {1} righe'],
    'chk.none': ['아직 기록 없음', 'Nessuna registrazione'],
    'chk.btn': ['보임 — 기록', 'Visto — registra'],
    'chk.line': ['{0} · evidence 표 {1}행 저장 확인 — {2}', '{0} · verifica del salvataggio di {1} righe nella tabella evidence — {2}'],
    'chk.part': ['{0} ✓ ({1}, {2}, {3}행)', '{0} ✓ ({1}, {2}, {3} righe)'],

    'scan.keykind': ['브라우저가 쓰는 키 종류', 'Tipo di chiave usata dal browser'],
    'scan.nokey': ['아직 없음', 'ancora nessuna'],
    'scan.cant': ['열 수 없음 (file://)', 'non leggibile (file://)'],
    'scan.clean': ['비밀 키 없음', 'nessuna chiave segreta'],
    'scan.hit': ['검출 {0}건 — {1}', '{0} rilevamenti — {1}'],
    'scan.badge': ['검출 {0}건', '{0} rilevamenti'],
    'scan.line': ['{0} · 키 점검 — 배포된 config.js · index.html {1}개를 열어 sb_secret_ · service_role 검색, 검출 {2}건 · 브라우저 키는 {3}', '{0} · controllo chiavi — aperti {1} file pubblicati (config.js · index.html), cercati sb_secret_ · service_role: {2} rilevamenti · chiave del browser: {3}'],
    'scan.log': ['커밋 전 점검 기록 <code>data/key-scan.log</code> — 최근 {0}줄', 'Registro del controllo prima del commit <code>data/key-scan.log</code> — righe più recenti: {0}'],
    'scan.secret': ['sb_secret_ 문자열', 'stringa sb_secret_'],
    'scan.srole': ['service_role 키 (eyJ…)', 'chiave service_role (eyJ…)'],

    'copied': ['복사됨', 'Copiato'],
    'copyPrompt': ['복사하세요', 'Copia il testo']
  },

  /* 표의 값을 보여줄 때만 옮기는 용어 — 긴 것부터 바꿔야 '제3종일반주거지역' 이 '주거지역' 으로 먼저 잘리지 않는다 */
  TERMS: {
    zones: {
      '제1종전용주거지역': 'Zona residenziale esclusiva di 1ª classe',
      '제2종전용주거지역': 'Zona residenziale esclusiva di 2ª classe',
      '제1종일반주거지역': 'Zona residenziale generale di 1ª classe',
      '제2종일반주거지역': 'Zona residenziale generale di 2ª classe',
      '제3종일반주거지역': 'Zona residenziale generale di 3ª classe',
      '준주거지역': 'Zona semi-residenziale',
      '중심상업지역': 'Zona commerciale centrale',
      '일반상업지역': 'Zona commerciale generale',
      '근린상업지역': 'Zona commerciale di vicinato',
      '유통상업지역': 'Zona commerciale di distribuzione',
      '전용공업지역': 'Zona industriale esclusiva',
      '일반공업지역': 'Zona industriale generale',
      '준공업지역': 'Zona semi-industriale',
      '보전녹지지역': 'Zona verde di conservazione',
      '생산녹지지역': 'Zona verde produttiva',
      '자연녹지지역': 'Zona verde naturale',
      '보전관리지역': 'Zona di gestione conservativa',
      '생산관리지역': 'Zona di gestione produttiva',
      '계획관리지역': 'Zona di gestione pianificata',
      '농림지역': 'Zona agricola e forestale',
      '자연환경보전지역': 'Zona di tutela dell’ambiente naturale'
    },
    metrics: {
      '용적률': 'Indice di edificabilità',
      '건폐율': 'Rapporto di copertura'
    }
  }
};
