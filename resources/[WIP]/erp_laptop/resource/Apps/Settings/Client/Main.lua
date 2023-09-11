RegisterNUICallback('erp_laptop:settings:setWallpaper', function(data, cb)
    RPC.execute('erp_laptop:settings:setBackground', data)
    NUI.sendReactMessage('erp_laptop:main:update')

    cb(true)
end)

RegisterNUICallback('erp_laptop:settings:updateDarkMode', function(data, cb)
    RPC.execute('erp_laptop:settings:setDarkMode', data)
    NUI.sendReactMessage('erp_laptop:main:update')

    cb(true)
end)