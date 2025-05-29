document.addEventListener("DOMContentLoaded", function () {
  // Hardcoded valid credentials
  const validEmail = "user@gmail.com";
  const validPassword = "1234";

  const form = document.querySelector("form");
  const errorMessage = document.getElementById("error");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form from reloading the page

    const enteredEmail = document.getElementById("email").value.trim();
    const enteredPassword = document.getElementById("password").value;

    if (enteredEmail === validEmail && enteredPassword === validPassword) {
      errorMessage.style.display = "none";
      window.location.href = "index.html"; // change this if needed
    } else {
      errorMessage.style.display = "block";
    }
  });
});
