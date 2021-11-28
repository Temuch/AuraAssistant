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
async function getjob(body) {
    const response = await fetch("http://ai-vacancy.ru:8070/text/", {
            "headers": {
              "accept": "application/json",
              "accept-language": "ru,en;q=0.9,es;q=0.8",
              "content-type": "application/json",
              "sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Yandex\";v=\"21\"",
              "sec-ch-ua-mobile": "?0",
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "none"
            },
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": body,
            "method": "POST",
            "mode": "cors",
            "credentials": "omit"
          });
  
    const res = await response.json();
    console.log(res);
    $("div#auraa").text(res.answer.answer);
    console.log(response)
        }
$(function(){

      $(".knopka-2").click(function(){
      
        console.log("click")
        var recognizer = new webkitSpeechRecognition();
        // Ставим опцию, чтобы распознавание началось ещё до того, как пользователь закончит говорить
        recognizer.interimResults = true;
        // Какой язык будем распознавать?
        recognizer.lang = 'ru-Ru';
        // Используем колбек для обработки результатов
        recognizer.onresult = function (event) {
          var result = event.results[event.resultIndex];
          if (result.isFinal) {
                
                res = result[0].transcript;
                console.log(res);
                var inp = document.getElementById("userr");
                inp.innerText = res;
                obj = {request: res };
	            body = JSON.stringify(obj);
                resp = getjob(body);
            };
        }
        
        // Начинаем слушать микрофон и распознавать голос
        recognizer.start();


    });
});

