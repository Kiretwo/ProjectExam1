const storedName = localStorage.getItem("name");

if (storedName) {
  const welcomeMessage = `Welcome ${storedName}!`;
  console.log(welcomeMessage);
  document.getElementById("welcomeMessage").textContent = welcomeMessage;
} else {
  console.error("User name not found in localStorage");
}

const indexLoginAndClearLocalStorage = document.getElementById(
  "indexLoginAndClearLocalStorage"
);

indexLoginAndClearLocalStorage.addEventListener("click", () => {
  localStorage.clear();
});

const userRole = localStorage.getItem("userRole");

// Checking role information and enabling/disabling features accordingly
if (userRole === "owner") {
  // Enable owner/administrator-only features
  document.getElementById("createPostButton").disabled = false;
} else {
  // Disable owner/administrator-only features
  document.getElementById("createPostButton").disabled = true;
}
