document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const formObject = Object.fromEntries(formData.entries());
  fetch("http://localhost:3000/auth/sign-in", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formObject),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:\n", data);
      if (data.accessToken) {
        document.localStorage.setItem("userInfo", data.userInfo);
        document.cookie = `accessToken=${data.accessToken}; path=/; Secure; SameSite=Strict`;
        document.cookie = `refreshToken=${data.refreshToken}; path=/; Secure; SameSite=Strict`;
        alert("user login successfully");
        window.location.href = "../html_files/index.html";
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
