RegisterNUICallback('erp_laptop:boostingData', function(data ,cb)
    local Progression, Reputation = RPC.execute('erp_laptop:boosting:fetchClass')

    Data = {
        Level = Progression.leftSide,
        ProgLevel = Progression.rightSide,
        Progress = Reputation
    }

    cb(Data)
end)