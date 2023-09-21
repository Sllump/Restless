





-- FXVersion Version
fx_version 'adamant'
games { 'gta5' }

-- Client Scripts
client_scripts {
    '@np-lib/client/cl_rpc.lua',
    'client/main.lua'
}

-- Server Scripts
server_scripts {
    '@np-lib/server/sv_rpc.lua',
    'server/main.lua'
}

-- NUI Default Page
ui_page "client/html/index.html"

-- Files needed for NUI
-- DON'T FORGET TO ADD THE SOUND FILES TO THIS!
files {
    'client/html/index.html',
    'client/html/sounds/*.ogg'
}
