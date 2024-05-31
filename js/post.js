document.addEventListener("DOMContentLoaded", function() {
  const postId = getPostIdFromURL();
  const accessKey = "ca3d7797-54e4-4a30-9036-8225cda050cf";

  fetchPostDetails(accessKey, postId);
  setupEditButton(postId);
});

function getPostIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}

async function fetchPostDetails(apiKey, postId) {
  const url = `https://v2.api.noroff.dev/blog/posts/ErikT/${postId}`;
  const options = {
    headers: {
      Authorization: `Bearer ${apiKey}`
    }
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    displayPostDetails(data.data);
  } catch (error) {
    document.getElementById('postDetails').innerHTML = `<p>Error fetching post details: ${error.message}</p>`;
  }
}

function displayPostDetails(post) {
  if (!post || !post.title || !post.body || !post.author || !post.media) {
    document.getElementById('postDetails').innerHTML = "<p>Invalid post data.</p>";
    return;
  }

  const postHtml = `
    <div class="post">
      <h1 class"post-title">${post.title}</h1>
      <div class="author-container">
        <div class="avatar-container">
          <img class="avatar-img" src="${post.author.avatar.url}" alt="Avatar">
        </div>
        <div class="author-name-container">
          <p>${post.author.name}</p>
          <span>${new Date(post.created).toLocaleString()}</span>
        </div>
      </div>
      <div class="tags">
        ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
      </div>
      <div class="post-image-container">
        <img class="post-image" src="${post.media.url}" alt="${post.media.alt}">
      </div>
      <p class="post-body">${post.body}</p>
    </div>
  `;
  document.getElementById('postDetails').innerHTML = postHtml;
}

function setupEditButton(postId) {
  const editButton = document.getElementById("editButton");
  if (editButton) {
    editButton.addEventListener("click", function() {
      if (postId) {
        window.location.href = `/post/edit-post.html?id=${postId}`;
      } else {
        console.error("Post ID not found in URL.");
      }
    });
  } else {
    console.error("Edit button not found.");
  }
}


const indexLoginAndClearLocalStorage = document.getElementById("indexLoginAndClearLocalStorage");
indexLoginAndClearLocalStorage.addEventListener("click", () => {
  localStorage.clear();
});

const userRole = localStorage.getItem("userRole");
const adminButton = document.getElementById("editButton");

// Checking role information and enabling/disabling features accordingly
if (userRole === "owner") {
  // Enable owner/administrator-only features
  adminButton.classList.remove("hidden");
} else {
  // Disable owner/administrator-only features
  adminButton.classList.add("hidden");
}