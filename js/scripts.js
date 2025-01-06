$(document).ready(function () {
  $(window).scroll(function(){
    if(this.scrollY > 20)
      $(".navbar").addClass("sticky");
    else
      $(".navbar").removeClass("sticky");
  });

  $(".menu-toggler").click(function () {
    $(this).toggleClass("active");
    $(".navbar-menu").toggleClass("active");
  });

  $(".works").magnificPopup({
    delegate: "a",
    type: "image",
    gallery: { enabled: true },
  });

  $(".gotop").click(function () {
    scroll(0, 0);
  });

});

window.addEventListener("scroll", () => {
  const navbar = document.querySelector("nav");
  if (this.scrollY > 20) {
    navbar.classList.add("sticky");
    $(".gotop").fadeIn();
  } else {
    navbar.classList.remove("sticky");
    $(".gotop").fadeOut();
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector(".menu-toggler");
  const navMenu = document.querySelector(".navbar-menu");

  menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("active");
    navMenu.classList.toggle("active");
  });
});

// function toggleDetails(element) {
//   console.log("import function success")
//   const info = element.querySelector('.');
//   const details = info.querySelector('.details');

//   // Toggle the visibility of details
//   details.classList.toggle('hidden');
//   element.classList.toggle('zoomed');
// }
