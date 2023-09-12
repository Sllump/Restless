lua54 'yes'
fx_version "cerulean"
games { 'gta5' }

author 'G&N_s Studio'
description 'Miror Park BurgerShot'
version '2.0.1'

dependencies {
    '/server:4960',
    '/gameBuild:2189',
    'cfx_gn_collection',
    'cfx_gn_burgershot_int'
}

this_is_a_map 'yes'

client_script {
  'gn_bs_mpark_entityset.lua',
}
escrow_ignore {
    'stream/base/*.ydr',
}
dependency '/assetpacks'