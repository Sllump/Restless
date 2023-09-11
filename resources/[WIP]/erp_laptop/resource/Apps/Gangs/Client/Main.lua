RegisterNUICallback('erp_laptop:fetchInGang', function(data, cb)
    local InGang = RPC.execute('erp_laptop:gangs:checkInGang')

    cb(InGang)
end)

RegisterNUICallback('erp_laptop:gangs:fetchCharacterData', function(data, cb)
    local Data = RPC.execute('erp_laptop:gangs:checkRank')

    cb(Data)
end)

RegisterNUICallback('erp_laptop:gangs:fetchGang', function(data, cb)
    local Gang = RPC.execute('erp_laptop:gangs:fetchGang')

    cb(Gang)
end)

RegisterNUICallback('erp_laptop:gangs:getRoleData', function(data, cb)
    local Role = RPC.execute('erp_laptop:gangs:fetchRole', data)

    cb(Role)
end)