RegisterNUICallback('erp_laptop:gangs:createRank', function(data, cb)
    RPC.execute('erp_laptop:gangs:createRank', data)

    Wait(500)
    NUI.sendReactMessage('erp_laptop:gangs:fetchGang')

    cb(true)
end)

RegisterNUICallback('erp_laptop:gangs:deleteRank', function(data, cb)
    RPC.execute('erp_laptop:gangs:deleteRank', data)

    Wait(500)
    NUI.sendReactMessage('erp_laptop:gangs:fetchGang')

    cb(true)
end)

RegisterNUICallback('erp_laptop:gangs:updateRank', function(data, cb)
    RPC.execute('erp_laptop:gangs:updateRank', data)

    Wait(500)
    NUI.sendReactMessage('erp_laptop:gangs:fetchGang')

    cb(true)
end)