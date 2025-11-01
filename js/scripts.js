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

// Magnific Popup for grouped image galleries
$('[class^="gallery"]').each(function() {
  const group = $(this).attr('class');
  $('.' + group).magnificPopup({
    type: 'image',
    gallery: {
      enabled: true
    },
    image: {
      titleSrc: item => item.el.find('img').attr('alt')
    },
    closeOnContentClick: true,   // 👈 closes when clicking the image
    mainClass: 'mfp-fade mfp-img-mobile', // nice fade + mobile support
    removalDelay: 200,
    fixedContentPos: true
  });
});

