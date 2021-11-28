/* Button */
let animateButton = function(e) {

  e.preventDefault;
  //reset animation
  e.target.classList.remove('animate');
  
  e.target.classList.add('animate');
  setTimeout(function(){
    e.target.classList.remove('animate');
  },300);
};

let bubblyButtons = document.getElementsByClassName("bubbly-button");

for (let i = 0; i < bubblyButtons.length; i++) {
  bubblyButtons[i].addEventListener('click', animateButton, false);
}


/* Вelay button */
jQuery(document).ready(function ($) {
   
    $('.bubbly-button').on('click', function(e) {
       e.preventDefault();
       
       let 
          href = $(this).attr('href'),
          timeout = 500;
          
       setTimeout(function() {
          location.href = href;
       }, timeout);
       
    });   
    
}); 


/* Вurger menu */
const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },

    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },

    IOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },

    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },

    any: function () {
        return (
        isMobile.Android() ||
        isMobile.BlackBerry() ||
        isMobile.IOS() ||
        isMobile.Opera() ||
        isMobile.Windows());
    }
};

if (isMobile.any()) {
    document.body.classList.add('_touch');

    let menuArrows = document.querySelectorAll('.menu_arrow');

    if (menuArrows.length > 0) {
        for (let index = 0; index < menuArrows.length; index++) {
            const menuArrow = menuArrows[index];
            menuArrow.addEventListener("click", function (e) {
                menuArrow.parentElement.classList.toggle('_active');
            });
        }
    }

    } else {
    document.body.classList.add ('_pc');
}

const iconMenu = document.querySelector('.menu_icon');
const menuBody = document.querySelector('.menu_body');

if (iconMenu) {
    iconMenu.addEventListener("click", function (e) {
        document.body.classList.toggle('_lock');
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
    });
}


/* Smooth slide navigation */
const menuLinks = document.querySelectorAll('a[data-goto]');
if(menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener("click", onMenuLinkClick);
    });

    
    function onMenuLinkClick(e) {
        const menuLink = e.target;
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

            if (iconMenu.classList.contains('_active')) {
                document.body.classList.remove('_lock');
                iconMenu.classList.remove('_active');
                menuBody.classList.remove('_active');
            }

            window.scrollTo({
                top:gotoBlockValue,
                behavior: "smooth"
            });
            e.preventDefault();
        }
    }
}

/* Form */
$(function(){
    $(".knopka-1").click(function(){
      $(".block-2").fadeOut(1);
      $(".block-1").fadeIn(100);
      });
      $(".knopka-2").click(function(){
      $(".block-1").fadeOut(1);
      $(".block-2").fadeIn(100);
    });
});
