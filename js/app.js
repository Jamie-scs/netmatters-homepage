// ========================================
// Main JavaScript
// ========================================

// Declaring Variables

const hamMenu = document.querySelector('.hamburger-menu');
const offScreenMenu = document.querySelector('.off-screen-menu');
const main = document.querySelector('.main');
const tint = document.querySelector('.tint');

// Listen for Menu Button Activation

hamMenu.addEventListener('click', () => {
	hamMenu.classList.toggle('active');
	offScreenMenu.classList.toggle('active');
	main.classList.toggle('active');
	tint.classList.toggle('active');
});

// Auto Hide Menu

$("a, .tint").on("click", function() {
    $(".hamburger-menu").removeClass("active");
    $(".off-screen-menu").removeClass("active");
    $(".main").removeClass("active");
    $(".tint").removeClass("active");
});

// Call Owl Carousel on Hero Slideshow

// $(document).ready(function(){
//   $(".owl-carousel").owlCarousel({
//     loop:true,
//     autoplay:true,
//     autoplayTimeout:3000,
//     autoplayHoverPause:true
//   });
// });

// Call Owl Carousel on Partner Banner

$(document).ready(function(){
  $(".owl-carousel").owlCarousel({
    loop:true,
    margin:10,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
  	responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:5
        },
        1400:{
            items:6
        },
        2000:{
            items:8
        }
    }
  });
});