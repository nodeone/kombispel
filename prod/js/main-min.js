"use strict";$(document).ready(function(){function e(){c.length?(r.html("Lösenord är ok"),r.addClass("u-green"),r.removeClass("u-red")):(r.html("Lösenord för kort"),r.removeClass("u-green"),r.addClass("u-red")),c.password===c.repeatPassword&&c.length?(l.html("Lösenorden överenstämmer"),l.addClass("u-green"),l.removeClass("u-red")):c.password===c.repeatPassword&&!1===c.length?(l.html("Lösenorden överenstämmer men är för korta"),l.removeClass("u-green"),l.addClass("u-red")):(l.html("Lösenorden överenstämmer inte"),l.removeClass("u-green"),l.addClass("u-red"))}function s(e){"reset"==e?($(".js-Login-password-reset-box").show(),$(".js-Login-password-sent-box, .js-Login-password-default-box").hide()):"sent"==e?($(".js-Login-password-reset-box, .js-Login-password-default-box").hide(),$(".js-Login-password-sent-box").show()):"default"==e&&($(".js-Login-password-sent-box, .js-Login-password-reset-box").hide(),$(".js-Login-password-default-box").show())}function n(){0==C.hasClass("is-visible")&&C.addClass("is-visible")}function o(){$(".js-Menu-container").toggleClass("Menu--open"),$(".js-Site-container").toggleClass("locked"),$(".js-Header-menu-container").toggleClass("Burger--open"),"Meny"==S.text()?S.text("Stäng"):S.text("Meny")}function i(e,s){setTimeout(function(){$("html, body").animate({scrollTop:e},400)},s)}$(".js-MyPages-password-btn").click(function(){$(".js-Site-container").toggleClass("locked"),$(".js-MyPages-pswrd-overlay-container").fadeIn("fast")}),$(".js-MyPages-close-form, .js-MyPages-pswrd-clickarea").click(function(){$(".js-Site-container").toggleClass("locked"),$(".js-MyPages-pswrd-overlay-container").fadeOut("fast")});var a=$(".js-MyPages-new-pswrd"),t=$(".js-MyPages-repeat-pswrd"),r=$(".js-MyPages-new-pswrd-status"),l=$(".js-MyPages-new-pswrd-match"),c={length:!1,password:"",repeatPassword:""};a.on("input",function(){c.password=$(this).val(),c.repeatPassword=t.val(),c.password.length>=6?c.length=!0:c.length=!1,e()}),t.on("input",function(){c.password=a.val(),c.repeatPassword=$(this).val(),e()}),$(".js-Login-clickarea, .js-Login-close-form").click(function(){$(".js-Login-overlay-container").fadeOut("fast"),$(".js-Site-container").toggleClass("locked")}),$(".js-Login-username-toggle").click(function(){$(".js-Login-username-help-box").slideToggle()}),$(".js-Login-password-toggle, .js-Login-forgot-password").click(function(){$(".js-Login-password-help-box").slideToggle()});var g,d={userName:!1,passWord:!1,emailReg:!1,numberReg:!1},u=new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i),m=new RegExp("^[a-zA-Z]{2}[0-9]{6}$"),f="Du har inte angivet ett korrekt kundnummer eller e-postadress.";$(".js-Login-input-username").on("input",function(){u.test($(this).val())?(d.emailReg=!0,d.numberReg=!1):m.test($(this).val())?(d.numberReg=!0,d.emailReg=!1):(d.numberReg=!1,d.emailReg=!1),g=d.numberReg||d.emailReg,d.userName=!!g}),$(".js-Login-input-username").focusout(function(){0==d.userName?($(".js-Login-username-toggle").removeClass("js-Login-question-icon").removeClass("js-Login-check-icon").addClass("js-Login-error-icon"),$(this).addClass("js-Login-input-error"),$(".js-Login-username-message").show().html(f)):($(".js-Login-username-toggle").addClass("js-Login-question-icon").removeClass("js-Login-error-icon"),$(this).removeClass("js-Login-input-error"),$(".js-Login-username-message").hide().html("")),d.emailReg?(s("reset"),$(".js-Login-reset-email").html($(".js-Login-input-username").val())):s("default")}),$(".js-Login-reset-password-btn").click(function(e){s("sent")}),$(".js-Login-input-password").on("input",function(){var e=$(this).val();"kombi"==e||"lotter"==e||"spel"==e?(d.passWord=!0,window.location.href="localhost:3000/tickets.html"):d.passWord=!1,1!=d.passWord&&$(".js-Login-password-message").hide(),$(this).hasClass("js-Login-input-error")&&($(this).removeClass("js-Login-input-error"),$(".js-Login-password-toggle").removeClass("js-Login-error-icon").addClass("js-Login-question-icon"))}),$(".js-Login-form-submit-btn").click(function(e){e.preventDefault(e),g&&d.passWord?window.location.replace("tickets.html"):1==g&&1!=d.passWord?($(".js-Login-password-toggle").removeClass("js-Login-question-icon").addClass("js-Login-error-icon"),$(".js-Login-header").addClass("Login-header--error").html("Inloggningen misslyckades"),$(".js-Login-input-password").addClass("js-Login-input-error"),$(".js-Login-password-message").show().html("Felaktigt lösenord.")):($(".js-Login-header").addClass("Login-header--error").html("Inloggningen misslyckades"),$(".js-Login-input-password").addClass("js-Login-input-error"),$(".js-Login-username-toggle").removeClass("js-Login-question-icon").removeClass("js-Login-check-icon").addClass("js-Login-error-icon"),$(".js-Login-password-toggle").removeClass("js-Login-question-icon").addClass("js-Login-error-icon"),$(".js-Login-username-message").show().html(f),$(".js-Login-password-message").show().html("Felaktigt lösenord."))});$(".js-Promo-correct-ticket-btn").click(function(e){-1==document.cookie.indexOf("Tjena tjabba!")&&(e.preventDefault(),$(".js-Login-header").html("Logga in för att rätta din lott"),$(".js-Site-container").toggleClass("locked"),$(".js-Login-overlay-container").fadeIn("fast"))}),-1==document.cookie.indexOf("_ga")&&$(".js-Cookie-container").show(),$(".js-Cookies-approve-btn").click(function(){$(".js-Cookie-container").fadeOut("fast")}),$(".js-Choices-others-readmore").click(function(){$(this).next().slideToggle()}),$(".js-Menu-level-one-header").click(function(){$(this).next().slideToggle(),$(this).toggleClass("children-open")}),$(".js-Information-toggle-mail").click(function(){$(".js-Information-help-box--mail").slideToggle()}),$(".js-Information-toggle-phone").click(function(){$(".js-Information-help-box--phone").slideToggle()}),$(".js-Information-toggle-mobile").click(function(){$(".js-Information-help-box--mobile").slideToggle()});var h=$(".js-Information-input"),j=$(".js-Information-select"),p=[],w=[],L=$(".js-Information-regret-btn"),C=$(".js-Information-save-container");h.each(function(){p.push($(this).val())}),j.each(function(){w.push($(this).val())}),h.on("input",function(){n()}),j.on("change",function(){n()}),L.click(function(){h.each(function(e){h[e].value=p[e]}),j.each(function(e){j[e].value=w[e]}),C.removeClass("is-visible")});var v=$(".js-Information-save-btn"),k=$(".js-Information-form"),b=/^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;$(".js-Information-field-required").click(function(){$(this).toggleClass("is-visible")});var y;v.click(function(e){y=!0,e.preventDefault(),h.each(function(e){if(!1===b.test($(this).val())&&"email"===$(this).attr("type"))return y=!1,$("html, body").animate({scrollTop:$(this).offset().top-125},600),$(this).focus(),$(this).next().addClass("is-visible"),!1}),y&&k.submit()});var x=window.pageYOffset,I=$(".js-Header-container"),M=function(){if(window.pageYOffset>0){var e=window.pageYOffset;e>x&&window.pageYOffset>130?I.addClass("is-hidden"):I.removeClass("is-hidden"),x=e}else I.removeClass("is-hidden")};$(window).on("scroll",_.throttle(M,100)),$(".js-Header-correct-btn").click(function(){$(".js-Login-header").html("Logga in för att rätta din lott"),$(".js-Site-container").toggleClass("locked"),$(".js-Login-overlay-container").fadeIn("fast"),$(".js-Menu-container").hasClass("Menu--open")&&o()}),$(".js-Header-profile, .js-Open-login, .js-Campaign-form-login").click(function(){$(".js-Login-header").html("Logga in på Min Sida"),$(".js-Site-container").toggleClass("locked"),$(".js-Login-overlay-container").fadeIn("fast"),$(".js-Menu-container").hasClass("Menu--open")&&o()}),$(".js-Header-menu-container").click(function(){o()}),$(".js-Menu-overlay").click(function(){o()});var S=$(".js-Header-title--menu");$(function(){$('a[href*="#"]:not([href="#"])').click(function(){if(location.pathname.replace(/^\//,"")==this.pathname.replace(/^\//,"")&&location.hostname==this.hostname){var e=$(this.hash);if(e=e.length?e:$("[name="+this.hash.slice(1)+"]"),e.length)return $("html, body").animate({scrollTop:e.offset().top-165},500),!1}})}),$(".js-Prices-readmore").click(function(){$(this).next().slideToggle()}),$(".js-Campaign-open-terms").click(function(){$(".js-Campaign-terms-container").fadeIn("fast"),$(".js-Site-container").toggleClass("locked")}),$(".js-Campaign-hero-products-img").click(function(){$(".js-Campaign-overlay-container").fadeIn("fast"),$(".js-Site-container").toggleClass("locked")}),$(".js-Campaign-clickarea, .js-Campaign-close-form").click(function(){$(".js-Campaign-overlay-container").fadeOut("fast"),$(".js-Campaign-terms-container").fadeOut("fast"),$(".js-Site-container").toggleClass("locked")}),$.contains(document,$("#SubmenuAnchor")[0])&&!1===$.contains(document,$("#anchor")[0])&&$(window).width()<768?i($("#SubmenuAnchor").offset().top,800):$.contains(document,$("#SubmenuAnchor")[0])&&$.contains(document,$("#anchor")[0])&&$(window).width()<768&&i($("#SubmenuAnchor").offset().top+$("#SubmenuAnchor").height(),800)});