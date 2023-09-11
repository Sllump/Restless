fx_version 'cerulean'
games {'gta5'}


client_script "@erp-errorlog/client/cl_errorlog.lua"

shared_script "@mka-array/Array.lua"
shared_script "@erp-lib/shared/sh_cacheable.lua"

client_script '@erp-lib/client/cl_rpc.lua'
client_script 'carhud.lua'
server_script 'carhud_server.lua'

exports {
	"playerLocation",
	"playerZone"
}