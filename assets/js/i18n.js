/*
 * Translations for the Ruben Pap Ceramics website: en · hy · ru · de.
 *
 * Every key holds all four languages side by side.
 * - The English text of the page itself lives in index.html; the `en` entries of
 *   page keys are a reference copy for translators (keep them in sync when editing).
 * - Keys used by the scripts (ui.*, fab.*, ch.*, lb.*, msg.*) need all four languages.
 * - {name} and {n} are placeholders filled in by the site.
 * - Plain text only, except keys marked "html" (they may contain <br> and <em>).
 * - A missing translation falls back to English.
 */
window.I18N = {
  langs: { en: 'English', hy: 'Հայերեն', ru: 'Русский', de: 'Deutsch' },
  t: {
    /* ---------- page meta ---------- */
    'meta.title': {
      en: 'Ruben Pap Ceramics — Ceramic Studio in Yerevan, Armenia',
      hy: 'Ruben Pap Ceramics — կերամիկայի արվեստանոց Երևանում',
      ru: 'Ruben Pap Ceramics — керамическая студия в Ереване',
      de: 'Ruben Pap Ceramics — Keramikatelier in Jerewan, Armenien'
    },
    'meta.description': {
      en: 'Ruben Pap — ceramic studio in Yerevan, Armenia. Wheel-thrown and hand-altered vessels, studio visits by appointment.',
      hy: 'Ռուբեն Պապ — կերամիկայի արվեստանոց Երևանում։ Բրուտի անիվի վրա պատրաստված և ձեռքով ձևափոխված անոթներ։ Այցելություն արվեստանոց՝ նախնական պայմանավորվածությամբ։',
      ru: 'Рубен Пап — керамическая студия в Ереване, Армения. Сосуды, созданные на гончарном круге и изменённые вручную. Посещение студии по записи.',
      de: 'Ruben Pap — Keramikatelier in Jerewan, Armenien. Auf der Töpferscheibe gedrehte und von Hand veränderte Gefäße. Atelierbesuche nach Vereinbarung.'
    },

    /* ---------- interface ---------- */
    'ui.skip': { en: 'Skip to content', hy: 'Անցնել բովանդակությանը', ru: 'Перейти к содержанию', de: 'Zum Inhalt springen' },
    'ui.nav': { en: 'Main', hy: 'Հիմնական ընտրացանկ', ru: 'Основная навигация', de: 'Hauptnavigation' },
    'ui.menu': { en: 'Menu', hy: 'Մենյու', ru: 'Меню', de: 'Menü' },
    'ui.close': { en: 'Close', hy: 'Փակել', ru: 'Закрыть', de: 'Schließen' },
    'ui.language': { en: 'Language', hy: 'Լեզու', ru: 'Язык', de: 'Sprache' },
    'ui.themeDark': { en: 'Switch to dark theme', hy: 'Միացնել մուգ ռեժիմը', ru: 'Включить тёмную тему', de: 'Dunkles Design einschalten' },
    'ui.themeLight': { en: 'Switch to light theme', hy: 'Միացնել բաց ռեժիմը', ru: 'Включить светлую тему', de: 'Helles Design einschalten' },
    'logo.sub': { en: 'Ceramics · Yerevan', hy: 'Կերամիկա · Երևան', ru: 'Керамика · Ереван', de: 'Keramik · Jerewan' },

    'nav.works': { en: 'Works', hy: 'Աշխատանքներ', ru: 'Работы', de: 'Arbeiten' },
    'nav.about': { en: 'About', hy: 'Վարպետը', ru: 'О мастере', de: 'Über Ruben' },
    'nav.process': { en: 'Process', hy: 'Գործընթաց', ru: 'Процесс', de: 'Prozess' },
    'nav.studio': { en: 'Studio', hy: 'Արվեստանոց', ru: 'Студия', de: 'Atelier' },
    'nav.visit': { en: 'Visit', hy: 'Այց', ru: 'Визит', de: 'Besuch' },
    'nav.contact': { en: 'Contact', hy: 'Կապ', ru: 'Контакты', de: 'Kontakt' },

    /* ---------- hero ---------- */
    'hero.label': { en: 'Ceramic studio · Est. 2012', hy: 'Կերամիկայի արվեստանոց · 2012-ից', ru: 'Керамическая студия · с 2012 года', de: 'Keramikatelier · seit 2012' },
    'hero.title': { /* html */
      en: 'Clay, fire<br>&amp; the <em>unknown</em>',
      hy: 'Կավ, կրակ<br>և <em>անհայտը</em>',
      ru: 'Глина, огонь<br>и <em>неизвестность</em>',
      de: 'Ton, Feuer<br>&amp; das <em>Unbekannte</em>'
    },
    'hero.text': {
      en: 'Wheel-thrown and hand-altered vessels made in Yerevan, Armenia — where every firing is a small surprise.',
      hy: 'Բրուտի անիվի վրա պատրաստված և ձեռքով ձևափոխված անոթներ Երևանից, որտեղ յուրաքանչյուր թրծում փոքրիկ անակնկալ է։',
      ru: 'Сосуды, созданные на гончарном круге и изменённые вручную в Ереване, — где каждый обжиг приносит маленький сюрприз.',
      de: 'Auf der Scheibe gedrehte und von Hand veränderte Gefäße aus Jerewan, Armenien — wo jeder Brand eine kleine Überraschung ist.'
    },
    'hero.cta': { en: 'Book a studio visit', hy: 'Ամրագրել այց', ru: 'Записаться на визит', de: 'Atelierbesuch buchen' },
    'hero.works': { en: 'Selected works', hy: 'Ընտրված աշխատանքներ', ru: 'Избранные работы', de: 'Ausgewählte Arbeiten' },
    'hero.alt': {
      en: 'Pierced stoneware bowl against a studio window',
      hy: 'Ծակոտկեն կավե թաս արվեստանոցի պատուհանի ֆոնին',
      ru: 'Ажурная чаша из каменной массы на фоне окна студии',
      de: 'Durchbrochene Steinzeugschale vor einem Atelierfenster'
    },

    /* ---------- philosophy ---------- */
    'statement.label': { en: 'Philosophy', hy: 'Փիլիսոփայություն', ru: 'Философия', de: 'Philosophie' },
    'statement.text': { /* html */
      en: 'Freedom and uncertainty guide the work. A form begins on the wheel, then is cut, folded and pierced until it finds its own voice — ceramics as <em>a miracle that repeats</em>, again and again.',
      hy: 'Աշխատանքն առաջնորդում են ազատությունն ու անորոշությունը։ Ձևը սկիզբ է առնում անիվի վրա, ապա կտրվում, ծալվում ու ծակվում է, մինչև գտնում է իր սեփական ձայնը․ կերամիկան՝ որպես <em>կրկնվող հրաշք</em>, նորից ու նորից։',
      ru: 'Работой движут свобода и неопределённость. Форма рождается на гончарном круге, а затем её режут, сгибают и прорезают, пока она не обретёт собственный голос, — керамика как <em>чудо, которое повторяется</em> снова и снова.',
      de: 'Freiheit und Ungewissheit leiten die Arbeit. Eine Form beginnt auf der Scheibe und wird dann geschnitten, gefaltet und durchbrochen, bis sie ihre eigene Stimme findet — Keramik als <em>ein Wunder, das sich wiederholt</em>, immer wieder.'
    },

    /* ---------- works ---------- */
    'works.title': { en: 'Selected works', hy: 'Ընտրված աշխատանքներ', ru: 'Избранные работы', de: 'Ausgewählte Arbeiten' },
    'works.text': {
      en: 'Stoneware vessels with layered metallic glazes over natural clay tones. Each piece is one of a kind — open any of them to ask about it.',
      hy: 'Կավե անոթներ՝ բնական կավի երանգների վրա շերտերով դրված մետաղափայլ ջնարակներով։ Յուրաքանչյուր աշխատանք եզակի է․ բացեք ցանկացածը՝ դրա մասին հարցնելու համար։',
      ru: 'Сосуды из каменной массы с многослойной металлизированной глазурью поверх природных оттенков глины. Каждое изделие уникально — откройте любое, чтобы спросить о нём.',
      de: 'Steinzeuggefäße mit geschichteten metallischen Glasuren über natürlichen Tontönen. Jedes Stück ist ein Unikat — öffnen Sie eines, um danach zu fragen.'
    },
    'work.1': { en: 'Ruffled vase', hy: 'Ալիքաձև ծաղկաման', ru: 'Волнистая ваза', de: 'Gewellte Vase' },
    'work.2': { en: 'Pierced bowl', hy: 'Ծակոտկեն թաս', ru: 'Ажурная чаша', de: 'Durchbrochene Schale' },
    'work.3': { en: 'Tulip pot', hy: 'Վարդակակաչաձև անոթ', ru: 'Сосуд-тюльпан', de: 'Tulpengefäß' },
    'work.4': { en: 'Folded vase', hy: 'Ծալքավոր ծաղկաման', ru: 'Складчатая ваза', de: 'Gefaltete Vase' },
    'work.5': { en: 'Wide bowl', hy: 'Լայն թաս', ru: 'Широкая чаша', de: 'Weite Schale' },
    'work.6': { en: 'Bronze vessel', hy: 'Բրոնզե անոթ', ru: 'Бронзовый сосуд', de: 'Bronzegefäß' },
    'work.7': { en: 'Tulip pot, above', hy: 'Վարդակակաչաձև անոթ, վերևից', ru: 'Сосуд-тюльпан, сверху', de: 'Tulpengefäß, von oben' },
    'work.8': { en: 'Pierced bowl, above', hy: 'Ծակոտկեն թաս, վերևից', ru: 'Ажурная чаша, сверху', de: 'Durchbrochene Schale, von oben' },
    'work.1.alt': { en: 'Tall ruffled vase', hy: 'Բարձր ալիքաձև ծաղկաման', ru: 'Высокая волнистая ваза', de: 'Hohe gewellte Vase' },
    'work.2.alt': { en: 'Pierced bowl', hy: 'Ծակոտկեն թաս', ru: 'Ажурная чаша', de: 'Durchbrochene Schale' },
    'work.3.alt': { en: 'Tulip pot', hy: 'Վարդակակաչաձև անոթ', ru: 'Сосуд-тюльпан', de: 'Tulpengefäß' },
    'work.4.alt': { en: 'Folded vase', hy: 'Ծալքավոր ծաղկաման', ru: 'Складчатая ваза', de: 'Gefaltete Vase' },
    'work.5.alt': { en: 'Wide ruffled bowl', hy: 'Լայն ալիքաձև թաս', ru: 'Широкая волнистая чаша', de: 'Weite gewellte Schale' },
    'work.6.alt': { en: 'Bronze vessel', hy: 'Բրոնզե անոթ', ru: 'Бронзовый сосуд', de: 'Bronzegefäß' },
    'work.7.alt': { en: 'Pot seen from above', hy: 'Անոթը՝ վերևից', ru: 'Сосуд, вид сверху', de: 'Gefäß, von oben gesehen' },
    'work.8.alt': { en: 'Pierced bowl from above', hy: 'Ծակոտկեն թասը՝ վերևից', ru: 'Ажурная чаша, вид сверху', de: 'Durchbrochene Schale von oben' },
    'detail.1.alt': { en: 'Glaze detail', hy: 'Ջնարակի մանրամասն', ru: 'Деталь глазури', de: 'Glasurdetail' },
    'detail.2.alt': { en: 'Fold detail', hy: 'Ծալքի մանրամասն', ru: 'Деталь складки', de: 'Faltendetail' },
    'detail.3.alt': { en: 'Rim detail', hy: 'Եզրի մանրամասն', ru: 'Деталь края', de: 'Randdetail' },

    /* ---------- about ---------- */
    'about.label': { en: 'About the artist', hy: 'Արվեստագետի մասին', ru: 'О мастере', de: 'Über den Künstler' },
    'about.name': { en: 'Ruben Pap', hy: 'Ռուբեն Պապ', ru: 'Рубен Пап', de: 'Ruben Pap' },
    'about.p1': {
      en: 'Ruben began learning ceramics at 22, working in a Yerevan studio and spending a decade experimenting with form, clay and glaze.',
      hy: 'Ռուբենը կերամիկայով սկսել է զբաղվել 22 տարեկանում․ աշխատել է երևանյան արվեստանոցներից մեկում և մեկ տասնամյակ փորձարկումներ արել ձևի, կավի ու ջնարակի հետ։',
      ru: 'Рубен начал заниматься керамикой в 22 года: работал в одной из ереванских студий и целое десятилетие экспериментировал с формой, глиной и глазурью.',
      de: 'Ruben begann mit 22 Jahren, Keramik zu lernen. Er arbeitete in einem Atelier in Jerewan und experimentierte ein Jahrzehnt lang mit Form, Ton und Glasur.'
    },
    'about.p2': {
      en: 'In 2012 he opened his own studio. His practice moves freely between art, design and functional ware — combining traditional wheel-throwing with cutting and altering that gives each piece a linear, living structure.',
      hy: '2012 թվականին նա բացել է սեփական արվեստանոցը։ Նրա ստեղծագործությունն ազատորեն շարժվում է արվեստի, դիզայնի և կենցաղային իրերի միջև՝ համատեղելով բրուտի անիվի ավանդական աշխատանքը կտրելու և ձևափոխելու հնարքների հետ, որոնք յուրաքանչյուր իրի տալիս են գծային, կենդանի կառուցվածք։',
      ru: 'В 2012 году он открыл собственную студию. Его практика свободно перемещается между искусством, дизайном и функциональной посудой, соединяя традиционную работу на гончарном круге с надрезами и деформацией, которые придают каждому предмету линейную, живую структуру.',
      de: '2012 eröffnete er sein eigenes Atelier. Seine Arbeit bewegt sich frei zwischen Kunst, Design und Gebrauchskeramik — sie verbindet das traditionelle Drehen auf der Scheibe mit Schneiden und Verformen, das jedem Stück eine lineare, lebendige Struktur verleiht.'
    },
    'about.p3': {
      en: 'Layered glazes over warm brown clay are his signature, from deep turquoise to the bronze surfaces of his newest work.',
      hy: 'Տաք շագանակագույն կավի վրա շերտերով դրված ջնարակները նրա ձեռագիրն են՝ խոր փիրուզագույնից մինչև նորագույն աշխատանքների բրոնզե մակերեսները։',
      ru: 'Многослойные глазури поверх тёплой коричневой глины — его фирменный почерк: от глубокой бирюзы до бронзовых поверхностей новых работ.',
      de: 'Geschichtete Glasuren auf warmem braunem Ton sind sein Markenzeichen — vom tiefen Türkis bis zu den bronzenen Oberflächen seiner neuesten Arbeiten.'
    },
    'about.quote': {
      en: '“When I am making a piece, I never know what is going to happen.”',
      hy: '«Երբ աշխատում եմ որևէ իրի վրա, երբեք չգիտեմ, թե ինչ է լինելու»։',
      ru: '«Когда я работаю над вещью, я никогда не знаю, что из этого выйдет».',
      de: '„Wenn ich an einem Stück arbeite, weiß ich nie, was passieren wird.“'
    },
    'about.cite': { en: '— Ruben Pap', hy: '— Ռուբեն Պապ', ru: '— Рубен Пап', de: '— Ruben Pap' },
    'about.f1': { en: 'Age he started', hy: 'Տարեկանում սկսեց', ru: 'Года — начало пути', de: 'Jahre alt beim Einstieg' },
    'about.f2': { en: 'Studio founded', hy: 'Արվեստանոցի հիմնադրում', ru: 'Основана студия', de: 'Atelier gegründet' },
    'about.f3': { en: 'Languages', hy: 'Լեզու', ru: 'Языка', de: 'Sprachen' },
    'about.alt': {
      en: 'Ruben Pap at work in his studio',
      hy: 'Ռուբեն Պապն իր արվեստանոցում՝ աշխատանքի պահին',
      ru: 'Рубен Пап за работой в своей студии',
      de: 'Ruben Pap bei der Arbeit in seinem Atelier'
    },

    /* ---------- process ---------- */
    'process.title': { en: 'Process', hy: 'Գործընթաց', ru: 'Процесс', de: 'Prozess' },
    'process.text': {
      en: 'From raw clay to the final firing, every step happens by hand in the studio.',
      hy: 'Հում կավից մինչև վերջին թրծումը՝ յուրաքանչյուր փուլ կատարվում է ձեռքով, արվեստանոցում։',
      ru: 'От сырой глины до финального обжига — каждый этап выполняется вручную в студии.',
      de: 'Vom rohen Ton bis zum letzten Brand geschieht jeder Schritt von Hand im Atelier.'
    },
    'step.1.title': { en: 'Throwing', hy: 'Անիվի վրա', ru: 'Работа на круге', de: 'Drehen' },
    'step.1.text': {
      en: 'Forms start on the wheel, centred and pulled from a single piece of clay.',
      hy: 'Ձևերը ծնվում են անիվի վրա՝ կենտրոնացված և վեր ձգված կավի մեկ ամբողջական կտորից։',
      ru: 'Форма рождается на гончарном круге: её центруют и вытягивают из цельного куска глины.',
      de: 'Die Formen entstehen auf der Scheibe — zentriert und aus einem einzigen Stück Ton hochgezogen.'
    },
    'step.1.alt': { en: 'Potter\'s wheel', hy: 'Բրուտի անիվ', ru: 'Гончарный круг', de: 'Töpferscheibe' },
    'step.2.title': { en: 'Altering', hy: 'Ձևափոխում', ru: 'Деформация', de: 'Verformen' },
    'step.2.text': {
      en: 'Rims are folded, cut and pierced while the clay is still soft.',
      hy: 'Եզրերը ծալվում, կտրվում և ծակվում են, քանի դեռ կավը փափուկ է։',
      ru: 'Края сгибают, надрезают и прорезают, пока глина ещё мягкая.',
      de: 'Die Ränder werden gefaltet, geschnitten und durchbrochen, solange der Ton noch weich ist.'
    },
    'step.2.alt': { en: 'Hands shaping a bowl rim', hy: 'Ձեռքերը ձևավորում են թասի եզրը', ru: 'Руки формируют край чаши', de: 'Hände formen den Rand einer Schale' },
    'step.3.title': { en: 'Glazing', hy: 'Ջնարակում', ru: 'Глазурование', de: 'Glasieren' },
    'step.3.text': {
      en: 'Glazes are mixed in the studio and layered over natural clay.',
      hy: 'Ջնարակները պատրաստվում են արվեստանոցում և շերտերով դրվում բնական կավի վրա։',
      ru: 'Глазури готовят в студии и наносят слоями поверх натуральной глины.',
      de: 'Die Glasuren werden im Atelier angemischt und in Schichten auf den natürlichen Ton aufgetragen.'
    },
    'step.3.alt': { en: 'Glaze bottles in the studio', hy: 'Ջնարակի շշեր արվեստանոցում', ru: 'Бутылки с глазурью в студии', de: 'Glasurflaschen im Atelier' },
    'step.4.title': { en: 'Finishing', hy: 'Վերջնամշակում', ru: 'Доводка', de: 'Vollenden' },
    'step.4.text': {
      en: 'Each piece is cleaned, checked and finished by hand — never exactly the same twice.',
      hy: 'Յուրաքանչյուր իր մաքրվում, ստուգվում և ավարտվում է ձեռքով․ երկու միանման իր չի լինում։',
      ru: 'Каждое изделие очищают, проверяют и дорабатывают вручную — двух одинаковых не бывает.',
      de: 'Jedes Stück wird von Hand gereinigt, geprüft und vollendet — keines gleicht exakt dem anderen.'
    },
    'step.4.alt': { en: 'Ruben finishing a folded vase', hy: 'Ռուբենն ավարտում է ծալքավոր ծաղկամանը', ru: 'Рубен дорабатывает складчатую вазу', de: 'Ruben vollendet eine gefaltete Vase' },

    /* ---------- studio ---------- */
    'studio.title': { en: 'The studio', hy: 'Արվեստանոցը', ru: 'Студия', de: 'Das Atelier' },
    'studio.text': {
      en: 'Komitas Street, Yerevan. Shelves of finished work, a wall of glaze, and a long table where pieces are shaped and shown.',
      hy: 'Կոմիտասի պողոտա, Երևան։ Պատրաստի աշխատանքներով դարակներ, ջնարակների պատ և երկար սեղան, որի վրա իրերը ձևավորվում ու ցուցադրվում են։',
      ru: 'Проспект Комитаса, Ереван. Полки с готовыми работами, стена глазурей и длинный стол, где изделия создаются и выставляются.',
      de: 'Komitas-Straße, Jerewan. Regale voller fertiger Arbeiten, eine Wand aus Glasuren und ein langer Tisch, an dem Stücke geformt und gezeigt werden.'
    },
    'studio.1.alt': { en: 'Ruben Pap portrait', hy: 'Ռուբեն Պապի դիմանկարը', ru: 'Портрет Рубена Папа', de: 'Porträt von Ruben Pap' },
    'studio.2.alt': { en: 'Turquoise glazed pieces on the table', hy: 'Փիրուզագույն ջնարակով իրեր սեղանին', ru: 'Изделия с бирюзовой глазурью на столе', de: 'Türkis glasierte Stücke auf dem Tisch' },
    'studio.3.alt': { en: 'Ruben shaping a vase', hy: 'Ռուբենը ձևավորում է ծաղկաման', ru: 'Рубен формирует вазу', de: 'Ruben formt eine Vase' },
    'studio.4.alt': { en: 'Respirator on a shelf', hy: 'Շնչադիմակ դարակին', ru: 'Респиратор на полке', de: 'Atemschutzmaske auf einem Regal' },
    'studio.5.alt': { en: 'Ruben smiling in the studio', hy: 'Ժպտացող Ռուբենն արվեստանոցում', ru: 'Улыбающийся Рубен в студии', de: 'Ruben lächelnd im Atelier' },
    'studio.6.alt': { en: 'Turquoise glazed lidded jar', hy: 'Փիրուզագույն ջնարակով կափարիչով անոթ', ru: 'Сосуд с крышкой под бирюзовой глазурью', de: 'Türkis glasiertes Deckelgefäß' },

    /* ---------- visit ---------- */
    'visit.label': { en: 'Studio visit', hy: 'Այց արվեստանոց', ru: 'Визит в студию', de: 'Atelierbesuch' },
    'visit.title': { /* html */
      en: 'See how the<br><em>miracle</em> happens',
      hy: 'Տեսեք, թե ինչպես է<br>ծնվում <em>հրաշքը</em>',
      ru: 'Посмотрите, как<br>рождается <em>чудо</em>',
      de: 'Erleben Sie, wie das<br><em>Wunder</em> entsteht'
    },
    'visit.text': {
      en: 'Join Ruben and his team for a tour of finished works and live demonstrations of wheel work, hand building, glazing and decorating.',
      hy: 'Միացեք Ռուբենին և նրա թիմին․ շրջայց պատրաստի աշխատանքների շուրջ և կենդանի ցուցադրություններ՝ աշխատանք անիվի վրա, ձեռքով ձևավորում, ջնարակում և զարդարում։',
      ru: 'Присоединяйтесь к Рубену и его команде: экскурсия по готовым работам и живые демонстрации работы на круге, ручной лепки, глазурования и декорирования.',
      de: 'Besuchen Sie Ruben und sein Team: eine Führung durch fertige Arbeiten und Live-Vorführungen von Drehen, Handaufbau, Glasieren und Dekorieren.'
    },
    'visit.book': { en: 'Book via', hy: 'Ամրագրել այցը', ru: 'Записаться через', de: 'Buchen über' },
    'visit.price': { en: 'Price', hy: 'Արժեք', ru: 'Стоимость', de: 'Preis' },
    'visit.priceV': { en: 'Free', hy: 'Անվճար', ru: 'Бесплатно', de: 'Kostenlos' },
    'visit.group': { en: 'Group size', hy: 'Խումբ', ru: 'Группа', de: 'Gruppengröße' },
    'visit.groupV': { en: '1 – 10 people', hy: '1–10 հոգի', ru: '1–10 человек', de: '1–10 Personen' },
    'visit.avail': { en: 'Availability', hy: 'Ժամանակ', ru: 'Время', de: 'Termine' },
    'visit.availV': { en: 'By appointment', hy: 'Նախնական պայմանավորվածությամբ', ru: 'По записи', de: 'Nach Vereinbarung' },
    'visit.langs': { en: 'Languages', hy: 'Լեզուներ', ru: 'Языки', de: 'Sprachen' },
    'visit.langsV': { en: 'Armenian · English · Russian', hy: 'Հայերեն · անգլերեն · ռուսերեն', ru: 'Армянский · английский · русский', de: 'Armenisch · Englisch · Russisch' },
    'visit.loc': { en: 'Location', hy: 'Հասցե', ru: 'Адрес', de: 'Adresse' },
    'visit.locV': { en: 'Komitas St. 49/3, 14, Yerevan', hy: 'Կոմիտասի պող. 49/3, 14, Երևան', ru: 'пр. Комитаса, 49/3, 14, Ереван', de: 'Komitas St. 49/3, 14, Jerewan' },
    'visit.map': { en: 'Map', hy: 'Քարտեզ', ru: 'Карта', de: 'Karte' },

    /* ---------- contact / footer ---------- */
    'contact.label': { en: 'Contact', hy: 'Կապ', ru: 'Контакты', de: 'Kontakt' },
    'contact.big': { en: 'Say hello.', hy: 'Գրեք մեզ։', ru: 'Напишите нам.', de: 'Sagen Sie Hallo.' },
    'contact.email': { en: 'Email', hy: 'Էլ. փոստ', ru: 'Эл. почта', de: 'E-Mail' },
    'contact.phone': { en: 'Phone', hy: 'Հեռախոս', ru: 'Телефон', de: 'Telefon' },
    'contact.studio': { en: 'Studio', hy: 'Արվեստանոց', ru: 'Студия', de: 'Atelier' },
    'contact.follow': { en: 'Follow', hy: 'Հետևեք', ru: 'Соцсети', de: 'Folgen' },
    'contact.addr': { /* html */
      en: 'Komitas St. 49/3, 14<br>Yerevan, Armenia',
      hy: 'Կոմիտասի պող. 49/3, 14<br>Երևան, Հայաստան',
      ru: 'пр. Комитаса, 49/3, 14<br>Ереван, Армения',
      de: 'Komitas St. 49/3, 14<br>Jerewan, Armenien'
    },
    'footer.top': { en: 'Back to top ↑', hy: 'Վերև ↑', ru: 'Наверх ↑', de: 'Nach oben ↑' },

    /* ---------- contact buttons (used by the scripts) ---------- */
    'fab.open': { en: 'Contact', hy: 'Կապ', ru: 'Связаться', de: 'Kontakt' },
    'fab.title': { en: 'Get in touch', hy: 'Կապվեք մեզ հետ', ru: 'Свяжитесь с нами', de: 'Kontakt aufnehmen' },
    'ch.email': { en: 'Email', hy: 'Էլ. փոստ', ru: 'Эл. почта', de: 'E-Mail' },
    'ch.phone': { en: 'Call', hy: 'Զանգել', ru: 'Позвонить', de: 'Anrufen' },

    /* ---------- image viewer ---------- */
    'lb.label': { en: 'Image viewer', hy: 'Պատկերների դիտում', ru: 'Просмотр изображений', de: 'Bildansicht' },
    'lb.close': { en: 'Close', hy: 'Փակել', ru: 'Закрыть', de: 'Schließen' },
    'lb.prev': { en: 'Previous image', hy: 'Նախորդ պատկերը', ru: 'Предыдущее изображение', de: 'Vorheriges Bild' },
    'lb.next': { en: 'Next image', hy: 'Հաջորդ պատկերը', ru: 'Следующее изображение', de: 'Nächstes Bild' },
    'lb.ask': { en: 'Ask about this piece', hy: 'Հարցնել այս աշխատանքի մասին', ru: 'Спросить об этой работе', de: 'Nach diesem Stück fragen' },

    /* ---------- pre-filled messages ---------- */
    'msg.hello': {
      en: 'Hello! I\'m writing from the Ruben Pap Ceramics website.',
      hy: 'Բարև Ձեզ։ Գրում եմ Ruben Pap Ceramics կայքից։',
      ru: 'Здравствуйте! Пишу вам с сайта Ruben Pap Ceramics.',
      de: 'Hallo! Ich schreibe Ihnen über die Website von Ruben Pap Ceramics.'
    },
    'msg.visit': {
      en: 'Hello! I\'d like to book a studio visit.\nPreferred date: \nNumber of people: ',
      hy: 'Բարև Ձեզ։ Կցանկանայի այցելել արվեստանոց։\nՆախընտրելի ամսաթիվ՝ \nՄարդկանց թիվը՝ ',
      ru: 'Здравствуйте! Хочу записаться на визит в студию.\nЖелаемая дата: \nКоличество человек: ',
      de: 'Hallo! Ich möchte einen Atelierbesuch buchen.\nWunschtermin: \nAnzahl der Personen: '
    },
    'msg.piece': {
      en: 'Hello! I\'m interested in “{name}” (No. {n}) from your website — could you tell me more about it?',
      hy: 'Բարև Ձեզ։ Ինձ հետաքրքրեց «{name}» աշխատանքը (№ {n}) Ձեր կայքում։ Կպատմե՞ք դրա մասին ավելին։',
      ru: 'Здравствуйте! Меня заинтересовала работа «{name}» (№ {n}) на вашем сайте. Расскажите, пожалуйста, о ней подробнее.',
      de: 'Hallo! Ich interessiere mich für „{name}“ (Nr. {n}) auf Ihrer Website — können Sie mir mehr darüber erzählen?'
    },
    'msg.subjectHello': { en: 'Hello from the website', hy: 'Նամակ կայքից', ru: 'Сообщение с сайта', de: 'Nachricht über die Website' },
    'msg.subjectVisit': { en: 'Studio visit', hy: 'Այց արվեստանոց', ru: 'Визит в студию', de: 'Atelierbesuch' },
    'msg.subjectPiece': { en: 'About “{name}” (No. {n})', hy: '«{name}» (№ {n}) աշխատանքի մասին', ru: 'О работе «{name}» (№ {n})', de: 'Zu „{name}“ (Nr. {n})' },

    /* ---------- 3D configurator ---------- */
    'nav.customize': { en: 'Customize', hy: 'Ձևավորել', ru: 'Конструктор', de: 'Gestalten' },
    'cfg.label': { en: '3D configurator', hy: '3D կոնֆիգուրատոր', ru: '3D-конструктор', de: '3D-Konfigurator' },
    'cfg.title': { /* html */
      en: 'Make it <em>yours</em>',
      hy: 'Ստեղծեք <em>ձերը</em>',
      ru: 'Сделайте <em>по-своему</em>',
      de: 'Ganz nach <em>Ihrem</em> Geschmack'
    },
    'cfg.text': {
      en: 'Turn each piece in 3D, compare three sizes and try other glazes. Your choices become a ready-to-send message.',
      hy: 'Պտտեք յուրաքանչյուր աշխատանքը 3D-ում, համեմատեք երեք չափսերը և փորձեք այլ ջնարակներ։ Ձեր ընտրությունը կդառնա ուղարկելու պատրաստ հաղորդագրություն։',
      ru: 'Вращайте изделие в 3D, сравнивайте три размера и примеряйте другие глазури. Ваш выбор превратится в готовое к отправке сообщение.',
      de: 'Drehen Sie jedes Stück in 3D, vergleichen Sie drei Größen und probieren Sie andere Glasuren. Ihre Auswahl wird zu einer versandfertigen Nachricht.'
    },
    'cfg.piece': { en: 'Piece', hy: 'Աշխատանք', ru: 'Изделие', de: 'Stück' },
    'cfg.no': { en: 'No. {n}', hy: '№ {n}', ru: '№ {n}', de: 'Nr. {n}' },
    'cfg.price': { en: 'Price on request', hy: 'Գինը՝ ըստ հարցման', ru: 'Цена по запросу', de: 'Preis auf Anfrage' },
    'cfg.unique': { en: 'Handmade in Yerevan · every piece is one of a kind', hy: 'Ձեռագործ՝ Երևանում · յուրաքանչյուր իր եզակի է', ru: 'Ручная работа, Ереван · каждое изделие уникально', de: 'Handgemacht in Jerewan · jedes Stück ein Unikat' },
    'cfg.size': { en: 'Size', hy: 'Չափս', ru: 'Размер', de: 'Größe' },
    'cfg.size.s': { en: 'Small', hy: 'Փոքր', ru: 'Маленький', de: 'Klein' },
    'cfg.size.m': { en: 'Medium', hy: 'Միջին', ru: 'Средний', de: 'Mittel' },
    'cfg.size.l': { en: 'Large', hy: 'Մեծ', ru: 'Большой', de: 'Groß' },
    'cfg.glaze': { en: 'Glaze', hy: 'Ջնարակ', ru: 'Глазурь', de: 'Glasur' },
    'cfg.g.bronze': { en: 'Bronze', hy: 'Բրոնզ', ru: 'Бронза', de: 'Bronze' },
    'cfg.g.graphite': { en: 'Graphite', hy: 'Գրաֆիտ', ru: 'Графит', de: 'Graphit' },
    'cfg.g.turquoise': { en: 'Deep turquoise', hy: 'Խոր փիրուզագույն', ru: 'Глубокая бирюза', de: 'Tiefes Türkis' },
    'cfg.g.clay': { en: 'Natural clay', hy: 'Բնական կավ', ru: 'Натуральная глина', de: 'Naturton' },
    'cfg.g.ivory': { en: 'Ivory', hy: 'Փղոսկր', ru: 'Слоновая кость', de: 'Elfenbein' },
    'cfg.surface': { en: 'Surface', hy: 'Մակերես', ru: 'Поверхность', de: 'Oberfläche' },
    'cfg.flow': { en: 'Glaze flow', hy: 'Ջնարակի հոսք', ru: 'Потёки глазури', de: 'Glasurfluss' },
    'cfg.tex': { en: 'Texture', hy: 'Ֆակտուրա', ru: 'Фактура', de: 'Struktur' },
    'cfg.luster': { en: 'Sheen', hy: 'Փայլ', ru: 'Блеск', de: 'Glanz' },
    'cfg.qty': { en: 'Quantity', hy: 'Քանակ', ru: 'Количество', de: 'Anzahl' },
    'cfg.qtyDec': { en: 'Decrease quantity', hy: 'Պակասեցնել քանակը', ru: 'Уменьшить количество', de: 'Anzahl verringern' },
    'cfg.qtyInc': { en: 'Increase quantity', hy: 'Ավելացնել քանակը', ru: 'Увеличить количество', de: 'Anzahl erhöhen' },
    'cfg.name': { en: 'Your name', hy: 'Ձեր անունը', ru: 'Ваше имя', de: 'Ihr Name' },
    'cfg.note': { en: 'Note', hy: 'Նշում', ru: 'Комментарий', de: 'Anmerkung' },
    'cfg.optional': { en: 'optional', hy: 'ըստ ցանկության', ru: 'необязательно', de: 'optional' },
    'cfg.notePh': { en: 'e.g. a gift, a preferred date…', hy: 'օրինակ՝ նվեր, նախընտրելի ամսաթիվ…', ru: 'например, подарок, желаемая дата…', de: 'z. B. ein Geschenk, Wunschtermin …' },
    'cfg.msg': { en: 'Your message', hy: 'Ձեր հաղորդագրությունը', ru: 'Ваше сообщение', de: 'Ihre Nachricht' },
    'cfg.send': { en: 'Send via', hy: 'Ուղարկել', ru: 'Отправить через', de: 'Senden über' },
    'cfg.copy': { en: 'Copy message', hy: 'Պատճենել հաղորդագրությունը', ru: 'Скопировать сообщение', de: 'Nachricht kopieren' },
    'cfg.copyLink': { en: 'Copy link to this design', hy: 'Պատճենել այս տարբերակի հղումը', ru: 'Скопировать ссылку на вариант', de: 'Link zu diesem Entwurf kopieren' },
    'cfg.copied': { en: 'Message copied.', hy: 'Հաղորդագրությունը պատճենված է։', ru: 'Сообщение скопировано.', de: 'Nachricht kopiert.' },
    'cfg.linkCopied': { en: 'Link copied.', hy: 'Հղումը պատճենված է։', ru: 'Ссылка скопирована.', de: 'Link kopiert.' },
    'cfg.copyFail': { en: 'Couldn’t copy — please select the text and copy it.', hy: 'Չհաջողվեց պատճենել․ ընտրեք տեքստը և պատճենեք։', ru: 'Не удалось скопировать — выделите текст и скопируйте вручную.', de: 'Kopieren nicht möglich — bitte Text markieren und kopieren.' },
    'cfg.pasteHint': { en: 'Message copied — paste it into the chat.', hy: 'Հաղորդագրությունը պատճենված է․ տեղադրեք այն զրույցում։', ru: 'Сообщение скопировано — вставьте его в чат.', de: 'Nachricht kopiert — fügen Sie sie im Chat ein.' },
    'cfg.approx': {
      en: 'Sizes are approximate; colours are a digital preview. Every piece is thrown and fired by hand.',
      hy: 'Չափսերը մոտավոր են, գույները՝ թվային նախադիտում։ Յուրաքանչյուր իր պատրաստվում և թրծվում է ձեռքով։',
      ru: 'Размеры приблизительные, цвета — цифровое превью. Каждое изделие формуется и обжигается вручную.',
      de: 'Maße sind Richtwerte, Farben eine digitale Vorschau. Jedes Stück wird von Hand gedreht und gebrannt.'
    },
    'cfg.views': { en: 'Views', hy: 'Տեսքեր', ru: 'Ракурсы', de: 'Ansichten' },
    'cfg.view3d': { en: 'View in 3D', hy: 'Դիտել 3D-ով', ru: 'Смотреть в 3D', de: 'In 3D ansehen' },
    'cfg.photo': { en: 'Photo {n}', hy: 'Լուսանկար {n}', ru: 'Фото {n}', de: 'Foto {n}' },
    'cfg.dims': { en: 'Show dimensions', hy: 'Ցույց տալ չափերը', ru: 'Показать размеры', de: 'Maße anzeigen' },
    'cfg.mug': { en: 'Compare with a mug', hy: 'Համեմատել բաժակի հետ', ru: 'Сравнить с кружкой', de: 'Mit einer Tasse vergleichen' },
    'cfg.reset': { en: 'Reset view', hy: 'Վերականգնել տեսքը', ru: 'Сбросить вид', de: 'Ansicht zurücksetzen' },
    'cfg.full': { en: 'Full screen', hy: 'Լիաէկրան', ru: 'Во весь экран', de: 'Vollbild' },
    'cfg.hint': { en: 'Drag to rotate · scroll or pinch to zoom', hy: 'Քաշեք՝ պտտելու համար · խոշորացրեք անիվով կամ երկու մատով', ru: 'Тяните, чтобы вращать · колесо или щипок — масштаб', de: 'Ziehen zum Drehen · Scrollen oder zwei Finger zum Zoomen' },
    'cfg.loading': { en: 'Loading 3D…', hy: '3D-ն բեռնվում է…', ru: 'Загрузка 3D…', de: '3D wird geladen …' },
    'cfg.noWebgl': { en: '3D preview isn’t available on this device — showing photos instead.', hy: '3D նախադիտումը հասանելի չէ այս սարքում․ ցուցադրվում են լուսանկարները։', ru: '3D-просмотр недоступен на этом устройстве — показаны фото.', de: '3D-Vorschau ist auf diesem Gerät nicht verfügbar — stattdessen Fotos.' },
    'cfg.canvas': { en: '3D preview: {piece}, {size}, {glaze}. Use the arrow keys to rotate.', hy: '3D նախադիտում՝ {piece}, {size}, {glaze}։ Պտտելու համար օգտագործեք սլաքները։', ru: '3D-просмотр: {piece}, {size}, {glaze}. Вращайте стрелками.', de: '3D-Vorschau: {piece}, {size}, {glaze}. Mit den Pfeiltasten drehen.' },
    'cfg.h': { en: 'H', hy: 'Բ', ru: 'В', de: 'H' },
    'cfg.w': { en: 'W', hy: 'Լ', ru: 'Ш', de: 'B' },
    'cfg.cm': { en: 'cm', hy: 'սմ', ru: 'см', de: 'cm' },
    'cfg.mugLabel': { en: 'Mug · 9.5 cm', hy: 'Բաժակ · 9,5 սմ', ru: 'Кружка · 9,5 см', de: 'Tasse · 9,5 cm' },

    /* ---------- the order message (built by the configurator) ---------- */
    'cfg.m.intro': {
      en: 'Hello! I\'d like to order a piece from the Ruben Pap Ceramics website:',
      hy: 'Բարև Ձեզ։ Կցանկանայի պատվիրել աշխատանք Ruben Pap Ceramics կայքից․',
      ru: 'Здравствуйте! Хочу заказать изделие с сайта Ruben Pap Ceramics:',
      de: 'Hallo! Ich möchte ein Stück von der Website von Ruben Pap Ceramics bestellen:'
    },
    'cfg.m.piece': { en: '{piece} (No. {n})', hy: '{piece} (№ {n})', ru: '{piece} (№ {n})', de: '{piece} (Nr. {n})' },
    'cfg.m.size': { en: 'Size: {size} — {dims}', hy: 'Չափս՝ {size} — {dims}', ru: 'Размер: {size} — {dims}', de: 'Größe: {size} — {dims}' },
    'cfg.m.glaze': {
      en: 'Glaze: {glaze} (flow {flow}%, texture {tex}%, sheen {luster}%)',
      hy: 'Ջնարակ՝ {glaze} (հոսք {flow}%, ֆակտուրա {tex}%, փայլ {luster}%)',
      ru: 'Глазурь: {glaze} (потёки {flow}%, фактура {tex}%, блеск {luster}%)',
      de: 'Glasur: {glaze} (Fluss {flow} %, Struktur {tex} %, Glanz {luster} %)'
    },
    'cfg.m.qty': { en: 'Quantity: {qty}', hy: 'Քանակ՝ {qty}', ru: 'Количество: {qty}', de: 'Anzahl: {qty}' },
    'cfg.m.note': { en: 'Note: {note}', hy: 'Նշում՝ {note}', ru: 'Комментарий: {note}', de: 'Anmerkung: {note}' },
    'cfg.m.name': { en: 'My name: {name}', hy: 'Իմ անունը՝ {name}', ru: 'Меня зовут {name}.', de: 'Mein Name: {name}' },
    'cfg.m.ask': {
      en: 'Could you tell me the price and when it could be ready?',
      hy: 'Կասե՞ք գինը և երբ կարող է պատրաստ լինել։',
      ru: 'Подскажите, пожалуйста, цену и сроки изготовления.',
      de: 'Können Sie mir den Preis und die Fertigungszeit nennen?'
    },
    'cfg.m.link': { en: 'My design: {link}', hy: 'Իմ տարբերակը՝ {link}', ru: 'Мой вариант: {link}', de: 'Mein Entwurf: {link}' },
    'cfg.m.subject': { en: 'Order request: {piece} ({size})', hy: 'Պատվերի հարցում՝ {piece} ({size})', ru: 'Заказ: {piece} ({size})', de: 'Bestellanfrage: {piece} ({size})' }
  }
};
