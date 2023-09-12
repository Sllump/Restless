RegisterNetEvent('erp_charmenu:setRoutingBucket', function(bool)
    local src = source
    if bool then 
        SetPlayerRoutingBucket(src, src)
    elseif not bool then 
        SetPlayerRoutingBucket(src, 0)
    end
end)

RPC.register('erp_charmenu:server:GetUserCharacters', function()
    local src = source
    local steam = GetPlayerIdentifiers(src)[1]
    local result = 0
    exports.oxmysql:execute("SELECT * FROM characters WHERE owner = @owner AND Deleted = @deleteed",{['owner'] = steam, ['deleted'] = 0}, function(data)
        result = data
    end)
    Wait(5)
    return result
end)

function decode(tableString)
    if tableString == nil or tableString =="" then
        return {}
    else
        return json.decode(tableString)
    end
end

RPC.register("erp_charmenu:server:GetPlayerClothing", function()
    local src = source
    local steam = GetPlayerIdentifiers(src)[1]
    local temp_data = {}
    local result = exports["oxmysql"]:executeSync("SELECT * FROM characters WHERE owner = @owner AND Deleted = @deleted", {['@owner'] = steam, ['@deleted'] = 0})
        for k, v in pairs(result) do
            local cid = v.id
            exports.oxmysql:execute("SELECT cc.*, cf.*, ct.* FROM character_face cf LEFT JOIN character_current cc on cc.cid = cf.cid LEFT JOIN character_tattoos ct on ct.cid = cf.cid WHERE cf.cid = @cid", {['cid'] = cid}, function(charResult)
                if charResult then
                    for k, charData in pairs(charResult) do
                        temp_data[cid] = {
                            id = cid,
                            slotpos = 0,
                            result = result,
                            model = charData.model,
                            drawables = decode(charData.drawables),
                            props = decode(charData.props),
                            drawtextures = decode(charData.drawtextures),
                            proptextures = decode(charData.proptextures),
                            hairColor = decode(charData.hairColor),
                            headBlend = decode(charData.headBlend),
                            headOverlay = decode(charData.headOverlay),
                            headStructure = decode(charData.headStructure),
                            tattoos = decode(charData.tattoos),
                        }
                        end
                    end
                end)
            end
        Wait(400)
    return temp_data
end)

RegisterNetEvent('erp_charmenu:server:PlayCharacter', function(citizenid)
    local src = source
    local cData = {}
    cData.citizenid = citizenid
    local result = exports["oxmysql"]:executeSync("SELECT * FROM characters WHERE id = @id", {['@id'] = citizenid})
    TriggerClientEvent('erp_spawn:runSpawn:cl', src)
end)

RegisterNetEvent('erp_charmenu:server:DeleteCharacter', function(citizenid)
    local src = source
    local steam = GetPlayerIdentifiers(src)[1]
    local result = exports["oxmysql"]:executeSync("SELECT * FROM characters WHERE id = @id", {['@id'] = citizenid})
    exports.oxmysql:execute("UPDATE characters SET Deleted = :Deleted WHERE id = @id",{Deleted = 1, id = tonumber(citizenid)})
    Wait(500)
    TriggerClientEvent('erp_charmenu:client:OpenCharmenu', src)
end)

RegisterServerEvent('erp_charmenu:getCid', function(firstname, lastname)
    local src = source
    local steam = GetPlayerIdentifiers(src)[1]
    local denceResult = exports["oxmysql"]:executeSync("SELECT * FROM characters WHERE owner = @owner AND first_name = @first_name AND last_name = @last_name", {['@owner'] = steam, ['first_name'] = firstname, ['last_name'] = lastname})
	local characterId = denceResult[1].id

    TriggerClientEvent('erp_charmenu:sendCid', src, characterId)
end)

RPC.register('erp_charmenu:createCharacter', function(source, data)
    local Identifiers = GetPlayerIdentifiers(source)
    local Data = MySQL.query.await('SELECT * FROM characters WHERE first_name = @FirstName AND last_name = @LastName AND deleted = @Deleted', {
        ['@FirstName'] = data.firstname,
        ['@LastName'] = data.lastname,
        ['@Deleted'] = 0
    })

    if Data[1] then return end

    MySQL.query.await('INSERT INTO characters (owner, first_name, last_name, dob, gender, phone_number, new) VALUES (@Owner, @FirstName, @LastName, @DOB, @Gender, @PhoneNumber, @New)', {
        ['@Owner'] = Identifiers[1],
        ['@FirstName'] = data.firstname,
        ['@LastName'] = data.lastname,
        ['@DOB'] = "07-04-1994",
        ['@Gender'] = "Male",
        ['@PhoneNumber'] = 123123,
        ['@New'] = 1,
    })
end)