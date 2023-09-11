RegisterServerEvent("erp-base:sv:player_control_set")
AddEventHandler("erp-base:sv:player_control_set", function(controlsTable)
    local src = source
    Void.DB:UpdateControls(src, controlsTable, function(UpdateControls, err)
            if UpdateControls then
                -- we are good here.
            end
    end)
end)

RegisterServerEvent("erp-base:sv:player_controls")
AddEventHandler("erp-base:sv:player_controls", function()
    local src = source
    Void.DB:GetControls(src, function(loadedControls, err)
        if loadedControls ~= nil then 
            TriggerClientEvent("erp-base:cl:player_control", src, loadedControls) 
        else 
            TriggerClientEvent("erp-base:cl:player_control",src, nil)
        end
    end)
end)
