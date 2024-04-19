const API_BASE_URL = 'https://v2.api.noroff.dev/';

const user = {
  name: 'ErikT',
  email: 'eritor00991@stud.noroff.no',
  password: 'Theone123',
};

const userLogin = {
  email: 'eritor00991@stud.noroff.no',
  password: 'Theone123',
};

async function loginUser(url, data) {
  try {
    const postData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, postData);
    console.log(response);
    const json = await response.json();
    const accessToken = json.accessToken;
    localStorage.setItem('accessToken', accessToken);
    console.log(json);
    // Logs:
    // accessToken: "eyJhbGciOiJIuzI1NiIsInR...
    // avatar: ""
    // email: "test-account-a@noroff.no
    // name: "test_account_a"
    return json;
  } catch (error) {
    console.log(error);
  }
}

loginUser(`${API_BASE_URL}auth/login`, user);



async function fetchWithToken(url) {
  try {
    const token = localStorage.getItem('accessToken');
    const getData = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, getData);
    console.log(response);
    const json = await response.json();
    console.log(json);
    // Logs:
    // 0: {title: 'test', body: 'test', tags: Array(0), media: '', created: '2022-09-18T08:04:05.484Z', …}
    // 1: {title: 'This is a new post', body: 'This is updated text', tags: Array(1), media: 'whatevs', created: '2022-09-17T13:17:01.133Z', …}
    // ... More array values
  } catch (error) {
    console.log(error);
  }
}

fetchWithToken(API_BASE_URL + 'blog/posts/ErikT');
