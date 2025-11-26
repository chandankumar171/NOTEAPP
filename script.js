/* ---------- Data: single array with types ---------- */
const items = [
  { id: 1, type: "pyq", name: "PSSD-1", description: "GITA(MCA-2024-25) Semester-1 PYQ", imgSrc: "assets/pssd.jpg", pdfSrc: "https://drive.google.com/file/d/1L85rF1e4eBviamJwi6Vo_iTjAEE5vY7K/view?usp=drivesdk" },
  { id: 2, type: "pyq", name: "Discrete Mathematics", description: "GITA(MCA-2024-25) Semester-1 PYQ", imgSrc: "assets/DM.jpg", pdfSrc: "https://drive.google.com/file/d/1aMdCj0ivJ5c95SuLDX20wi4Bc0hFjX6T/view?usp=drivesdk" },
  { id: 3, type: "pyq", name: "C Programming", description: "GITA(MCA-2024-25) Semester-1 PYQ", imgSrc: "assets/pc.jpg", pdfSrc: "https://drive.google.com/file/d/1iiwwRMJs-8lPnIbdlJOvwlL8U8HIto7v/view?usp=drivesdk" },
  { id: 4, type: "pyq", name: "DBMS(Data Base Management System) ", description: "GITA(MCA-2024-25) Semester-1 PYQ", imgSrc: "assets/dbms.jpg", pdfSrc: "https://drive.google.com/file/d/1GROARtKqLnYpcW9VGaRw76_QkF6kjXKv/view?usp=drivesdk" },
  { id: 5, type: "pyq", name: "OS(Operating System notes)", description: "GITA(MCA-2024-25) Semester-1 PYQ", imgSrc: "assets/os.jpg", pdfSrc: "https://drive.google.com/file/d/1bDR8DgTREyaRk-PMzIp_CJqU-pyVIrZf/view?usp=drivesdk" },
  { id: 6, type: "pyq", name: "COA(Computer Organization & Architecture)", description: "GITA(MCA-2024-25) Semester-1 PYQ", imgSrc: "assets/coa.jpg", pdfSrc: "https://drive.google.com/file/d/1AGQdVXcQmzMmaig5Gy_JaMBHsw8RwANI/view?usp=drivesdk" },
  { id: 7, type: "note", name: "COA(Computer Organization & Architecture) Notes", description: "Computer Organization & Architecture", imgSrc: "assets/coanotes.jpg", pdfSrc: "https://drive.google.com/file/d/1R5XNi96DBTb76ElkPDAPJTXjEeDCwwcK/view?usp=drivesdk" },
  { id: 8, type: "note", name: "OS(Operating System notes) Notes", description: "Operating System notes", imgSrc: "assets/osnote.jpg", pdfSrc: "https://drive.google.com/file/d/1Y695N-VzRshrFr-qDQ0cclp8cXpalrgc/view?usp=drivesdk" }
];

/* ---------- Developers data ---------- */
const developers = [
  { name: "Saumya Ranjan Dash", roll: "25MC104", imgSrc: "assets/dev2.jpg" },
  { name: "Biswajit Behera", roll: "25MC029", imgSrc: "assets/dev5.jpg" },
  { name: "Rajendra Dora", roll: "25MC093", imgSrc: "assets/dev3.jpg" },
  { name: "Dinesh Sutar", roll: "25MC041", imgSrc: "assets/dev7.jpg" },
  { name: "Amlan Parida", roll: "25MC009", imgSrc: "assets/dev6.jpg" }
];

/* ---------- DOM references ---------- */
const notesSection = document.getElementById("notesSection");
const pyqSection = document.getElementById("pyqSection");
const likedNotesContainer = document.getElementById("likedNotesSection");
const likedTitle = document.getElementById("likedNotesTitle");
const searchBox = document.getElementById("searchBox");

const desktopLinks = document.querySelectorAll('.nav-link');
const bubbleBtn = document.getElementById('bubbleBtn');
const bubbleMenu = document.getElementById('bubbleMenu');
const bubbleClose = document.getElementById('bubbleClose');
const bubbleLinks = document.querySelectorAll('.bubble-link');

let likedNotes = JSON.parse(localStorage.getItem("likedNotes")) || [];
let currentSection = 'notes'; // notes | pyqs | liked

/* ---------- helper: create card ---------- */
function createCard(item, forLiked = false) {
  const card = document.createElement('div');
  card.className = 'card';
  card.dataset.id = item.id;

  const img = document.createElement('img');
  img.src = item.imgSrc;
  img.alt = item.name;
  card.appendChild(img);

  // add PYQ tag if needed
  if (item.type === 'pyq') {
    const tag = document.createElement('div');
    tag.className = 'pyq-tag';
    tag.textContent = 'PYQ';
    card.appendChild(tag);
  }

  const body = document.createElement('div');
  body.className = 'card-body';

  const h3 = document.createElement('h3');
  h3.textContent = item.name;
  body.appendChild(h3);

  const p = document.createElement('p');
  p.textContent = item.description;
  body.appendChild(p);

  const btns = document.createElement('div');
  btns.className = 'buttons';

  if (!forLiked) {
    const heart = document.createElement('i');
    heart.className = likedNotes.find(n => n.id === item.id) ? 'fas fa-heart heart-icon liked' : 'far fa-heart heart-icon';
    heart.addEventListener('click', () => toggleLike(item, heart));
    btns.appendChild(heart);
  }

  const open = document.createElement('a');
  open.href = item.pdfSrc;
  open.target = '_blank';
  open.className = 'open-btn';
  open.textContent = '📂 Open';
  btns.appendChild(open);

  body.appendChild(btns);
  card.appendChild(body);

  return card;
}

/* ---------- render functions ---------- */
function renderAll() {
  // clear
  notesSection.innerHTML = '';
  pyqSection.innerHTML = '';

  // render from items
  items.forEach(it => {
    if (it.type === 'note') notesSection.appendChild(createCard(it));
    if (it.type === 'pyq') pyqSection.appendChild(createCard(it));
  });
  renderLiked();
  showSection(currentSection); // ensure visibility state
}

function renderLiked() {
  likedNotesContainer.innerHTML = '';
  if (!likedNotes.length) {
    likedTitle.style.display = 'none';
    return;
  }
  likedTitle.style.display = 'block';
  likedNotes.forEach(it => {
    // ensure we use the full item object (in case stored reduced)
    const full = items.find(x => x.id === it.id) || it;
    likedNotesContainer.appendChild(createCard(full, true));
  });
}

/* ---------- like toggle ---------- */
function toggleLike(item, heartIcon) {
  const idx = likedNotes.findIndex(n => n.id === item.id);
  if (idx === -1) {
    likedNotes.push({ id: item.id });
    heartIcon.classList.remove('far');
    heartIcon.classList.add('fas', 'liked');
  } else {
    likedNotes.splice(idx, 1);
    heartIcon.classList.remove('fas', 'liked');
    heartIcon.classList.add('far');
  }
  localStorage.setItem('likedNotes', JSON.stringify(likedNotes));
  renderLiked();
  // update hearts in main lists
  updateHeartStates();
}

/* update heart icon state across lists */
function updateHeartStates() {
  document.querySelectorAll('.card').forEach(card => {
    const id = Number(card.dataset.id);
    const heart = card.querySelector('.heart-icon');
    if (!heart) return;
    const isLiked = likedNotes.find(n => n.id === id);
    if (isLiked) {
      heart.classList.remove('far');
      heart.classList.add('fas', 'liked');
    } else {
      heart.classList.remove('fas', 'liked');
      heart.classList.add('far');
    }
  });
}

/* ---------- section switching ---------- */
function setActiveNav(section) {
  // desktop links
  desktopLinks.forEach(a => {
    const s = a.dataset.section;
    if (s === section) a.classList.add('active');
    else a.classList.remove('active');
  });
  // bubble links
  bubbleLinks.forEach(a => {
    const s = a.dataset.section;
    if (s === section) a.classList.add('active');
    else a.classList.remove('active');
  });
}

/* show chosen section */
function showSection(section) {
  currentSection = section;
  // reset visibility
  if (section === 'notes') {
    notesSection.style.display = 'grid';
    pyqSection.style.display = 'none';
    likedNotesContainer.parentElement.style.display = 'block';
  } else if (section === 'pyqs') {
    notesSection.style.display = 'none';
    pyqSection.style.display = 'grid';
    likedNotesContainer.parentElement.style.display = 'block';
  } else if (section === 'liked') {
    notesSection.style.display = 'none';
    pyqSection.style.display = 'none';
    likedNotesContainer.parentElement.style.display = 'block';
  }
  setActiveNav(section);
  // reset search so it filters current section
  applySearch(searchBox.value.trim());
}

/* handle clicks on desktop nav */
document.querySelectorAll('.nav-link').forEach(a => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    const sec = e.currentTarget.dataset.section;
    if (!sec) return;
    showSection(sec);
    // close bubble if open on mobile
    closeBubbleMenu();
  });
});

/* bubble menu open/close logic */
function openBubbleMenu() {
  bubbleBtn.classList.add('open');
  bubbleMenu.classList.add('open');
  bubbleMenu.setAttribute('aria-hidden', 'false');
}
function closeBubbleMenu() {
  bubbleBtn.classList.remove('open');
  bubbleMenu.classList.remove('open');
  bubbleMenu.setAttribute('aria-hidden', 'true');
}
bubbleBtn.addEventListener('click', () => {
  if (bubbleMenu.classList.contains('open')) closeBubbleMenu();
  else openBubbleMenu();
});
bubbleClose.addEventListener('click', () => closeBubbleMenu());

/* bubble links */
bubbleLinks.forEach(a => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    const sec = e.currentTarget.dataset.section;
    showSection(sec);
    // close after selecting
    setTimeout(closeBubbleMenu, 160);
  });
});

/* ---------- search (filters current visible section) ---------- */
function applySearch(query) {
  const q = query.toLowerCase();
  // helper to test
  function matches(item) {
    return item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q);
  }

  // show/hide cards in each container according to currentSection & query
  if (currentSection === 'notes') {
    // notes visible
    notesSection.querySelectorAll('.card').forEach(card => {
      const id = Number(card.dataset.id);
      const it = items.find(x => x.id === id);
      card.style.display = (q === '' || matches(it)) ? '' : 'none';
    });
    // hide pyq cards entirely
    pyqSection.querySelectorAll('.card').forEach(card => card.style.display = 'none');
    // liked: show/hide based on liked list (if user wants)
    renderLiked(); // keep liked list updated
  } else if (currentSection === 'pyqs') {
    pyqSection.querySelectorAll('.card').forEach(card => {
      const id = Number(card.dataset.id);
      const it = items.find(x => x.id === id);
      card.style.display = (q === '' || matches(it)) ? '' : 'none';
    });
    notesSection.querySelectorAll('.card').forEach(card => card.style.display = 'none');
    renderLiked();
  } else if (currentSection === 'liked') {
    // filter liked listing
    likedNotesContainer.querySelectorAll('.card').forEach(card => {
      const id = Number(card.dataset.id);
      const it = items.find(x => x.id === id) || { name: '', description: '' };
      card.style.display = (q === '' || matches(it)) ? '' : 'none';
    });
    notesSection.querySelectorAll('.card').forEach(card => card.style.display = 'none');
    pyqSection.querySelectorAll('.card').forEach(card => card.style.display = 'none');
  }
}

searchBox.addEventListener('input', (e) => {
  applySearch(e.target.value.trim());
});

/* ---------- render developers section ---------- */
function renderDevelopers() {
  const developersGrid = document.getElementById('developersGrid');
  developersGrid.innerHTML = '';
  developers.forEach(dev => {
    const devItem = document.createElement('div');
    devItem.className = 'developer-item';

    devItem.innerHTML = `
      <div class="developer-image">
        <img src="${dev.imgSrc}" alt="${dev.name}">
      </div>
      <div class="developer-name">${dev.name}</div>
      <div class="developer-roll">${dev.roll}</div>
    `;

    developersGrid.appendChild(devItem);
  });
}

/* ---------- initial render ---------- */
renderAll();
updateHeartStates();
renderDevelopers();

// custom cursor removed: no event listeners remain


