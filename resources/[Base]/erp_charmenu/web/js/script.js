let clickDisabled = false;
let activeChar = 0;
let canCreate = false;

$(document).ready(function(){
    window.addEventListener('message', function(event){
      let eData = event.data;
      switch (eData.action) {
        case 'OpenCharMenu':
          OpenCharMenu(eData.toggle, eData.characters);
          break;
      }
    })
})

const OpenCharMenu = function(toggle, characters, slots) {
  ResetData();
  if (toggle) {
    $.each(characters, function(k, v) {
      let dence = true;
      if (dence) {
        $(`.character:nth-child(${v.slotpos})`).html(`
          <div class="char-delete-icon"><img src="./assets/delete-icon.svg"></div>
          <div class="char-name">${v.first_name} ${v.last_name}</div>
          <div class="char-money">$ ${v.cash}</div>
          <div class="char-slot">${v.id}</div>
        `).removeClass('no-exist').attr('data-citizenid', v.id).data('slotpos', v.slotpos);
      }
    })
    $('#root').show();
    $.post(`https://${GetParentResourceName()}/EndWait`, JSON.stringify({}))
    $('.char-menu').show("slide", {direction: "left"}, 1000);
  }
}

$(document).on('click', '.character', function(){
  if(clickDisabled === false) {
    clickDisabled = true
    $('.char-list').find('.active').removeClass('active');
    $(this).addClass('active');
    $('.play-btn').removeClass('disabled');
    if(!$(this).hasClass('no-exist')) {
      $.post(`https://${GetParentResourceName()}/ChangeCam`, JSON.stringify({char: $(this).data('slotpos')}));
    }
    activeChar = $(this).data('cid');
  }
  setTimeout(function(){
    clickDisabled = false
  }, 1000)
})

$(document).on('click', '.no-exist', function(){
    activeChar = $(this).data('cid');
    $('.play-btn').addClass('disabled');
    $('.char-menu').hide("slide", {direction: "left"}, 1000);
    setTimeout(function(){
        $('.char-reg').show("slide", {direction: "left"}, 1000);
    }, 1000)
});

$(document).on('click', '.play-btn', function(){
  let citizenid = $('.char-list').find('.active').data('citizenid');
  $('#root').hide();
  ResetData();
  activeChar = 0;
  clickDisabled = false;
  $('.char-list').find('.active').removeClass('active');
  $.post(`https://${GetParentResourceName()}/PlayCharacter`, JSON.stringify({citizenid: citizenid}));
});

$(document).on('click', '.char-gender-input', function(){
    $('.char-gender-inputs').find('.active').removeClass('active').css({'background-image': 'url(/assets/gender.png)'}).find('img').attr('src', './assets/gender-icon.svg');
    $(this).css({'background-image': 'url(/assets/gender-active.png)'}).addClass('active').find('img').attr('src', './assets/gender-icon-active.svg');
})

$(document).on('keyup', '.char-text-input input', function(){
    let string = $(this).val();
    if(string.length == 0) {
      canCreate = false;
      $(this).parent().parent().parent().parent().find('.char-reg-check').find('.char-reg-check-icon').find('img').attr('src', './assets/invalid-icon.svg').parent().parent().find('.char-reg-check-text').html('The Value you enter should be atleast of 4 Letters')
    }else {
      if (/\d/.test(string)) {
        canCreate = false;
        $(this).parent().parent().parent().parent().find('.char-reg-check').find('.char-reg-check-icon').find('img').attr('src', './assets/invalid-icon.svg').parent().parent().find('.char-reg-check-text').html('Only Letters Allowed')
      }else {
        canCreate = true;
        $(this).parent().parent().parent().parent().find('.char-reg-check').find('.char-reg-check-icon').find('img').attr('src', './assets/valid-icon.svg').parent().parent().find('.char-reg-check-text').html('')
      }
    }
});

$(document).on('keyup', '.char-dob-input', function(){
  let string = $(this).val();
  if(string.length == 0) {
    canCreate = false;
    $(this).parent().parent().parent().parent().find('.char-reg-check').find('.char-reg-check-icon').find('img').attr('src', './assets/invalid-icon.svg').parent().parent().find('.char-reg-check-dob').html('The Value you enter need to be 8 numbers. (10 characters including dashes)')
  }else {
      canCreate = true;
      $(this).parent().parent().parent().parent().find('.char-reg-check').find('.char-reg-check-icon').find('img').attr('src', './assets/valid-icon.svg').parent().parent().find('.char-reg-check-dob').html('')
    }
});


$(document).on('click', '.create-char-btn', function(){
    let firstname = $('#firstname').val();
    let lastname = $('#lastname').val();
    let dob = $('#dob').val();
    let height = $('#height').val();
    let gender = Number($('.char-gender-inputs').find('.active').data('gender'));
    let cid = Number(activeChar);
    $('.char-reg').hide("slide", { direction: "left" }, 1000);
    $.post(`https://${GetParentResourceName()}/CreateCharacter`, JSON.stringify({gender: gender, firstname:firstname, lastname:lastname, height:height, dob: dob, cid: cid}))
    activeChar = 0;
    clickDisabled = false;
})

$(document).on('click', '.char-delete-icon', function(){
  $('.delete-char').show("slide", {direction: "left"}, 1000);
})

$(document).on('click', '.delete-cancel-btn', function(){
  $('.delete-char').hide("slide", {direction: "left"}, 1000);
})

$(document).on('click', '.delete-btn', function(){
  let citizenid = $('.char-list').find('.active').data('citizenid');
  $('.delete-char').hide("slide", {direction: "left"}, 1000);
  $('#root').hide();
  ResetData();
  activeChar = 0;
  clickDisabled = false;
  $('.char-list').find('.active').removeClass('active');
  $.post(`https://${GetParentResourceName()}/DeleteCharacter`, JSON.stringify({citizenid: citizenid}));
})

const rangeInputs = document.querySelectorAll('input[type="range"]')

function handleInputChange(e) {
  let target = e.target
  if (e.target.type !== 'range') {
    target = document.getElementById('range')
  } 
  const min = target.min
  const max = target.max
  const val = target.value
  
  target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
  $('.char-text-height').html((val - min) * 100 / (max - min) + 150)
  if((val - min) * 100 / (max - min) + 150 > 150 && (val - min) * 100 / (max - min) + 150 <= 250) {
    $('.gender-check').find('img').attr('src', './assets/valid-icon.svg');
    $('.gender-check-text').html('');
  }else {
    $('.gender-check').find('img').attr('src', './assets/invalid-icon.svg');
    $('.gender-check-text').html('Choose Between 150CM - 250Cm');
  }
}

function ResetData() {
  $('.play-btn').addClass('disabled');
  $('.character').each(function(){
    $(this).html(`
      <div><img src="./assets/add-square.svg"></div>
    `).removeClass('no-exist').addClass('no-exist');
  })
}

rangeInputs.forEach(input => {
  input.addEventListener('input', handleInputChange)
})