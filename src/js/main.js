let menuIcon = document.querySelector("#menu-icon");
let navBar = document.querySelector(".navBar");



menuIcon.onclick = function () {
  menuIcon.classList.toggle("bx-x");
  navBar.classList.toggle("active");
};
