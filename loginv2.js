async function fetchApi(apiKey) {
  const options = {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoib2xlMTIzIiwiZW1haWwiOiJvbGVidWwwMDk5N0BzdHVkLm5vcm9mZi5ubyIsImlhdCI6MTcxMzQzMDQyNX0.ao8oajhwTxh52gN5oXqtq_N-q28o0DCQXCYEmXrjip`,
      "5794466a-ac21-441f-8a55-385e2fda14c7": apiKey
    }
  };

  try {
    const response = await fetch("https://v2.api.noroff.dev/blog/posts/ErikT", options);

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
const API_BASE_URL = 'https://v2.api.noroff.dev/';

async function loginUser() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const loginData = {
        email,
        password
    };

    try {
        const response = await fetch(`${API_BASE_URL}auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRXJpa1QiLCJlbWFpbCI6ImVyaXRvcjAwOTkxQHN0dWQubm9yb2ZmLm5vIiwiaWF0IjoxNzEzNDQwNTczfQ.0lPJOLKDAa-uq13nE2wWG4uynz8CxSBi0UtBUv_eYck";

        localStorage.setItem('accessToken', accessToken);
        console.log('Login successful. Access token:', accessToken);

        // Redirect to dashboard or another page upon successful login
        window.location.href = '/dashboard.html'; // Replace with desired URL
    } catch (error) {
        console.error('Login error:', error.message);
        document.getElementById('error-message').textContent = 'Login failed. Please try again.';
    }
}