fx_version 'cerulean'
games { 'gta5' }

--[[ dependencies {
  "erp-lib"
} ]]--

ui_page 'client/html/index.html'

files {
  'client/html/*.html',
  'client/html/*.js',
  'client/html/*.css',
  'client/html/webfonts/*.eot',
  'client/html/webfonts/*.svg',
  'client/html/webfonts/*.ttf',
  'client/html/webfonts/*.woff',
  'client/html/webfonts/*.woff2',
  'client/html/css/*',
}

client_scripts {
  '@erp-lib/client/cl_interface.lua',
  '@erp-errorlog/client/cl_errorlog.lua',
  '@erp-lib/client/cl_rpc.lua',
  '@erp-lib/client/cl_ui.lua',
  'client/cl_tattooshop.lua',
  'client/cl_*.lua',
}

shared_script {
  '@erp-lib/shared/sh_util.lua',
  'shared/sh_*.*',
}

server_scripts {
  '@erp-lib/server/sv_rpc.lua',
  'server/sv_*.lua',
}

export "CreateHashList"
export "GetTatCategs"
export "GetCustomSkins"
export "isNearClothing"
