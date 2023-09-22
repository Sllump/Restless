RegisterServerEvent("rlrp-base:sv:player_settings_set")
AddEventHandler("rlrp-base:sv:player_settings_set", function(settingsTable)
    local src = source
    NPX.DB:UpdateSettings(src, settingsTable, function(UpdateSettings, err)
        if UpdateSettings then
            -- we are good here.
        end
    end)
end)

RegisterServerEvent("rlrp-base:sv:player_settings")
AddEventHandler("rlrp-base:sv:player_settings", function()
    local src = source
    NPX.DB:GetSettings(src, function(loadedSettings, err)
        if loadedSettings ~= nil then 
            TriggerClientEvent("rlrp-base:cl:player_settings", src, loadedSettings) 
        else 
            TriggerClientEvent("rlrp-base:cl:player_settings",src, nil) 
        end
    end)
end)
