document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const formObject = Object.fromEntries(formData.entries());
  fetch("http://localhost:3000/auth/sign-up", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formObject),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:\n", data);
      if (data.user) {
        alert("Account created successfully");
        window.location.href = "../html_files/signin.html";
      } else
        alert(
          data.message
            ? data.message
            : "An error occurred. Please try again later."
        );
    })
    .catch((error) => {
      console.error("Error:\n", error);
    });
});
