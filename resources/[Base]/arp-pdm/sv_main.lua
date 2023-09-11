local carTable = {
	[1] = { ["model"] = "gauntlet", ["baseprice"] = 100000, ["commission"] = 15 }, 
	[2] = { ["model"] = "gauntlet", ["baseprice"] = 100000, ["commission"] = 15 },
	[3] = { ["model"] = "gauntlet", ["baseprice"] = 100000, ["commission"] = 15 },
	[4] = { ["model"] = "gauntlet", ["baseprice"] = 100000, ["commission"] = 15 },
	[5] = { ["model"] = "gauntlet", ["baseprice"] = 100000, ["commission"] = 15 },
}

-- Update car table to server
RegisterServerEvent('arp-pdm:CarTablePDM')
AddEventHandler('arp-pdm:CarTablePDM', function(table)
    if table ~= nil then
        carTable = table
        TriggerClientEvent('arp-pdm:ReturnPDMTTable', -1, carTable)
        for i=1, #carTable do
            exports.oxmysql:execute("UPDATE vehicle_display SET model=@model, name=@name, commission=@commission, baseprice=@baseprice WHERE id=@id", {
                ['@id'] = i,
                ['@model'] = table[i]["model"],
                ['@name'] = table[i]["name"],
                ['@commission'] = table[i]["commission"],
                ['@baseprice'] = table[i]["baseprice"]
            })
        end
    end
end)

-- Enables finance for 60 seconds
RegisterServerEvent('arp-pdm:FinaceEnabledSV')
AddEventHandler('arp-pdm:FinaceEnabledSV', function(plate)
    if plate ~= nil then
        TriggerClientEvent('arp-pdm:FinaceEnabledCL', -1, plate)
    end
end)

RegisterServerEvent('arp-pdm:BuyEnabledSV')
AddEventHandler('arp-pdm:BuyEnabledSV', function(plate)
    if plate ~= nil then
        TriggerClientEvent('arp-pdm:BuyEnabledCL', -1, plate)
    end
end)

-- return table
-- TODO (return db table)
RegisterServerEvent('arp-pdm:RequestPDMTTable')
AddEventHandler('arp-pdm:RequestPDMTTable', function()
    local user = source
    exports.oxmysql:execute("SELECT * FROM vehicle_display", {}, function(display)
        for k,v in pairs(display) do
            carTable[v.id] = v
            v.price = carTable[v.id].baseprice
        end
        TriggerClientEvent('arp-pdm:ReturnPDMTTable', user, carTable)
    end)
end)

-- Check if player has enough money
RegisterServerEvent('arp-pdm:ChechMoney')
AddEventHandler('arp-pdm:ChechMoney', function(name, model, price)
    local src = source
    local user = exports["arp-base"]:getModule("Player"):GetUser(src)
    local characterId = user:getCurrentCharacter().id
    local cash = user:getCash()
    --local plate = GeneratePlate()

    if tonumber(cash) >= price then
        user:removeMoney(price)
        TriggerClientEvent('FinishMoneyCheckForVehpdm', src, name, model, price)
    elseif tonumber(cash) <= price then
        TriggerClientEvent('DoLongHudText', src, "You don't have enough money!", 2)
        TriggerClientEvent('arp-pdm:FailedPurchase', src)
    end
end)

RPC.register('arp-pdm:BuyVehicle', function(pSource, pModel, pCoords)
    local src = pSource
    local user = exports["arp-base"]:getModule("Player"):GetUser(src)
    local player = user:getVar("hexid")
    local char = user:getVar("character")
    local coords = pCoords.param

    local vehicleInfo = exports["arp-vehicles"]:GenerateVehicleInfo(src, char.id, pModel.param, 'owned', 'pdm')

    if not vehicleInfo then return end

    local result = Await(SQL.execute('INSERT INTO characters_cars (cid, vin, model, state, garage, plate, name, type, degradation, metadata, damage, mods, appearance) VALUES (@cid, @vin, @model, @state, @garage, @plate, @name, @type, @degradation, @metadata, @damage, @mods, @appearance)',{
        ['@cid'] = char.id,
        ['@vin'] = vehicleInfo.vin,
        ['@model'] = pModel.param,
        ['@state'] = "out",
        ['@garage'] = vehicleInfo.garage,
        ['@plate'] = vehicleInfo.plate,
        ['@name'] = nil,
        ['@type'] = vehicleInfo.type,
        ['@degradation'] = json.encode(vehicleInfo.degradation),
        ['@metadata'] = json.encode(vehicleInfo.metadata),
        ['@damage'] = json.encode(vehicleInfo.damage),
        ['@mods'] = json.encode(vehicleInfo.mods),
        ['@appearance'] = json.encode(vehicleInfo.appearance)
    }))

    if not result then return end

    local newCoords = {coords.x, coords.y, coords.z}
    local heading = 340.06222

    local spawned = exports["arp-vehicles"]:SpawnPlayerVehicle(src, vehicleInfo.vin, newCoords, heading, false)

    if not spawned then return end

    return true
end)

-- function GeneratePlate()
--     local plate = math.random(10, 99) .. "" .. GetRandomLetter(3) .. "" .. math.random(100, 999)
--     local result = exports.oxmysql:scalarSync('SELECT license_plate FROM characters_cars WHERE license_plate = @license_plate', {['@license_plate'] = plate})
--     if result then
--         plate = tostring(GetRandomNumber(1)) .. GetRandomLetter(2) .. tostring(GetRandomNumber(3)) .. GetRandomLetter(2)
--     end
--     return plate:upper()
-- end

local NumberCharset = {}
local Charset = {}

for i = 48, 57 do table.insert(NumberCharset, string.char(i)) end
for i = 65, 90 do table.insert(Charset, string.char(i)) end
for i = 97, 122 do table.insert(Charset, string.char(i)) end

function GetRandomLetter(length)
    Citizen.Wait(1)
    math.randomseed(GetGameTimer())
    if length > 0 then
        return GetRandomLetter(length - 1) .. Charset[math.random(1, #Charset)]
    else
        return ''
    end
end