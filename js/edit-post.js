// edit-post.js

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
  const apiKey = "ca3d7797-54e4-4a30-9036-8225cda050cf";
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
  // Add more lines to populate additional fields if needed
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

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Post updated successfully
    console.log("Post updated successfully!");
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

  // Retrieve post ID from URL query parameters
  const postId = getPostIdFromURL();

  // Send updated post data to server
  updatePostData(postId, jsonData);
}

// Function to extract the post ID from the URL
function getPostIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}
