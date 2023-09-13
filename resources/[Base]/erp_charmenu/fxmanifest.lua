fx_version 'cerulean'
game 'gta5'

client_scripts {
    "@erp_base/client/lib/cl_rpc.lua",
    'client/eventswitch.lua',
    'client/*.lua'
}

server_scripts {
    "@erp_base/server/lib/sv_rpc.lua",
    '@oxmysql/lib/MySQL.lua',
    'server/*.lua'
}

shared_scripts {
    'config.lua'
}

ui_page 'web/ui.html'

files {
    'web/assets/*.svg',
    'web/font/*.ttf',
    'web/assets/*.png',
    'web/ui.html',
    'web/css/style.css',
    'web/js/script.js',
}

exports {
    'OpenCharacterMenu'
}