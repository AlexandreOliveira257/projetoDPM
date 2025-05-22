// Set your valid email and password
const validEmail = "teste@email.com";
const validPassword = "1234";

// Handle form submission
document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault(); // prevent page reload

  const enteredEmail = document.getElementById("email").value;
  const enteredPassword = document.getElementById("password").value;
  const errorMessage = document.getElementById("error");

  if (enteredEmail === validEmail && enteredPassword === validPassword) {
    // Successful login
    alert("Login successful!");
    errorMessage.style.display = "none";

    // Redirect to another page or show logged-in content
    // window.location.href = "dashboard.html";
  } else {
    // Show error message
    errorMessage.style.display = "block";
  }
});
