let submitButton = document.getElementById("submit");
let form = document.getElementById("form");
let waitMsg = document.getElementById("waitMSG");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  let res = (submitButton.disabled = true);
  submitButton.classList.add("disable");
  waitMsg.classList.remove("disable");
  console.log(res);
  const formData = new FormData(event.target);
  const formObject = Object.fromEntries(formData.entries());
  fetch("http://localhost:3000/auth/forget-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formObject),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:\n", data);
      if (data.message) {
        alert("Password reset link sent to your email.");
        //window.location.href = "../html_files/signin.html";
      } else
        alert(
          data.error_message
            ? data.error_message
            : "An error occurred. Please try again later."
        );
    })
    .catch((error) => {
      console.error("Error:\n", error);
      alert("An error occurred. Please try again later.");
    })
    .finally(() => {
      waitMsg.classList.add("disable");
      submitButton.disabled = false;
      submitButton.classList.remove("disable");
    });
});
