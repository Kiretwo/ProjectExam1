/*
// Retrieve the post ID from the URL query parameters
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');
console.log(postId);

// Fetch the post details using the post ID
fetch(`https://v2.api.noroff.dev/blog/posts/ErikT/${postId}`)
  .then(response => {
    console.log(response);
    if (!response.ok) {
      throw new Error('Failed to fetch post details');
    }
    return response.json();
  })
  .then(data => {
    // Check if the post object exists and contains the necessary properties
    if (!data || !data.title || !data.body || !data.author || !data.media) {
      throw new Error('Invalid post data');
    }

    // Extract relevant information for the post
    const title = data.title;
    const body = data.body;
    const authorName = data.author.name;
    const createdDate = new Date(data.created).toLocaleString();
    const imageUrl = data.media.url;
    const imageAlt = data.media.alt;

    // Generate HTML for the post details
    const postHtml = `
      <div class="post">
        <h2>${title}</h2>
        <img class="post-image" src="${imageUrl}" alt="${imageAlt}">
        <p>${body}</p>
        <p>Author: ${authorName}</p>
        <p>Created: ${createdDate}</p>
      </div>
    `;

    // Update the DOM with the post details
    document.getElementById('postDetails').innerHTML = postHtml;
  })
  .catch(error => {
    console.error('Error fetching post details:', error);
  });
*/


async function fetchApi(apiKey) {
  const options = {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  };

  try {
    const response = await fetch(
      "https://v2.api.noroff.dev/blog/posts/ErikT",
      options
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching API data:", error);
    throw error;
  }
}

const apiKey = "ca3d7797-54e4-4a30-9036-8225cda050cf";

fetchApi(apiKey)
  .then((response) => {
    console.log("Fetched data:", response);
    const postsContainer = document.getElementById("postDetails");

    // Check if response contains data
    if (
      response &&
      response.data &&
      Array.isArray(response.data) &&
      response.data.length > 0
    ) {
      // Extract the post ID from the page URL
      const postId = getPostIdFromURL();

      // Find the post with the matching ID
      const post = response.data.find((post) => post.id === postId);

      if (post) {
        const tags = post.tags;
        const id = post.id;
        const title = post.title;
        const body = post.body;
        const media = post.media.url;
        const authorName = post.author.name;
        const createdDate = new Date(post.created).toLocaleString();

        // Create HTML elements for the matching post
        const postElement = document.createElement("div");
        postElement.classList.add("post");
        postElement.innerHTML = 
        `
          <div class="blog-card">
            <img class="post-image" src="${media}" alt="${media.alt}">
            <p class="tags">${tags}</p>
            <h2>${title}</h2>
            <p>${body}</p>
            <p>${id}</p>
            <p>Author: ${authorName}</p>
            <p>Created: ${createdDate}</p>
          </div>
        `
        ;

        // Append the post element to the posts container
        postsContainer.appendChild(postElement);
      } else {
        // Display a message if no post with the matching ID is found
        postsContainer.innerHTML = "<p>No matching post found.</p>";
      }
    } else {
      // Display a message if no data is received
      postsContainer.innerHTML = "<p>No posts found.</p>";
    }
  })
  .catch((error) => {
    console.error("Fetch operation failed:", error);
  });

// Function to extract the post ID from the URL
function getPostIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}

// Add this code to the existing JavaScript file for the post detail page

document.addEventListener("DOMContentLoaded", function() {
  const editButton = document.createElement("button");
  editButton.textContent = "Edit Post";
  editButton.addEventListener("click", handleEditButtonClick);
  document.body.appendChild(editButton);
});

function handleEditButtonClick() {
  const postId = getPostIdFromURL();
  if (postId) {
    window.location.href = `/post/edit-post.html?id=${postId}`;
  } else {
    console.error("Post ID not found in URL.");
  }
}
