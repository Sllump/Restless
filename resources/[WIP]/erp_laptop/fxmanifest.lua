fx_version 'adamant'
game 'gta5'
lua54 'yes'

author 'Aspect'
description 'Laptop for Amity RP'

ui_page 'dist/web/index.html'

files {
    'dist/web/index.html',
    'dist/web/**/*'
}

client_scripts {
    '@erp_base/client/lib/cl_rpc.lua',

    'resource/Apps/Boosting/Client/*.lua',

    'resource/Apps/Gangs/Client/*.lua',
    'resource/Apps/Settings/Client/*.lua',
    'resource/Main/Client/*.lua',

    'resource/Gang_System/Sprays/Client/*.lua',
}

server_scripts {
    '@oxmysql/lib/MySQL.lua',
    '@erp_base/server/lib/sv_rpc.lua',

    'resource/Apps/Boosting/Server/*.lua',

    'resource/Apps/Gangs/Server/*.lua',
    'resource/Apps/Settings/Server/*.lua',
    'resource/Main/Server/*.lua',

    'resource/Gang_System/Sprays/Server/*.lua',
    'resource/Gang_System/Sprays/Server/Actions/*.lua'
}

shared_scripts {
    '@erp_base/shared/lib/sh_util.lua',

    'resource/Apps/Boosting/Configurations/*.lua',

    'resource/Gang_System/Sprays/Shared/*.lua'
}

-- FiveM Escrow shit below

lua54 'yes'

escrow_ignore {
    'resource/Gang_System/Sprays/Server/Config.lua',  -- Only ignore one file
}