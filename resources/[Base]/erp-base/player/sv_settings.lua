RegisterServerEvent("erp-base:sv:player_settings_set")
AddEventHandler("erp-base:sv:player_settings_set", function(settingsTable)
    local src = source
    Void.DB:UpdateSettings(src, settingsTable, function(UpdateSettings, err)
            if UpdateSettings then
                -- we are good here.
            end
    end)
end)

RegisterServerEvent("erp-base:sv:player_settings")
AddEventHandler("erp-base:sv:player_settings", function()
    local src = source
    Void.DB:GetSettings(src, function(loadedSettings, err)
        if loadedSettings ~= nil then 
            TriggerClientEvent("erp-base:cl:player_settings", src, loadedSettings) 
        else 
            TriggerClientEvent("erp-base:cl:player_settings",src, nil) 
        end
    end)
end)
