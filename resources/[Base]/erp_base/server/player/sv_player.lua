Ethereal.Player = Ethereal.Player or {}
Ethereal.Players = {}
Ethereal.DiscordData = {}

Ethereal.Player.SelectCharacter = function(source, index)
    local src = source
    local steam = GetPlayerIdentifiers(source)[1]
    local result = Ethereal.Database.Execute(true, "SELECT * FROM `characters` WHERE `owner` = '" .. steam .. "' AND `id`='" .. index .. "'")

    if result[1] then
        local user = Ethereal.Player.CreateCharacterObject(src, result[1])
        UpdateClient()
        local src = source
        local user = Ethereal.GetPlayer(src)
        local PlayerData = user['PlayerData']
        TriggerClientEvent('updatecid', src, PlayerData['id'])
        return user
    end
    return false
end

Ethereal.Player.CreateCharacterObject = function(source, result)
    local src = source
    local self = {}
    local data = result

    -- General
    self["PlayerData"] = {}
    self["PlayerData"]["source"] = src
    self["PlayerData"]["name"] = GetPlayerName(src)
    -- Verify player steam
    self["PlayerData"]["owner"] = data["owner"] ~= nil and data["owner"] or GetPlayerIdentifiers(src)[1]
    -- Charcter ID
    self["PlayerData"]["id"] = data["id"]
    -- Player Rank
    self["PlayerData"]["rank"] = data['rank'] ~= nil and data['rank'] or 'user'
    -- Player Character
    self["PlayerData"]['job'] = data['job'] or "None"
    self["PlayerData"]['dob'] = data['dob'] and data['dob'] or "None"
    self["PlayerData"]['gender'] = data['gender'] and data['gender'] or "None"
    self["PlayerData"]['last_name'] = data['last_name'] and data['last_name'] or "None"
    self["PlayerData"]['first_name'] = data['first_name'] and data['first_name'] or "None"
    self["PlayerData"]['phone_number'] = data['phone_number'] and data['phone_number'] or "None"
    self["PlayerData"]['cash'] = data['cash'] and data['cash'] or 0
    self["PlayerData"]['bank'] = data['bank'] and data['bank'] or 0

    UpdateClient = function()
        local src = source
        print('[erp_base] Updating client data. (' .. src .. ')')
        TriggerClientEvent('erp_base:updateClient', src, self["PlayerData"])
    end

    UpdateJob = function(job)
        local src = source

        self["PlayerData"]['job'] = job
        print('[erp_base] Updating client data. (' .. src .. ') | Setting job to ' .. job)
    end

    Ethereal.Players[self["PlayerData"]["source"]] = self

    return Ethereal.Players[self['PlayerData']['source']]
end

Ethereal.Player.SetPlayerRank = function(source, rank)
    local src = source
    local user = Ethereal.GetPlayer(src)
    local steam = GetPlayerIdentifiers(src)[1]
    local admin = Ethereal.Database.Execute(true, "SELECT * FROM `admins` WHERE `steam` = '" .. steam .. "'")

    if admin[1] then
        Ethereal.Database.Execute(true, "UPDATE `admins` SET `rank`='" .. rank .. "' WHERE `steam` = '" .. steam .. "'")
    else
        Ethereal.Database.Execute(true, "INSERT INTO `admins` (`steam`, `rank`) VALUES ('" .. steam .. "', '" .. rank .. "')")
    end
end

Ethereal.GetPlayer = function(source)
    return Ethereal.Players[source]
end

Ethereal.GetPlayers = function(source)
    return Ethereal.Players
end

Ethereal.GetBalance = function(target)
    local user = exports['erp_base']:GetModule('GetPlayer')(tonumber(target))
    return user["PlayerData"]["bank"]
end

Ethereal.GetCash = function(target)
    local user = exports['erp_base']:GetModule('GetPlayer')(tonumber(target))
    return user["PlayerData"]["cash"]
end

Ethereal.AddBank = function(target, amt)
    if not amt or type(amt) ~= "number" then return end
    local user = exports['erp_base']:GetModule('GetPlayer')(tonumber(target))
    local bank = user["PlayerData"]["bank"] + amt
    local characterId = user["PlayerData"]["id"]

    amt = math.floor(amt)

    Ethereal.Players[tonumber(target)]['PlayerData']['bank'] = bank

    if not user then return end
    if not characterId or type(characterId) ~= "number" then return end

    local q = [[UPDATE characters SET bank = @bank WHERE owner = @hexid AND id = @characterId;]]
    local v = {
        ["bank"] = bank,
        ["hexid"] = user["PlayerData"]["owner"],
        ["characterId"] = characterId
    }

    exports.oxmysql:execute(q, v, function(rowsChanged)
        if not rowsChanged.changedRows then return end
        if rowsChanged.changedRows then
            UpdateClient()
            TriggerClientEvent("erp_banking:addCash", user["PlayerData"]["source"], amt)
            TriggerClientEvent("erp_banking:updateBalance", user["PlayerData"]["source"], Ethereal.GetBalance(tonumber(target)), amt)
        end
    end)
end

Ethereal.SetJob = function(target, job)
    local q = [[UPDATE characters SET job = @JOB WHERE id = @characterId;]]
    local v = {
        ["JOB"] = job,
        ["characterId"] = target
    }

    exports.oxmysql:execute(q, v, function(rowsChanged)
        if not rowsChanged.changedRows then return end
        if rowsChanged.changedRows then
            UpdateJob(job)
        end
    end)
end

Ethereal.RemoveBank = function(target, amt)
    if not amt or type(amt) ~= "number" then return end
    local user = exports['erp_base']:GetModule('GetPlayer')(tonumber(target))
    local bank = user["PlayerData"]["bank"] - amt
    local characterId = user["PlayerData"]["id"]

    amt = math.floor(amt)

    Ethereal.Players[tonumber(target)]['PlayerData']['bank'] = bank

    if not user then return end
    if not characterId or type(characterId) ~= "number" then return end

    local q = [[UPDATE characters SET bank = @bank WHERE owner = @hexid AND id = @characterId;]]
    local v = {
        ["bank"] = bank,
        ["hexid"] = user["PlayerData"]["owner"],
        ["characterId"] = characterId
    }

    exports.oxmysql:execute(q, v, function(rowsChanged)
        if not rowsChanged.changedRows then return end
        if rowsChanged.changedRows then
            UpdateClient()
            TriggerClientEvent("erp_banking:removeBalance", user["PlayerData"]["source"], amt)
            TriggerClientEvent("erp_banking:updateBalance", user["PlayerData"]["source"], Ethereal.GetBalance(tonumber(target)), amt)
        end
    end)
end

Ethereal.AddCash = function(target, amt)
    if not amt or type(amt) ~= "number" then return end
    local user = exports['erp_base']:GetModule('GetPlayer')(tonumber(target))
    local cash = user["PlayerData"]["cash"] + amt
    local characterId = user["PlayerData"]["id"]

    amt = math.floor(amt)

    Ethereal.Players[tonumber(target)]['PlayerData']['cash'] = cash

    if not user then return end
    if not characterId or type(characterId) ~= "number" then return end

    local q = [[UPDATE characters SET cash = @cash WHERE owner = @hexid AND id = @characterId;]]
    local v = {
        ["cash"] = cash,
        ["hexid"] = user["PlayerData"]["owner"],
        ["characterId"] = characterId
    }

    exports.oxmysql:execute(q, v, function(rowsChanged)
        if not rowsChanged.changedRows then return end
        if rowsChanged.changedRows then
            UpdateClient()
            TriggerClientEvent('isPed:UpdateCash', target, Ethereal.GetCash(target))
            TriggerClientEvent("erp_banking:addCash", user["PlayerData"]["source"], amt)
            TriggerClientEvent("erp_banking:updateCash", user["PlayerData"]["source"], Ethereal.GetCash(tonumber(target)), amt)
        end
    end)
end

Ethereal.RemoveCash = function(target, amt)
    if not amt or type(amt) ~= "number" then return end
    local user = exports['erp_base']:GetModule('GetPlayer')(tonumber(target))
    local cash = user["PlayerData"]["cash"] - amt
    local characterId = user["PlayerData"]["id"]
    local src = user["PlayerData"]["source"]

    amt = math.floor(amt)

    Ethereal.Players[tonumber(target)]['PlayerData']['cash'] = cash

    if not user then return end
    if not characterId or type(characterId) ~= "number" then return end

    local q = [[UPDATE characters SET cash = @cash WHERE owner = @hexid AND id = @characterId;]]
    local v = {
        ["cash"] = cash,
        ["hexid"] = user["PlayerData"]["owner"],
        ["characterId"] = characterId
    }

    exports.oxmysql:execute(q, v, function(rowsChanged)
        if not rowsChanged.changedRows then return end
        if rowsChanged.changedRows then
            UpdateClient()
            TriggerClientEvent("erp_banking:removeCash", user["PlayerData"]["source"], amt)
            TriggerClientEvent("erp_banking:updateCash", user["PlayerData"]["source"], Ethereal.GetCash(tonumber(target)), amt)
        end
    end)
end

Ethereal.GetCID = function(source)
    local src = source
    local user = Ethereal.GetPlayer(src)
    local PlayerData = user['PlayerData']
    return PlayerData['id']
end

Ethereal.GetFirstName = function(source)
    local src = source
    local user = Ethereal.GetPlayer(src)
    local PlayerData = user['PlayerData']
    return PlayerData['first_name']
end

Ethereal.GetLastName = function(source)
    local src = source
    local user = Ethereal.GetPlayer(src)
    local PlayerData = user['PlayerData']
    return PlayerData['last_name']
end

RegisterServerEvent("erp_base:updatePlayerLocation")
AddEventHandler("erp_base:updatePlayerLocation", function(coords)
    local src = source
    local user = Ethereal.GetPlayer(src)

    if user then
        local PlayerData = user['PlayerData']
        Ethereal.Database.Execute(true, "UPDATE `characters` SET `location`='" .. json.encode(coords) .. "' WHERE `steam` = '" .. PlayerData['steam'] .. "' AND `index` = '" .. PlayerData['index'] .. "'")
    end
end)

AddEventHandler('playerConnecting', function(playerName, setKickReason, deferrals)
    local src = source
    local error = nil
    local processing = true
    local steam = Ethereal.Shared.GetIdentifier(src, 'steam')
    local discord = Ethereal.Shared.GetIdentifier(src, 'discord')

    if steam == nil then
        processing = false
        setKickReason('\nFailed to fetch info. Restart steam and try again')
        deferrals.update('\nFailed to fetch info. Restart steam and try again')
        CancelEvent()
        return
    end

    print('^2 Steam Name: ' .. GetPlayerName(src) .. ' is connecting to the server ^7')
    print('^3 Steam ID: ' .. steam .. '^7')
    print('^4 Discord: ' .. discord .. '^7')

    local isauser = Ethereal.Database.Execute(true, "SELECT * FROM `users` WHERE `hex_id` = '" .. steam .. "'")
    if not isauser[1] then 
        local hexid = Ethereal.Shared:GetHexId(src)
        exports.oxmysql:execute("INSERT INTO users (hex_id, steam_id, community_id, license, name, rank) VALUES(@hexid, @steamid, @comid, @license, @name, @rank)", {
            ["hexid"] = hexid,
            ["steamid"] = Ethereal.Shared:HexIdToSteamId(hexid),
            ["comid"] = Ethereal.Shared:HexIdToComId(hexid),
            ["license"] = Ethereal.Shared:GetLicense(src),
            ["rank"] = "User",
            ["name"] = GetPlayerName(src)
        })
        Wait(2000)
        if not steam then
            error = '\n[ERROR] Your steam is currently offline!'
        end
    
        if not discord then
            error = '\n[ERROR] Your discord is currently offline!'
        end
    
        if error then
            processing = false
            setKickReason(error)
            deferrals.update(error)
            CancelEvent()
            return
        end
    
        Wait(2000)
    
       TriggerEvent("erp_base:connectQueue", src, playerName, setKickReason, deferrals)
       processing = false
    elseif isauser[1] then
        if not steam then
            error = '\n[ERROR] Your steam is currently offline!'
        end

        if not discord then
            error = '\n[ERROR] Your discord is currently offline!'
        end

        if error then
            processing = false
            setKickReason(error)
            deferrals.update(error)
            CancelEvent()
            return
        end

        Wait(2000)

    TriggerEvent("erp_base:connectQueue", src, playerName, setKickReason, deferrals)
    processing = false
    end
end)



AddEventHandler('playerDropped', function(reason)
	local src = source
    local user = Ethereal.GetPlayer(src)
    Wait(1000)
    if user then
        Ethereal.Players[src] = nil
    end
end)

Ethereal.GetPlayerName = function(source, discriminator)
    local src = source
    
    if Ethereal.DiscordData[source] then
        return discriminator == true and (Ethereal.DiscordData[source].user.username .. '#' .. Ethereal.DiscordData[source].user.discriminator) or (Ethereal.DiscordData[source].user.username)
    end

    return nil
end

exports('GetPlayerName', Ethereal.GetPlayerName)
exports('GetCID', Ethereal.GetCID)
exports('GetFirstName', Ethereal.GetFirstName)
exports('GetLastName', Ethereal.GetLastName)
exports('AddBank', Ethereal.AddBank)
exports('SetJob', Ethereal.SetJob)
exports('RemoveBank', Ethereal.RemoveBank)
exports('AddCash', Ethereal.AddCash)
exports('RemoveCash', Ethereal.RemoveCash)
exports('GetCash', Ethereal.GetCash)
exports('GetBalance', Ethereal.GetBalance)