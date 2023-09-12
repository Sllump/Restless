fx_version "cerulean"
game "gta5"
description "erp_base"

client_scripts {
    "shared/*.lua",
    "client/*.lua",
    "client/lib/*.lua",
    "client/lib/*.js",
    "client/player/*.lua",
    "client/util/*.lua",
    "blips/*.lua",
    "client/licenses/*.lua",

}

server_scripts {
    "@oxmysql/lib/MySQL.lua",
    "shared/*.lua",
    "shared/lib/*.lua",
    "server/*.lua",
    "server/connection/*.lua",
    "server/db/*.lua",
    "server/lib/*.lua",
    "server/lib/*.js",
    "server/player/*.lua",
    "server/util/*.lua",
    "config/*.lua",
    "server/business/*.lua",
    "server/licenses/*.lua",
    "server/paychecks/*.lua",
}

shared_script {
    'shared/lib/*.lua',
}

export "FetchVehProps"
export "SetVehProps"