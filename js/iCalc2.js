function laske(laskutoiminto){
  // tään funktion vois periaatteessa splitata osiin.
  // ekassa tarkistetaan kentät
  // tokassa tarkistetaan laskutoiminto
  // kolmannelle syötetään luvut ja toiminto
  // neljäs hoitaa tulostuksen (ja desimaalitrimmauksen)
  let luku1 = parseInt($('.syötekenttä1').val());
  let luku2 = parseInt($('.syötekenttä2').val());
  // tyhjä parseutuu -> NaN
  // NaN !== NaN
  if (luku1 == luku1 && luku2 == luku2) {
    let tulos;
    if (laskutoiminto == "jako") {
      tulos = luku1 / luku2;
    } else if (laskutoiminto == "kertaa") {
      tulos = luku1 * luku2;
    } else if (laskutoiminto == "miinus") {
      tulos = luku1 - luku2;
    } else if (laskutoiminto == "plus") {
      tulos = luku1 + luku2;
    } else {
      console.log('mahdoton on tapahtunut');
    }
    // annetaan tulos MAKSIMISSAAN 5 desimaalin tarkkuudella.
    if (tulos % 1 !== 0) {
      tarkkuus = 5;
      tulos = tulos.toString();
      pituus = tulos.length;
      let erotin = tulos.indexOf('.');
      tulos = parseFloat(tulos);
      if (pituus <= (erotin + tarkkuus)){
        tulos = tulos.toFixed(pituus - erotin - 1);
      }
      else {
        häntä = erotin + 4;
        tulos = tulos.toFixed(häntä);
      }
    }
    $('.tuloskenttä').val(tulos);
    $('.tuloskenttä').focus();
    $('.active').removeClass('active');
  } else {
    // väläytäErrori();
    console.log('Virhe: anna numerot hölmö!');
    aktivoiKenttä();
  }
}
// function väläytäErrori(){
//    vaihtoehto a)
//      väläyttää tuloskentän edessä punaisen divin
//    vaihtoehto b)
//      väläyttää puuttuvan (monikko) numerokentän .^
// }
function kenttä1(){
  $('.syötekenttä1').val('');
  $('.syötekenttä1').focus();
  if(!$('.syötekenttä1').hasClass('active')) {
    $('.active').removeClass('active');
    $('.syötekenttä1').addClass('active');
  }
}
function kenttä2(){
  $('.syötekenttä2').val('');
  $('.syötekenttä2').focus();
  if(!$('.syötekenttä2').hasClass('active')) {
    $('.active').removeClass('active');
    $('.syötekenttä2').addClass('active');
  }
}
function tarkistaKentät(){
  if ($('.syötekenttä1').val() != '' && $('.syötekenttä2').val() != '')
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
    kenttä1();
    tyhjennäTulos();
  });
  $('#c2').click(function(){
    kenttä2();
    tyhjennäTulos();
  });
  $('#c1jac2').click(function(){
    $('.syötekenttä1').val('');
    $('.syötekenttä2').val('');
    laskutoiminto = "";
    tyhjennäTulos();
    aktivoiKenttä();
  });
  $('#jako').click(function(){
    laskutoiminto = "jako";
    if (aktivoiKenttä()) {
      laske(laskutoiminto);
    } else {
      tyhjennäTulos();
    }
  });
  $('#kertaa').click(function(){
    laskutoiminto = "kertaa";
    if (aktivoiKenttä()) {
      laske(laskutoiminto);
    } else {
      tyhjennäTulos();
    }
  });
  $('#miinus').click(function(){
    laskutoiminto = "miinus";
    if (aktivoiKenttä()) {
      laske(laskutoiminto);
    } else {
      tyhjennäTulos();
    }
  });
  $('#plus').click(function(){
    laskutoiminto = "plus";
    if (aktivoiKenttä()) {
      laske(laskutoiminto);
    } else {
      tyhjennäTulos();
    }
  });
  $('#equals').click(function(){
    laske(laskutoiminto);
  });
  $('#pilkku').click(function(){
    console.log('Error: Not implemented!');
    // yksi tapa voisi olla lisätä .nappi.nro classille tarkistus,
    // onko edellinen painettu nappula pilkku, ja muistaa vanha luku ->
    // ottaa uusi merkki vastaan ja concattaa ne pisteen ympärille.
    // samalla pitäisi tarkistaa onko luvussa jo desimaalierotin.
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
