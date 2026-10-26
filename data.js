// База данных: Радар ИИ / Солянка с ложкой
const RADAR_DB = {
  meta: {
    title: "Солянка с ложкой | Радар ИИ",
    version: "2.0.0",
    description: "Кураторская база топовых GitHub-репозиториев, боевых системных промптов и архитектурных выжимок."
  },
  categories: [
    { id: "all", label: "Все находки", icon: "compass" },
    { id: "agents", label: "AI Агенты", icon: "bot" },
    { id: "voice", label: "Голос & Аудио", icon: "mic" },
    { id: "llm", label: "LLM & RAG", icon: "cpu" },
    { id: "ui", label: "UI & Дизайн", icon: "layout" },
    { id: "seo", label: "SEO & Веб", icon: "search" },
    { id: "tools", label: "Утилиты & Боты", icon: "wrench" }
  ],
  repos: [
    {
      id: "hermes-agent",
      title: "NousResearch / Hermes-Agent",
      repoUrl: "https://github.com/NousResearch/hermes-agent",
      category: "agents",
      tags: ["Agentic AI", "Function Calling", "Local LLM", "Python"],
      stars: "4.8k+",
      tldr: "Мощная открытая агентная среда для локальных моделей Hermes. Нативная поддержка function-calling, выполнение системных задач, шлюзы и строгий контроль доступа без облачных зависимостей.",
      whyUse: "Когда нужен автономный агент на локальном GPU без утечки данных наружу.",
      quickstart: "git clone https://github.com/NousResearch/hermes-agent.git && cd hermes-agent && pip install -r requirements.txt",
      verified: true
    },
    {
      id: "oh-my-claudecode",
      title: "yeachan-heo / oh-my-claudecode",
      repoUrl: "https://github.com/yeachan-heo/oh-my-claudecode",
      category: "agents",
      tags: ["Multi-Agent", "CLI", "Developer Tools", "Automation"],
      stars: "2.3k+",
      tldr: "Оркестратор мультиагентных сред в терминале: фоновые субагенты, делегирование задач, связка с tmux и параллельное исследование кодовых баз.",
      whyUse: "Автоматизация сложных задач разработки в CLI без ручного контроля каждого шага.",
      quickstart: "git clone https://github.com/yeachan-heo/oh-my-claudecode.git && npm install",
      verified: true
    },
    {
      id: "voicestudio",
      title: "debpalash / VoiceStudio",
      repoUrl: "https://github.com/debpalash/VoiceStudio",
      category: "voice",
      tags: ["Voice AI", "TTS", "Speech", "Offline Synthesis"],
      stars: "1.9k+",
      tldr: "Комплексная студия для работы с синтезом речи, клонированием голоса и VAD. Поддержка популярных движков оффлайн-генерации речи.",
      whyUse: "Полноценный локальный голосовой стек для ассистента или озвучки видео.",
      quickstart: "git clone https://github.com/debpalash/VoiceStudio.git && pip install -r requirements.txt",
      verified: true
    },
    {
      id: "whisper-cpp",
      title: "ggerganov / whisper.cpp",
      repoUrl: "https://github.com/ggerganov/whisper.cpp",
      category: "voice",
      tags: ["STT", "C/C++", "High Performance", "CPU/GPU"],
      stars: "36k+",
      tldr: "Порт OpenAI Whisper на чистый C/C++. Мгновенное распознавание речи на CPU и GPU без тяжелого Python-окружения.",
      whyUse: "Молниеносный STT для десктопного Джарвиса с минимальным потреблением RAM.",
      quickstart: "git clone https://github.com/ggerganov/whisper.cpp.git && cd whisper.cpp && make",
      verified: true
    },
    {
      id: "silero-vad",
      title: "snakers4 / silero-vad",
      repoUrl: "https://github.com/snakers4/silero-vad",
      category: "voice",
      tags: ["VAD", "Audio Processing", "Lightweight", "Realtime"],
      stars: "4.5k+",
      tldr: "Предобученный детектора активности голоса (Voice Activity Detection). Сверхбыстрый (время чанка < 1мс), идеален для потокового аудио.",
      whyUse: "Отсекает тишину и шумы перед отправкой аудио в модель распознавания.",
      quickstart: "pip install silero-vad onnxruntime",
      verified: true
    },
    {
      id: "claude-seo",
      title: "AgriciDaniel / claude-seo",
      repoUrl: "https://github.com/AgriciDaniel/claude-seo",
      category: "seo",
      tags: ["SEO", "AI Auditing", "GEO", "llms.txt"],
      stars: "1.2k+",
      tldr: "Аудит и оптимизация сайтов под поисковые системы и нейропоиск (Generative Engine Optimization). Генерация llms.txt и анализ семантики.",
      whyUse: "Подготовка веб-проектов под цитирование в Perplexity, ChatGPT и Gemini.",
      quickstart: "git clone https://github.com/AgriciDaniel/claude-seo.git",
      verified: true
    },
    {
      id: "porcupine",
      title: "Picovoice / Porcupine",
      repoUrl: "https://github.com/Picovoice/porcupine",
      category: "voice",
      tags: ["Wake Word", "Edge AI", "Low Latency", "Desktop/Embedded"],
      stars: "4.9k+",
      tldr: "Оффлайн-движок детекции ключевых слов активации («Джарвис», «Компьютер»). Нулевая задержка, минимальная нагрузка на процессор.",
      whyUse: "Для пробуждения голосового ассистента без отправки звука на сервер.",
      quickstart: "pip install pvporcupine pvrecorder",
      verified: true
    },
    {
      id: "rustpotter",
      title: "GiviMAD / rustpotter",
      repoUrl: "https://github.com/GiviMAD/rustpotter",
      category: "voice",
      tags: ["Wake Word", "Rust", "Open Source", "Embedded"],
      stars: "750+",
      tldr: "Полностью открытый spotter ключевых слов на Rust. Не требует API-ключей и облачных лицензий.",
      whyUse: "100% бесплатная open-source замена коммерческим wake-word библиотекам.",
      quickstart: "git clone https://github.com/GiviMAD/rustpotter.git && cargo build --release",
      verified: true
    },
    {
      id: "lucide",
      title: "lucide-icons / lucide",
      repoUrl: "https://github.com/lucide-icons/lucide",
      category: "ui",
      tags: ["Icons", "SVG", "Clean Design", "Zero Bloat"],
      stars: "14k+",
      tldr: "Эталонная коллекция контурных SVG-иконок. Чистый вектор, без лишних зависимостей, идеальна для эстетики «Бизнес-Премиум».",
      whyUse: "Когда нужны аккуратные иконки в едином стиле без тяжелых шрифтовых наборов.",
      quickstart: "npm install lucide",
      verified: true
    },
    {
      id: "taste-skill",
      title: "Leonxlnx / taste-skill",
      repoUrl: "https://github.com/Leonxlnx/taste-skill",
      category: "ui",
      tags: ["UI Taste", "Design System", "Anti-Slop", "CSS"],
      stars: "1.1k+",
      tldr: "Набор дизайн-принципов и паттернов для избавления от шаблонного «нейронного» дизайна (Anti-Slop). Чистая типографика и сетки.",
      whyUse: "Памятка фронтендеру для создания дорогих минималистичных интерфейсов.",
      quickstart: "git clone https://github.com/Leonxlnx/taste-skill.git",
      verified: true
    },
    {
      id: "ghostchat",
      title: "GhostChat / GhostChat",
      repoUrl: "https://github.com/GhostChat/GhostChat",
      category: "tools",
      tags: ["Streaming", "Overlay", "Twitch/YouTube", "C#"],
      stars: "600+",
      tldr: "Полупрозрачный оверлей чата поверх игр с клик-сквозным режимом (click-through) для стримеров на YouTube и Twitch.",
      whyUse: "Чтение стрим-чата в Warpath и других играх без второго монитора.",
      quickstart: "git clone https://github.com/GhostChat/GhostChat.git",
      verified: true
    },
    {
      id: "zapret-discord-yt",
      title: "Flowseal / zapret-discord-youtube",
      repoUrl: "https://github.com/Flowseal/zapret-discord-youtube",
      category: "tools",
      tags: ["Network", "DPI Bypass", "Windows", "Utility"],
      stars: "8k+",
      tldr: "Скрипты и служба обхода DPI-замедлений для Discord голосовых каналов и видео YouTube на базе WinDivert.",
      whyUse: "Стабильная работа Discord и просмотр обучающих роликов без буферизации.",
      quickstart: "git clone https://github.com/Flowseal/zapret-discord-youtube.git",
      verified: true
    }
  ],
  prompts: [
    {
      id: "anti-slop-coder",
      title: "Инженерный мета-промпт (Anti-Slop & Clean Code)",
      category: "coding",
      description: "Запрещает ИИ генерировать бесполезные классы-обертки, лишние библиотеки и заглушки. Только чистый рабочий код.",
      promptText: `Ты ведущий системный архитектор. Твои правила:
1. Deletion-first подход: удаляй все лишнее, никакой оверинженерии.
2. Стек: семантический HTML5, чистый CSS3 (Flexbox/Grid), Vanilla JS без библиотек.
3. Никаких «TODO» или усечений кодовой базы. Код всегда готов к продакшену.
4. Минимализм «Бизнес-Премиум»: глубокий контраст, строгая типографика, чистый векторный SVG.
5. Проверяй синтаксис и производительность перед сдачей.`
    },
    {
      id: "claude-geo-audit",
      title: "GEO-Аудитор: подготовка сайта под нейропоиск",
      category: "seo",
      description: "Анализирует текст и структуру страницы для цитирования моделями Perplexity, Gemini, ChatGPT и формирует файл llms.txt.",
      promptText: `Проанализируй предоставленную структуру страницы для Generative Engine Optimization (GEO):
1. Извлеки ключевые сущности (Entities) и факты.
2. Проверь наличие микроразметки Schema.org (SoftwareApplication / Article).
3. Составь краткий и емкий файл /llms.txt со списком ключевых ссылок и выжимок для ИИ-поисковиков.
4. Убери «водянистые» фразы, заменив их точными техническими метриками.`
    },
    {
      id: "agent-evaluator",
      title: "Верификатор агентных циклов (Verification Loop)",
      category: "agents",
      description: "Промпт для субагента-ревьюера, проводящего аудит написанного кода на безопасность и утечки памяти.",
      promptText: `Ты независимый аудитор безопасности и качества. Твоя задача — найти критические изъяны:
1. Проверь код на утечки ресурсов, незакрытые дескрипторы и неочищенные таймеры.
2. Убедись, что все внешние входные данные валидируются.
3. Проверь адаптивность верстки на экранах 360px.
4. Сформируй отчет по формату: «Критично» / «Замечание» / «Готово к деплою».`
    }
  ],
  academy: [
    {
      id: "local-agent-stack",
      title: "Архитектура автономного локального агента",
      badge: "Architecture",
      readTime: "4 мин",
      summary: "Как собрать персонального ассистента без облачных подписок: связка Wake-word (Porcupine/Rustpotter) → VAD (Silero) → STT (Whisper.cpp) → LLM (Hermes) → TTS (VoiceStudio)."
    },
    {
      id: "rag-without-bloat",
      title: "RAG без тяжелых фреймворков",
      badge: "Core Engineering",
      readTime: "3 мин",
      summary: "Зачем тащить тяжелые монстры вроде LangChain, если векторный поиск в памяти реализуется через косинусное сходство массивов Float32 в 40 строк чистого JS или Python."
    },
    {
      id: "business-premium-ui",
      title: "Принципы эстетики «Бизнес-Премиум»",
      badge: "Design",
      readTime: "3 мин",
      summary: "Темная графитовая гамма (#0a0e17), приглушенные акценты (#38bdf8), отсутствие кислотных неоновых градиентов, строгие отступы и мгновенный отклик интерфейса."
    }
  ]
};

if (typeof module !== 'undefined') {
  module.exports = RADAR_DB;
}
