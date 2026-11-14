/*
  PENGATURAN GAME:
  - Ubah nama, gambar, ukuran, platform, versi, dan deskripsi sesuai kebutuhan.
  - Isi downloadUrl dengan LINK DOWNLOAD milikmu.
  - Untuk gambar, simpan file di folder assets lalu tulis alamatnya, misalnya assets/game-baru.jpg.
*/
const games = [
  {id:1,name:"GTA V",image:"assets/gta-v.jpg",size:"110 GB",platform:"PC / Windows",version:"1.0.3095",category:"Open World",description:"Jelajahi kota Los Santos dalam game open-world penuh aksi dan petualangan.",downloadUrl:"https://example.com/link-download-gta-v"},
  {id:2,name:"Red Dead Redemption II",image:"assets/rdr2.jpg",size:"120 GB",platform:"PC / Windows",version:"1.0.1436",category:"Action Adventure",description:"Petualangan dunia terbuka dengan cerita dan dunia yang luas.",downloadUrl:"https://example.com/link-download-rdr2"},
  {id:3,name:"Minecraft",image:"assets/minecraft.jpg",size:"2 GB",platform:"PC / Windows",version:"1.21",category:"Sandbox",description:"Bangun, jelajahi, dan berkreasi di dunia berbentuk blok.",downloadUrl:"https://example.com/link-download-minecraft"},
  {id:4,name:"Valorant",image:"assets/valorant.jpg",size:"45 GB",platform:"PC / Windows",version:"Terbaru",category:"Tactical Shooter",description:"Game taktis berbasis tim dengan karakter dan kemampuan unik.",downloadUrl:"https://example.com/link-download-valorant"},
  {id:5,name:"game5",image:"assets/god-of-war.jpg",size:"70 GB",platform:"PC / Windows",version:"1.0",category:"Action Adventure",description:"Petualangan Kratos.",downloadUrl:"LINK-DOWNLOAD-KAMU"},
  {id:6,name:"game5",image:"assets/god-of-war.jpg",size:"70 GB",platform:"PC / Windows",version:"1.0",category:"Action Adventure",description:"Petualangan Kratos.",downloadUrl:"LINK-DOWNLOAD-KAMU"}
];

const grid = document.getElementById("gameGrid");
const searchInput = document.getElementById("searchInput");
const emptyState = document.getElementById("emptyState");
const modal = document.getElementById("detailModal");

function renderGames(list){
  grid.innerHTML = "";
  emptyState.hidden = list.length !== 0;
  list.forEach(game => {
    const card = document.createElement("article");
    card.className = "game-card";
    card.innerHTML = `
      <img src="${game.image}" alt="${game.name}">
      <div class="game-info">
        <h3>${game.name}</h3>
        <button class="download-button" type="button">⬇ Download</button>
      </div>`;
    card.addEventListener("click", () => showDetails(game.id));
    grid.appendChild(card);
  });
}

function showDetails(id){
  const game = games.find(item => item.id === id);
  if(!game) return;
  document.getElementById("detailImage").src = game.image;
  document.getElementById("detailImage").alt = game.name;
  document.getElementById("detailTitle").textContent = game.name;
  document.getElementById("detailDescription").textContent = game.description;
  document.getElementById("detailSize").textContent = game.size;
  document.getElementById("detailPlatform").textContent = game.platform;
  document.getElementById("detailVersion").textContent = game.version;
  document.getElementById("detailCategory").textContent = game.category;
  const link = document.getElementById("downloadLink");
  link.href = game.downloadUrl;
  modal.hidden = false;
  document.body.style.overflow = "hidden";
}
function closeDetails(){
  modal.hidden = true;
  document.body.style.overflow = "";
}
document.getElementById("closeModal").addEventListener("click",closeDetails);
modal.addEventListener("click",event => {if(event.target === modal) closeDetails();});
document.addEventListener("keydown",event => {if(event.key === "Escape" && !modal.hidden) closeDetails();});

function filterGames(){
  renderVisibleGames();
}
document.getElementById("searchForm").addEventListener("submit",event => {event.preventDefault();filterGames();document.getElementById("games").scrollIntoView({behavior:"smooth"});});
searchInput.addEventListener("input",filterGames);

let showingAll = false;

function renderVisibleGames(){
  const keyword = searchInput.value.trim().toLowerCase();
  const matchingGames = games.filter(game =>
    game.name.toLowerCase().includes(keyword)
  );

  // Mode layar penuh menampilkan seluruh game. Mode biasa menampilkan 4 game populer.
  const visibleGames = showingAll
    ? matchingGames
    : matchingGames.filter(game => [1, 2, 3, 4].includes(game.id));

  renderGames(visibleGames);

  document.body.classList.toggle("all-games-fullscreen", showingAll);
  document.getElementById("seeAllBtn").innerHTML = showingAll
    ? 'Tutup Semua Game <span>✕</span>'
    : 'Lihat Semua Game <span>➜</span>';

  document.querySelector(".section-heading h2").innerHTML = showingAll
    ? '<span></span>Semua <b>Game</b>'
    : '<span></span>Game <b>Populer</b>';
}

document.getElementById("seeAllBtn").addEventListener("click", () => {
  showingAll = !showingAll;
  renderVisibleGames();

  if (showingAll) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    document.getElementById("games").scrollIntoView({ behavior: "smooth" });
  }
});

// Banner slide sederhana: titik dapat diklik untuk menggeser posisi gambar.
const heroImage = document.getElementById("heroImage");
const bannerPositions = ["center 48%","left center","right center"];
document.querySelectorAll(".dot").forEach(dot => dot.addEventListener("click",() => {
  document.querySelectorAll(".dot").forEach(item => item.classList.remove("selected"));
  dot.classList.add("selected");
  heroImage.style.objectPosition = bannerPositions[Number(dot.dataset.slide)];
}));

renderVisibleGames();
