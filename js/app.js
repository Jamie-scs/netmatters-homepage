// ========================================
// Main JavaScript
// ========================================

// Declaring Variables

const 	hamBtn 			= document.querySelector('.hamburger-menu'),
		offScreenMenu 	= document.querySelector('.off-screen-menu'),
		main 			= document.querySelector('.main'),
		tint 			= document.querySelector('.tint'),
		menuTint 		= document.querySelector('.menu-tint');

// Scroll Lock

function disableScroll() {
	// Get the current page scroll position
	scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;		

		// if any scroll is attempted, set this to the previous value
		window.onscroll = function() {
			window.scrollTo(scrollLeft, scrollTop);
		};
}

function enableScroll() {
	window.onscroll = function() {};
}


// Cookies

const setDefault = {
	hotjar : true,
	linkedin : true,
	facebook : true,
	google : true,
	lead : true,
	netmatters : true
};

const storageType = localStorage;
let cookieObject;

const shouldShowPopup = () => !storageType.getItem(cookieObject);
const saveToStorage = () => storageType.setItem(cookieObject, true);

window.onload = () => {

	const consentPopup = document.getElementById('consent-popup');
	const acceptBtn = document.getElementById('cs-accept');
	const changeBtn = document.getElementById('cs-change');
	const cookieSetting = document.getElementById('cookie-settings');

// Accept Cookies Button

	const acceptFn = e => {
		cookieObject = JSON.stringify(setDefault);
		saveToStorage(storageType);
		consentPopup.classList.add('hidden');
		tint.classList.add('hidden');
		enableScroll();
	};

// Set Cookies Function

	const setCookieFn = () => {
		const cookieSettings = document.getElementsByClassName('cs-btn', 'active');
		let setCookie = {};
		setCookie.hotjar = cookieSettings[2].value;
		setCookie.linkedin = cookieSettings[3].value;
		setCookie.facebook = cookieSettings[4].value;
		setCookie.google = cookieSettings[5].value;
		setCookie.lead = cookieSettings[6].value;
		setCookie.netmatters = cookieSettings[7].value;
		cookieObject = JSON.stringify(setCookie);
	};

console.log(cookieObject);

// Accept Cookie Preferences Button

	const acceptPrefFn = e => {
		setCookieFn();
		saveToStorage(storageType);
		consentPopup.classList.add('hidden');
		cookieSetting.classList.add('hidden');
		main.classList.remove('hidden');
		enableScroll();
	};

// Change Cookie Preferences Button

	const changeFn = e => {
		const cookieSettingCancel = document.getElementById('cs-cancel');
		const cookieSettingSubmit = document.getElementById('cs-submit');

		consentPopup.classList.add('hidden');
		tint.classList.add('hidden');
		cookieSetting.classList.remove('hidden');
		main.classList.add('hidden');
		enableScroll();

// Detailed Preferences Button

		const showPreferences = document.getElementById('preferences-show');
		const detailedPreferences = document.getElementById('detailed-preferences');
		
		const changeTextFn = e => {
			detailedPreferences.classList.toggle('hidden');
			if (showPreferences.innerHTML == 'show detailed preferences') {
				showPreferences.innerHTML = 'hide detailed preferences';
				return;
			}
			showPreferences.innerHTML = 'show detailed preferences';
		};

		showPreferences.addEventListener('click', changeTextFn);

// Show Terms & Conditions

		const expand = document.getElementsByClassName('expand');
		const terms = document.getElementsByClassName('terms');
		for (let i = 0; i < expand.length; i++) {
			expand[i].addEventListener('click', () => {
				terms[i].classList.toggle('hidden');
			});
		};

// Cookie Setting Listeners

		const disableBtn = document.getElementsByClassName('disable');
		const enableBtn = document.getElementsByClassName('enable');

		for (let i = 0; i < disableBtn.length; i++) {
			disableBtn[i].addEventListener('click', () => {
				disableBtn[i].classList.add('active');
				enableBtn[i].classList.remove('active');	
			});
			enableBtn[i].addEventListener('click', () => {
				enableBtn[i].classList.add('active');
				disableBtn[i].classList.remove('active');
			});
		};

// Cancel / Submit Button Listeners

		cookieSettingCancel.addEventListener('click', () => {
			consentPopup.classList.remove('hidden');
			tint.classList.remove('hidden');
			cookieSetting.classList.add('hidden');
			main.classList.remove('hidden');
			disableScroll();
		});
		
		cookieSettingSubmit.addEventListener('click', acceptPrefFn);
	};

	acceptBtn.addEventListener('click', acceptFn);
	changeBtn.addEventListener('click', changeFn);

// Check For Cookies in Storage

	if (shouldShowPopup(storageType)) {
		tint.classList.remove('hidden');
		consentPopup.classList.remove('hidden');
		disableScroll();
	};
};

// Listen for Menu Button Activation

hamBtn.addEventListener('click', () => {
	hamBtn.classList.toggle('active');
	offScreenMenu.classList.toggle('active');
	main.classList.toggle('active');
	menuTint.classList.toggle('active');
	disableScroll();
});

// Auto Hide Menu

$("a, .menu-tint").on("click", function() {
    $(".hamburger-menu").removeClass("active");
    $(".off-screen-menu").removeClass("active");
    $(".main").removeClass("active");
    $(".menu-tint").removeClass("active");
    enableScroll();
});

// Call Owl Carousel

$(document).ready(function(){
	const heroBanner = $('#hero-banner');
	const partnerBanner = $('#partner-banner');
 
// --Hero Banner

	heroBanner.owlCarousel({
	  	items:1,
	  	loop:true,
	   	autoplay:true,
	   	autoplayTimeout:4200,
	   	autoplayHoverPause:true
 	});

// --Partner Banner

 	partnerBanner.owlCarousel({
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
	        2000:{
	            items:8
	        },
	        3000:{
	        	items:12
	        }
	    }
 	});
});

// Sticky Header

let scroll;
let currentPosition = 0;
const offset = 5;
const heightHeader = $('#sticky-header').outerHeight();
$(window).scroll(function(event){
    scroll = true;
});

setInterval(function() {
    if (scroll) {
        hasScrolled();
        scroll = false;
    }
}, 250);

function hasScrolled() {
    var toTop = $(this).scrollTop();
    if(Math.abs(currentPosition - toTop) <= offset)
        return;
    
    if (toTop > currentPosition && toTop > heightHeader){
        // Scroll Down
        $('#sticky-header').removeClass('sticky-header').addClass('sticky');
    } else {
        // Scroll Up
        if(toTop + $(window).height() < $(document).height()) {
            $('#sticky-header').removeClass('sticky').addClass('sticky-header');
        }
    }
    
    currentPosition = toTop;
}

// Newsletter Sign-Up Validation

let formNews	= document.getElementById("form-news"),
	name		= document.getElementById("name"),
	email		= document.getElementById("email"),
	check		= document.getElementById("check"),
	errorMsg	= document.getElementsByClassName("error-text"),
	close		= document.getElementsByClassName("close"),
	parent		= document.getElementsByClassName("error")

const indexMsg	=
	[
 	"The name",
 	"Email",
 	"The marketing preference"
]

const errMsg	=
	{
	noContent		: " field is required.",
	hasInvalid		: " format is invalid.",
	isLong			: " is too long, max 254 characters"
}

const 
	nameErr		= document.getElementById("name-error"),
	emailErr	= document.getElementById("email-error"),
	checkErr	= document.getElementById("check-error");

const regExpTx	= new RegExp(/^[a-zA-Z ]*$/),
	  regExpEm	= new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

let validate	= (id, index) => {
	let val = id.value.trim();

	if (val === "" && id === name)	{
		errorMsg[index].innerHTML = indexMsg[index] + errMsg.noContent;
		nameErr.classList.remove('hidden');
	    return;
	}
	if (val === "" && id === email)	{
		errorMsg[index].innerHTML = indexMsg[index] + errMsg.noContent;
		emailErr.classList.remove('hidden');
	    return;
	}
	if (!id.checked && id === check)	{
		errorMsg[index].innerHTML = indexMsg[index] + errMsg.noContent;
		checkErr.classList.remove('hidden');
	    return;
	}
	if (!val.match(regExpTx) && id === name)	{
		errorMsg[index].innerHTML = indexMsg[index] + errMsg.hasInvalid;
	    nameErr.classList.remove('hidden');
	    return;
	}
	if (!val.match(regExpEm) && id === email)	{
		errorMsg[index].innerHTML = indexMsg[index] + errMsg.hasInvalid;
	    emailErr.classList.remove('hidden');
	    return;
	}
};

formNews.addEventListener('submit', (e) => {
	e.preventDefault();
	validate(name, 0);
	validate(email, 1);
	validate(check, 2);
});

for (let i = 0; i < close.length; i++) {
	close[i].addEventListener('click', () => {
		parent[i].classList.add('hidden');
	})
};