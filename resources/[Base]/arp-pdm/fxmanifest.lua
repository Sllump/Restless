fx_version 'bodacious'
game 'gta5'

resource_manifest_version "44febabe-d386-4d18-afbe-5e627f4af937"

server_script { 
    "@arp-lib/server/sv_sql.lua",
    "@arp-lib/server/sv_rpc.lua",
    "sv_main.lua"
}

client_script {
    "@arp-lib/client/cl_rpc.lua",
    "cl_main.lua"
}