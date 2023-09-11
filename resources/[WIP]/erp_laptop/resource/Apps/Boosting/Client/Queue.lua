Queue = {
    InQueue = false,
}

RegisterNUICallback('erp_laptop:boosting:queueToggle', function(data, cb)
    Queue.InQueue = data.Toggle

    if data.Toggle then 
        Citizen.CreateThread(function()
            while Queue.InQueue do
                Citizen.Wait(15000)

                if Queue.InQueue then
                    local BoostLevel = RPC.execute('erp_laptop:boosting:fetchClass')

                    RPC.execute('erp_laptop:boosting:createContract', {
                        Vehicle = Config.VehicleModels[BoostLevel.leftSide][math.random(1, #Config.VehicleModels[BoostLevel.leftSide])],
                        Class = BoostLevel.leftSide
                    })

                    local Contracts = RPC.execute('erp_laptop:boosting:getContracts')

                    if Contracts == nil then
                        Contracts = {}
                    end

                    NUI.sendReactMessage('erp_laptop:boosting:updateContracts', Contracts)
                    TriggerEvent('notifications:sendNotification', 'Boosting', 'You recieved a ' .. BoostLevel.leftSide .. ' class contract.', 'messages')
                end
            end
        end)
    end

    if data.Toggle then
        Text = 'You joined the queue'
    else
        Text = 'You left the queue'
    end

    NUI.sendReactMessage('erp_laptop:createNotification', {
        Label = Text,
        App = 'Boosting'
    })
end)

RegisterNUICallback('erp_laptop:boosting:isInQueue', function(data, cb)
    cb(Queue.InQueue)
end)

RegisterCommand('createcontract', function()
    local BoostLevel = RPC.execute('erp_laptop:boosting:fetchClass')

    RPC.execute('erp_laptop:boosting:createContract', {
        Vehicle = Config.VehicleModels[BoostLevel.leftSide][math.random(1, #Config.VehicleModels[BoostLevel.leftSide])],
        Class = BoostLevel.leftSide
    })

    local Contracts = RPC.execute('erp_laptop:boosting:getContracts')

    if Contracts == nil then
        Contracts = {}
    end

    NUI.sendReactMessage('erp_laptop:boosting:updateContracts', Contracts)
end)