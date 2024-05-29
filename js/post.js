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




/*
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

const accessKey = "ca3d7797-54e4-4a30-9036-8225cda050cf";

fetchApi(accessKey)
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

// Edit Button

document.addEventListener("DOMContentLoaded", function() {
  const editButtonContainer = document.getElementById("editButton");

  if (editButtonContainer) {
    const editButton = document.createElement("button");
    editButton.textContent = "Edit Post";
    editButton.addEventListener("click", handleEditButtonClick);
    editButtonContainer.appendChild(editButton);
  } else {
    console.error("Edit button container not found.");
  }
});

function handleEditButtonClick() {
  const postId = getPostIdFromURL();
  if (postId) {
    window.location.href = `/post/edit-post.html?id=${postId}`;
  } else {
    console.error("Post ID not found in URL.");
  }
}


// Function to delete a post
async function deletePost(postId) {
  const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRXJpa1QiLCJlbWFpbCI6ImVyaXRvcjAwOTkxQHN0dWQubm9yb2ZmLm5vIiwiaWF0IjoxNzEzNDQwNTczfQ.0lPJOLKDAa-uq13nE2wWG4uynz8CxSBi0UtBUv_eYck";
  const url = `https://v2.api.noroff.dev/blog/posts/ErikT/${postId}`;

  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${apiKey}`
    }
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Post deleted successfully
    console.log("Post deleted successfully!");
  } catch (error) {
    console.error("Error deleting post:", error);
    // Display error message in console
  }
}

// Function to handle delete button click
function handleDeleteButtonClick() {
  const postId = getPostIdFromURL();

  // Send DELETE request to delete the post
  deletePost(postId)
    .then(() => {
      // Show success message
      showNotification("Post deleted successfully!", "success");

      // Optionally, redirect the user to another page after deletion
      window.location.href = "redirect-url-after-deletion";
    })
    .catch((error) => {
      // Show error message
      showNotification(`Error: ${error.message}`, "error");
    });
}

// Add event listener to the delete button
const deleteButton = document.getElementById("deleteButton");
deleteButton.addEventListener("click", handleDeleteButtonClick);
*/



document.addEventListener("DOMContentLoaded", function() {
  const postId = getPostIdFromURL();
  const accessKey = "ca3d7797-54e4-4a30-9036-8225cda050cf";

  fetchPostDetails(accessKey, postId);
  setupEditButton(postId);
  setupDeleteButton(postId);
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
    console.log("Fetched post data:", data); // Log the fetched data for debugging
    displayPostDetails(data.data); // Pass the post data directly
  } catch (error) {
    console.error("Error fetching post details:", error);
    document.getElementById('postDetails').innerHTML = `<p>Error fetching post details: ${error.message}</p>`;
  }
}

function displayPostDetails(post) {
  console.log("Post data to display:", post); // Log the post data to understand its structure

  if (!post || !post.title || !post.body || !post.author || !post.media) {
    document.getElementById('postDetails').innerHTML = "<p>Invalid post data.</p>";
    return;
  }

  const postHtml = `
    <div class="post">
      <h2>${post.title}</h2>
      <div class="avatar-container">
        <img class="avatar-img" src="${post.author.avatar.url}" alt="Avatar">
      </div>
      <p>Author: ${post.author.name}</p>
      <p>Created: ${new Date(post.created).toLocaleString()}</p>
      <p class="tags">${post.tags}<p>
      <img class="post-image" src="${post.media.url}" alt="${post.media.alt}">
      <p>${post.body}</p>
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

async function deletePost(postId) {
  const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRXJpa1QiLCJlbWFpbCI6ImVyaXRvcjAwOTkxQHN0dWQubm9yb2ZmLm5vIiwiaWF0IjoxNzEzNDQwNTczfQ.0lPJOLKDAa-uq13nE2wWG4uynz8CxSBi0UtBUv_eYck";
  const url = `https://v2.api.noroff.dev/blog/posts/ErikT/${postId}`;

  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${apiKey}`
    }
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Post deleted successfully
    console.log("Post deleted successfully!");
    showNotification("Post deleted successfully!", "success");
    window.location.href = "/posts"; // Redirect to posts list after deletion
  } catch (error) {
    console.error("Error deleting post:", error);
    showNotification(`Error: ${error.message}`, "error");
  }
}

function setupDeleteButton(postId) {
  const deleteButton = document.getElementById("deleteButton");
  if (deleteButton) {
    deleteButton.addEventListener("click", function() {
      if (postId) {
        deletePost(postId);
      } else {
        console.error("Post ID not found in URL.");
      }
    });
  } else {
    console.error("Delete button not found.");
  }
}

function showNotification(message, type) {
  const notificationContainer = document.createElement("div");
  notificationContainer.className = `notification ${type}`;
  notificationContainer.textContent = message;
  document.body.appendChild(notificationContainer);

  setTimeout(() => {
    notificationContainer.remove();
  }, 3000); // Remove notification after 3 seconds
}

