// Retrieve the post ID from the URL query parameters
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');
console.log(postId);

// Fetch the post details using the post ID
fetch(`https://v2.api.noroff.dev/blog/posts/ErikT/${postId}`)
  .then(response => {
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
