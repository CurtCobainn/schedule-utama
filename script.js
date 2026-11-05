/**
 * SUZURAN UNIVERSITY CLASS SCHEDULE & DASHBOARD
 * Complete interactive script for schedule management, assignments,
 * notes, characters, calendar, search, and settings.
 */

// ============================================================================
// 1. DEFAULT DATA & CONSTANTS
// ============================================================================

const DEFAULT_SCHEDULE = [
  { id: 's1', day: 'monday', subject: 'Logika', room: 'Mektan 3.1', startTime: '09:10', endTime: '10:50' },
  { id: 's2', day: 'monday', subject: 'Teknik Digital', room: 'Mektan 3.1', startTime: '15:30', endTime: '17:10' },
  { id: 's3', day: 'tuesday', subject: 'Probabilitas dan Statistik', room: 'Mektan 3.2', startTime: '07:30', endTime: '10:00' },
  { id: 's4', day: 'wednesday', subject: 'Kalkulus', room: 'Mektan 3.2', startTime: '07:30', endTime: '09:10' },
  { id: 's5', day: 'wednesday', subject: 'Pengenalan Pemrograman', room: 'H17', startTime: '09:10', endTime: '10:50' },
  { id: 's6', day: 'thursday', subject: 'Pengenalan Pemrograman', room: 'H17', startTime: '13:00', endTime: '14:40' },
  { id: 's7', day: 'friday', subject: 'Pancasila', room: 'H19', startTime: '09:10', endTime: '10:50' },
  { id: 's8', day: 'friday', subject: 'Algoritma Pemrograman', room: 'Mektan 3.2', startTime: '13:00', endTime: '15:30' },
  { id: 's9', day: 'saturday', subject: 'Praktikum Pengenalan Pemrograman', room: 'Lab Komputer', startTime: '07:00', endTime: '09:50' },
  { id: 's10', day: 'saturday', subject: 'Praktikum Teknik Digital', room: 'Lab Digital', startTime: '09:50', endTime: '12:40' },
];

const DEFAULT_ASSIGNMENTS = [
  {
    id: 'a1',
    title: 'Flowchart Algoritma & Python',
    subject: 'Pengenalan Pemrograman',
    dueDate: '2026-11-10',
    description: 'Rancang flowchart penyeleksian kondisi bersarang dan implementasikan ke bahasa Python.',
    completed: false,
    createdAt: '2026-11-01T08:00:00.000Z'
  },
  {
    id: 'a2',
    title: 'Simulasi Gerbang Logika Proteus',
    subject: 'Praktikum Teknik Digital',
    dueDate: '2026-11-12',
    description: 'Analisis tabel kebenaran untuk rangkaian half-adder dan full-adder.',
    completed: false,
    createdAt: '2026-11-02T10:30:00.000Z'
  },
  {
    id: 'a3',
    title: 'Resume Nilai Kebangsaan',
    subject: 'Pancasila',
    dueDate: '2026-11-15',
    description: 'Tulis telaah kritis 3 halaman tentang dinamika Pancasila dalam tantangan global.',
    completed: true,
    createdAt: '2026-11-03T09:15:00.000Z'
  }
];

const DEFAULT_NOTES = [
  {
    id: 'n1',
    title: 'Info Ruang Ujian Tengah Semester',
    content: 'Mektan 3.2 berkapasitas 40 mahasiswa. Wajib membawa kartu tanda mahasiswa dan dilarang meminjam kalkulator.',
    createdAt: '2026-11-04T14:20:00.000Z'
  },
  {
    id: 'n2',
    title: 'Catatan Dosen: Kompleksitas Algoritma',
    content: 'Fokus belajar pada Time & Space Complexity (Big-O notation). Pahami perbedaan O(N log N) dan O(N^2).',
    createdAt: '2026-11-03T11:00:00.000Z'
  },
  {
    id: 'n3',
    title: 'Suzuran Training Discipline',
    content: 'Di Suzuran, yang tidak disiplin akan tertinggal di belakang. Jangan pernah bolos praktikum!',
    createdAt: '2026-11-02T16:45:00.000Z'
  }
];

const QUOTES = [
  'The strongest one is the one who stands alone.',
  'Every battle is won before it is fought.',
  'Suzuran doesn\'t kneel.',
  'Strength isn\'t just about fists.',
  'The top is lonely. Get used to it.',
  'Today we fight. Tomorrow we fight harder.',
  'Don\'t look back. The enemy is ahead.',
  'A true warrior studies as hard as he fights.'
];

// ============================================================================
// 2. CHARACTER ROSTER WITH CUSTOM INLINE SVG CHIBIS
// ============================================================================

const CHARACTERS = [
  {
    id: 'bouya',
    name: 'Bouya Harumichi',
    japaneseName: '坊屋 春道',
    title: 'The Transfer Student / P.A.D Leader',
    faction: 'P.A.D / Suzuran Lone Wolf',
    description: 'The man who came to conquer Suzuran. Calm, collected, impossibly strong. Known for his legendary Sukajan jacket and unstoppable punching power.',
    stats: [
      { label: 'Strength', val: 'S+' },
      { label: 'Endurance', val: 'S' },
      { label: 'Charisma', val: 'A+' },
      { label: 'Rank', val: '#1 Legend' }
    ]
  },
  {
    id: 'rindaman',
    name: 'Megumi Hayashida (Rindaman)',
    japaneseName: '林田 恵',
    title: 'The Uncrowned King',
    faction: 'Suzuran Legend',
    description: 'No one has ever beaten him. He watches from the shadows, an immovable mountain whom even Bouya could not conquer.',
    stats: [
      { label: 'Strength', val: 'EX' },
      { label: 'Defense', val: 'EX' },
      { label: 'Dominance', val: 'S+' },
      { label: 'Record', val: 'Undefeated' }
    ]
  },
  {
    id: 'zetton',
    name: 'Katsutoshi Takeda (Zetton)',
    japaneseName: '武田 好誠',
    title: 'The Afro Warrior',
    faction: 'Suzuran Next-Gen',
    description: "Don't let the hair fool you. He hits like a truck. Proud disciple of Bouya who guards the rooftop with ferocity.",
    stats: [
      { label: 'Strength', val: 'S' },
      { label: 'Agility', val: 'A+' },
      { label: 'Tenacity', val: 'S' },
      { label: 'Generation', val: 'Freshman King' }
    ]
  },
  {
    id: 'bulldog',
    name: 'Osamu Furukawa (Bulldog)',
    japaneseName: '古川 修',
    title: 'The Loyal Fighter',
    faction: 'Kurotaki Alliance Leader',
    description: "Loyalty is everything. He'd die for his brothers. Giant with a heart of gold and fists of pure granite.",
    stats: [
      { label: 'Strength', val: 'S' },
      { label: 'Brotherhood', val: 'EX' },
      { label: 'Leadership', val: 'S+' },
      { label: 'Heart', val: 'Pure' }
    ]
  },
  {
    id: 'makoto',
    name: 'Makoto Sugihara',
    japaneseName: '杉原 誠',
    title: 'The Strategist',
    faction: 'Ebizuka Trio',
    description: 'Brains over brawn. Every fight needs a plan. Calm, methodical, and keeps the hot-headed Ebizuka crew in line.',
    stats: [
      { label: 'Tactics', val: 'S+' },
      { label: 'Technique', val: 'A+' },
      { label: 'Focus', val: 'S' },
      { label: 'Role', val: 'Brains' }
    ]
  },
  {
    id: 'guriko',
    name: 'Ryuushin Kunou',
    japaneseName: '九能 龍信',
    title: 'Head of The Front of Armament (4th Gen)',
    faction: 'T.F.O.A (The Front of Armament)',
    description: 'Wears the iconic black leather double-rider jacket with pride. A fierce boxer whose fists forged a legendary rivalry and brotherhood with Bouya.',
    stats: [
      { label: 'Boxing', val: 'S+' },
      { label: 'Grit', val: 'S+' },
      { label: 'Honor', val: 'EX' },
      { label: 'Crest', val: '4th Gen TFOA' }
    ]
  },
  {
    id: 'hanazawa',
    name: 'Tatsuya Bitou',
    japaneseName: '美藤 竜也',
    title: 'Apex of Housen Academy',
    faction: 'Housen Killer Corps',
    description: 'Golden-haired prodigy and supreme leader of rival school Housen Academy. Master of devastating high kicks and cold, calculating precision.',
    stats: [
      { label: 'Kicks', val: 'S+' },
      { label: 'Speed', val: 'S+' },
      { label: 'Aura', val: 'S' },
      { label: 'Rival', val: 'Housen #1' }
    ]
  },
  {
    id: 'hana',
    name: 'Hideto Bandou',
    japaneseName: '阪東 秀人',
    title: 'Biker Vanguard at Suzuran',
    faction: 'Bandou Faction / T.F.O.A',
    description: 'Brought the roar of motorcycle engines to Suzuran’s gates. Relentless, proud, and unyielding until the final bell.',
    stats: [
      { label: 'Ambition', val: 'S' },
      { label: 'Ferocity', val: 'A+' },
      { label: 'Resolve', val: 'S' },
      { label: 'Style', val: 'Rider Leather' }
    ]
  }
];

// ============================================================================
// 3. GLOBAL STATE
// ============================================================================

let currentCardDay = getCurrentDayName();
let currentWeeklyPageDay = getCurrentDayName();
let currentCalDate = new Date();
let currentFullCalDate = new Date();
let activeDetailClassId = null;

// ============================================================================
// 4. DATA PERSISTENCE & STORAGE HELPERS
// ============================================================================

function generateId() {
  return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 8);
}

function loadData(key, defaultValue) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultValue;
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error loading data for key ${key}:`, err);
    return defaultValue;
  }
}

function saveData(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error(`Error saving data for key ${key}:`, err);
  }
}

function getSchedule() {
  return loadData('suzuran_schedule', DEFAULT_SCHEDULE);
}

function saveSchedule(schedule) {
  saveData('suzuran_schedule', schedule);
}

function getAssignments() {
  return loadData('suzuran_assignments', DEFAULT_ASSIGNMENTS);
}

function saveAssignments(assignments) {
  saveData('suzuran_assignments', assignments);
}

function getNotes() {
  return loadData('suzuran_notes', DEFAULT_NOTES);
}

function saveNotes(notes) {
  saveData('suzuran_notes', notes);
}

// ============================================================================
// 5. TIME & DATE UTILITIES
// ============================================================================

function getCurrentDayName() {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  return days[new Date().getDay()];
}

function formatTime(timeStr) {
  if (!timeStr) return '';
  return timeStr;
}

function formatDate(date) {
  const d = (date instanceof Date) ? date : new Date(date);
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function formatShortDate(date) {
  const d = (date instanceof Date) ? date : new Date(date);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

function timeToMinutes(timeStr) {
  if (!timeStr) return 0;
  const parts = timeStr.split(':').map(Number);
  return (parts[0] || 0) * 60 + (parts[1] || 0);
}

function isCurrentlyInClass(classItem) {
  const today = getCurrentDayName();
  if (classItem.day.toLowerCase() !== today) return false;
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const start = timeToMinutes(classItem.startTime);
  const end = timeToMinutes(classItem.endTime);
  return currentMinutes >= start && currentMinutes < end;
}

function getClassStatus(classItem) {
  const currentDay = getCurrentDayName();
  if (classItem.day.toLowerCase() !== currentDay) {
    return 'upcoming';
  }
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const start = timeToMinutes(classItem.startTime);
  const end = timeToMinutes(classItem.endTime);

  if (currentMinutes >= start && currentMinutes < end) {
    return 'ongoing';
  } else if (currentMinutes < start) {
    return 'upcoming';
  } else {
    return 'completed';
  }
}

function getClassesForDay(schedule, day) {
  const targetDay = (day || '').toLowerCase();
  return (schedule || [])
    .filter(item => (item.day || '').toLowerCase() === targetDay)
    .sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));
}

function getNextClass(schedule) {
  if (!schedule || schedule.length === 0) return null;
  const daysOrder = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const now = new Date();
  const todayIdx = now.getDay();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  // Check today first
  const todayClasses = getClassesForDay(schedule, daysOrder[todayIdx]);
  for (const item of todayClasses) {
    const start = timeToMinutes(item.startTime);
    const end = timeToMinutes(item.endTime);
    // Ongoing class
    if (currentMinutes >= start && currentMinutes < end) {
      return { classItem: item, dayOffset: 0, isOngoing: true };
    }
    // Future class today
    if (start > currentMinutes) {
      return { classItem: item, dayOffset: 0, isOngoing: false };
    }
  }

  // Check next 6 days
  for (let offset = 1; offset <= 7; offset++) {
    const nextIdx = (todayIdx + offset) % 7;
    const nextClasses = getClassesForDay(schedule, daysOrder[nextIdx]);
    if (nextClasses.length > 0) {
      return { classItem: nextClasses[0], dayOffset: offset, isOngoing: false };
    }
  }

  return null;
}

function escapeHtml(text) {
  if (text === null || text === undefined) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ============================================================================
// 6. CLOCK & HEADER DISPLAY
// ============================================================================

function updateClock() {
  const now = new Date();
  const headerClock = document.getElementById('headerClock');
  if (headerClock) {
    headerClock.textContent = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  }

  const headerDate = document.getElementById('headerDate');
  if (headerDate) {
    headerDate.textContent = formatDate(now);
  }

  const headerDay = document.getElementById('headerDay');
  if (headerDay) {
    const dayCap = getCurrentDayName().toUpperCase();
    headerDay.textContent = `${dayCap} • Suzuran Term`;
  }

  const sidebarDate = document.getElementById('sidebarDate');
  if (sidebarDate) {
    sidebarDate.textContent = now.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    });
  }
}

function updateQuote() {
  const quoteElem = document.getElementById('sidebarQuote');
  if (quoteElem) {
    const randomIndex = Math.floor(Math.random() * QUOTES.length);
    quoteElem.textContent = QUOTES[randomIndex];
  }
}

// ============================================================================
// 7. NAVIGATION & SECTION ROUTING
// ============================================================================


// ============================================================================
// INTERACTIVE ANIMATION HELPERS (SECTION WIPE, TAB SLIDE, CARD CASCADE & TILT)
// ============================================================================

let lastWeekdayIdx = 0;
let transitionBannerTimer = null;

const SECTION_LABELS = {
  home: 'HOME • DASHBOARD OVERVIEW',
  weekly: 'WEEKLY CLASS SCHEDULE',
  calendar: 'MONTHLY ACADEMIC CALENDAR',
  assignments: 'ASSIGNMENTS & LAB TASKS',
  notes: 'PERSONAL FIELD NOTES',
  characters: 'SUZURAN WARRIOR ROSTER',
  settings: 'SYSTEM SETTINGS'
};

function triggerSectionTransitionBanner(cleanId) {
  const banner = document.getElementById('sectionTransitionBanner');
  const label = document.getElementById('transitionLabel');
  if (!banner || !label) return;

  label.textContent = SECTION_LABELS[cleanId] || cleanId.toUpperCase();
  banner.classList.add('show');
  if (transitionBannerTimer) clearTimeout(transitionBannerTimer);
  transitionBannerTimer = setTimeout(() => {
    banner.classList.remove('show');
  }, 1100);
}

function animateCascadeElements(selector, parentEl = document) {
  const items = parentEl.querySelectorAll(selector);
  items.forEach((el, idx) => {
    el.classList.remove('anim-cascade');
    // Force reflow so animation replays cleanly every time
    void el.offsetWidth;
    el.style.animationDelay = `${Math.min(idx * 45, 360)}ms`;
    el.classList.add('anim-cascade');
  });
}

function animateScheduleItems(container, direction = 'right') {
  if (!container) return;
  const clsName = direction === 'left' ? 'anim-slide-left' : 'anim-slide-right';
  const items = container.querySelectorAll('.class-item');
  items.forEach((el, idx) => {
    el.classList.remove('anim-slide-left', 'anim-slide-right');
    void el.offsetWidth;
    el.style.animationDelay = `${idx * 55}ms`;
    el.classList.add(clsName);
  });
}

function setupInteractiveCardTilt() {
  const cards = document.querySelectorAll('.card, .character-full-card');
  cards.forEach(card => {
    if (card.dataset.tiltBound === 'true') return;
    card.dataset.tiltBound = 'true';

    card.addEventListener('mousemove', e => {
      if (window.innerWidth <= 768) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -1.6;
      const rotateY = ((x - centerX) / centerX) * 1.6;
      card.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-2px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

function navigateTo(sectionId) {
  if (!sectionId) return;

  // Normalize section id (e.g. 'home' or '#home' -> 'home')
  const cleanId = sectionId.replace('#', '').toLowerCase();

  // Update Nav links
  const navLinks = document.querySelectorAll('.sidebar-nav a');
  navLinks.forEach(link => {
    const target = (link.getAttribute('data-section') || '').toLowerCase();
    if (target === cleanId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Update Sections
  const sections = document.querySelectorAll('.section');
  sections.forEach(sec => sec.classList.remove('active'));

  // Target section naming: section-home, section-weekly, etc.
  const targetSection = document.getElementById(`section${cleanId.charAt(0).toUpperCase() + cleanId.slice(1)}`);
  if (targetSection) {
    targetSection.classList.add('active');
  }

  // Close mobile sidebar
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  if (sidebar) sidebar.classList.remove('open');
  if (overlay) overlay.classList.remove('active');

  // Render specific section content
  switch (cleanId) {
    case 'home':
      renderDashboard();
      break;
    case 'weekly':
      renderWeeklyPage();
      break;
    case 'calendar':
      renderCalendarPage();
      break;
    case 'assignments':
      renderAssignmentsPage();
      break;
    case 'notes':
      renderNotesPage();
      break;
    case 'characters':
      renderCharactersPage();
      break;
    case 'settings':
      // Settings already bound
      break;
    default:
      renderDashboard();
      break;
  }

  // Trigger interactive manga transition banner & staggered card cascade
  triggerSectionTransitionBanner(cleanId);
  if (targetSection) {
    animateCascadeElements('.card, .character-full-card, .assignment-item, .note-item', targetSection);
  }
  setupInteractiveCardTilt();

  // Scroll to top of main content
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function setupNavigation() {
  // Sidebar nav link clicks
  const navLinks = document.querySelectorAll('.sidebar-nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const sec = link.getAttribute('data-section');
      navigateTo(sec);
    });
  });

  // Card links & roster banner links (e.g. "View All ->" in dashboard)
  const cardLinks = document.querySelectorAll('.card-link[data-section], .btn-roster-banner[data-section]');
  cardLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const sec = link.getAttribute('data-section');
      navigateTo(sec);
    });
  });

  // Sidebar Bouya portrait & top-right header portrait open Bouya's Character Modal
  const sidebarBouya = document.getElementById('sidebarBouyaTrigger');
  if (sidebarBouya) {
    sidebarBouya.addEventListener('click', () => openCharacterModal('bouya'));
  }
  const headerAvatar = document.getElementById('headerAvatarTrigger');
  if (headerAvatar) {
    headerAvatar.addEventListener('click', () => openCharacterModal('bouya'));
  }

  // Sidebar decorative chibi stickers open their respective Character Modal
  document.querySelectorAll('.sidebar-chibi-sticker').forEach(sticker => {
    sticker.addEventListener('click', () => {
      const charId = sticker.getAttribute('data-char-id') || 'bouya';
      openCharacterModal(charId);
    });
  });
}

function setupMobileSidebar() {
  const toggleBtn = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');

  if (toggleBtn && sidebar && overlay) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      overlay.classList.toggle('active');
    });

    overlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('active');
    });
  }
}

// ============================================================================
// 8. DASHBOARD RENDERING
// ============================================================================

function renderDashboard() {
  renderTodaysClasses();
  renderNextClass();
  renderWeeklyScheduleCard();
  renderCalendar();
  renderStudyStats();
  renderChibiCollection();
  renderAssignmentsPreview();
  renderNotesPreview();
}

function renderTodaysClasses() {
  const container = document.getElementById('todaysClassesList');
  const badge = document.getElementById('classCount');
  if (!container) return;

  const today = getCurrentDayName();
  const schedule = getSchedule();
  const classes = getClassesForDay(schedule, today);

  if (badge) {
    badge.textContent = classes.length;
  }

  if (classes.length === 0) {
    container.innerHTML = `<div class="empty-state">No classes scheduled for today. Rest up, warrior.</div>`;
    return;
  }

  container.innerHTML = classes.map(cls => {
    const status = getClassStatus(cls);
    return `
      <div class="class-item" data-class-id="${cls.id}">
        <div class="class-time">${formatTime(cls.startTime)} – ${formatTime(cls.endTime)}</div>
        <div class="class-info">
          <div class="class-subject">${escapeHtml(cls.subject)}</div>
          <div class="class-room">${escapeHtml(cls.room)}</div>
        </div>
        <div class="class-status ${status}">${status}</div>
      </div>
    `;
  }).join('');

  // Click handler to open class detail modal
  container.querySelectorAll('.class-item').forEach(el => {
    el.addEventListener('click', () => {
      const classId = el.getAttribute('data-class-id');
      openClassDetailModal(classId);
    });
  });
}

function renderNextClass() {
  const container = document.getElementById('nextClassContent');
  if (!container) return;

  const schedule = getSchedule();
  const nextInfo = getNextClass(schedule);

  if (!nextInfo) {
    container.innerHTML = `
      <div class="next-class-display">
        <div class="next-class-subject" style="font-size:16px;">All Clear</div>
        <div class="next-class-countdown">No classes scheduled. You're free.</div>
      </div>
    `;
    return;
  }

  const { classItem, dayOffset, isOngoing } = nextInfo;
  let countdownText = '';
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const startMinutes = timeToMinutes(classItem.startTime);
  const endMinutes = timeToMinutes(classItem.endTime);

  if (dayOffset === 0) {
    if (isOngoing) {
      const remaining = endMinutes - currentMinutes;
      const hrs = Math.floor(remaining / 60);
      const mins = remaining % 60;
      countdownText = `Ongoing • Ends in ${hrs > 0 ? hrs + 'h ' : ''}${mins}m`;
    } else {
      const diff = startMinutes - currentMinutes;
      const hrs = Math.floor(diff / 60);
      const mins = diff % 60;
      countdownText = `Starts in ${hrs > 0 ? hrs + 'h ' : ''}${mins}m`;
    }
  } else if (dayOffset === 1) {
    countdownText = `Tomorrow at ${classItem.startTime}`;
  } else {
    const dayCap = classItem.day.charAt(0).toUpperCase() + classItem.day.slice(1);
    countdownText = `${dayCap} at ${classItem.startTime}`;
  }

  container.innerHTML = `
    <div class="next-class-display" data-class-id="${classItem.id}" style="cursor: pointer;">
      <div class="next-class-subject">${escapeHtml(classItem.subject)}</div>
      <div class="next-class-time">${classItem.startTime} – ${classItem.endTime}</div>
      <div class="next-class-room">${escapeHtml(classItem.room)}</div>
      <div class="next-class-countdown" id="nextClassCountdown">${countdownText}</div>
    </div>
  `;

  const displayEl = container.querySelector('.next-class-display');
  if (displayEl) {
    displayEl.addEventListener('click', () => {
      openClassDetailModal(classItem.id);
    });
  }
}

function renderWeeklyScheduleCard() {
  const tabsContainer = document.getElementById('weekdayTabs');
  const listContainer = document.getElementById('weeklyScheduleList');
  if (!tabsContainer || !listContainer) return;

  // Setup tabs
  const tabButtons = tabsContainer.querySelectorAll('.tab-btn');
  tabButtons.forEach(btn => {
    const day = btn.getAttribute('data-day');
    if (day === currentCardDay) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }

    btn.onclick = () => {
      const daysOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
      const prevIdx = daysOrder.indexOf(currentCardDay);
      const nextIdx = daysOrder.indexOf(day);
      const dir = nextIdx >= prevIdx ? 'right' : 'left';
      currentCardDay = day;
      renderWeeklyScheduleCard();
      animateScheduleItems(document.getElementById('weeklyScheduleList'), dir);
    };
  });

  // Render list
  const schedule = getSchedule();
  const classes = getClassesForDay(schedule, currentCardDay);

  if (classes.length === 0) {
    listContainer.innerHTML = `<div class="empty-state">No classes scheduled on ${currentCardDay.toUpperCase()}.</div>`;
    return;
  }

  listContainer.innerHTML = classes.map(cls => {
    const status = getClassStatus(cls);
    return `
      <div class="class-item" data-class-id="${cls.id}">
        <div class="class-time">${formatTime(cls.startTime)} – ${formatTime(cls.endTime)}</div>
        <div class="class-info">
          <div class="class-subject">${escapeHtml(cls.subject)}</div>
          <div class="class-room">${escapeHtml(cls.room)}</div>
        </div>
        <div class="class-status ${status}">${status}</div>
      </div>
    `;
  }).join('');

  listContainer.querySelectorAll('.class-item').forEach(el => {
    el.addEventListener('click', () => {
      const classId = el.getAttribute('data-class-id');
      openClassDetailModal(classId);
    });
  });
}

function renderCalendar(year, month) {
  if (year !== undefined && month !== undefined) {
    currentCalDate = new Date(year, month, 1);
  }

  const titleEl = document.getElementById('calMonthYear');
  const gridEl = document.getElementById('calGrid');
  if (!titleEl || !gridEl) return;

  const y = currentCalDate.getFullYear();
  const m = currentCalDate.getMonth();

  titleEl.textContent = currentCalDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });

  const firstDayIndex = new Date(y, m, 1).getDay(); // 0 is Sunday
  const lastDay = new Date(y, m + 1, 0).getDate();
  const prevLastDay = new Date(y, m, 0).getDate();

  const schedule = getSchedule();
  const now = new Date();
  const isCurrentMonth = (now.getFullYear() === y && now.getMonth() === m);
  const todayDate = now.getDate();

  const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  let html = '';

  // Previous month trailing days
  for (let x = firstDayIndex; x > 0; x--) {
    html += `<div class="cal-day other-month">${prevLastDay - x + 1}</div>`;
  }

  // Current month days
  for (let d = 1; d <= lastDay; d++) {
    const dayOfWeek = daysOfWeek[new Date(y, m, d).getDay()];
    const hasClass = schedule.some(item => (item.day || '').toLowerCase() === dayOfWeek);
    const isToday = isCurrentMonth && d === todayDate;

    let classNames = 'cal-day';
    if (isToday) classNames += ' today';
    if (hasClass) classNames += ' has-class';

    html += `<div class="${classNames}" data-day="${dayOfWeek}" data-date="${d}">${d}</div>`;
  }

  // Next month leading days (fill row up to 35 or 42)
  const totalCells = firstDayIndex + lastDay;
  const remainingCells = (totalCells % 7 === 0) ? 0 : 7 - (totalCells % 7);
  for (let j = 1; j <= remainingCells; j++) {
    html += `<div class="cal-day other-month">${j}</div>`;
  }

  gridEl.innerHTML = html;

  // Day click -> filter weekly view to that day
  gridEl.querySelectorAll('.cal-day:not(.other-month)').forEach(dayEl => {
    dayEl.addEventListener('click', () => {
      const day = dayEl.getAttribute('data-day');
      if (day) {
        gridEl.querySelectorAll('.cal-day').forEach(c => c.classList.remove('selected-day'));
        dayEl.classList.add('selected-day');
        currentCardDay = day;
        renderWeeklyScheduleCard();
        const weeklyList = document.getElementById('weeklyScheduleList');
        animateScheduleItems(weeklyList, 'right');
        const weeklyCard = document.querySelector('.card-weekly-schedule');
        if (weeklyCard) {
          weeklyCard.classList.remove('pulse-highlight');
          void weeklyCard.offsetWidth;
          weeklyCard.classList.add('pulse-highlight');
        }
      }
    });
  });
}

function renderStudyStats() {
  const schedule = getSchedule();
  const assignments = getAssignments();

  // Total classes
  const totalClassesEl = document.getElementById('statTotalClasses');
  if (totalClassesEl) {
    totalClassesEl.textContent = schedule.length;
  }

  // Hours per week
  let totalMinutes = 0;
  const dayCounts = {
    monday: 0,
    tuesday: 0,
    wednesday: 0,
    thursday: 0,
    friday: 0,
    saturday: 0,
    sunday: 0
  };

  schedule.forEach(item => {
    const duration = timeToMinutes(item.endTime) - timeToMinutes(item.startTime);
    if (duration > 0) totalMinutes += duration;
    const day = (item.day || '').toLowerCase();
    if (dayCounts[day] !== undefined) {
      dayCounts[day]++;
    }
  });

  const hours = (totalMinutes / 60).toFixed(1);
  const hoursEl = document.getElementById('statHoursWeek');
  if (hoursEl) {
    hoursEl.textContent = `${hours}h`;
  }

  // Busiest day
  let busiest = '-';
  let maxCount = 0;
  Object.keys(dayCounts).forEach(day => {
    if (dayCounts[day] > maxCount) {
      maxCount = dayCounts[day];
      busiest = day.charAt(0).toUpperCase() + day.slice(1);
    }
  });

  const busiestEl = document.getElementById('statBusiestDay');
  if (busiestEl) {
    busiestEl.textContent = busiest;
  }

  // Pending assignments
  const pendingCount = assignments.filter(a => !a.completed).length;
  const assignEl = document.getElementById('statAssignmentsDue');
  if (assignEl) {
    assignEl.textContent = pendingCount;
  }

  // Stat bars
  const maxDayVal = Math.max(...Object.values(dayCounts), 1);
  Object.keys(dayCounts).forEach(day => {
    const bar = document.querySelector(`.stat-bar-fill[data-day="${day}"]`);
    if (bar) {
      const pct = (dayCounts[day] / maxDayVal) * 100;
      bar.style.width = `${pct}%`;
    }
  });
}

const CHARACTER_ASSETS = {
  bouya: { chibi: 'assets/chibi-character-01.png', ref: 'assets/ref-char-01.png', shortName: 'Bouya' },
  rindaman: { chibi: 'assets/chibi-character-02.png', ref: 'assets/ref-char-02.png', shortName: 'Rindaman' },
  zetton: { chibi: 'assets/chibi-character-07.png', ref: 'assets/ref-char-03.png', shortName: 'Zetton' },
  bulldog: { chibi: 'assets/chibi-character-08.png', ref: 'assets/ref-char-07.png', shortName: 'Bulldog' },
  makoto: { chibi: 'assets/chibi-character-06.png', ref: 'assets/ref-char-06.png', shortName: 'Makoto' },
  guriko: { chibi: 'assets/chibi-character-04.png', ref: 'assets/ref-char-04.png', shortName: 'Ryuushin' },
  hanazawa: { chibi: 'assets/chibi-character-05.png', ref: 'assets/ref-char-05.png', shortName: 'Bitou' },
  hana: { chibi: 'assets/chibi-character-03.png', ref: 'assets/ref-char-08.png', shortName: 'Bandou' }
};

function renderChibiCollection() {
  const container = document.getElementById('chibiGrid');
  if (!container) return;

  container.innerHTML = CHARACTERS.map((c, idx) => {
    const asset = CHARACTER_ASSETS[c.id] || {
      chibi: `assets/chibi-character-0${(idx % 8) + 1}.png`,
      ref: `assets/ref-char-0${(idx % 8) + 1}.png`,
      shortName: c.name.split(' ')[0]
    };
    return `
      <div class="chibi-card" data-char-id="${c.id}" title="${escapeHtml(c.name)} (${escapeHtml(c.title)})">
        <div class="chibi-avatar">
          <img src="${asset.chibi}" alt="${escapeHtml(c.name)} Chibi Sticker">
        </div>
        <div class="chibi-name">${escapeHtml(asset.shortName)}</div>
      </div>
    `;
  }).join('');

  container.querySelectorAll('.chibi-card').forEach(card => {
    card.addEventListener('click', () => {
      const charId = card.getAttribute('data-char-id');
      openCharacterModal(charId);
    });
  });
}

function renderAssignmentsPreview() {
  const container = document.getElementById('assignmentsPreviewList');
  const countBadge = document.getElementById('assignmentCount');
  if (!container) return;

  const assignments = getAssignments();
  const pending = assignments.filter(a => !a.completed);

  if (countBadge) {
    countBadge.textContent = pending.length;
  }

  if (assignments.length === 0) {
    container.innerHTML = `<div class="empty-state">No assignments recorded.</div>`;
    return;
  }

  // Show top 3 pending or latest
  const previewList = [...assignments]
    .sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1))
    .slice(0, 3);

  container.innerHTML = previewList.map(a => `
    <div class="class-item" style="cursor: pointer;" data-assignment-id="${a.id}">
      <div class="class-time" style="min-width: 60px;">${formatShortDate(a.dueDate)}</div>
      <div class="class-info">
        <div class="class-subject" style="${a.completed ? 'text-decoration: line-through; opacity: 0.6;' : ''}">
          ${escapeHtml(a.title)}
        </div>
        <div class="class-room">${escapeHtml(a.subject || 'General')}</div>
      </div>
      <div class="class-status ${a.completed ? 'completed' : 'upcoming'}">
        ${a.completed ? 'DONE' : 'PENDING'}
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.class-item').forEach(el => {
    el.addEventListener('click', () => {
      navigateTo('assignments');
    });
  });
}

function renderNotesPreview() {
  const container = document.getElementById('notesPreviewList');
  if (!container) return;

  const notes = getNotes();
  if (notes.length === 0) {
    container.innerHTML = `<div class="empty-state">No personal notes yet.</div>`;
    return;
  }

  const previewList = [...notes].slice(0, 3);
  container.innerHTML = previewList.map(n => `
    <div class="class-item" style="cursor: pointer;" data-note-id="${n.id}">
      <div class="class-info">
        <div class="class-subject">${escapeHtml(n.title)}</div>
        <div class="class-room" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
          ${escapeHtml(n.content)}
        </div>
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.class-item').forEach(el => {
    el.addEventListener('click', () => {
      navigateTo('notes');
    });
  });
}

// ============================================================================
// 9. WEEKLY SCHEDULE FULL PAGE
// ============================================================================

function renderWeeklyPage() {
  const tabsContainer = document.getElementById('weeklyPageTabs');
  const listContainer = document.getElementById('weeklyPageList');
  if (!tabsContainer || !listContainer) return;

  const tabButtons = tabsContainer.querySelectorAll('.tab-btn');
  tabButtons.forEach(btn => {
    const day = btn.getAttribute('data-day');
    if (day === currentWeeklyPageDay) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }

    btn.onclick = () => {
      const daysOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
      const prevIdx = daysOrder.indexOf(currentWeeklyPageDay);
      const nextIdx = daysOrder.indexOf(day);
      const dir = nextIdx >= prevIdx ? 'right' : 'left';
      currentWeeklyPageDay = day;
      renderWeeklyPage();
      animateScheduleItems(document.getElementById('weeklyPageList'), dir);
    };
  });

  const schedule = getSchedule();
  const classes = getClassesForDay(schedule, currentWeeklyPageDay);

  if (classes.length === 0) {
    listContainer.innerHTML = `<div class="empty-state">No classes scheduled on ${currentWeeklyPageDay.toUpperCase()}. Hit "+ Add New Class" below to add one.</div>`;
    return;
  }

  listContainer.innerHTML = classes.map(cls => {
    const status = getClassStatus(cls);
    return `
      <div class="class-item" data-class-id="${cls.id}" style="padding: 14px 16px;">
        <div class="class-time" style="font-size: 14px;">${formatTime(cls.startTime)} – ${formatTime(cls.endTime)}</div>
        <div class="class-info">
          <div class="class-subject" style="font-size: 15px;">${escapeHtml(cls.subject)}</div>
          <div class="class-room">Room: ${escapeHtml(cls.room)}</div>
        </div>
        <div class="class-status ${status}">${status}</div>
      </div>
    `;
  }).join('');

  listContainer.querySelectorAll('.class-item').forEach(el => {
    el.addEventListener('click', () => {
      const classId = el.getAttribute('data-class-id');
      openClassDetailModal(classId);
    });
  });
}

// ============================================================================
// 10. CALENDAR FULL PAGE
// ============================================================================

function renderCalendarPage(year, month) {
  if (year !== undefined && month !== undefined) {
    currentFullCalDate = new Date(year, month, 1);
  }

  const titleEl = document.getElementById('calFullMonthYear');
  const gridEl = document.getElementById('calFullGrid');
  if (!titleEl || !gridEl) return;

  const y = currentFullCalDate.getFullYear();
  const m = currentFullCalDate.getMonth();

  titleEl.textContent = currentFullCalDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });

  const firstDayIndex = new Date(y, m, 1).getDay();
  const lastDay = new Date(y, m + 1, 0).getDate();
  const prevLastDay = new Date(y, m, 0).getDate();

  const schedule = getSchedule();
  const now = new Date();
  const isCurrentMonth = (now.getFullYear() === y && now.getMonth() === m);
  const todayDate = now.getDate();

  const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  let html = '';

  for (let x = firstDayIndex; x > 0; x--) {
    html += `<div class="cal-day other-month">${prevLastDay - x + 1}</div>`;
  }

  for (let d = 1; d <= lastDay; d++) {
    const dayOfWeek = daysOfWeek[new Date(y, m, d).getDay()];
    const hasClass = schedule.some(item => (item.day || '').toLowerCase() === dayOfWeek);
    const isToday = isCurrentMonth && d === todayDate;

    let classNames = 'cal-day';
    if (isToday) classNames += ' today';
    if (hasClass) classNames += ' has-class';

    html += `<div class="${classNames}" data-day="${dayOfWeek}" data-date="${d}">${d}</div>`;
  }

  const totalCells = firstDayIndex + lastDay;
  const remainingCells = (totalCells % 7 === 0) ? 0 : 7 - (totalCells % 7);
  for (let j = 1; j <= remainingCells; j++) {
    html += `<div class="cal-day other-month">${j}</div>`;
  }

  gridEl.innerHTML = html;

  // Day click on full calendar
  gridEl.querySelectorAll('.cal-day:not(.other-month)').forEach(dayEl => {
    dayEl.addEventListener('click', () => {
      const day = dayEl.getAttribute('data-day');
      if (day) {
        currentWeeklyPageDay = day;
        navigateTo('weekly');
      }
    });
  });
}

// ============================================================================
// 11. ASSIGNMENTS SECTION & CRUD
// ============================================================================

function renderAssignmentsPage(filter) {
  const container = document.getElementById('assignmentsList');
  const filterSelect = document.getElementById('assignmentFilter');
  if (!container) return;

  const currentFilter = filter || (filterSelect ? filterSelect.value : 'all');
  const assignments = getAssignments();

  let filtered = [...assignments];
  if (currentFilter === 'pending') {
    filtered = filtered.filter(a => !a.completed);
  } else if (currentFilter === 'completed') {
    filtered = filtered.filter(a => a.completed);
  }

  // Sort by due date
  filtered.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  if (filtered.length === 0) {
    container.innerHTML = `<div class="empty-state">No assignments found for filter "${currentFilter}".</div>`;
    return;
  }

  container.innerHTML = filtered.map(a => `
    <div class="assignment-item ${a.completed ? 'completed' : ''}" data-assignment-id="${a.id}">
      <input type="checkbox" class="assignment-checkbox" data-id="${a.id}" ${a.completed ? 'checked' : ''} aria-label="Toggle completed">
      <div class="assignment-info">
        <div class="assignment-title">${escapeHtml(a.title)}</div>
        <div class="assignment-meta">
          <strong>${escapeHtml(a.subject || 'General')}</strong> • Due: ${formatShortDate(a.dueDate)}
        </div>
        ${a.description ? `<p style="font-size:12px; color:var(--concrete-gray); margin-top:4px;">${escapeHtml(a.description)}</p>` : ''}
      </div>
      <div class="assignment-actions">
        <button class="btn-edit-assign" data-id="${a.id}" title="Edit Assignment">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 20h9"></path>
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
          </svg>
        </button>
        <button class="btn-del-assign" data-id="${a.id}" title="Delete Assignment">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
      </div>
    </div>
  `).join('');

  // Checkbox toggle listeners
  container.querySelectorAll('.assignment-checkbox').forEach(cb => {
    cb.addEventListener('change', () => {
      const id = cb.getAttribute('data-id');
      toggleAssignment(id);
    });
  });

  // Edit listeners
  container.querySelectorAll('.btn-edit-assign').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      openAssignmentModal(id);
    });
  });

  // Delete listeners
  container.querySelectorAll('.btn-del-assign').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      deleteAssignment(id);
    });
  });
}

function openAssignmentModal(assignmentId = null) {
  const modal = document.getElementById('assignmentModal');
  const titleEl = document.getElementById('assignmentModalTitle');
  const idInput = document.getElementById('assignmentFormId');
  const titleInput = document.getElementById('assignmentFormTitle');
  const subjectInput = document.getElementById('assignmentFormSubject');
  const dueInput = document.getElementById('assignmentFormDue');
  const descInput = document.getElementById('assignmentFormDesc');

  if (!modal) return;

  if (assignmentId) {
    const list = getAssignments();
    const item = list.find(a => a.id === assignmentId);
    if (item) {
      if (titleEl) titleEl.textContent = 'Edit Assignment';
      if (idInput) idInput.value = item.id;
      if (titleInput) titleInput.value = item.title || '';
      if (subjectInput) subjectInput.value = item.subject || '';
      if (dueInput) dueInput.value = item.dueDate || '';
      if (descInput) descInput.value = item.description || '';
    }
  } else {
    if (titleEl) titleEl.textContent = 'Add Assignment';
    if (idInput) idInput.value = '';
    if (titleInput) titleInput.value = '';
    if (subjectInput) subjectInput.value = '';
    // Default due date to today
    const nowIso = new Date().toISOString().split('T')[0];
    if (dueInput) dueInput.value = nowIso;
    if (descInput) descInput.value = '';
  }

  modal.classList.add('active');
}

function handleAssignmentSubmit(e) {
  e.preventDefault();
  const idInput = document.getElementById('assignmentFormId');
  const titleInput = document.getElementById('assignmentFormTitle');
  const subjectInput = document.getElementById('assignmentFormSubject');
  const dueInput = document.getElementById('assignmentFormDue');
  const descInput = document.getElementById('assignmentFormDesc');

  const title = (titleInput ? titleInput.value : '').trim();
  const subject = (subjectInput ? subjectInput.value : '').trim();
  const dueDate = dueInput ? dueInput.value : '';
  const description = (descInput ? descInput.value : '').trim();

  if (!title || !dueDate) {
    alert('Please fill in title and due date.');
    return;
  }

  const assignments = getAssignments();
  const existingId = idInput ? idInput.value : '';

  if (existingId) {
    const index = assignments.findIndex(a => a.id === existingId);
    if (index !== -1) {
      assignments[index] = {
        ...assignments[index],
        title,
        subject,
        dueDate,
        description
      };
    }
  } else {
    assignments.push({
      id: generateId(),
      title,
      subject,
      dueDate,
      description,
      completed: false,
      createdAt: new Date().toISOString()
    });
  }

  saveAssignments(assignments);
  closeAllModals();
  renderAssignmentsPage();
  renderAssignmentsPreview();
  renderStudyStats();
}

function toggleAssignment(assignmentId) {
  const assignments = getAssignments();
  const item = assignments.find(a => a.id === assignmentId);
  if (item) {
    item.completed = !item.completed;
    saveAssignments(assignments);
    renderAssignmentsPage();
    renderAssignmentsPreview();
    renderStudyStats();
  }
}

function deleteAssignment(assignmentId) {
  if (confirm('Delete this assignment from your schedule?')) {
    let assignments = getAssignments();
    assignments = assignments.filter(a => a.id !== assignmentId);
    saveAssignments(assignments);
    renderAssignmentsPage();
    renderAssignmentsPreview();
    renderStudyStats();
  }
}

// ============================================================================
// 12. NOTES SECTION & CRUD
// ============================================================================

function renderNotesPage() {
  const container = document.getElementById('notesList');
  if (!container) return;

  const notes = getNotes();
  if (notes.length === 0) {
    container.innerHTML = `<div class="empty-state">No notes recorded. Click "+ New Note" to jot down your battle strategies or study points.</div>`;
    return;
  }

  container.innerHTML = notes.map(n => `
    <div class="note-item" data-note-id="${n.id}">
      <div class="note-title">${escapeHtml(n.title)}</div>
      <div class="note-preview" style="white-space: pre-line; max-height: 80px;">${escapeHtml(n.content)}</div>
      <div class="note-date">${formatDate(n.createdAt || Date.now())}</div>
      <div class="note-actions">
        <button class="btn-secondary btn-edit-note" data-id="${n.id}">Edit</button>
        <button class="btn-danger btn-del-note" data-id="${n.id}">Delete</button>
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.btn-edit-note').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      openNoteModal(id);
    });
  });

  container.querySelectorAll('.btn-del-note').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      deleteNote(id);
    });
  });
}

function openNoteModal(noteId = null) {
  const modal = document.getElementById('noteModal');
  const titleEl = document.getElementById('noteModalTitle');
  const idInput = document.getElementById('noteFormId');
  const titleInput = document.getElementById('noteFormTitle');
  const contentInput = document.getElementById('noteFormContent');

  if (!modal) return;

  if (noteId) {
    const list = getNotes();
    const item = list.find(n => n.id === noteId);
    if (item) {
      if (titleEl) titleEl.textContent = 'Edit Note';
      if (idInput) idInput.value = item.id;
      if (titleInput) titleInput.value = item.title || '';
      if (contentInput) contentInput.value = item.content || '';
    }
  } else {
    if (titleEl) titleEl.textContent = 'Add Note';
    if (idInput) idInput.value = '';
    if (titleInput) titleInput.value = '';
    if (contentInput) contentInput.value = '';
  }

  modal.classList.add('active');
}

function handleNoteSubmit(e) {
  e.preventDefault();
  const idInput = document.getElementById('noteFormId');
  const titleInput = document.getElementById('noteFormTitle');
  const contentInput = document.getElementById('noteFormContent');

  const title = (titleInput ? titleInput.value : '').trim();
  const content = (contentInput ? contentInput.value : '').trim();

  if (!title || !content) {
    alert('Please fill in both title and content.');
    return;
  }

  const notes = getNotes();
  const existingId = idInput ? idInput.value : '';

  if (existingId) {
    const index = notes.findIndex(n => n.id === existingId);
    if (index !== -1) {
      notes[index] = {
        ...notes[index],
        title,
        content
      };
    }
  } else {
    notes.unshift({
      id: generateId(),
      title,
      content,
      createdAt: new Date().toISOString()
    });
  }

  saveNotes(notes);
  closeAllModals();
  renderNotesPage();
  renderNotesPreview();
}

function deleteNote(noteId) {
  if (confirm('Delete this note permanently?')) {
    let notes = getNotes();
    notes = notes.filter(n => n.id !== noteId);
    saveNotes(notes);
    renderNotesPage();
    renderNotesPreview();
  }
}

// ============================================================================
// 13. CHARACTERS PAGE & MODAL
// ============================================================================

function renderCharactersPage() {
  const container = document.getElementById('charactersGrid');
  if (!container) return;

  container.innerHTML = CHARACTERS.map((c, idx) => {
    const asset = CHARACTER_ASSETS[c.id] || {
      chibi: `assets/chibi-character-0${(idx % 8) + 1}.png`,
      ref: `assets/ref-char-0${(idx % 8) + 1}.png`
    };
    return `
      <div class="character-full-card" data-char-id="${c.id}">
        <div class="character-sticker-pair">
          <img src="${asset.chibi}" alt="${escapeHtml(c.name)} Chibi Sticker" class="character-chibi-img">
          <img src="${asset.ref}" alt="${escapeHtml(c.name)} Manga Reference" class="character-ref-thumb" title="Original Manga Reference Artwork">
        </div>
        <div class="character-full-name">${escapeHtml(c.japaneseName)} • ${escapeHtml(c.name)}</div>
        <div class="character-full-title">${escapeHtml(c.title)}</div>
        <span class="character-faction-badge">${escapeHtml(c.faction)}</span>
        <div class="character-full-desc">${escapeHtml(c.description)}</div>
      </div>
    `;
  }).join('');

  container.querySelectorAll('.character-full-card').forEach(card => {
    card.addEventListener('click', () => {
      const charId = card.getAttribute('data-char-id');
      openCharacterModal(charId);
    });
  });
}

function openCharacterModal(characterId) {
  const character = CHARACTERS.find(c => c.id === characterId);
  if (!character) return;

  const modal = document.getElementById('characterModal');
  const avatarEl = document.getElementById('charModalAvatar');
  const nameEl = document.getElementById('charModalName');
  const titleEl = document.getElementById('charModalTitle');
  const descEl = document.getElementById('charModalDesc');
  const statsEl = document.getElementById('charModalStats');

  if (!modal) return;

  const asset = CHARACTER_ASSETS[character.id] || {
    chibi: 'assets/chibi-character-01.png',
    ref: 'assets/ref-char-01.png'
  };

  if (avatarEl) {
    avatarEl.innerHTML = `
      <img src="${asset.chibi}" alt="${escapeHtml(character.name)} Chibi Sticker" class="char-modal-chibi">
      <img src="${asset.ref}" alt="${escapeHtml(character.name)} Manga Art" class="char-modal-ref">
    `;
  }
  if (nameEl) nameEl.textContent = `${character.japaneseName} • ${character.name}`;
  if (titleEl) titleEl.textContent = `${character.title} • ${character.faction}`;
  if (descEl) descEl.textContent = character.description;

  if (statsEl) {
    statsEl.innerHTML = (character.stats || []).map(s => `
      <span class="char-stat-pill"><strong>${escapeHtml(s.label)}:</strong> ${escapeHtml(s.val)}</span>
    `).join('');
  }

  modal.classList.add('active');
}

// ============================================================================
// 14. CLASS SCHEDULE CRUD & MODALS
// ============================================================================

function openClassDetailModal(classId) {
  const schedule = getSchedule();
  const cls = schedule.find(s => s.id === classId);
  if (!cls) return;

  activeDetailClassId = classId;

  const modal = document.getElementById('classDetailModal');
  const subjectEl = document.getElementById('modalClassSubject');
  const dayEl = document.getElementById('modalClassDay');
  const timeEl = document.getElementById('modalClassTime');
  const roomEl = document.getElementById('modalClassRoom');

  if (!modal) return;

  const dayCap = (cls.day || '').charAt(0).toUpperCase() + (cls.day || '').slice(1);
  if (subjectEl) subjectEl.textContent = cls.subject || 'Class Detail';
  if (dayEl) dayEl.textContent = dayCap;
  if (timeEl) timeEl.textContent = `${cls.startTime} – ${cls.endTime}`;
  if (roomEl) roomEl.textContent = cls.room || '-';

  modal.classList.add('active');
}

function openAddEditClassModal(classId = null) {
  closeAllModals();

  const modal = document.getElementById('addEditClassModal');
  const titleEl = document.getElementById('addEditClassTitle');
  const idInput = document.getElementById('classFormId');
  const subjectInput = document.getElementById('classFormSubject');
  const daySelect = document.getElementById('classFormDay');
  const startInput = document.getElementById('classFormStart');
  const endInput = document.getElementById('classFormEnd');
  const roomInput = document.getElementById('classFormRoom');

  if (!modal) return;

  if (classId) {
    const schedule = getSchedule();
    const cls = schedule.find(s => s.id === classId);
    if (cls) {
      if (titleEl) titleEl.textContent = 'Edit Class';
      if (idInput) idInput.value = cls.id;
      if (subjectInput) subjectInput.value = cls.subject || '';
      if (daySelect) daySelect.value = (cls.day || 'monday').toLowerCase();
      if (startInput) startInput.value = cls.startTime || '';
      if (endInput) endInput.value = cls.endTime || '';
      if (roomInput) roomInput.value = cls.room || '';
    }
  } else {
    if (titleEl) titleEl.textContent = 'Add New Class';
    if (idInput) idInput.value = '';
    if (subjectInput) subjectInput.value = '';
    if (daySelect) daySelect.value = currentCardDay || 'monday';
    if (startInput) startInput.value = '09:00';
    if (endInput) endInput.value = '10:40';
    if (roomInput) roomInput.value = '';
  }

  modal.classList.add('active');
}

function handleClassFormSubmit(e) {
  e.preventDefault();
  const idInput = document.getElementById('classFormId');
  const subjectInput = document.getElementById('classFormSubject');
  const daySelect = document.getElementById('classFormDay');
  const startInput = document.getElementById('classFormStart');
  const endInput = document.getElementById('classFormEnd');
  const roomInput = document.getElementById('classFormRoom');

  const subject = (subjectInput ? subjectInput.value : '').trim();
  const day = (daySelect ? daySelect.value : 'monday').toLowerCase();
  const startTime = startInput ? startInput.value : '';
  const endTime = endInput ? endInput.value : '';
  const room = (roomInput ? roomInput.value : '').trim();

  if (!subject || !startTime || !endTime || !room) {
    alert('Please complete all class fields.');
    return;
  }

  if (timeToMinutes(endTime) <= timeToMinutes(startTime)) {
    alert('End time must be after start time.');
    return;
  }

  const schedule = getSchedule();
  const existingId = idInput ? idInput.value : '';

  if (existingId) {
    const index = schedule.findIndex(s => s.id === existingId);
    if (index !== -1) {
      schedule[index] = {
        id: existingId,
        day,
        subject,
        startTime,
        endTime,
        room
      };
    }
  } else {
    schedule.push({
      id: generateId(),
      day,
      subject,
      startTime,
      endTime,
      room
    });
  }

  saveSchedule(schedule);
  closeAllModals();
  renderDashboard();
  renderWeeklyPage();
  renderCalendarPage();
}

function deleteClass(classId) {
  if (!classId) return;
  if (confirm('Are you sure you want to delete this class from your schedule?')) {
    let schedule = getSchedule();
    schedule = schedule.filter(s => s.id !== classId);
    saveSchedule(schedule);
    closeAllModals();
    renderDashboard();
    renderWeeklyPage();
    renderCalendarPage();
  }
}

// ============================================================================
// 15. SEARCH MODAL & ENGINE
// ============================================================================

function setupSearch() {
  const searchBtn = document.getElementById('searchBtn');
  const searchModal = document.getElementById('searchModal');
  const searchInput = document.getElementById('searchInput');

  if (searchBtn && searchModal) {
    searchBtn.addEventListener('click', () => {
      searchModal.classList.add('active');
      if (searchInput) {
        searchInput.value = '';
        searchInput.focus();
        performSearch('');
      }
    });
  }

  // Ctrl+K keyboard shortcut
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
      e.preventDefault();
      if (searchModal) {
        searchModal.classList.add('active');
        if (searchInput) {
          searchInput.focus();
          performSearch(searchInput.value);
        }
      }
    }
  });

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      performSearch(searchInput.value);
    });
  }
}

function performSearch(query) {
  const resultsContainer = document.getElementById('searchResults');
  if (!resultsContainer) return;

  const q = (query || '').trim().toLowerCase();
  if (!q) {
    resultsContainer.innerHTML = `<div class="empty-state">Type keywords to search through classes, assignments, and notes...</div>`;
    return;
  }

  const schedule = getSchedule();
  const assignments = getAssignments();
  const notes = getNotes();

  const results = [];

  // Match Schedule
  schedule.forEach(item => {
    if (
      (item.subject && item.subject.toLowerCase().includes(q)) ||
      (item.room && item.room.toLowerCase().includes(q)) ||
      (item.day && item.day.toLowerCase().includes(q))
    ) {
      results.push({
        type: 'CLASS',
        title: item.subject,
        detail: `${item.day.toUpperCase()} • ${item.startTime} - ${item.endTime} | Room: ${item.room}`,
        action: () => {
          closeAllModals();
          openClassDetailModal(item.id);
        }
      });
    }
  });

  // Match Assignments
  assignments.forEach(item => {
    if (
      (item.title && item.title.toLowerCase().includes(q)) ||
      (item.subject && item.subject.toLowerCase().includes(q)) ||
      (item.description && item.description.toLowerCase().includes(q))
    ) {
      results.push({
        type: 'ASSIGNMENT',
        title: item.title,
        detail: `${item.subject || 'General'} • Due: ${formatShortDate(item.dueDate)} (${item.completed ? 'Done' : 'Pending'})`,
        action: () => {
          closeAllModals();
          navigateTo('assignments');
        }
      });
    }
  });

  // Match Notes
  notes.forEach(item => {
    if (
      (item.title && item.title.toLowerCase().includes(q)) ||
      (item.content && item.content.toLowerCase().includes(q))
    ) {
      results.push({
        type: 'NOTE',
        title: item.title,
        detail: item.content.substring(0, 70) + (item.content.length > 70 ? '...' : ''),
        action: () => {
          closeAllModals();
          navigateTo('notes');
        }
      });
    }
  });

  if (results.length === 0) {
    resultsContainer.innerHTML = `<div class="empty-state">No matching results for "${escapeHtml(q)}".</div>`;
    return;
  }

  resultsContainer.innerHTML = results.map((r, index) => `
    <div class="search-result-item" data-search-index="${index}">
      <div class="search-result-type">${r.type}</div>
      <div class="search-result-title">${escapeHtml(r.title)}</div>
      <div class="search-result-detail">${escapeHtml(r.detail)}</div>
    </div>
  `).join('');

  resultsContainer.querySelectorAll('.search-result-item').forEach(el => {
    el.addEventListener('click', () => {
      const idx = parseInt(el.getAttribute('data-search-index'), 10);
      if (results[idx] && typeof results[idx].action === 'function') {
        results[idx].action();
      }
    });
  });
}

// ============================================================================
// 16. SETTINGS (THEME, EXPORT, IMPORT, RESET, CLEAR)
// ============================================================================

function loadThemePreference() {
  const theme = localStorage.getItem('suzuran_theme');
  const toggle = document.getElementById('darkModeToggle');

  if (theme === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
    if (toggle) toggle.checked = true;
  } else {
    document.body.removeAttribute('data-theme');
    if (toggle) toggle.checked = false;
  }
}

function setupSettings() {
  // Dark mode switch
  const themeToggle = document.getElementById('darkModeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('change', () => {
      if (themeToggle.checked) {
        document.body.setAttribute('data-theme', 'dark');
        localStorage.setItem('suzuran_theme', 'dark');
      } else {
        document.body.removeAttribute('data-theme');
        localStorage.setItem('suzuran_theme', 'light');
      }
    });
  }

  // Reset schedule to default
  const resetBtn = document.getElementById('resetScheduleBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Reset your entire schedule back to the default university timetable? This cannot be undone.')) {
        saveSchedule(DEFAULT_SCHEDULE);
        renderDashboard();
        renderWeeklyPage();
        renderCalendarPage();
        alert('Schedule successfully restored to default!');
      }
    });
  }

  // Export JSON
  const exportBtn = document.getElementById('exportDataBtn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const bundle = {
        suzuran_schedule: getSchedule(),
        suzuran_assignments: getAssignments(),
        suzuran_notes: getNotes(),
        exportDate: new Date().toISOString(),
        version: '1.0'
      };
      const jsonStr = JSON.stringify(bundle, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `suzuran_schedule_backup_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }

  // Import JSON
  const importInput = document.getElementById('importDataInput');
  if (importInput) {
    importInput.addEventListener('change', e => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = event => {
        try {
          const data = JSON.parse(event.target.result);
          if (data.suzuran_schedule && Array.isArray(data.suzuran_schedule)) {
            saveSchedule(data.suzuran_schedule);
          }
          if (data.suzuran_assignments && Array.isArray(data.suzuran_assignments)) {
            saveAssignments(data.suzuran_assignments);
          }
          if (data.suzuran_notes && Array.isArray(data.suzuran_notes)) {
            saveNotes(data.suzuran_notes);
          }
          renderDashboard();
          renderWeeklyPage();
          renderCalendarPage();
          renderAssignmentsPage();
          renderNotesPage();
          alert('Data imported successfully!');
        } catch (err) {
          console.error(err);
          alert('Failed to parse JSON file. Please ensure it is a valid backup.');
        }
      };
      reader.readAsText(file);
      // Reset input value so same file can be re-imported
      importInput.value = '';
    });
  }

  // Clear all data
  const clearBtn = document.getElementById('clearDataBtn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      const firstConfirm = confirm('WARNING: Are you sure you want to wipe ALL classes, assignments, and notes?');
      if (firstConfirm) {
        const secondConfirm = confirm('FINAL WARNING: This will reset the application to a blank state. Confirm?');
        if (secondConfirm) {
          localStorage.removeItem('suzuran_schedule');
          localStorage.removeItem('suzuran_assignments');
          localStorage.removeItem('suzuran_notes');
          saveSchedule([]);
          saveAssignments([]);
          saveNotes([]);
          renderDashboard();
          renderWeeklyPage();
          renderCalendarPage();
          renderAssignmentsPage();
          renderNotesPage();
          alert('All user data cleared.');
        }
      }
    });
  }
}

// ============================================================================
// 17. MODAL CONTROLS & EVENT BINDINGS
// ============================================================================

function closeAllModals() {
  document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
  activeDetailClassId = null;
}

function setupModalCloseHandlers() {
  // Close buttons (X)
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
      closeAllModals();
    });
  });

  // Modal overlays
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', () => {
      closeAllModals();
    });
  });

  // Escape key closes modals
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });

  // Cancel buttons in forms
  const cancelClass = document.getElementById('classFormCancel');
  if (cancelClass) cancelClass.addEventListener('click', closeAllModals);

  const cancelAssign = document.getElementById('assignmentFormCancel');
  if (cancelAssign) cancelAssign.addEventListener('click', closeAllModals);

  const cancelNote = document.getElementById('noteFormCancel');
  if (cancelNote) cancelNote.addEventListener('click', closeAllModals);
}

// ============================================================================
// 18. INITIALIZATION
// ============================================================================

function init() {
  // 1. Theme
  loadThemePreference();

  // 2. Clock & Date
  updateClock();
  setInterval(updateClock, 1000);

  // 3. Quotes
  updateQuote();
  setInterval(updateQuote, 30000);

  // 4. Navigation & Mobile Drawer
  setupNavigation();
  setupMobileSidebar();

  // 5. Modals & Search
  setupModalCloseHandlers();
  setupSearch();
  setupSettings();

  // 6. Form submissions
  const classForm = document.getElementById('classForm');
  if (classForm) classForm.addEventListener('submit', handleClassFormSubmit);

  const assignmentForm = document.getElementById('assignmentForm');
  if (assignmentForm) assignmentForm.addEventListener('submit', handleAssignmentSubmit);

  const noteForm = document.getElementById('noteForm');
  if (noteForm) noteForm.addEventListener('submit', handleNoteSubmit);

  // 7. Action Buttons
  // Add Class (Dashboard card header)
  const addClassBtn = document.getElementById('addClassBtn');
  if (addClassBtn) {
    addClassBtn.addEventListener('click', () => openAddEditClassModal(null));
  }

  // Add Class (Weekly page button)
  const weeklyAddBtn = document.getElementById('weeklyAddBtn');
  if (weeklyAddBtn) {
    weeklyAddBtn.addEventListener('click', () => openAddEditClassModal(null));
  }

  // Edit Class from Detail Modal
  const editDetailBtn = document.getElementById('modalEditClassBtn');
  if (editDetailBtn) {
    editDetailBtn.addEventListener('click', () => {
      if (activeDetailClassId) {
        openAddEditClassModal(activeDetailClassId);
      }
    });
  }

  // Delete Class from Detail Modal
  const deleteDetailBtn = document.getElementById('modalDeleteClassBtn');
  if (deleteDetailBtn) {
    deleteDetailBtn.addEventListener('click', () => {
      if (activeDetailClassId) {
        deleteClass(activeDetailClassId);
      }
    });
  }

  // Add Assignment buttons
  const addAssignBtn = document.getElementById('addAssignmentBtn');
  if (addAssignBtn) {
    addAssignBtn.addEventListener('click', () => openAssignmentModal(null));
  }

  const addAssignPageBtn = document.getElementById('addAssignmentPageBtn');
  if (addAssignPageBtn) {
    addAssignPageBtn.addEventListener('click', () => openAssignmentModal(null));
  }

  // Add Note buttons
  const addNoteBtn = document.getElementById('addNoteBtn');
  if (addNoteBtn) {
    addNoteBtn.addEventListener('click', () => openNoteModal(null));
  }

  const addNotePageBtn = document.getElementById('addNotePageBtn');
  if (addNotePageBtn) {
    addNotePageBtn.addEventListener('click', () => openNoteModal(null));
  }

  // Calendar navigations (mini calendar)
  const calPrev = document.getElementById('calPrev');
  if (calPrev) {
    calPrev.addEventListener('click', () => {
      currentCalDate.setMonth(currentCalDate.getMonth() - 1);
      renderCalendar();
      const g = document.getElementById('calGrid');
      if (g) { g.classList.remove('anim-flip-prev', 'anim-flip-next'); void g.offsetWidth; g.classList.add('anim-flip-prev'); }
    });
  }

  const calNext = document.getElementById('calNext');
  if (calNext) {
    calNext.addEventListener('click', () => {
      currentCalDate.setMonth(currentCalDate.getMonth() + 1);
      renderCalendar();
      const g = document.getElementById('calGrid');
      if (g) { g.classList.remove('anim-flip-prev', 'anim-flip-next'); void g.offsetWidth; g.classList.add('anim-flip-next'); }
    });
  }

  // Calendar navigations (full calendar)
  const calFullPrev = document.getElementById('calFullPrev');
  if (calFullPrev) {
    calFullPrev.addEventListener('click', () => {
      currentFullCalDate.setMonth(currentFullCalDate.getMonth() - 1);
      renderCalendarPage();
      const g = document.getElementById('calFullGrid');
      if (g) { g.classList.remove('anim-flip-prev', 'anim-flip-next'); void g.offsetWidth; g.classList.add('anim-flip-prev'); }
    });
  }

  const calFullNext = document.getElementById('calFullNext');
  if (calFullNext) {
    calFullNext.addEventListener('click', () => {
      currentFullCalDate.setMonth(currentFullCalDate.getMonth() + 1);
      renderCalendarPage();
      const g = document.getElementById('calFullGrid');
      if (g) { g.classList.remove('anim-flip-prev', 'anim-flip-next'); void g.offsetWidth; g.classList.add('anim-flip-next'); }
    });
  }

  // Assignment filter dropdown
  const filterSelect = document.getElementById('assignmentFilter');
  if (filterSelect) {
    filterSelect.addEventListener('change', () => {
      renderAssignmentsPage(filterSelect.value);
    });
  }

  // Initial renders & entrance cascade animations
  renderDashboard();
  animateCascadeElements('#sectionHome .card');
  setupInteractiveCardTilt();

  // Next class countdown periodic refresh
  setInterval(() => {
    renderNextClass();
    renderTodaysClasses();
  }, 30000);
}

// Kickoff when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
