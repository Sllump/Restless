fx_version 'cerulean'
game 'gta5'

client_scripts {
    '@erp_base/client/lib/cl_rpc.lua',
    'client/main.lua'
}

server_scripts {
    "@oxmysql/lib/MySQL.lua",
    '@erp_base/server/lib/sv_rpc.lua',
    'server/*.lua'
}

shared_script '@erp_base/shared/lib/sh_util.lua'

shared_scripts {
    'config.lua'
}

ui_page 'web/ui.html'

files {
    'web/assets/***',
    'web/ui.html',
    'web/css/*.css',
    'web/js/*.js'
}