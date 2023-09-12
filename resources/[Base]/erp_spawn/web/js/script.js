let ActiveElement = null;
let ActiveSpawn = null;
let ActiveSubSpawn = null;
let SpawnsTable = [];

$(document).ready(function(){
    window.addEventListener('message', function(event){
        let eData = event.data;
        switch(eData.action) {
            case 'OpenSpawnMenu':
                if(eData.toggle) {
                    OpenSpawnMenu(eData.Spawns)
                }else {
                    CloseSpawnMenu();
                }
                break;
            
        }
    })
    $('.spawn-select-last-loc').hover(function(){
        $('.tooltip').html(`
            <div class="inner-tooltip">
                <div class="tooltip-header"></div>
                <div class="tooltip-name">Last Location</div>
            </div>`
        ).show();
           
    }, function() {
        $('.tooltip').html('').hide();
    }).mousemove(function(e) {
        $('.tooltip').css({ top: e.pageY - 20, left:  e.pageX - 50})
    });
})


var offsetX = 0;
var offsetY = 0;
var mp = 11;

function CalCulateX(x) {
    return Math.round((335+offsetX) - x/mp)
}

function CalCulateY(y) {
	return Math.round((-500+offsetY) - y/mp)
}

function OpenSpawnMenu(Spawns){
    if(window.screen.width >= 1920 && window.screen.height >= 1080) {
		offsetX = 150;
		offsetY = -200;
		mp = 8;
	}
    ActiveSpawn = null;
    ActiveSubSpawn = null;
    $('.spawn-select-points').html(``);
    $.each(Spawns, function(k, v){
        if(!v.hasSubSpawn) {
            $('.spawn-select-points').append(`<div class="marker" id="marker" data-active = "false" data-hasSubSpawn = "${k}" data-tooltipHeader="${v.header}" data-tooltipLabel="${v.label}"><img src="./assets/img/marker.png" style="position: absolute; top: ${CalCulateX(v.coords.x)}px; right: ${CalCulateY(v.coords.y)}px;"></div>`)
        }else {
            $('.spawn-select-points').append(`<div class="marker" id="marker" data-active = "false" data-hasSubSpawn = "${k}"><img src="./assets/img/marker.png" style="position: absolute; top: ${CalCulateX(v.coords.x)}px; right: ${CalCulateY(v.coords.y)}px;"></div>`)
        }
    })
    SpawnsTable = Spawns
    $('.spawn-select-points .marker').hover(function(){
        if(($(this).attr('data-active')) == 'false'){
            if(!SpawnsTable[Number($(this).attr('data-hasSubSpawn'))].hasSubSpawn) {
                $('.tooltip').html(`
                    <div class="inner-tooltip">
                        <div class="tooltip-header">${$(this).attr('data-tooltipHeader')}</div>
                        <div class="tooltip-name">${$(this).attr('data-tooltipLabel')}</div>
                    </div>`
                ).show();
            }else {
                let html = '';
                $.each(SpawnsTable[$(this).attr('data-hasSubSpawn')].hasSubSpawn, function(k, v){
                    html+=`<div class="inner-tooltip">
                        <div class="tooltip-header">${v.header}</div>
                        <div class="tooltip-name">${v.label}</div>
                    </div>`
                })
                $('.tooltip').html(html).show();
            }
        }else {
            $('.tooltip').hide();
        }
    }, function() {
        $('.tooltip').html('').hide();
    }).mousemove(function(e) {
        if($(this).data('active') == false){
            $('.tooltip').css({ top: e.pageY - 20, left:  e.pageX - 50})
        }else {
            $('.tooltip').hide();
        }
    });
    $('#root').show();
}

$(document).on('click', '.marker', function(e){
    $('.tooltip').hide();
    $('.spawn-select-active-tip').html(``);
    if(!SpawnsTable[Number($(this).attr('data-hasSubSpawn'))].hasSubSpawn) {
        $('.spawn-select-active-tip').html(`
            <div class="inner-tooltip">
                <div class="tooltip-header">${$(this).attr('data-tooltipHeader')}</div>
                <div class="tooltip-name">${$(this).attr('data-tooltipLabel')}</div>
            </div>`
        ).css({top: e.clientY - 10, left:  e.clientX - 20}).hide();
    }else {
        let html = '';
        if(SpawnsTable[$(this).attr('data-hasSubSpawn')] && SpawnsTable[$(this).attr('data-hasSubSpawn')].hasSubSpawn) {
            $.each(SpawnsTable[$(this).attr('data-hasSubSpawn')].hasSubSpawn, function(k, v){
                html+=`<div class="inner-tooltip" data-isSubSpawn = "true" data-subSpawnIndex="${k}">
                    <div class="tooltip-header">${v.header}</div>
                    <div class="tooltip-name">${v.label}</div>
                </div>`
            })
            $('.spawn-select-active-tip').html(html).css({top: e.clientY, left:  e.clientX}).show();
        }
    }
    $('.marker').each(function(){
        $(this).find('img').attr('src', './assets/img/marker.png').data('active', false);
    })
    $(this).find('img').attr('src', './assets/img/marker-active.png').data('active', true);
    ActiveSpawn = Number($(this).attr('data-hasSubSpawn'))
})

$(document).on('click', '.inner-tooltip', function(){
    $('.spawn-select-active-tip').find('.active').removeClass('active');
    $(this).addClass('active');
    if(!SpawnsTable[ActiveSpawn].hasSubSpawn) {
        ActiveSubSpawn = null;
    }else {
        ActiveSubSpawn = Number($(this).attr('data-subSpawnIndex'));
    }
})

$(document).on('click', '.spawn-select-last-loc', function(){
    $('.spawn-select-active-tip').hide();
    $('#root').hide();
    $.post(`https://${GetParentResourceName()}/SpawnLastLocation`, JSON.stringify({}));
    ActiveSpawn = null;
    ActiveSubSpawn = null;
})

$(document).on('click', '.spawn-select-spawn', function(){
    if(SpawnsTable[ActiveSpawn] && SpawnsTable[ActiveSpawn].hasSubSpawn && SpawnsTable[ActiveSpawn].hasSubSpawn[ActiveSubSpawn]){
        $('.spawn-select-active-tip').hide();
        $('#root').hide();
        $.post(`https://${GetParentResourceName()}/SpawnLocation`, JSON.stringify({SpawnIndex: ActiveSpawn + 1, SubSpawnIndex: ActiveSubSpawn + 1}));
    }else {
        $('.spawn-select-active-tip').hide();
        $('#root').hide();
        $.post(`https://${GetParentResourceName()}/SpawnLocation`, JSON.stringify({SpawnIndex: ActiveSpawn + 1, SubSpawnIndex: false}));
    }
    ActiveSpawn = null;
    ActiveSubSpawn = null;
})