fx_version 'cerulean'
games { 'gta5' }

--[[ dependencies {
  "rlrp-lib",
  "rlrp-ui"
} ]]--

client_script "@rlrp-lib/client/cl_ui.lua"
client_script "@rlrp-errorlog/client/cl_errorlog.lua"

client_scripts {
  'client/cl_*.lua'
}

server_scripts {
  'server/sv_*.lua'
}