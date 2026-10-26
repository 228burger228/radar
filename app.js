// Приложение «Солянка с ложкой | Радар ИИ»
// Vanilla JS — Чистый стек, без лишних зависимостей

(function() {
  'use strict';

  // 1. Инициализация состояния
  let activeTab = 'repos';
  let activeCategory = 'all';
  let searchQuery = '';

  // Загрузка пользовательских дополнений из LocalStorage
  let localRepos = [];
  try {
    const saved = localStorage.getItem('radar_user_repos');
    if (saved) localRepos = JSON.parse(saved);
  } catch(e) {
    console.warn('LocalStorage error:', e);
  }

  // Загрузка избранного
  let bookmarks = new Set();
  try {
    const savedBookmarks = localStorage.getItem('radar_bookmarks');
    if (savedBookmarks) bookmarks = new Set(JSON.parse(savedBookmarks));
  } catch(e) {}

  // Объединенный список репозиториев
  const getAllRepos = () => [...localRepos, ...RADAR_DB.repos];

  // DOM Элементы
  const reposContainer = document.getElementById('repos-container');
  const promptsContainer = document.getElementById('prompts-container');
  const academyContainer = document.getElementById('academy-container');
  const categoryChips = document.getElementById('category-chips');
  const searchInput = document.getElementById('search-input');
  const toast = document.getElementById('toast');

  const countRepos = document.getElementById('count-repos');
  const countPrompts = document.getElementById('count-prompts');
  const countAcademy = document.getElementById('count-academy');

  // Модалка
  const modal = document.getElementById('add-modal');
  const btnOpenModal = document.getElementById('btn-open-modal');
  const btnCloseModal = document.getElementById('btn-close-modal');
  const addForm = document.getElementById('add-repo-form');
  const btnExport = document.getElementById('btn-export-json');

  // Джарвис элементы
  const jarvisChatBox = document.getElementById('jarvis-chat-box');
  const jarvisInput = document.getElementById('jarvis-input');
  const jarvisSendBtn = document.getElementById('jarvis-send-btn');

  // 2. Инициализация счетчиков
  function updateCounters() {
    countRepos.textContent = getAllRepos().length;
    countPrompts.textContent = RADAR_DB.prompts.length;
    countAcademy.textContent = RADAR_DB.academy.length;
  }

  // 3. Рендер фильтров категорий
  function renderCategories() {
    categoryChips.innerHTML = RADAR_DB.categories.map(cat => `
      <button class="chip ${cat.id === activeCategory ? 'active' : ''}" data-cat="${cat.id}">
        ${cat.label}
      </button>
    `).join('');

    categoryChips.querySelectorAll('.chip').forEach(chip => {
      chip.addEventListener('click', () => {
        activeCategory = chip.dataset.cat;
        document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        renderRepos();
      });
    });
  }

  // 4. Показ тоста
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2400);
  }

  // 5. Копирование в буфер
  window.copyText = function(text, label = 'Команда') {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`${label} скопирована в буфер`);
    }).catch(() => {
      showToast('Ошибка копирования');
    });
  };

  // 6. Переключение закладки
  window.toggleBookmark = function(id) {
    if (bookmarks.has(id)) {
      bookmarks.delete(id);
      showToast('Удалено из закладок');
    } else {
      bookmarks.add(id);
      showToast('Добавлено в закладки');
    }
    localStorage.setItem('radar_bookmarks', JSON.stringify(Array.from(bookmarks)));
    renderRepos();
  };

  // 7. Рендер репозиториев
  function renderRepos() {
    const repos = getAllRepos();
    const query = searchQuery.toLowerCase().trim();

    const filtered = repos.filter(item => {
      const matchCat = activeCategory === 'all' || item.category === activeCategory;
      if (!matchCat) return false;

      if (!query) return true;

      const inTitle = item.title.toLowerCase().includes(query);
      const inTldr = item.tldr.toLowerCase().includes(query);
      const inTags = (item.tags || []).some(t => t.toLowerCase().includes(query));
      const inWhy = (item.whyUse || '').toLowerCase().includes(query);

      return inTitle || inTldr || inTags || inWhy;
    });

    if (filtered.length === 0) {
      reposContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">
          Ничего не найдено по запросу «${searchQuery}». Попробуйте изменить параметры или добавьте свой репозиторий.
        </div>
      `;
      return;
    }

    reposContainer.innerHTML = filtered.map(repo => {
      const isBookmarked = bookmarks.has(repo.id);
      return `
        <article class="card">
          <div class="card-header">
            <div class="card-title-group">
              <span class="card-category-badge">${repo.category}</span>
              <a href="${repo.repoUrl}" target="_blank" rel="noopener noreferrer" class="card-title">
                ${repo.title}
              </a>
            </div>
            <span class="card-stars">★ ${repo.stars || '4.0k+'}</span>
          </div>

          <p class="card-tldr">${repo.tldr}</p>

          ${repo.whyUse ? `
            <div class="card-why">
              <strong>Зачем брать:</strong> ${repo.whyUse}
            </div>
          ` : ''}

          <div class="card-tags">
            ${(repo.tags || []).map(tag => `<span class="tag-badge">#${tag}</span>`).join('')}
          </div>

          ${repo.quickstart ? `
            <div class="quickstart-box">
              <span class="quickstart-code">${repo.quickstart}</span>
              <button class="btn-icon-copy" onclick="copyText('${repo.quickstart.replace(/'/g, "\\'")}', 'Команда')" title="Скопировать команду">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              </button>
            </div>
          ` : ''}

          <div class="card-footer">
            <button class="btn btn-icon-copy" onclick="toggleBookmark('${repo.id}')" title="Добавить в закладки" style="color: ${isBookmarked ? 'var(--accent-amber)' : 'var(--text-muted)'};">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="${isBookmarked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
              <span style="font-size: 0.78rem;">${isBookmarked ? 'В закладках' : 'Сохранить'}</span>
            </button>

            <a href="${repo.repoUrl}" target="_blank" rel="noopener noreferrer" class="btn" style="padding: 4px 10px; font-size: 0.78rem;">
              GitHub ↗
            </a>
          </div>
        </article>
      `;
    }).join('');
  }

  // 8. Рендер промптов
  function renderPrompts() {
    promptsContainer.innerHTML = RADAR_DB.prompts.map(p => `
      <article class="prompt-card">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div>
            <span class="card-category-badge">${p.category}</span>
            <h3 style="font-size: 1.05rem; font-weight: 600; margin-top: 4px;">${p.title}</h3>
          </div>
          <button class="btn btn-primary" onclick="copyText('${encodeURIComponent(p.promptText)}', 'Промпт', true)" style="padding: 6px 12px; font-size: 0.78rem;">
            Копировать
          </button>
        </div>
        <p style="font-size: 0.85rem; color: var(--text-muted);">${p.description}</p>
        <div class="prompt-textarea">${p.promptText}</div>
      </article>
    `).join('');
  }

  // Расширенная функция копирования для промптов
  window.copyPromptDecoded = function(encoded) {
    const text = decodeURIComponent(encoded);
    copyText(text, 'Промпт');
  };

  // 9. Рендер академии
  function renderAcademy() {
    academyContainer.innerHTML = RADAR_DB.academy.map(item => `
      <article class="academy-card">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span class="tag-badge" style="color: var(--accent-cyan);">${item.badge}</span>
          <span style="font-size: 0.75rem; color: var(--text-dim);">⏱ ${item.readTime}</span>
        </div>
        <h3 style="font-size: 1.05rem; font-weight: 600;">${item.title}</h3>
        <p style="font-size: 0.88rem; color: var(--text-muted);">${item.summary}</p>
      </article>
    `).join('');
  }

  // 10. Управление табами
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      activeTab = btn.dataset.tab;

      const controlsSec = document.getElementById('controls-section');
      const reposView = document.getElementById('tab-repos-view');
      const promptsView = document.getElementById('tab-prompts-view');
      const academyView = document.getElementById('tab-academy-view');
      const jarvisView = document.getElementById('tab-jarvis-view');

      reposView.style.display = activeTab === 'repos' ? 'block' : 'none';
      promptsView.style.display = activeTab === 'prompts' ? 'block' : 'none';
      academyView.style.display = activeTab === 'academy' ? 'block' : 'none';
      jarvisView.style.display = activeTab === 'jarvis' ? 'block' : 'none';

      controlsSec.style.display = activeTab === 'repos' ? 'flex' : 'none';
    });
  });

  // 11. Живой поиск с debounce
  let debounceTimer;
  searchInput.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      searchQuery = e.target.value;
      renderRepos();
    }, 200);
  });

  // 12. Модальное окно: добавить свою находку
  btnOpenModal.addEventListener('click', () => modal.classList.add('active'));
  btnCloseModal.addEventListener('click', () => modal.classList.remove('active'));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });

  addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('new-repo-title').value.trim();
    const url = document.getElementById('new-repo-url').value.trim();
    const cat = document.getElementById('new-repo-cat').value;
    const tags = document.getElementById('new-repo-tags').value.split(',').map(t => t.trim()).filter(Boolean);
    const tldr = document.getElementById('new-repo-tldr').value.trim();
    const quickstart = document.getElementById('new-repo-quickstart').value.trim();

    const newEntry = {
      id: 'custom-' + Date.now(),
      title,
      repoUrl: url,
      category: cat,
      tags: tags.length ? tags : ['Community'],
      stars: 'New',
      tldr,
      quickstart,
      whyUse: 'Добавлено пользователем в личную солянку'
    };

    localRepos.unshift(newEntry);
    localStorage.setItem('radar_user_repos', JSON.stringify(localRepos));

    addForm.reset();
    modal.classList.remove('active');
    showToast('Репозиторий успешно добавлен!');
    updateCounters();
    renderRepos();
  });

  // 13. Экспорт всей базы в JSON
  btnExport.addEventListener('click', () => {
    const exportData = {
      version: "2.0",
      exportedAt: new Date().toISOString(),
      repos: getAllRepos(),
      prompts: RADAR_DB.prompts,
      academy: RADAR_DB.academy
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'solyanka_radar_database.json';
    a.click();
    URL.revokeObjectURL(url);
    showToast('База успешно экспортирована в JSON');
  });

  // 14. Джарвис-Ассистент
  function askJarvis(question) {
    if (!question.trim()) return;

    // Пушим вопрос пользователя
    const userBubble = document.createElement('div');
    userBubble.className = 'chat-bubble bubble-user';
    userBubble.textContent = question;
    jarvisChatBox.appendChild(userBubble);
    jarvisInput.value = '';
    jarvisChatBox.scrollTop = jarvisChatBox.scrollHeight;

    // Семантический поиск по локальной базе
    const q = question.toLowerCase();
    const repos = getAllRepos();

    setTimeout(() => {
      let reply = '';

      if (q.includes('голос') || q.includes('реч') || q.includes('аудио') || q.includes('stt') || q.includes('tts') || q.includes('распознаван')) {
        reply = 'Сэр, для голосового стека у нас собрана безупречная связка: для детекции речи — **Silero-VAD**, для офлайн распознавания — молниеносный **whisper.cpp**, а для синтеза — **VoiceStudio**. Если нужно ключевое слово активации без задержек — рекомендую **Porcupine** или **Rustpotter**.';
      } else if (q.includes('агент') || q.includes('agent') || q.includes('автоном')) {
        reply = 'Для автономных агентов ключевой ориентир в нашей солянке — **NousResearch/Hermes-Agent** (поддержка локальных LLM и function calling) и **oh-my-claudecode** (оркестрация параллельных мультиагентов в терминале).';
      } else if (q.includes('сео') || q.includes('seo') || q.includes('поиск') || q.includes('llms.txt')) {
        reply = 'Для SEO нового поколения смотрите **AgriciDaniel/claude-seo** — он проводит аудит под нейропоисковики (GEO) и создает эталонные файлы `llms.txt`. Также в разделе «Промпт-Кузница» есть готовый промпт для GEO-аудита.';
      } else if (q.includes('дизайн') || q.includes('ui') || q.includes('стил')) {
        reply = 'В части дизайна: чистые контурные SVG — это **lucide-icons**, а правила избавления от шаблонного slop-дизайна зафиксированы в **Leonxlnx/taste-skill** (строгий минимализм, контраст, чистая верстка).';
      } else {
        // Поиск по соответствиям
        const matches = repos.filter(r => 
          r.title.toLowerCase().includes(q) || 
          r.tldr.toLowerCase().includes(q) || 
          (r.tags || []).some(t => t.toLowerCase().includes(q))
        );

        if (matches.length > 0) {
          const names = matches.slice(0, 3).map(m => `«${m.title}» (${m.tldr.slice(0, 80)}...)`).join('\n\n• ');
          reply = `По вашему запросу в солянке обнаружено совпадение:\n\n• ${names}`;
        } else {
          reply = `Сэр, точных совпадений в текущем реестре не найдено. Однако вы можете нажать кнопку «Добавить находку» в шапке, и я внесу данный инструмент в нашу базу с сохранением в локальную память.`;
        }
      }

      const jarvisBubble = document.createElement('div');
      jarvisBubble.className = 'chat-bubble bubble-jarvis';
      jarvisBubble.innerHTML = reply.replace(/\n/g, '<br>');
      jarvisChatBox.appendChild(jarvisBubble);
      jarvisChatBox.scrollTop = jarvisChatBox.scrollHeight;
    }, 450);
  }

  jarvisSendBtn.addEventListener('click', () => askJarvis(jarvisInput.value));
  jarvisInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') askJarvis(jarvisInput.value);
  });

  // Первоначальный запуск
  updateCounters();
  renderCategories();
  renderRepos();
  renderPrompts();
  renderAcademy();

})();
