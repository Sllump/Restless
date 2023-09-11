function DiscordLog(wh, pSrc, reason, pBanReason, pLogData)
    local user = exports["arp-base"]:getModule("Player"):GetUser(pSrc)
    if user ~= false then
        hexId = user:getVar("hexid")
    else
        hexId = GetPlayerIdentifiers(pSrc)[1]
    end


    local pName = GetPlayerName(pSrc)
    local pDiscord = GetPlayerIdentifiers(pSrc)[3]
    
    pLogData = pLogData and tostring(pLogData) or "None"

    
    local LogData = {
        {
            ['description'] = string.format("`%s`\n\n`• Server Id: %s`\n\n━━━━━━━━━━━━━━━━━━\n`• Steam: %s`\n\n`• Discord: %s`\n━━━━━━━━━━━━━━━━━━", reason, pSrc, hexId, pDiscord),
            ['color'] = 2317994,
            ['fields'] = {
                {
                    ['name'] = '`Additional Information`',
                    ['value'] = pLogData,
                    ['inline'] = false
                },
            },
            ['author'] = {
                ['name'] = "Steam Name: "..pName
            },
        }
    }

    PerformHttpRequest(wh, function(err, text, headers) end, 'POST', json.encode({username = name, embeds = LogData}), { ['Content-Type'] = 'application/json' })	


    --- Drop Player for valid reasons
    if reason == "Cheater: Spawned Blacklisted Prop" or reason == "Triggering Events" or reason == "Damage Modifier" or reason == "Trigger-Event-Admin" then
        exports.oxmysql:execute('INSERT INTO user_bans (steam_id, discord_id, steam_name, reason, details) VALUES (@steam_id, @discord_id, @steam_name, @reason, @details)', {
            ['@steam_id'] = hexId,
            ['@discord_id'] = pDiscord,
            ['@steam_name'] = pName,
            ['@reason'] = pBanReason,
            ['@details'] = pLogData
        }, function()
        end)
    end
end
-- 
-- -- ##### EVENTS #####

-- RegisterServerEvent('player:damage:multi')
-- AddEventHandler('player:damage:multi',function(attacker, weapon, dmg)
--     local aName = GetPlayerName(attacker)
--     local pName = GetPlayerName(source)
--     local pLogData = "Attacker's Steam Name: " ..  aName .. " | ID: " .. attacker .. "\n Damage Modifier: " .. dmg .. "\n Victim's Name: " ..pName.. "\n Weapon: " .. weapon
--     exports['arp-base']:DiscordLog("DiscordLink", attacker, "damage_multi", pLogData)
--     DropPlayer(attacker, "[arp-anticheat] | Ban Reason: Damage Modifier")
-- end)

-- AddEventHandler('entityCreating', function(entity)
--     if GetConvarInt('logs_enabled', 0) == 1 then
--         local model = GetEntityModel(entity)
--         local pOwner = NetworkGetEntityOwner(entity)
--         for i=1, #blockedItems do 
--             if model == GetHashKey(blockedItems[i]) then
--                 CancelEvent()
--                 local LogInfo = "Prop Hash: " .. model
--                 exports['arp-base']:DiscordLog("DiscordLink", pOwner, "Cheater: Spawned Blacklisted Prop", "Spawning Props", LogInfo)
--                 Citizen.Wait(100)
--                 DropPlayer(pOwner, "[arp-anticheat]: You have been permanently banned.")
--                 break
--             end
--         end
--     end
-- end)

-- RegisterServerEvent("arp-base:receiveItam")
-- AddEventHandler("arp-base:receiveItam", function(pCid, item_id, pAmount)
--     local pSrc = source
--     LogInfo = "Spawned Info |  Item: " ..item_id.. " / Amount: " .. pAmount
--     exports['arp-base']:DiscordLog("DiscordLink", pSrc, "mass-spawn", "Mass Spawning Items", LogInfo)
--     DropPlayer(pSrc, "[arp-anticheat] | Banned | Reason: Better luck next time!")
--     return
-- end)

-- -- Vehicle Blacklist
-- AddEventHandler('entityCreating', function(entity)
--     local model = GetEntityModel(entity)
--     local pOwner = NetworkGetEntityOwner(entity)
--     for i=1, #BlacklistedModels do 
--         if model == GetHashKey(BlacklistedModels[i]) then
--             CancelEvent()
--             break
--         end
--     end
-- end)