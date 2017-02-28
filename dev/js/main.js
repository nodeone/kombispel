// START jQuery
"use strict";
$( document ).ready(function() {

/////////////////////////////////////////////
// Change Password Modal
/////////////////////////////////////////////
$(".js-MyPages-password-btn").click(function() {
  $(".js-Site-container").toggleClass("locked");
  $(".js-MyPages-pswrd-overlay-container").fadeIn("fast");
})
$(".js-MyPages-close-form, .js-MyPages-pswrd-clickarea").click(function() {
  $(".js-Site-container").toggleClass("locked");
  $(".js-MyPages-pswrd-overlay-container").fadeOut("fast");
})
var $newPassword = $(".js-MyPages-new-pswrd");
var $repeatPassword = $(".js-MyPages-repeat-pswrd");
var $newPasswordStatus = $(".js-MyPages-new-pswrd-status");
var $newPasswordMatch = $(".js-MyPages-new-pswrd-match");
var passwordState = {
  length: false,
  password: "",
  repeatPassword: ""
}
// Check if password is sufficient
$newPassword.on('input', function() {
 passwordState.password = $(this).val();
 passwordState.repeatPassword = $repeatPassword.val();
if(passwordState.password.length >= 6) {
  passwordState.length = true;
} else {
  passwordState.length = false;
}
checkPassword()
});
$repeatPassword.on('input', function() {
  passwordState.password = $newPassword.val();
  passwordState.repeatPassword = $(this).val();
checkPassword()
});
function checkPassword() {
  if(passwordState.length) {
    $newPasswordStatus.html("Lösenord är ok")
    $newPasswordStatus.addClass("u-green")
    $newPasswordStatus.removeClass("u-red")
  } else {
    $newPasswordStatus.html("Lösenord för kort")
    $newPasswordStatus.removeClass("u-green")
    $newPasswordStatus.addClass("u-red")
  }
  if(passwordState.password === passwordState.repeatPassword && passwordState.length) {
    $newPasswordMatch.html("Lösenorden överenstämmer")
    $newPasswordMatch.addClass("u-green")
    $newPasswordMatch.removeClass("u-red")
  } else if(passwordState.password === passwordState.repeatPassword && passwordState.length === false) {
    $newPasswordMatch.html("Lösenorden överenstämmer men är för korta")
    $newPasswordMatch.removeClass("u-green")
    $newPasswordMatch.addClass("u-red")
  } else {
    $newPasswordMatch.html("Lösenorden överenstämmer inte")
    $newPasswordMatch.removeClass("u-green")
    $newPasswordMatch.addClass("u-red")
  }
}

/////////////////////////////////////////////
 // CLOSE MODAL
 ////////////////////////////////////////////
$(".js-Login-clickarea, .js-Login-close-form").click(function() {
  $(".js-Login-overlay-container").fadeOut("fast")
  $(".js-Site-container").toggleClass("locked");
})
/////////////////////////////////////////////
 // SLIDETOGGLE THE HELPBOXES
 ////////////////////////////////////////////
$(".js-Login-username-toggle").click(function() {
  $(".js-Login-username-help-box").slideToggle();
});

$(".js-Login-password-toggle, .js-Login-forgot-password").click(function() {
  $(".js-Login-password-help-box").slideToggle();
});

/////////////////////////////////////////////
// STATE OF THE FORM
/////////////////////////////////////////////
var state = {
  userName: false, // IS CUSTOMERNUMBER OR EMAIL OK
  passWord: false,
  emailReg: false,
  numberReg: false
}
/////////////////////////////////////////////
// USERNAME CHECK
/////////////////////////////////////////////
  // REGEX mail.
var emailReg = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
  // REGEX user number.
var userNumberReg = new RegExp('^[a-zA-Z]{2}[0-9]{6}$');
var validUser;
var userNameMessage = "Du har inte angivet ett korrekt kundnummer eller e-postadress.";
var passwordMessage = "Felaktigt lösenord.";

// INPUT FIELD CHANGE
$('.js-Login-input-username').on('input', function() {
    if(emailReg.test($(this).val()) ) {
      state.emailReg = true;
      state.numberReg = false;
    } else if(userNumberReg.test($(this).val() )) {
      state.numberReg = true;
      state.emailReg = false;
    } else {
      state.numberReg = false;
      state.emailReg = false;
    }
    validUser = state.numberReg || state.emailReg;
      if (validUser) {
        state.userName = true;
      }
      else {
        state.userName = false;
      }
});

// WHEN INPUT IS DONE WITH THE FIELD
$('.js-Login-input-username').focusout(function() {
  // console.log("INPUT NOT IN FOCUS ANY MORE");
  if(state.userName == false) {
    $(".js-Login-username-toggle").removeClass("js-Login-question-icon").removeClass("js-Login-check-icon").addClass("js-Login-error-icon")
    $(this).addClass("js-Login-input-error")
    $(".js-Login-username-message").show().html(userNameMessage)

  } else {
    $(".js-Login-username-toggle").addClass("js-Login-question-icon").removeClass("js-Login-error-icon");
    $(this).removeClass("js-Login-input-error")
    $(".js-Login-username-message").hide().html("")
  }

  // WHICH BOX SHOULD SHOW
  if(state.emailReg) {
    passwordBox("reset")
    $(".js-Login-reset-email").html($('.js-Login-input-username').val()) // SET THE EMAIL IN THE MESSAGE TO WHATEVER IT IS IN THE INPUT IF IT IS VALID
  } else {
    passwordBox("default")
  }
})

$(".js-Login-reset-password-btn").click(function(e) {
  passwordBox("sent")
})

/////////////////////////////////////////////
// PASSWORD HELP BOX
/////////////////////////////////////////////
function passwordBox(box) {
  if(box == "reset") {
    $(".js-Login-password-reset-box").show();
    $(".js-Login-password-sent-box, .js-Login-password-default-box").hide();
  } else if(box == "sent") {
    $(".js-Login-password-reset-box, .js-Login-password-default-box").hide();
    $(".js-Login-password-sent-box").show();
  } else if(box == "default") {
    $(".js-Login-password-sent-box, .js-Login-password-reset-box").hide();
    $(".js-Login-password-default-box").show();
  }
}

/////////////////////////////////////////////
// PASSWORD INPUT FIELD
// *** REMOVE IN PROD or atleast configure after API
/////////////////////////////////////////////

$(".js-Login-input-password").on('input', function() {

  var passWord = $(this).val();

  if(passWord == "kombi" || passWord== "lotter" || passWord == "spel") {
    state.passWord = true
    window.location.href = "localhost:3000/tickets.html";
  } else {
    state.passWord = false
  }
    if(state.passWord != true) {
      $(".js-Login-password-message").hide();
    }
    if($(this).hasClass("js-Login-input-error")) {
      $(this).removeClass("js-Login-input-error")
      $(".js-Login-password-toggle").removeClass("js-Login-error-icon").addClass("js-Login-question-icon")
    }
 });

///////////////////////////////////////////////////////
// CHECK IF LOGIN PASSED (JUST FOR PROTOTYPE TESTING)
// ***  REMOVE IN PROD
//////////////////////////////////////////////////////
$(".js-Login-form-submit-btn").click(function(e) {
  e.preventDefault(e)
  if(validUser && state.passWord) {
    window.location.replace("tickets.html");
  }
  else if(validUser == true && state.passWord != true) {
    $(".js-Login-password-toggle").removeClass("js-Login-question-icon").addClass("js-Login-error-icon")
    $(".js-Login-header").addClass("Login-header--error").html("Inloggningen misslyckades")
    $(".js-Login-input-password").addClass("js-Login-input-error")
    $(".js-Login-password-message").show().html(passwordMessage)
  }
  else {
    $(".js-Login-header").addClass("Login-header--error").html("Inloggningen misslyckades")
    $(".js-Login-input-password").addClass("js-Login-input-error")
    $(".js-Login-username-toggle").removeClass("js-Login-question-icon").removeClass("js-Login-check-icon").addClass("js-Login-error-icon")
    $(".js-Login-password-toggle").removeClass("js-Login-question-icon").addClass("js-Login-error-icon")
    $(".js-Login-username-message").show().html(userNameMessage)
    $(".js-Login-password-message").show().html(passwordMessage)
  }
});

var $loginCookie = "Tjena tjabba!"; // Ersätt med vad inloggningskakan nu heter
$(".js-Promo-correct-ticket-btn").click(function(e) {
  if (document.cookie.indexOf($loginCookie) == -1) {
    e.preventDefault();
    $(".js-Login-header").html("Logga in för att rätta din lott")
    $(".js-Site-container").toggleClass("locked");
    $(".js-Login-overlay-container").fadeIn("fast");
  }
})

/////////////////////////////////////////////
// Check if Cookie is set
/////////////////////////////////////////////
if (document.cookie.indexOf("_ga") == -1) {
   $(".js-Cookie-container").show()
}
/////////////////////////////////////////////
// Approve hide cookie info
/////////////////////////////////////////////
$(".js-Cookies-approve-btn").click(function() {
   $(".js-Cookie-container").fadeOut("fast");
})

$(".js-Choices-others-readmore").click(function() {
  $(this).next().slideToggle();
})


/////////////////////////////////////////////
// TOGGLE MENU OPEN
/////////////////////////////////////////////
$(".js-Menu-level-one-header").click(function() {
  $(this).next().slideToggle();
  $(this).toggleClass("children-open");
})

$(".js-Information-toggle-mail").click(function() {
  $(".js-Information-help-box--mail").slideToggle()
})
$(".js-Information-toggle-phone").click(function() {
  $(".js-Information-help-box--phone").slideToggle()
})
$(".js-Information-toggle-mobile").click(function() {
  $(".js-Information-help-box--mobile").slideToggle()
})
/////////////////////////////////////////////
// On input & select
/////////////////////////////////////////////
var $informationInput = $(".js-Information-input");
var $informationSelect = $(".js-Information-select");
var $initInfo = []
var $initSelect = []
var $infoRegretBtn = $(".js-Information-regret-btn");
var $infoSaveContainer = $(".js-Information-save-container");
$informationInput.each(function() {
  $initInfo.push($(this).val())
})
$informationSelect.each(function() {
  $initSelect.push($(this).val())
})

function toggleSaveContainer() {
  if($infoSaveContainer.hasClass("js-Information-save-container--visible") == false) {
    $infoSaveContainer.addClass("js-Information-save-container--visible")
  }
}
$informationInput.on('input', function() {
  toggleSaveContainer();
})
$informationSelect.on('change', function() {
  toggleSaveContainer();
})
$infoRegretBtn.click(function() {
  $informationInput.each(function(i) {
    $informationInput[i].value = $initInfo[i]
  })
  $informationSelect.each(function(i) {
    $informationSelect[i].value = $initSelect[i]
  })
  $infoSaveContainer.removeClass("js-Information-save-container--visible")
})

/////////////////////////////////////////////
// HEADER SLIDE DOWN
/////////////////////////////////////////////
var previousTop = window.pageYOffset;
var headerContainer = $(".js-Header-container");
var headerSlideDown = function() {
  // console.log("kallas på!");
  // console.log(window.pageYOffset);
  // console.log(window.pageYOffset);
  if(window.pageYOffset > 0) { // <-- Man är inte högst upp på sidan
    var currentOffTop = window.pageYOffset;
    if(currentOffTop > previousTop && window.pageYOffset > 130) {
        headerContainer.addClass("is-hidden")
    } else {
      headerContainer.removeClass("is-hidden")
    }
    previousTop = currentOffTop;
  } else {
    headerContainer.removeClass("is-hidden")
  }
}
$(window).on('scroll',_.throttle(headerSlideDown, 100));
/////////////////////////////////////////////
// ALL THE OTHER STUFF
/////////////////////////////////////////////
$(".js-Header-correct-btn").click(function() {
  $(".js-Login-header").html("Logga in för att rätta din lott")
  $(".js-Site-container").toggleClass("locked");
  $(".js-Login-overlay-container").fadeIn("fast");
  if($(".js-Menu-container").hasClass("Menu--open")) {
      toggleMenu();
  }
})
//
$(".js-Header-profile, .js-Open-login, .js-Campaign-form-login").click(function() {
  $(".js-Login-header").html("Logga in på Min Sida")
  $(".js-Site-container").toggleClass("locked");
  $(".js-Login-overlay-container").fadeIn("fast");
    if($(".js-Menu-container").hasClass("Menu--open")) {
        toggleMenu();
    }
})

$(".js-Header-menu-container").click(function() {
  toggleMenu()
});


$(".js-Menu-overlay").click(function() {
  toggleMenu()
})

var menuText = $(".js-Header-title--menu");

function toggleMenu() {
  $(".js-Menu-container").toggleClass("Menu--open")
  $(".js-Site-container").toggleClass("locked")
  $(".js-Header-menu-container").toggleClass("Burger--open");

  if(menuText.text() == "Meny") {
      menuText.text("Stäng")
  } else {
    menuText.text("Meny")
  }
}

// var $pn = $(".person-number");
// var $pnInput;
//
// $pn.focus(function(e) {
//   var $pnInput = $('[data-id="person-number"]')[0];
//   // $pnInput.focus();
//   $pnInput.setSelectionRange(0,1);
//   $pnInput.onChange(function() {
//     console.log("hejsan");
//   })
//
//
// })

/////////////////////////////////////////////
// Smooth Scrolling
/////////////////////////////////////////////
$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top - 165
        }, 500);
        return false;
      }
    }
  }); 
});
/////////////////////////////////////////////
// LÄS MER OM VINSTER
/////////////////////////////////////////////
$(".js-Prices-readmore").click(function() {
  $(this).next().slideToggle();
})

$(".js-Campaign-open-terms").click(function() {
  $(".js-Campaign-terms-container").fadeIn("fast");
  $(".js-Site-container").toggleClass("locked");
})


$(".js-Campaign-hero-products-img").click(function() {
  $(".js-Campaign-overlay-container").fadeIn("fast");
  $(".js-Site-container").toggleClass("locked");
});

$(".js-Campaign-clickarea, .js-Campaign-close-form").click(function() {
  $(".js-Campaign-overlay-container").fadeOut("fast");
  $(".js-Campaign-terms-container").fadeOut("fast");
  $(".js-Site-container").toggleClass("locked");
})

// if ($.contains(document, $(".Page-two-col")[0])) {
//   console.log("Det finns två kolumnare");
//   $(".Page-two-col").each(function(i) {
//     if(i % 2 === 0) {
//       $(this).addClass("Page-two-col--left")
//     } else {
//       $(this).addClass("Page-two-col--right")
//     }
//   })
// }

 if ($.contains(document, $("#SubmenuAnchor")[0]) && ($(window).width() < 768)) {
     setTimeout(function() {
       $('html, body').animate({
         scrollTop: $("#SubmenuAnchor").offset().top
       }, 500);
     },300)
 }

});
// End jQuery

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlN0YXJ0LmpzIiwiTXlQYWdlcy5qcyIsIkxvZ2luLmpzIiwiUHJvbW8uanMiLCJDb29raWVzLmpzIiwiQ2hvaWNlcy5qcyIsIkJyb3dzZXIuanMiLCJNZW51LmpzIiwiSW5mb3JtYXRpb24uanMiLCJIZWFkZXIuanMiLCJGb3Jtcy5qcyIsIlByaWNlcy5qcyIsIkNhbXBhaWduLmpzIiwiU3VibWVudS5qcyIsIkVuZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdEpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQ0hBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNQQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIFNUQVJUIGpRdWVyeVxuXCJ1c2Ugc3RyaWN0XCI7XG4kKCBkb2N1bWVudCApLnJlYWR5KGZ1bmN0aW9uKCkge1xuIiwiLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBDaGFuZ2UgUGFzc3dvcmQgTW9kYWxcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuJChcIi5qcy1NeVBhZ2VzLXBhc3N3b3JkLWJ0blwiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgJChcIi5qcy1TaXRlLWNvbnRhaW5lclwiKS50b2dnbGVDbGFzcyhcImxvY2tlZFwiKTtcbiAgJChcIi5qcy1NeVBhZ2VzLXBzd3JkLW92ZXJsYXktY29udGFpbmVyXCIpLmZhZGVJbihcImZhc3RcIik7XG59KVxuJChcIi5qcy1NeVBhZ2VzLWNsb3NlLWZvcm0sIC5qcy1NeVBhZ2VzLXBzd3JkLWNsaWNrYXJlYVwiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgJChcIi5qcy1TaXRlLWNvbnRhaW5lclwiKS50b2dnbGVDbGFzcyhcImxvY2tlZFwiKTtcbiAgJChcIi5qcy1NeVBhZ2VzLXBzd3JkLW92ZXJsYXktY29udGFpbmVyXCIpLmZhZGVPdXQoXCJmYXN0XCIpO1xufSlcbnZhciAkbmV3UGFzc3dvcmQgPSAkKFwiLmpzLU15UGFnZXMtbmV3LXBzd3JkXCIpO1xudmFyICRyZXBlYXRQYXNzd29yZCA9ICQoXCIuanMtTXlQYWdlcy1yZXBlYXQtcHN3cmRcIik7XG52YXIgJG5ld1Bhc3N3b3JkU3RhdHVzID0gJChcIi5qcy1NeVBhZ2VzLW5ldy1wc3dyZC1zdGF0dXNcIik7XG52YXIgJG5ld1Bhc3N3b3JkTWF0Y2ggPSAkKFwiLmpzLU15UGFnZXMtbmV3LXBzd3JkLW1hdGNoXCIpO1xudmFyIHBhc3N3b3JkU3RhdGUgPSB7XG4gIGxlbmd0aDogZmFsc2UsXG4gIHBhc3N3b3JkOiBcIlwiLFxuICByZXBlYXRQYXNzd29yZDogXCJcIlxufVxuLy8gQ2hlY2sgaWYgcGFzc3dvcmQgaXMgc3VmZmljaWVudFxuJG5ld1Bhc3N3b3JkLm9uKCdpbnB1dCcsIGZ1bmN0aW9uKCkge1xuIHBhc3N3b3JkU3RhdGUucGFzc3dvcmQgPSAkKHRoaXMpLnZhbCgpO1xuIHBhc3N3b3JkU3RhdGUucmVwZWF0UGFzc3dvcmQgPSAkcmVwZWF0UGFzc3dvcmQudmFsKCk7XG5pZihwYXNzd29yZFN0YXRlLnBhc3N3b3JkLmxlbmd0aCA+PSA2KSB7XG4gIHBhc3N3b3JkU3RhdGUubGVuZ3RoID0gdHJ1ZTtcbn0gZWxzZSB7XG4gIHBhc3N3b3JkU3RhdGUubGVuZ3RoID0gZmFsc2U7XG59XG5jaGVja1Bhc3N3b3JkKClcbn0pO1xuJHJlcGVhdFBhc3N3b3JkLm9uKCdpbnB1dCcsIGZ1bmN0aW9uKCkge1xuICBwYXNzd29yZFN0YXRlLnBhc3N3b3JkID0gJG5ld1Bhc3N3b3JkLnZhbCgpO1xuICBwYXNzd29yZFN0YXRlLnJlcGVhdFBhc3N3b3JkID0gJCh0aGlzKS52YWwoKTtcbmNoZWNrUGFzc3dvcmQoKVxufSk7XG5mdW5jdGlvbiBjaGVja1Bhc3N3b3JkKCkge1xuICBpZihwYXNzd29yZFN0YXRlLmxlbmd0aCkge1xuICAgICRuZXdQYXNzd29yZFN0YXR1cy5odG1sKFwiTMO2c2Vub3JkIMOkciBva1wiKVxuICAgICRuZXdQYXNzd29yZFN0YXR1cy5hZGRDbGFzcyhcInUtZ3JlZW5cIilcbiAgICAkbmV3UGFzc3dvcmRTdGF0dXMucmVtb3ZlQ2xhc3MoXCJ1LXJlZFwiKVxuICB9IGVsc2Uge1xuICAgICRuZXdQYXNzd29yZFN0YXR1cy5odG1sKFwiTMO2c2Vub3JkIGbDtnIga29ydFwiKVxuICAgICRuZXdQYXNzd29yZFN0YXR1cy5yZW1vdmVDbGFzcyhcInUtZ3JlZW5cIilcbiAgICAkbmV3UGFzc3dvcmRTdGF0dXMuYWRkQ2xhc3MoXCJ1LXJlZFwiKVxuICB9XG4gIGlmKHBhc3N3b3JkU3RhdGUucGFzc3dvcmQgPT09IHBhc3N3b3JkU3RhdGUucmVwZWF0UGFzc3dvcmQgJiYgcGFzc3dvcmRTdGF0ZS5sZW5ndGgpIHtcbiAgICAkbmV3UGFzc3dvcmRNYXRjaC5odG1sKFwiTMO2c2Vub3JkZW4gw7Z2ZXJlbnN0w6RtbWVyXCIpXG4gICAgJG5ld1Bhc3N3b3JkTWF0Y2guYWRkQ2xhc3MoXCJ1LWdyZWVuXCIpXG4gICAgJG5ld1Bhc3N3b3JkTWF0Y2gucmVtb3ZlQ2xhc3MoXCJ1LXJlZFwiKVxuICB9IGVsc2UgaWYocGFzc3dvcmRTdGF0ZS5wYXNzd29yZCA9PT0gcGFzc3dvcmRTdGF0ZS5yZXBlYXRQYXNzd29yZCAmJiBwYXNzd29yZFN0YXRlLmxlbmd0aCA9PT0gZmFsc2UpIHtcbiAgICAkbmV3UGFzc3dvcmRNYXRjaC5odG1sKFwiTMO2c2Vub3JkZW4gw7Z2ZXJlbnN0w6RtbWVyIG1lbiDDpHIgZsO2ciBrb3J0YVwiKVxuICAgICRuZXdQYXNzd29yZE1hdGNoLnJlbW92ZUNsYXNzKFwidS1ncmVlblwiKVxuICAgICRuZXdQYXNzd29yZE1hdGNoLmFkZENsYXNzKFwidS1yZWRcIilcbiAgfSBlbHNlIHtcbiAgICAkbmV3UGFzc3dvcmRNYXRjaC5odG1sKFwiTMO2c2Vub3JkZW4gw7Z2ZXJlbnN0w6RtbWVyIGludGVcIilcbiAgICAkbmV3UGFzc3dvcmRNYXRjaC5yZW1vdmVDbGFzcyhcInUtZ3JlZW5cIilcbiAgICAkbmV3UGFzc3dvcmRNYXRjaC5hZGRDbGFzcyhcInUtcmVkXCIpXG4gIH1cbn1cbiIsIi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuIC8vIENMT1NFIE1PREFMXG4gLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiQoXCIuanMtTG9naW4tY2xpY2thcmVhLCAuanMtTG9naW4tY2xvc2UtZm9ybVwiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgJChcIi5qcy1Mb2dpbi1vdmVybGF5LWNvbnRhaW5lclwiKS5mYWRlT3V0KFwiZmFzdFwiKVxuICAkKFwiLmpzLVNpdGUtY29udGFpbmVyXCIpLnRvZ2dsZUNsYXNzKFwibG9ja2VkXCIpO1xufSlcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuIC8vIFNMSURFVE9HR0xFIFRIRSBIRUxQQk9YRVNcbiAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuJChcIi5qcy1Mb2dpbi11c2VybmFtZS10b2dnbGVcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICQoXCIuanMtTG9naW4tdXNlcm5hbWUtaGVscC1ib3hcIikuc2xpZGVUb2dnbGUoKTtcbn0pO1xuXG4kKFwiLmpzLUxvZ2luLXBhc3N3b3JkLXRvZ2dsZSwgLmpzLUxvZ2luLWZvcmdvdC1wYXNzd29yZFwiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgJChcIi5qcy1Mb2dpbi1wYXNzd29yZC1oZWxwLWJveFwiKS5zbGlkZVRvZ2dsZSgpO1xufSk7XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gU1RBVEUgT0YgVEhFIEZPUk1cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xudmFyIHN0YXRlID0ge1xuICB1c2VyTmFtZTogZmFsc2UsIC8vIElTIENVU1RPTUVSTlVNQkVSIE9SIEVNQUlMIE9LXG4gIHBhc3NXb3JkOiBmYWxzZSxcbiAgZW1haWxSZWc6IGZhbHNlLFxuICBudW1iZXJSZWc6IGZhbHNlXG59XG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFVTRVJOQU1FIENIRUNLXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgLy8gUkVHRVggbWFpbC5cbnZhciBlbWFpbFJlZyA9IG5ldyBSZWdFeHAoL14oKFwiW1xcdy1cXHNdK1wiKXwoW1xcdy1dKyg/OlxcLltcXHctXSspKil8KFwiW1xcdy1cXHNdK1wiKShbXFx3LV0rKD86XFwuW1xcdy1dKykqKSkoQCgoPzpbXFx3LV0rXFwuKSpcXHdbXFx3LV17MCw2Nn0pXFwuKFthLXpdezIsNn0oPzpcXC5bYS16XXsyfSk/KSQpfChAXFxbPygoMjVbMC01XVxcLnwyWzAtNF1bMC05XVxcLnwxWzAtOV17Mn1cXC58WzAtOV17MSwyfVxcLikpKCgyNVswLTVdfDJbMC00XVswLTldfDFbMC05XXsyfXxbMC05XXsxLDJ9KVxcLil7Mn0oMjVbMC01XXwyWzAtNF1bMC05XXwxWzAtOV17Mn18WzAtOV17MSwyfSlcXF0/JCkvaSk7XG4gIC8vIFJFR0VYIHVzZXIgbnVtYmVyLlxudmFyIHVzZXJOdW1iZXJSZWcgPSBuZXcgUmVnRXhwKCdeW2EtekEtWl17Mn1bMC05XXs2fSQnKTtcbnZhciB2YWxpZFVzZXI7XG52YXIgdXNlck5hbWVNZXNzYWdlID0gXCJEdSBoYXIgaW50ZSBhbmdpdmV0IGV0dCBrb3JyZWt0IGt1bmRudW1tZXIgZWxsZXIgZS1wb3N0YWRyZXNzLlwiO1xudmFyIHBhc3N3b3JkTWVzc2FnZSA9IFwiRmVsYWt0aWd0IGzDtnNlbm9yZC5cIjtcblxuLy8gSU5QVVQgRklFTEQgQ0hBTkdFXG4kKCcuanMtTG9naW4taW5wdXQtdXNlcm5hbWUnKS5vbignaW5wdXQnLCBmdW5jdGlvbigpIHtcbiAgICBpZihlbWFpbFJlZy50ZXN0KCQodGhpcykudmFsKCkpICkge1xuICAgICAgc3RhdGUuZW1haWxSZWcgPSB0cnVlO1xuICAgICAgc3RhdGUubnVtYmVyUmVnID0gZmFsc2U7XG4gICAgfSBlbHNlIGlmKHVzZXJOdW1iZXJSZWcudGVzdCgkKHRoaXMpLnZhbCgpICkpIHtcbiAgICAgIHN0YXRlLm51bWJlclJlZyA9IHRydWU7XG4gICAgICBzdGF0ZS5lbWFpbFJlZyA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdGF0ZS5udW1iZXJSZWcgPSBmYWxzZTtcbiAgICAgIHN0YXRlLmVtYWlsUmVnID0gZmFsc2U7XG4gICAgfVxuICAgIHZhbGlkVXNlciA9IHN0YXRlLm51bWJlclJlZyB8fCBzdGF0ZS5lbWFpbFJlZztcbiAgICAgIGlmICh2YWxpZFVzZXIpIHtcbiAgICAgICAgc3RhdGUudXNlck5hbWUgPSB0cnVlO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHN0YXRlLnVzZXJOYW1lID0gZmFsc2U7XG4gICAgICB9XG59KTtcblxuLy8gV0hFTiBJTlBVVCBJUyBET05FIFdJVEggVEhFIEZJRUxEXG4kKCcuanMtTG9naW4taW5wdXQtdXNlcm5hbWUnKS5mb2N1c291dChmdW5jdGlvbigpIHtcbiAgLy8gY29uc29sZS5sb2coXCJJTlBVVCBOT1QgSU4gRk9DVVMgQU5ZIE1PUkVcIik7XG4gIGlmKHN0YXRlLnVzZXJOYW1lID09IGZhbHNlKSB7XG4gICAgJChcIi5qcy1Mb2dpbi11c2VybmFtZS10b2dnbGVcIikucmVtb3ZlQ2xhc3MoXCJqcy1Mb2dpbi1xdWVzdGlvbi1pY29uXCIpLnJlbW92ZUNsYXNzKFwianMtTG9naW4tY2hlY2staWNvblwiKS5hZGRDbGFzcyhcImpzLUxvZ2luLWVycm9yLWljb25cIilcbiAgICAkKHRoaXMpLmFkZENsYXNzKFwianMtTG9naW4taW5wdXQtZXJyb3JcIilcbiAgICAkKFwiLmpzLUxvZ2luLXVzZXJuYW1lLW1lc3NhZ2VcIikuc2hvdygpLmh0bWwodXNlck5hbWVNZXNzYWdlKVxuXG4gIH0gZWxzZSB7XG4gICAgJChcIi5qcy1Mb2dpbi11c2VybmFtZS10b2dnbGVcIikuYWRkQ2xhc3MoXCJqcy1Mb2dpbi1xdWVzdGlvbi1pY29uXCIpLnJlbW92ZUNsYXNzKFwianMtTG9naW4tZXJyb3ItaWNvblwiKTtcbiAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKFwianMtTG9naW4taW5wdXQtZXJyb3JcIilcbiAgICAkKFwiLmpzLUxvZ2luLXVzZXJuYW1lLW1lc3NhZ2VcIikuaGlkZSgpLmh0bWwoXCJcIilcbiAgfVxuXG4gIC8vIFdISUNIIEJPWCBTSE9VTEQgU0hPV1xuICBpZihzdGF0ZS5lbWFpbFJlZykge1xuICAgIHBhc3N3b3JkQm94KFwicmVzZXRcIilcbiAgICAkKFwiLmpzLUxvZ2luLXJlc2V0LWVtYWlsXCIpLmh0bWwoJCgnLmpzLUxvZ2luLWlucHV0LXVzZXJuYW1lJykudmFsKCkpIC8vIFNFVCBUSEUgRU1BSUwgSU4gVEhFIE1FU1NBR0UgVE8gV0hBVEVWRVIgSVQgSVMgSU4gVEhFIElOUFVUIElGIElUIElTIFZBTElEXG4gIH0gZWxzZSB7XG4gICAgcGFzc3dvcmRCb3goXCJkZWZhdWx0XCIpXG4gIH1cbn0pXG5cbiQoXCIuanMtTG9naW4tcmVzZXQtcGFzc3dvcmQtYnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgcGFzc3dvcmRCb3goXCJzZW50XCIpXG59KVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFBBU1NXT1JEIEhFTFAgQk9YXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbmZ1bmN0aW9uIHBhc3N3b3JkQm94KGJveCkge1xuICBpZihib3ggPT0gXCJyZXNldFwiKSB7XG4gICAgJChcIi5qcy1Mb2dpbi1wYXNzd29yZC1yZXNldC1ib3hcIikuc2hvdygpO1xuICAgICQoXCIuanMtTG9naW4tcGFzc3dvcmQtc2VudC1ib3gsIC5qcy1Mb2dpbi1wYXNzd29yZC1kZWZhdWx0LWJveFwiKS5oaWRlKCk7XG4gIH0gZWxzZSBpZihib3ggPT0gXCJzZW50XCIpIHtcbiAgICAkKFwiLmpzLUxvZ2luLXBhc3N3b3JkLXJlc2V0LWJveCwgLmpzLUxvZ2luLXBhc3N3b3JkLWRlZmF1bHQtYm94XCIpLmhpZGUoKTtcbiAgICAkKFwiLmpzLUxvZ2luLXBhc3N3b3JkLXNlbnQtYm94XCIpLnNob3coKTtcbiAgfSBlbHNlIGlmKGJveCA9PSBcImRlZmF1bHRcIikge1xuICAgICQoXCIuanMtTG9naW4tcGFzc3dvcmQtc2VudC1ib3gsIC5qcy1Mb2dpbi1wYXNzd29yZC1yZXNldC1ib3hcIikuaGlkZSgpO1xuICAgICQoXCIuanMtTG9naW4tcGFzc3dvcmQtZGVmYXVsdC1ib3hcIikuc2hvdygpO1xuICB9XG59XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gUEFTU1dPUkQgSU5QVVQgRklFTERcbi8vICoqKiBSRU1PVkUgSU4gUFJPRCBvciBhdGxlYXN0IGNvbmZpZ3VyZSBhZnRlciBBUElcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4kKFwiLmpzLUxvZ2luLWlucHV0LXBhc3N3b3JkXCIpLm9uKCdpbnB1dCcsIGZ1bmN0aW9uKCkge1xuXG4gIHZhciBwYXNzV29yZCA9ICQodGhpcykudmFsKCk7XG5cbiAgaWYocGFzc1dvcmQgPT0gXCJrb21iaVwiIHx8IHBhc3NXb3JkPT0gXCJsb3R0ZXJcIiB8fCBwYXNzV29yZCA9PSBcInNwZWxcIikge1xuICAgIHN0YXRlLnBhc3NXb3JkID0gdHJ1ZVxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCJsb2NhbGhvc3Q6MzAwMC90aWNrZXRzLmh0bWxcIjtcbiAgfSBlbHNlIHtcbiAgICBzdGF0ZS5wYXNzV29yZCA9IGZhbHNlXG4gIH1cbiAgICBpZihzdGF0ZS5wYXNzV29yZCAhPSB0cnVlKSB7XG4gICAgICAkKFwiLmpzLUxvZ2luLXBhc3N3b3JkLW1lc3NhZ2VcIikuaGlkZSgpO1xuICAgIH1cbiAgICBpZigkKHRoaXMpLmhhc0NsYXNzKFwianMtTG9naW4taW5wdXQtZXJyb3JcIikpIHtcbiAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoXCJqcy1Mb2dpbi1pbnB1dC1lcnJvclwiKVxuICAgICAgJChcIi5qcy1Mb2dpbi1wYXNzd29yZC10b2dnbGVcIikucmVtb3ZlQ2xhc3MoXCJqcy1Mb2dpbi1lcnJvci1pY29uXCIpLmFkZENsYXNzKFwianMtTG9naW4tcXVlc3Rpb24taWNvblwiKVxuICAgIH1cbiB9KTtcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gQ0hFQ0sgSUYgTE9HSU4gUEFTU0VEIChKVVNUIEZPUiBQUk9UT1RZUEUgVEVTVElORylcbi8vICoqKiAgUkVNT1ZFIElOIFBST0Rcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuJChcIi5qcy1Mb2dpbi1mb3JtLXN1Ym1pdC1idG5cIikuY2xpY2soZnVuY3Rpb24oZSkge1xuICBlLnByZXZlbnREZWZhdWx0KGUpXG4gIGlmKHZhbGlkVXNlciAmJiBzdGF0ZS5wYXNzV29yZCkge1xuICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKFwidGlja2V0cy5odG1sXCIpO1xuICB9XG4gIGVsc2UgaWYodmFsaWRVc2VyID09IHRydWUgJiYgc3RhdGUucGFzc1dvcmQgIT0gdHJ1ZSkge1xuICAgICQoXCIuanMtTG9naW4tcGFzc3dvcmQtdG9nZ2xlXCIpLnJlbW92ZUNsYXNzKFwianMtTG9naW4tcXVlc3Rpb24taWNvblwiKS5hZGRDbGFzcyhcImpzLUxvZ2luLWVycm9yLWljb25cIilcbiAgICAkKFwiLmpzLUxvZ2luLWhlYWRlclwiKS5hZGRDbGFzcyhcIkxvZ2luLWhlYWRlci0tZXJyb3JcIikuaHRtbChcIklubG9nZ25pbmdlbiBtaXNzbHlja2FkZXNcIilcbiAgICAkKFwiLmpzLUxvZ2luLWlucHV0LXBhc3N3b3JkXCIpLmFkZENsYXNzKFwianMtTG9naW4taW5wdXQtZXJyb3JcIilcbiAgICAkKFwiLmpzLUxvZ2luLXBhc3N3b3JkLW1lc3NhZ2VcIikuc2hvdygpLmh0bWwocGFzc3dvcmRNZXNzYWdlKVxuICB9XG4gIGVsc2Uge1xuICAgICQoXCIuanMtTG9naW4taGVhZGVyXCIpLmFkZENsYXNzKFwiTG9naW4taGVhZGVyLS1lcnJvclwiKS5odG1sKFwiSW5sb2dnbmluZ2VuIG1pc3NseWNrYWRlc1wiKVxuICAgICQoXCIuanMtTG9naW4taW5wdXQtcGFzc3dvcmRcIikuYWRkQ2xhc3MoXCJqcy1Mb2dpbi1pbnB1dC1lcnJvclwiKVxuICAgICQoXCIuanMtTG9naW4tdXNlcm5hbWUtdG9nZ2xlXCIpLnJlbW92ZUNsYXNzKFwianMtTG9naW4tcXVlc3Rpb24taWNvblwiKS5yZW1vdmVDbGFzcyhcImpzLUxvZ2luLWNoZWNrLWljb25cIikuYWRkQ2xhc3MoXCJqcy1Mb2dpbi1lcnJvci1pY29uXCIpXG4gICAgJChcIi5qcy1Mb2dpbi1wYXNzd29yZC10b2dnbGVcIikucmVtb3ZlQ2xhc3MoXCJqcy1Mb2dpbi1xdWVzdGlvbi1pY29uXCIpLmFkZENsYXNzKFwianMtTG9naW4tZXJyb3ItaWNvblwiKVxuICAgICQoXCIuanMtTG9naW4tdXNlcm5hbWUtbWVzc2FnZVwiKS5zaG93KCkuaHRtbCh1c2VyTmFtZU1lc3NhZ2UpXG4gICAgJChcIi5qcy1Mb2dpbi1wYXNzd29yZC1tZXNzYWdlXCIpLnNob3coKS5odG1sKHBhc3N3b3JkTWVzc2FnZSlcbiAgfVxufSk7XG4iLCJ2YXIgJGxvZ2luQ29va2llID0gXCJUamVuYSB0amFiYmEhXCI7IC8vIEVyc8OkdHQgbWVkIHZhZCBpbmxvZ2duaW5nc2tha2FuIG51IGhldGVyXG4kKFwiLmpzLVByb21vLWNvcnJlY3QtdGlja2V0LWJ0blwiKS5jbGljayhmdW5jdGlvbihlKSB7XG4gIGlmIChkb2N1bWVudC5jb29raWUuaW5kZXhPZigkbG9naW5Db29raWUpID09IC0xKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICQoXCIuanMtTG9naW4taGVhZGVyXCIpLmh0bWwoXCJMb2dnYSBpbiBmw7ZyIGF0dCByw6R0dGEgZGluIGxvdHRcIilcbiAgICAkKFwiLmpzLVNpdGUtY29udGFpbmVyXCIpLnRvZ2dsZUNsYXNzKFwibG9ja2VkXCIpO1xuICAgICQoXCIuanMtTG9naW4tb3ZlcmxheS1jb250YWluZXJcIikuZmFkZUluKFwiZmFzdFwiKTtcbiAgfVxufSlcbiIsIi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gQ2hlY2sgaWYgQ29va2llIGlzIHNldFxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5pZiAoZG9jdW1lbnQuY29va2llLmluZGV4T2YoXCJfZ2FcIikgPT0gLTEpIHtcbiAgICQoXCIuanMtQ29va2llLWNvbnRhaW5lclwiKS5zaG93KClcbn1cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gQXBwcm92ZSBoaWRlIGNvb2tpZSBpbmZvXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiQoXCIuanMtQ29va2llcy1hcHByb3ZlLWJ0blwiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICQoXCIuanMtQ29va2llLWNvbnRhaW5lclwiKS5mYWRlT3V0KFwiZmFzdFwiKTtcbn0pXG4iLCIkKFwiLmpzLUNob2ljZXMtb3RoZXJzLXJlYWRtb3JlXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAkKHRoaXMpLm5leHQoKS5zbGlkZVRvZ2dsZSgpO1xufSlcbiIsIiIsIi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gVE9HR0xFIE1FTlUgT1BFTlxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4kKFwiLmpzLU1lbnUtbGV2ZWwtb25lLWhlYWRlclwiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgJCh0aGlzKS5uZXh0KCkuc2xpZGVUb2dnbGUoKTtcbiAgJCh0aGlzKS50b2dnbGVDbGFzcyhcImNoaWxkcmVuLW9wZW5cIik7XG59KVxuIiwiJChcIi5qcy1JbmZvcm1hdGlvbi10b2dnbGUtbWFpbFwiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgJChcIi5qcy1JbmZvcm1hdGlvbi1oZWxwLWJveC0tbWFpbFwiKS5zbGlkZVRvZ2dsZSgpXG59KVxuJChcIi5qcy1JbmZvcm1hdGlvbi10b2dnbGUtcGhvbmVcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICQoXCIuanMtSW5mb3JtYXRpb24taGVscC1ib3gtLXBob25lXCIpLnNsaWRlVG9nZ2xlKClcbn0pXG4kKFwiLmpzLUluZm9ybWF0aW9uLXRvZ2dsZS1tb2JpbGVcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICQoXCIuanMtSW5mb3JtYXRpb24taGVscC1ib3gtLW1vYmlsZVwiKS5zbGlkZVRvZ2dsZSgpXG59KVxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBPbiBpbnB1dCAmIHNlbGVjdFxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG52YXIgJGluZm9ybWF0aW9uSW5wdXQgPSAkKFwiLmpzLUluZm9ybWF0aW9uLWlucHV0XCIpO1xudmFyICRpbmZvcm1hdGlvblNlbGVjdCA9ICQoXCIuanMtSW5mb3JtYXRpb24tc2VsZWN0XCIpO1xudmFyICRpbml0SW5mbyA9IFtdXG52YXIgJGluaXRTZWxlY3QgPSBbXVxudmFyICRpbmZvUmVncmV0QnRuID0gJChcIi5qcy1JbmZvcm1hdGlvbi1yZWdyZXQtYnRuXCIpO1xudmFyICRpbmZvU2F2ZUNvbnRhaW5lciA9ICQoXCIuanMtSW5mb3JtYXRpb24tc2F2ZS1jb250YWluZXJcIik7XG4kaW5mb3JtYXRpb25JbnB1dC5lYWNoKGZ1bmN0aW9uKCkge1xuICAkaW5pdEluZm8ucHVzaCgkKHRoaXMpLnZhbCgpKVxufSlcbiRpbmZvcm1hdGlvblNlbGVjdC5lYWNoKGZ1bmN0aW9uKCkge1xuICAkaW5pdFNlbGVjdC5wdXNoKCQodGhpcykudmFsKCkpXG59KVxuXG5mdW5jdGlvbiB0b2dnbGVTYXZlQ29udGFpbmVyKCkge1xuICBpZigkaW5mb1NhdmVDb250YWluZXIuaGFzQ2xhc3MoXCJqcy1JbmZvcm1hdGlvbi1zYXZlLWNvbnRhaW5lci0tdmlzaWJsZVwiKSA9PSBmYWxzZSkge1xuICAgICRpbmZvU2F2ZUNvbnRhaW5lci5hZGRDbGFzcyhcImpzLUluZm9ybWF0aW9uLXNhdmUtY29udGFpbmVyLS12aXNpYmxlXCIpXG4gIH1cbn1cbiRpbmZvcm1hdGlvbklucHV0Lm9uKCdpbnB1dCcsIGZ1bmN0aW9uKCkge1xuICB0b2dnbGVTYXZlQ29udGFpbmVyKCk7XG59KVxuJGluZm9ybWF0aW9uU2VsZWN0Lm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcbiAgdG9nZ2xlU2F2ZUNvbnRhaW5lcigpO1xufSlcbiRpbmZvUmVncmV0QnRuLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAkaW5mb3JtYXRpb25JbnB1dC5lYWNoKGZ1bmN0aW9uKGkpIHtcbiAgICAkaW5mb3JtYXRpb25JbnB1dFtpXS52YWx1ZSA9ICRpbml0SW5mb1tpXVxuICB9KVxuICAkaW5mb3JtYXRpb25TZWxlY3QuZWFjaChmdW5jdGlvbihpKSB7XG4gICAgJGluZm9ybWF0aW9uU2VsZWN0W2ldLnZhbHVlID0gJGluaXRTZWxlY3RbaV1cbiAgfSlcbiAgJGluZm9TYXZlQ29udGFpbmVyLnJlbW92ZUNsYXNzKFwianMtSW5mb3JtYXRpb24tc2F2ZS1jb250YWluZXItLXZpc2libGVcIilcbn0pXG4iLCIvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIEhFQURFUiBTTElERSBET1dOXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbnZhciBwcmV2aW91c1RvcCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcbnZhciBoZWFkZXJDb250YWluZXIgPSAkKFwiLmpzLUhlYWRlci1jb250YWluZXJcIik7XG52YXIgaGVhZGVyU2xpZGVEb3duID0gZnVuY3Rpb24oKSB7XG4gIC8vIGNvbnNvbGUubG9nKFwia2FsbGFzIHDDpSFcIik7XG4gIC8vIGNvbnNvbGUubG9nKHdpbmRvdy5wYWdlWU9mZnNldCk7XG4gIC8vIGNvbnNvbGUubG9nKHdpbmRvdy5wYWdlWU9mZnNldCk7XG4gIGlmKHdpbmRvdy5wYWdlWU9mZnNldCA+IDApIHsgLy8gPC0tIE1hbiDDpHIgaW50ZSBow7Znc3QgdXBwIHDDpSBzaWRhblxuICAgIHZhciBjdXJyZW50T2ZmVG9wID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xuICAgIGlmKGN1cnJlbnRPZmZUb3AgPiBwcmV2aW91c1RvcCAmJiB3aW5kb3cucGFnZVlPZmZzZXQgPiAxMzApIHtcbiAgICAgICAgaGVhZGVyQ29udGFpbmVyLmFkZENsYXNzKFwiaXMtaGlkZGVuXCIpXG4gICAgfSBlbHNlIHtcbiAgICAgIGhlYWRlckNvbnRhaW5lci5yZW1vdmVDbGFzcyhcImlzLWhpZGRlblwiKVxuICAgIH1cbiAgICBwcmV2aW91c1RvcCA9IGN1cnJlbnRPZmZUb3A7XG4gIH0gZWxzZSB7XG4gICAgaGVhZGVyQ29udGFpbmVyLnJlbW92ZUNsYXNzKFwiaXMtaGlkZGVuXCIpXG4gIH1cbn1cbiQod2luZG93KS5vbignc2Nyb2xsJyxfLnRocm90dGxlKGhlYWRlclNsaWRlRG93biwgMTAwKSk7XG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIEFMTCBUSEUgT1RIRVIgU1RVRkZcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuJChcIi5qcy1IZWFkZXItY29ycmVjdC1idG5cIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICQoXCIuanMtTG9naW4taGVhZGVyXCIpLmh0bWwoXCJMb2dnYSBpbiBmw7ZyIGF0dCByw6R0dGEgZGluIGxvdHRcIilcbiAgJChcIi5qcy1TaXRlLWNvbnRhaW5lclwiKS50b2dnbGVDbGFzcyhcImxvY2tlZFwiKTtcbiAgJChcIi5qcy1Mb2dpbi1vdmVybGF5LWNvbnRhaW5lclwiKS5mYWRlSW4oXCJmYXN0XCIpO1xuICBpZigkKFwiLmpzLU1lbnUtY29udGFpbmVyXCIpLmhhc0NsYXNzKFwiTWVudS0tb3BlblwiKSkge1xuICAgICAgdG9nZ2xlTWVudSgpO1xuICB9XG59KVxuLy9cbiQoXCIuanMtSGVhZGVyLXByb2ZpbGUsIC5qcy1PcGVuLWxvZ2luLCAuanMtQ2FtcGFpZ24tZm9ybS1sb2dpblwiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgJChcIi5qcy1Mb2dpbi1oZWFkZXJcIikuaHRtbChcIkxvZ2dhIGluIHDDpSBNaW4gU2lkYVwiKVxuICAkKFwiLmpzLVNpdGUtY29udGFpbmVyXCIpLnRvZ2dsZUNsYXNzKFwibG9ja2VkXCIpO1xuICAkKFwiLmpzLUxvZ2luLW92ZXJsYXktY29udGFpbmVyXCIpLmZhZGVJbihcImZhc3RcIik7XG4gICAgaWYoJChcIi5qcy1NZW51LWNvbnRhaW5lclwiKS5oYXNDbGFzcyhcIk1lbnUtLW9wZW5cIikpIHtcbiAgICAgICAgdG9nZ2xlTWVudSgpO1xuICAgIH1cbn0pXG5cbiQoXCIuanMtSGVhZGVyLW1lbnUtY29udGFpbmVyXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICB0b2dnbGVNZW51KClcbn0pO1xuXG5cbiQoXCIuanMtTWVudS1vdmVybGF5XCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICB0b2dnbGVNZW51KClcbn0pXG5cbnZhciBtZW51VGV4dCA9ICQoXCIuanMtSGVhZGVyLXRpdGxlLS1tZW51XCIpO1xuXG5mdW5jdGlvbiB0b2dnbGVNZW51KCkge1xuICAkKFwiLmpzLU1lbnUtY29udGFpbmVyXCIpLnRvZ2dsZUNsYXNzKFwiTWVudS0tb3BlblwiKVxuICAkKFwiLmpzLVNpdGUtY29udGFpbmVyXCIpLnRvZ2dsZUNsYXNzKFwibG9ja2VkXCIpXG4gICQoXCIuanMtSGVhZGVyLW1lbnUtY29udGFpbmVyXCIpLnRvZ2dsZUNsYXNzKFwiQnVyZ2VyLS1vcGVuXCIpO1xuXG4gIGlmKG1lbnVUZXh0LnRleHQoKSA9PSBcIk1lbnlcIikge1xuICAgICAgbWVudVRleHQudGV4dChcIlN0w6RuZ1wiKVxuICB9IGVsc2Uge1xuICAgIG1lbnVUZXh0LnRleHQoXCJNZW55XCIpXG4gIH1cbn1cbiIsIi8vIHZhciAkcG4gPSAkKFwiLnBlcnNvbi1udW1iZXJcIik7XG4vLyB2YXIgJHBuSW5wdXQ7XG4vL1xuLy8gJHBuLmZvY3VzKGZ1bmN0aW9uKGUpIHtcbi8vICAgdmFyICRwbklucHV0ID0gJCgnW2RhdGEtaWQ9XCJwZXJzb24tbnVtYmVyXCJdJylbMF07XG4vLyAgIC8vICRwbklucHV0LmZvY3VzKCk7XG4vLyAgICRwbklucHV0LnNldFNlbGVjdGlvblJhbmdlKDAsMSk7XG4vLyAgICRwbklucHV0Lm9uQ2hhbmdlKGZ1bmN0aW9uKCkge1xuLy8gICAgIGNvbnNvbGUubG9nKFwiaGVqc2FuXCIpO1xuLy8gICB9KVxuLy9cbi8vXG4vLyB9KVxuIiwiLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBTbW9vdGggU2Nyb2xsaW5nXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiQoZnVuY3Rpb24oKSB7XG4gICQoJ2FbaHJlZio9XCIjXCJdOm5vdChbaHJlZj1cIiNcIl0pJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgaWYgKGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL15cXC8vLCcnKSA9PSB0aGlzLnBhdGhuYW1lLnJlcGxhY2UoL15cXC8vLCcnKSAmJiBsb2NhdGlvbi5ob3N0bmFtZSA9PSB0aGlzLmhvc3RuYW1lKSB7XG4gICAgICB2YXIgdGFyZ2V0ID0gJCh0aGlzLmhhc2gpO1xuICAgICAgdGFyZ2V0ID0gdGFyZ2V0Lmxlbmd0aCA/IHRhcmdldCA6ICQoJ1tuYW1lPScgKyB0aGlzLmhhc2guc2xpY2UoMSkgKyddJyk7XG4gICAgICBpZiAodGFyZ2V0Lmxlbmd0aCkge1xuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgc2Nyb2xsVG9wOiB0YXJnZXQub2Zmc2V0KCkudG9wIC0gMTY1XG4gICAgICAgIH0sIDUwMCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH0pOyBcbn0pO1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBMw4RTIE1FUiBPTSBWSU5TVEVSXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiQoXCIuanMtUHJpY2VzLXJlYWRtb3JlXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAkKHRoaXMpLm5leHQoKS5zbGlkZVRvZ2dsZSgpO1xufSlcbiIsIiQoXCIuanMtQ2FtcGFpZ24tb3Blbi10ZXJtc1wiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgJChcIi5qcy1DYW1wYWlnbi10ZXJtcy1jb250YWluZXJcIikuZmFkZUluKFwiZmFzdFwiKTtcbiAgJChcIi5qcy1TaXRlLWNvbnRhaW5lclwiKS50b2dnbGVDbGFzcyhcImxvY2tlZFwiKTtcbn0pXG5cblxuJChcIi5qcy1DYW1wYWlnbi1oZXJvLXByb2R1Y3RzLWltZ1wiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgJChcIi5qcy1DYW1wYWlnbi1vdmVybGF5LWNvbnRhaW5lclwiKS5mYWRlSW4oXCJmYXN0XCIpO1xuICAkKFwiLmpzLVNpdGUtY29udGFpbmVyXCIpLnRvZ2dsZUNsYXNzKFwibG9ja2VkXCIpO1xufSk7XG5cbiQoXCIuanMtQ2FtcGFpZ24tY2xpY2thcmVhLCAuanMtQ2FtcGFpZ24tY2xvc2UtZm9ybVwiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgJChcIi5qcy1DYW1wYWlnbi1vdmVybGF5LWNvbnRhaW5lclwiKS5mYWRlT3V0KFwiZmFzdFwiKTtcbiAgJChcIi5qcy1DYW1wYWlnbi10ZXJtcy1jb250YWluZXJcIikuZmFkZU91dChcImZhc3RcIik7XG4gICQoXCIuanMtU2l0ZS1jb250YWluZXJcIikudG9nZ2xlQ2xhc3MoXCJsb2NrZWRcIik7XG59KVxuXG4vLyBpZiAoJC5jb250YWlucyhkb2N1bWVudCwgJChcIi5QYWdlLXR3by1jb2xcIilbMF0pKSB7XG4vLyAgIGNvbnNvbGUubG9nKFwiRGV0IGZpbm5zIHR2w6Uga29sdW1uYXJlXCIpO1xuLy8gICAkKFwiLlBhZ2UtdHdvLWNvbFwiKS5lYWNoKGZ1bmN0aW9uKGkpIHtcbi8vICAgICBpZihpICUgMiA9PT0gMCkge1xuLy8gICAgICAgJCh0aGlzKS5hZGRDbGFzcyhcIlBhZ2UtdHdvLWNvbC0tbGVmdFwiKVxuLy8gICAgIH0gZWxzZSB7XG4vLyAgICAgICAkKHRoaXMpLmFkZENsYXNzKFwiUGFnZS10d28tY29sLS1yaWdodFwiKVxuLy8gICAgIH1cbi8vICAgfSlcbi8vIH1cbiIsIiBpZiAoJC5jb250YWlucyhkb2N1bWVudCwgJChcIiNTdWJtZW51QW5jaG9yXCIpWzBdKSAmJiAoJCh3aW5kb3cpLndpZHRoKCkgPCA3NjgpKSB7XG4gICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgc2Nyb2xsVG9wOiAkKFwiI1N1Ym1lbnVBbmNob3JcIikub2Zmc2V0KCkudG9wXG4gICAgICAgfSwgNTAwKTtcbiAgICAgfSwzMDApXG4gfVxuIiwifSk7XG4vLyBFbmQgalF1ZXJ5XG4iXX0=
