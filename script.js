const notes = [
  {
    id: 1,
    name: "PSSD-1",
    description: "GITA(MCA-2024-25) Semester-1 Question",
    imgSrc: "assets/pssd.jpg",
    pdfSrc: "https://drive.google.com/file/d/1L85rF1e4eBviamJwi6Vo_iTjAEE5vY7K/view?usp=drivesdk"
  },
  {
    id: 2,
    name: "Discrete Mathematics",
    description: "GITA(MCA-2024-25) Semester-1 Question",
    imgSrc: "assets/DM.jpg",
    pdfSrc: "https://drive.google.com/file/d/1aMdCj0ivJ5c95SuLDX20wi4Bc0hFjX6T/view?usp=drivesdk"
  },
  {
    id: 3,
    name: "C programming",
    description: "GITA(MCA-2024-25) Semester-1 Question",
    imgSrc: "assets/pc.jpg",
    pdfSrc: "https://drive.google.com/file/d/1iiwwRMJs-8lPnIbdlJOvwlL8U8HIto7v/view?usp=drivesdk"
  },
  {
    id: 4,
    name: "DBMS(DataBase Management System)",
    description: "GITA(MCA-2024-25) Semester-1 Question",
    imgSrc: "assets/dbms.jpg",
    pdfSrc: "https://drive.google.com/file/d/1GROARtKqLnYpcW9VGaRw76_QkF6kjXKv/view?usp=drivesdk"
  },
   {
    id: 5,
    name: "OS(Operating System)",
    description: "GITA(MCA-2024-25) Semester-1 Question",
    imgSrc: "assets/os.jpg",
    pdfSrc: "https://drive.google.com/file/d/1bDR8DgTREyaRk-PMzIp_CJqU-pyVIrZf/view?usp=drivesdk"
  },
   {
    id: 6,
    name: "COA(Computer Organization and Architecture)",
    description: "GITA(MCA-2024-25) Semester-1 Question",
    imgSrc: "assets/coa.jpg",
    pdfSrc: "https://drive.google.com/file/d/1AGQdVXcQmzMmaig5Gy_JaMBHsw8RwANI/view?usp=drivesdk"
  }
];

const notesContainer = document.getElementById("notesSection");
const likedNotesContainer = document.getElementById("likedNotesSection");
const searchBox = document.getElementById("searchBox");
const likedTitle = document.getElementById("likedNotesTitle");

// Load liked notes from localStorage
let likedNotes = JSON.parse(localStorage.getItem("likedNotes")) || [];

function createNoteCard(note, isLikedSection = false) {
  const card = document.createElement("div");
  card.className = "card";

  const img = document.createElement("img");
  img.src = note.imgSrc;
  card.appendChild(img);

  const body = document.createElement("div");
  body.className = "card-body";

  const title = document.createElement("h3");
  title.className = "note-title";
  title.textContent = note.name;
  body.appendChild(title);

  const desc = document.createElement("p");
  desc.textContent = note.description;
  body.appendChild(desc);

  const buttons = document.createElement("div");
  buttons.className = "buttons";

  if (!isLikedSection) {
    const heart = document.createElement("i");
    heart.className = likedNotes.find(n => n.id === note.id) ? "fas fa-heart heart-icon liked" : "far fa-heart heart-icon";
    heart.onclick = () => toggleLike(note, heart);
    buttons.appendChild(heart);
  }

  const openBtn = document.createElement("a");
  openBtn.href = note.pdfSrc;
  openBtn.target = "_blank";
  openBtn.className = "open-btn";
  openBtn.textContent = "📂 Open";
  buttons.appendChild(openBtn);

  body.appendChild(buttons);
  card.appendChild(body);

  return card;
}

function toggleLike(note, heartIcon) {
  const index = likedNotes.findIndex(n => n.id === note.id);
  if (index === -1) {
    likedNotes.push(note);
    heartIcon.classList.remove("far");
    heartIcon.classList.add("fas", "liked");
  } else {
    likedNotes.splice(index, 1);
    heartIcon.classList.remove("fas", "liked");
    heartIcon.classList.add("far");
  }
  // Update localStorage
  localStorage.setItem("likedNotes", JSON.stringify(likedNotes));
  renderLikedNotes();
}

function renderNotes(filteredNotes = notes) {
  notesContainer.innerHTML = "";
  filteredNotes.forEach(note => {
    const card = createNoteCard(note);
    notesContainer.appendChild(card);
  });
}

function renderLikedNotes() {
  if (likedNotes.length === 0) {
    likedTitle.style.display = "none";
    likedNotesContainer.innerHTML = "";
  } else {
    likedTitle.style.display = "block";
    likedNotesContainer.innerHTML = "";
    likedNotes.forEach(note => {
      const card = createNoteCard(note, true);
      likedNotesContainer.appendChild(card);
    });
  }
}

searchBox.addEventListener("input", e => {
  const term = e.target.value.toLowerCase();
  const filtered = notes.filter(note => note.name.toLowerCase().includes(term));
  renderNotes(filtered);
});

// Initial render
renderNotes();
renderLikedNotes();


// Cursor effect
const cursorDot = document.querySelector(".cursor-dot");
const cursorTrail = document.querySelector(".cursor-trail");

document.addEventListener("mousemove", e => {
  const { clientX: x, clientY: y } = e;
  cursorDot.style.top = y + "px";
  cursorDot.style.left = x + "px";
  cursorTrail.style.top = y + "px";
  cursorTrail.style.left = x + "px";
});

document.addEventListener("mousedown", () => {
  cursorTrail.style.transform = "translate(-50%, -50%) scale(1.5)";
  cursorTrail.style.borderColor = "var(--highlight)";
  cursorTrail.style.boxShadow = "0 0 15px var(--highlight)";
});

document.addEventListener("mouseup", () => {
  cursorTrail.style.transform = "translate(-50%, -50%) scale(1)";
  cursorTrail.style.borderColor = "var(--primary)";
  cursorTrail.style.boxShadow = "0 0 10px var(--primary)";
});
