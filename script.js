const indexLoginAndClearLocalStorage = document.getElementById('indexLoginAndClearLocalStorage');

indexLoginAndClearLocalStorage.addEventListener('click', () => {
  localStorage.clear();
})


const userRole = localStorage.getItem('userRole');

// Checking role information and enabling/disabling features accordingly
if (userRole === 'owner') {
  // Enable owner/administrator-only features
  document.getElementById('createPostButton').disabled = false;
} else {
  // Disable owner/administrator-only features
  document.getElementById('createPostButton').disabled = true;
}