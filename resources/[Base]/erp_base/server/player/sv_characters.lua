Characters = {}

CreateThread(function()
    Events = exports['erp_base']:GetModule('Events')
    Player = exports['erp_base']:GetModule('Player')
    Shared = exports['erp_base']:GetModule('Shared')

    Events.Create("erp_base:loginPlayer", function(source, args)
        return {}
    end)

    Events.Create("erp_base:fetchPlayerCharacters", function(source, args)
        local src = source
        local steam = GetPlayerIdentifiers(src)[1]
        local characters = {}
        local result = Ethereal.Database.Execute(true, "SELECT * FROM `characters` WHERE `owner` = '" .. steam .. "'")

        for k,v in pairs(result) do
            local character = {}
            character.id = result[k].id
            character.first_name = result[k].first_name
            character.last_name = result[k].last_name
            character.dob = result[k].dob
            character.gender = result[k].gender
            character.cash = result[k].cash
            character.bank = result[k].bank
            character.phone_number = result[k].phone_number
            character.new = result[k].new
            character.iscreated = result[k].iscreated

            characters[#characters+1] = character
        end

        return characters
    end)

    Events.Create("erp_base:createCharacter", function(source, args)
        local src = source
        local steam = GetPlayerIdentifiers(src)[1]
        local returnValue = nil

        for k,v in pairs(args) do
            args[k] = string.gsub(args[k], "'", "")
            args[k] = string.gsub(args[k], '"', '')
        end

        local alreadyExist = MySQL.query.await("SELECT * FROM characters WHERE first_name = ? AND last_name = ? AND deleted = ?", {args.firstname, args.lastname, '0'})
        if alreadyExist[1] == nil then
            CHAR_CREATE = 'Steam: ' .. GetPlayerIdentifiers(src)[1] .. ' Created Character. \n First Name: ' .. args.firstname .. ' \n Last Name: ' .. args.lastname .. ' \n Date Of Birth: ' .. args.dob .. ' \n Gender: ' ..args.gender
            exports['erp_base']:sendToDiscord("Create Character", CHAR_CREATE, "https://discord.com/api/webhooks/1090325087498027018/8xZi4UpHKRcW2hQdv0bHJcb58NVeCC5f2Du9a6GVUwi6kzO4q2qv_nKqL_0Fr0iI4MQp")
            returnValue = true
            
            Ethereal.Database.Execute(true, "INSERT INTO `characters` (`owner`, `first_name`, `last_name`, `dob`, `gender`, `phone_number`, `isNew`) VALUES ('" .. steam .. "', '" .. args.firstname .. "', '" .. args.lastname .. "', '" .. args.dob .. "', '" .. args.gender .. "', '" .. Characters.NewPhoneNumber() .. "', '" .. 1 .. "')")
        
            local Data = MySQL.query.await("SELECT * FROM characters WHERE first_name = @FirstName AND last_name = @LastName", {
                ['@FirstName'] = args.firstname,
                ['@LastName'] = args.lastname
            })
        
            TargetData = {
                citizenId = Data[1].id,
                name = args.firstname .. ' ' .. args.lastname,
                tag = '.' .. args.firstname .. '_' .. args.lastname,
                profileImage = '',
                bannerImage = '',
                description = '',
                verified = false,
                followers = {},
                following = {},
            }
        
            MySQL.query.await('UPDATE characters SET twitterData = @TwitterData WHERE id = @Id', {
                ['@Id'] = Data[1].id,
                ['@TwitterData'] = json.encode(TargetData)
            })
        else
            returnValue = false
            TriggerClientEvent('erp_charselect:initiateCharSelect', src)
            TriggerClientEvent('erp_ui:sentNotification', src, 'error', 'A character with this name already exists.', 5000)
        end

        return returnValue
    end)
    
    Events.Create("erp_base:getCharacter", function(source, args)
        local src = source
        local steam = GetPlayerIdentifiers(src)[1]
        local characters = {}
        local result = Ethereal.Database.Execute(true, "SELECT * FROM `characters` WHERE `steam` = '" .. steam .. "' AND `index`='" .. args .. "'")

        if result[1] then
            return { 
                index = result[1].index,
                cid = result[1].cid,
                accounts = json.decode(result[1].accounts),
                character = json.decode(result[1].character),
            }
        end
        TriggerClientEvent("updatecid", -1, result[1].cid)
        return nil
    end)

    Events.Create("erp_base:deleteCharacter", function(source, args)
        local src = source
        local steam = GetPlayerIdentifiers(src)[1]
        local characters = {}
        local result = Ethereal.Database.Execute(true, "SELECT * FROM `characters` WHERE `owner` = '" .. steam .. "' AND `id`='" .. args .. "'")

        if result[1] then
            result = Ethereal.Database.Execute(true, "DELETE FROM `characters` WHERE `owner` = '" .. steam .. "' AND `id`='" .. args .. "'")
            return true
        end

        return false
    end)

    Events.Create("erp_base:selectCharacter", function(source, args)
        local test = Player.SelectCharacter(source, args)
        return test
    end)
end)

Characters.NewCID = function()
    local result = Ethereal.Database.Execute(true, "SELECT cid FROM `characters`")
    local cid = false

    while not cid do
        Wait(1)
        local newCID = tostring(math.random(10000, 55555) .. math.random(555, 999))
        local taken = false

        for k,v in pairs(result) do
            if v.cid == newCID then
                taken = true
            end
        end

        if not taken then
            cid = newCID
        end
    end

    return cid
end

Characters.NewPhoneNumber = function()
    local result = Ethereal.Database.Execute(true, "SELECT `phone_number` FROM `characters`")
    local number = false

    while not number do
        Wait(1)
        local newNumber = tostring(math.random(55555, 99999) .. math.random(11111, 55555))
        local taken = false

        for k,v in pairs(result) do

            v.phone_number = v.phone_number

            if v.phone_number == newNumber then
                taken = true
            end
        end

        if not taken then
            number = newNumber
        end
    end

    return number
end

CreateThread(function()
    while true do
        Wait(1)
        if exports and exports['erp_base'] then
            exports['erp_base']:AddModule('Characters', Characters)
            return
        end
    end
end)