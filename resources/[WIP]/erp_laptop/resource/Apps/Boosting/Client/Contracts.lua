RegisterNUICallback('erp_laptop:fetchContracts', function(data, cb)
    local Contracts = RPC.execute('erp_laptop:boosting:getContracts')

    if Contracts == nil then
        Contracts = {}
    end

    cb(Contracts)
end)

RegisterNUICallback('erp_laptop:boosting:declineContract', function(data, cb)
    local Decline = RPC.execute('erp_laptop:boosting:declineContract', data)
    
    cb(true)
end)

RegisterNUICallback('erp_laptop:boosting:transferContract', function(data, cb)
    local Transfer = RPC.execute('erp_laptop:boosting:transferContract', data)

    cb(true)
end)