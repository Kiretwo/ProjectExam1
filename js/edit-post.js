document.addEventListener("DOMContentLoaded", function() {
  // Retrieve post ID from URL query parameters
  const postId = getPostIdFromURL();

  // Fetch post data using the post ID
  fetchPostData(postId)
    .then((postData) => {
      // Prepopulate input fields with post data
      populateForm(postData);
    })
    .catch((error) => {
      console.error("Error fetching post data:", error);
    });

  // Add event listener for form submission
  const editPostForm = document.getElementById("editPostForm");
  editPostForm.addEventListener("submit", handleFormSubmit);
});

// Function to fetch post data using post ID
async function fetchPostData(postId) {
  const apiKey = "3e33646c-6532-40ab-97cf-495130da7f93";
  const options = {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  };

  try {
    const response = await fetch(`https://v2.api.noroff.dev/blog/posts/ErikT/${postId}`, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.data; // Return only the post data
  } catch (error) {
    console.error("Error fetching post data:", error);
    throw error;
  }
}

// Function to prepopulate form with post data
function populateForm(postData) {
  const editPostForm = document.getElementById("editPostForm");
  editPostForm.title.value = postData.title;
  editPostForm.body.value = postData.body;
  editPostForm.tags.value = postData.tags.join(', '); // Convert array to comma-separated string
  if (postData.media) {
    editPostForm.mediaUrl.value = postData.media.url;
    editPostForm.mediaAlt.value = postData.media.alt;
  }
}

// Function to send updated post data to the server
async function updatePostData(postId, postData) {
  const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRXJpa1QiLCJlbWFpbCI6ImVyaXRvcjAwOTkxQHN0dWQubm9yb2ZmLm5vIiwiaWF0IjoxNzEzNDQwNTczfQ.0lPJOLKDAa-uq13nE2wWG4uynz8CxSBi0UtBUv_eYck";
  const url = `https://v2.api.noroff.dev/blog/posts/ErikT/${postId}`;

  const options = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(postData)
  };

  console.log("API Key:", apiKey);
  console.log("URL:", url);
  console.log("Options:", options);

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Post updated successfully
    console.log("Post updated successfully!");
    alert("Post updated successfully!");

    // Redirect to post detail page after 1 second
    setTimeout(() => {
      window.location.href = `/post/index.html?id=${postId}`;
    }, 1000);

  } catch (error) {
    console.error("Error updating post:", error);
    // Display error message in console
  }
}

// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault(); // Prevent default form submission behavior

  const editPostForm = event.target;
  const formData = new FormData(editPostForm);

  // Convert FormData to JSON object
  const jsonData = {};
  formData.forEach((value, key) => {
    jsonData[key] = value;
  });

  // Split tags into an array
  if (jsonData.tags) {
    jsonData.tags = jsonData.tags.split(',').map(tag => tag.trim());
  }

  // Include media object if mediaUrl or mediaAlt is present
  if (jsonData.mediaUrl || jsonData.mediaAlt) {
    jsonData.media = {
      url: jsonData.mediaUrl,
      alt: jsonData.mediaAlt
    };
    delete jsonData.mediaUrl;
    delete jsonData.mediaAlt;
  }

  // Retrieve post ID from URL query parameters
  const postId = getPostIdFromURL();

  console.log("Post ID:", postId);
  console.log("Post Data to Update:", jsonData);

  // Send updated post data to server
  updatePostData(postId, jsonData);
}

// Function to extract the post ID from the URL
function getPostIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}



// DELETE
document.addEventListener("DOMContentLoaded", function() {
  const postId = getPostIdFromURL();
  const accessKey = "ca3d7797-54e4-4a30-9036-8225cda050cf";

  setupDeleteButton(postId);
});

function getPostIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
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

    console.log("Post deleted successfully!");
    window.location.href = "/index.html";
  } catch (error) {
    console.error("Error deleting post:", error);
  }
}

function setupDeleteButton(postId) {
  const deleteButton = document.getElementById("deleteButton");
  const deleteConfirmationDialog = document.getElementById("deleteConfirmationDialog");
  const confirmDeleteButton = document.getElementById("confirmDeleteButton");
  const cancelDeleteButton = document.getElementById("cancelDeleteButton");

  if (deleteButton) {
    deleteButton.addEventListener("click", function() {
      deleteConfirmationDialog.style.display = "block";
    });
  } else {
    console.error("Delete button not found.");
  }

  if (confirmDeleteButton) {
    confirmDeleteButton.addEventListener("click", function() {
      deleteConfirmationDialog.style.display = "none";
      if (postId) {
        deletePost(postId);
      } else {
        console.error("Post ID not found in URL.");
      }
    });
  } else {
    console.error("Confirm delete button not found.");
  }

  if (cancelDeleteButton) {
    cancelDeleteButton.addEventListener("click", function() {
      deleteConfirmationDialog.style.display = "none";
    });
  } else {
    console.error("Cancel delete button not found.");
  }
}

