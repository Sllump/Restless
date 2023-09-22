RegisterServerEvent("rlrp-base:sv:player_control_set")
AddEventHandler("rlrp-base:sv:player_control_set", function(controlsTable)
    local src = source
    NPX.DB:UpdateControls(src, controlsTable, function(UpdateControls, err)
            if UpdateControls then
                -- we are good here.
            end
    end)
end)

RegisterServerEvent("rlrp-base:sv:player_controls")
AddEventHandler("rlrp-base:sv:player_controls", function()
    local src = source
    NPX.DB:GetControls(src, function(loadedControls, err)
        if loadedControls ~= nil then 
            TriggerClientEvent("rlrp-base:cl:player_control", src, loadedControls) 
        else 
            TriggerClientEvent("rlrp-base:cl:player_control",src, nil) print('controls fucked') 
        end
    end)
end)
