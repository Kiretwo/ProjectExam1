const apiKey = "ca3d7797-54e4-4a30-9036-8225cda050cf"; // Define your API key

fetchApi(apiKey)
  .then((response) => {
    console.log("Fetched data:", response);
    // Extract the data array from the response
    const data = response.data;
    const storedName = localStorage.getItem("name");

    if (storedName) {
      // Retrieve the avatar URL of the first post
      if (Array.isArray(data) && data.length > 0) {
        const avatarUrl = data[0].author.avatar.url;
        // Concatenate the avatar URL with the welcome message
        const welcomeMessage = `Welcome <div class="avatar-container"><img class="avatar-img" src="${avatarUrl}" alt="Avatar"></div> ${storedName}!`;
        console.log(welcomeMessage);
        document.getElementById("welcomeMessage").innerHTML = welcomeMessage;
      }
    } else {
      console.error("User name not found in localStorage");
    }
  })
  .catch((error) => {
    console.error("Fetch operation failed:", error);
  });


const indexLoginAndClearLocalStorage = document.getElementById(
  "indexLoginAndClearLocalStorage"
);

indexLoginAndClearLocalStorage.addEventListener("click", () => {
  localStorage.clear();
});

const userRole = localStorage.getItem("userRole");
const adminButton = document.getElementById("managePosts");

// Checking role information and enabling/disabling features accordingly
if (userRole === "owner") {
  // Enable owner/administrator-only features
  adminButton.classList.remove("hidden");
  adminButton.addEventListener("click", function() {
    window.location.href = "make.html";
  });
} else {
  // Disable owner/administrator-only features
  adminButton.classList.add("hidden");
}




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
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching API data:", error);
    throw error;
  }
}

// Call fetchApi with apiKey parameter
fetchApi(apiKey)
  .then((response) => {
    console.log("Fetched data:", response);
    // Extract the data array from the response
    const data = response.data;
    // Check if data is not empty and contains at least one object
    if (Array.isArray(data) && data.length > 0) {
      // Create a variable to store the HTML content
      let displayContent = '';
      // Iterate over each post object
      data.forEach(post => {
        // Extract relevant information for each post
        const title = post.title;
        const body = post.body;
        const authorName = post.author.name;
        const createdDate = new Date(post.created).toLocaleString();
        const imageUrl = post.media.url; // Access the image URL
        const imageAlt = post.media.alt;
        // Create HTML elements for the current post
        const postHtml = `
          <div class="post">
            <h3>${title}</h2>
            <img class="blog-image" src="${imageUrl}" alt="${imageAlt}">
            <p>${body}</p>
            <p>Author: ${authorName}</p>
            <p>Created: ${createdDate}</p>
          </div>
        `;
        // Append the HTML for the current post to the displayContent variable
        displayContent += postHtml;
      });
      // Display all posts in the HTML document
      document.getElementById('content').innerHTML = displayContent;
    } else {
      console.error("No data received or data is empty:", data);
    }
  })
  .catch((error) => {
    console.error("Fetch operation failed:", error);
  });


  // Fetch API data and generate post HTML
fetchApi(apiKey)
.then((response) => {
  console.log("Fetched data:", response);
  const data = response.data;

  if (Array.isArray(data) && data.length > 0) {
    let displayContent = '';

    data.forEach(post => {
      const title = post.title;
      const body = post.body;
      const authorName = post.author.name;
      const createdDate = new Date(post.created).toLocaleString();
      const imageUrl = post.media.url;
      const imageAlt = post.media.alt;
      const postId = post.id;

      const postHtml = `
        <div class="post">
          <h3><a href="post/index.html?id=${postId}">${title}</a></h3>
          <img class="blog-image" src="${imageUrl}" alt="${imageAlt}">
          <p>${body}</p>
          <p>Author: ${authorName}</p>
          <p>Created: ${createdDate}</p>
        </div>
      `;
      displayContent += postHtml;
    });

    document.getElementById('content').innerHTML = displayContent;
  } else {
    console.error("No data received or data is empty:", data);
  }
})
.catch((error) => {
  console.error("Fetch operation failed:", error);
});