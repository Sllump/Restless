fx_version 'cerulean'
games {'gta5'}

-- dependency "rlrp-base"


client_script "@rlrp-errorlog/client/cl_errorlog.lua"

client_script "client/cl_storage.lua"


exports {
	'tryGet',
	'remove',
	'set',
	'setDev'
} 