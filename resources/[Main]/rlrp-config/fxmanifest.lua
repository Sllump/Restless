fx_version "cerulean"

description "Nopixel - Config"
author "nopixel"
version '0.0.1'

game "gta5"

server_script '@rlrp-lib/server/sv_sql.js'
server_script '@rlrp-lib/server/sv_rpc.js'
server_script 'server/*.js'

client_script '@rlrp-lib/client/cl_rpc.js'
client_script 'client/*.js'