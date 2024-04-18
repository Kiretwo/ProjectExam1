/*
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
const TheAPIKey = "ca3d7797-54e4-4a30-9036-8225cda050cf"; // Define your API key
fetchApi(TheAPIKey)
  .then((data) => {
    console.log("Fetched data:", data);
  })
  .catch((error) => {
    console.error("Fetch operation failed:", error);
  });
*/

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
const apiKey = "ca3d7797-54e4-4a30-9036-8225cda050cf"; // Define your API key
fetchApi(apiKey)
  .then((response) => {
    console.log("Fetched data:", response);
    // Extract the data array from the response
    const data = response.data;
    // Check if data is not empty and contains at least one object
    if (Array.isArray(data) && data.length > 0) {
      // Get the first object
      const firstObject = data[0];
      // Extract relevant information
      const title = firstObject.title;
      const body = firstObject.body;
      const authorName = firstObject.author.name;
      const createdDate = new Date(firstObject.created).toLocaleString();
      // Display the information in the HTML document
      const displayContent = `
        <h2>${title}</h2>
        <p>${body}</p>
        <p>Author: ${authorName}</p>
        <p>Created: ${createdDate}</p>
      `;
      document.getElementById('content').innerHTML = displayContent;
    } else {
      console.error("No data received or data is empty:", data);
    }
  })
  .catch((error) => {
    console.error("Fetch operation failed:", error);
  });



