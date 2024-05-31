// HEADER script
function showSidebar(){
  const sidebar = document.querySelector('.sidebar');
  sidebar.style.display = 'flex';
}
function hideSidebar(){
  const sidebar = document.querySelector('.sidebar');
  sidebar.style.display = 'none';
}

// CAROUSEL script
let slideIndex = 0;
let slideInterval;

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");

  if (n > slides.length) { slideIndex = 1; }
  if (n < 1) { slideIndex = slides.length; }
  
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }

  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIndex - 1].style.display = "block";  
  dots[slideIndex - 1].className += " active";
}

function plusSlides(n) {
  clearInterval(slideInterval);
  showSlides(slideIndex += n);
  slideInterval = setInterval(autoSlides, 5000);
}

function currentSlide(n) {
  clearInterval(slideInterval);
  showSlides(slideIndex = n);
  slideInterval = setInterval(autoSlides, 5000);
}

function autoSlides() {
  slideIndex++;
  showSlides(slideIndex);
}

document.addEventListener("DOMContentLoaded", () => {
  fetchAndDisplayPosts();
  slideInterval = setInterval(autoSlides, 5000);
});

// MAIN script
const apiKey = "ca3d7797-54e4-4a30-9036-8225cda050cf";

async function fetchApi(apiKey) {
  const options = {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRXJpa1QiLCJlbWFpbCI6ImVyaXRvcjAwOTkxQHN0dWQubm9yb2ZmLm5vIiwiaWF0IjoxNzEzNDQwNTczfQ.0lPJOLKDAa-uq13nE2wWG4uynz8CxSBi0UtBUv_eYck`,
      "ca3d7797-54e4-4a30-9036-8225cda050cf": apiKey
    }
  };

  try {
    const response = await fetch("https://v2.api.noroff.dev/blog/posts/ErikT", options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    //console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching API data:", error);
    throw error;
  }
}

// Function to view post detail
function viewPostDetail(postId) {
  window.location.href = `post/index.html?id=${postId}`;
}

async function fetchAndDisplayPosts() {
  try {
    const response = await fetchApi(apiKey);
    //console.log("Fetched data:", response);
    const data = response.data;

    if (Array.isArray(data) && data.length > 0) {
      populateCarousel(data);
      populateLatestPosts(data);

      const storedName = localStorage.getItem("name");
      if (storedName && data[0]) {
        const avatarUrl = data[0].author.avatar.url;
        const welcomeMessage = `<div class="avatar-container"><img class="avatar-img" src="${avatarUrl}" alt="Avatar"></div><p class="welcome-text">Welcome back ${storedName}!</p>`;
        document.getElementById("welcomeMessage").innerHTML = welcomeMessage;
      }
    } else {
      console.error("No data received or data is empty:", data);
    }
  } catch (error) {
    console.error("Fetch operation failed:", error);
  }
}

function populateCarousel(posts) {
  const carouselContainer = document.getElementById('carousel-container');
  const dotsContainer = document.getElementById('dots-container');

  let carouselContent = '';
  let dotsContent = '';

  // Limit the posts to a maximum of 3 for the carousel
  const limitedPosts = posts.slice(0, 3);

  limitedPosts.forEach((post, index) => {
    const { title, media, id } = post;
    const activeClass = index === 0 ? 'active' : '';

    carouselContent += `
    <div>
      <div class="mySlides fade">
        <div class="carousel-image-container">
          <img src="${media.url}" class="carousel-img">
        </div>
        <div class="text-container">
          <div class="text">${title}</div>
        </div>
        <button class="read-more-btn" onclick="viewPostDetail('${id}')">Read more</button>
      </div>
      <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
      <a class="next" onclick="plusSlides(1)">&#10095;</a>
    </div>
    `;

    dotsContent += `<span class="dot ${activeClass}" onclick="currentSlide(${index + 1})"></span>`;
  });

  carouselContainer.innerHTML = carouselContent;
  dotsContainer.innerHTML = dotsContent;

  showSlides(slideIndex = 1);
}

function populateLatestPosts(posts) {
  const contentContainer = document.getElementById('content');
  let displayContent = '';

  posts.forEach(post => {
    const { title, media, id } = post;
    const postHtml = `
      <div class="card" onclick="viewPostDetail('${id}')">
        <div class="card-image-container">
          <img class="card-image" src="${media.url}" alt="${media.alt}">
        </div>
        <h2 class="card-title">${title}</h2>
      </div>
    `;
    displayContent += postHtml;
  });

  contentContainer.innerHTML = displayContent;
}

const indexLoginAndClearLocalStorage = document.getElementById("indexLoginAndClearLocalStorage");
indexLoginAndClearLocalStorage.addEventListener("click", () => {
  localStorage.clear();
});

const userRole = localStorage.getItem("userRole");
const adminButton = document.getElementById("managePosts");

if (userRole === "owner") {
  adminButton.classList.remove("hidden");
  adminButton.addEventListener("click", function() {
    window.location.href = "make.html";
  });
} else {
  adminButton.classList.add("hidden");
}





