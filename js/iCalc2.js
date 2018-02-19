"use strict";

// Olin laiska tään laskemisen kanssa ja tein nopeen ja noin toimivan.
// Suosittelen laskemaan 1 - 0.9
// Lisäksi pelkkä C painaminen aiheuttaa jännää.

// Ahkerampi tyyppi olis myös varmistanu mitä tapahtuu kun historiakenttä menee täyteen.

function laske() {
  $(".tuloskenttä").val(eval(`${$(".syötehistoria").val()}${$(".syötekenttä1").val()}`));
  $(".syötehistoria").val(`${$(".syötehistoria").val()}${$(".syötekenttä1").val()}`);
  $(".syötekenttä1").val('');
  $(".active").removeClass("active");
}
function lisaaRiville(laskutoiminto) {
  let historia = $(".syötehistoria").val();
  let uusihistoria;
  if  (historia !== '') {
    uusihistoria = `${historia}${$(".syötekenttä1").val()}${laskutoiminto}`;
    $(".syötehistoria").val(uusihistoria);
    $(".syötekenttä1").val('');
  } else {
    $(".syötehistoria").val(`${$(".syötekenttä1").val()}${laskutoiminto}`);
    $(".syötekenttä1").val('');
  }
}
function kenttä1(){
  $('.syötekenttä1').val('');
  $('.syötekenttä1').focus();
  if(!$('.syötekenttä1').hasClass('active')) {
    $('.active').removeClass('active');
    $('.syötekenttä1').addClass('active');
  }
}
function kenttä2(){
  $('.syötehistoria').val('');
  $('.syötekenttä1').val('');
}
function tarkistaKentät(){
  if ($('.syötekenttä1').val() != '')
  { return true; } else { return false; }
}
function aktivoiKenttä(){
  if (tarkistaKentät() == true) {
    return true;
  } else if ($('.syötekenttä1').val() == '') {
    kenttä1();
  } else { kenttä2(); }
}
function tyhjennäTulos() {
  $('.tuloskenttä').val('');
}
function onkoKenttää() {
  if (!$('.numerokentta').hasClass('active'))
  { return false; } else { return true; }
}

$(document).ready(function(){
  let laskutoiminto = '';
  $('.numerokentta').click(function(){
    if(!$(this).hasClass('active')) {
      $('.numerokentta').removeClass('active');
      $(this).addClass('active');
    }
  });
  $('.nappi.nro').click(function(){
    if (!onkoKenttää()) {
      aktivoiKenttä();
    }
    let luku = $(this).text();
    let vanhaluku = $('.numerokentta.active').val();
    $('.numerokentta.active').val(vanhaluku + luku);
  });
  $('#c1').click(function(){
    if ($(".tuloskenttä").val() != '') {
      console.log("ei pitäs olla tulosta kek");
      kenttä1();
      tyhjennäTulos();
    }
  });
  $('#c2').click(function(){
    kenttä2();
    tyhjennäTulos();
  });
  $('#jako').click(function(){
    laskutoiminto = `/`;
    if (aktivoiKenttä()) {
      lisaaRiville(laskutoiminto);
    } else {
      tyhjennäTulos();
    }
  });
  $('#kertaa').click(function(){
    laskutoiminto = `*`;
    if (aktivoiKenttä()) {
      lisaaRiville(laskutoiminto);
    } else {
      tyhjennäTulos();
    }
  });
  $('#miinus').click(function(){
    laskutoiminto = `-`;
    if (aktivoiKenttä()) {
      lisaaRiville(laskutoiminto);
    } else {
      tyhjennäTulos();
    }
  });
  $('#plus').click(function(){
    laskutoiminto = `+`;
    if (aktivoiKenttä()) {
      lisaaRiville(laskutoiminto);
    } else {
      tyhjennäTulos();
    }
  });
  $('#equals').click(function(){
    laske(laskutoiminto);
  });
  $('#pilkku').click(function(){
    let luku = $(".syötekenttä1").val();
    if (!luku.includes(".")) {
      let uusiluku = `${luku}.`;
      $(".syötekenttä1").val(uusiluku);
    } else {
    }
  });
  // tuloskenttää klikkaamalla otetaan arvo talteen clipboardille.
  $('.tuloskenttä').click(function(){
    $('.tuloskenttä').focus();
    document.execCommand('selectAll');
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
  });
  $('#laskin').click(function(click){
    click.stopPropagation();
  });
  $('html').click(function(){
    $('.active').removeClass('active');
  });
});
