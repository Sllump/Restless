local banCheck = true

exports('sendToDiscord', sendToDiscord) -- exports['erp_base']:sendToDiscord(name, message, color, webhook)

local banCheck = true

if banCheck then
    AddEventHandler("playerConnecting", function(name, setKickReason, d)
        local source = source
        d.defer()
	    Wait(0) -- Needed
	    d.update("Hi there, "..name.."! We're just checking your ban status, we won't be long!")

        local steamid  = "Unidentified"
        local license  = "Unidentified"
        local discord  = "Unidentified"
        local fivem    = "Unidentified"
    
        for k,v in pairs(GetPlayerIdentifiers(source))do            
            if string.sub(v, 1, string.len("steam:")) == "steam:" then
                steamid = v
            elseif string.sub(v, 1, string.len("license:")) == "license:" then
                license = v
            elseif string.sub(v, 1, string.len("discord:")) == "discord:" then
                discord = v
            elseif string.sub(v, 1, string.len("fivem:")) == "fivem:" then
                fivem = v
            end
        end
        
        d.done()
    end)
end

RegisterNetEvent('playerJoining', function()
    local source = source

    local steamid  = "Unidentified"
    local license  = "Unidentified"
    local discord  = "Unidentified"
    local fivem    = "Unidentified"

    for k,v in pairs(GetPlayerIdentifiers(source))do            
        if string.sub(v, 1, string.len("steam:")) == "steam:" then
            steamid = v
        elseif string.sub(v, 1, string.len("license:")) == "license:" then
            license = v
        elseif string.sub(v, 1, string.len("discord:")) == "discord:" then
            discord = v
        elseif string.sub(v, 1, string.len("fivem:")) == "fivem:" then
            fivem = v
        end
    end
    local token = 0
    local numIds = GetNumPlayerTokens(source) for i = 0, numIds - 1 do
    token = GetPlayerToken(source, i) end
    
    local message = "Player: **"..GetPlayerName(source).."** (**"..source.."**)\nSteam: **"..steamid.."**".."\nFiveM: **"..fivem.."**\nLicense: **"..license.."**\nDiscord: **"..discord.."**\nFiveM Token: **"..token.."**"
    exports['erp_base']:sendToDiscord('Player Connecting', message, "https://discord.com/api/webhooks/1090324183294156940/7dgv__D0CW-cypVR_zK-M52einI8iV7VyGWFXTNOBpuwxrJrtOdQk1-HxUVClo3tkQHk")
end)

AddEventHandler('playerDropped', function(reason)
    local source = source
    local steamid  = "Unidentified"
    local license  = "Unidentified"
    local discord  = "Unidentified"
    local fivem    = "Unidentified"

    for k,v in pairs(GetPlayerIdentifiers(source))do            
        if string.sub(v, 1, string.len("steam:")) == "steam:" then
            steamid = v
        elseif string.sub(v, 1, string.len("license:")) == "license:" then
            license = v
        elseif string.sub(v, 1, string.len("discord:")) == "discord:" then
            discord = v
        elseif string.sub(v, 1, string.len("fivem:")) == "fivem:" then
            fivem = v
        end
    end

    local token = 0
    local numIds = GetNumPlayerTokens(source)
		for i = 0, numIds - 1 do
    token = GetPlayerToken(source, i)
        end
    local message = "Player: **"..GetPlayerName(source).."** (**"..source.."**)\nReason: **"..reason.."**\nSteam: **"..steamid.."**".."\nFiveM: **"..fivem.."**\nLicense: **"..license.."**\nDiscord: **"..discord.."**\n FiveM Token: **"..token.."**"
    sendToDiscord('Player Leaving', message, "https://discord.com/api/webhooks/1090324234418528430/gDZgsHu-0vxs9RF-Yqvhst2zNOVHPV6IyGgtUCP1R7CNtr7-6fZCJxxp_7YIzm0ckurj")
end)

exports('Bans', Bans)
exports('RefreshBans', RefreshBans)