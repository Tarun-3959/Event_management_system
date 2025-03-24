let eventsContainer = document.getElementById("events-container");
let createEvntBtn = document.getElementById("createEvntBtn");

document.addEventListener("DOMContentLoaded", () => {
  const accessToken = getCookie("accessToken");
  const refreshToken = getCookie("refreshToken");
  let signin_logoutBtb = document.getElementById("signin_logoutbtn");
  // If tokens exist, user is signed in
  if (accessToken || refreshToken) {
    signin_logoutBtb.innerText = "Logout";
    signin_logoutBtb.addEventListener("click", logout);
  } else {
    signin_logoutBtb.innerText = "Sign In";
    signin_logoutBtb.addEventListener("click", signin);
  }
});

// Function to sign in
async function signin() {
  window.location.href = "../html_files/signin.html";
}

// Function to log out
async function logout() {
  try {
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    alert("User logged out successfully");
    // Update signin_logoutBtb text and action
    const signin_logoutBtb = document.getElementById("signin_logoutbtn");
    signin_logoutBtb.textContent = "Sign In";
    signin_logoutBtb.removeEventListener("click", logout);
    signin_logoutBtb.addEventListener("click", signin);
  } catch (error) {
    console.error("Error during logout:", error);
  }
}

// Helper functions to get, set, and delete cookies

// Get a cookie value by name
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

// Set a cookie
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // set expiration time
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value}; ${expires}; path=/`;
}

// Delete a cookie
function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}

async function getAllEvents() {
  try {
    const response = await fetch("http://localhost:3000/event/get-all");
    const { events } = await response.json();
    console.log(events);
    if (events.length === 0) {
      eventsContainer.innerHTML = "<h2>No events found</h2>";
      return;
    }
    events.forEach((event) => {
      date_timeStr = event.dateTime;
      date_time = date_timeStr.split("T");
      date = date_time[0];
      time = date_time[1].split(":");
      time = time[0] + ":" + time[1];
      let timedate = date + time;
      const eventCard = document.createElement("div");
      eventCard.classList.add("event-card");
      eventCard.innerHTML = `
    <div class="event-image">
      <img src=${
        event.img
          ? event.img
          : "https://tamanmini.com/taman_jelajah_indonesia/wp-content/uploads/2023/08/event-dummy.png"
      } alt="event-image" />
    </div>
    <div class="event-details">
      <h2 class="event-title">${event.title}</h2>
      <p class="event-date-time">${timedate}</p>
      <p class="event-category">Category: ${event.category}</p>
      <p class="event-attendees">Number of attendees: ${
        event.attendees.length
      }</p>
      <p class="event-address">Location: ${event.location}</p>
    </div>
      `;
      eventsContainer.appendChild(eventCard);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

createEvntBtn.addEventListener("click", () => {
  const accessToken = getCookie("accessToken");
  if (!accessToken) {
    alert("Please sign in to create an event");
    return;
  }
  window.location.href = "../html_files/create_event.html";
});

getAllEvents();
