RegisterServerEvent("erp_spawn:runSpawn", function(CID)
    local src = source
    
    local CHAR_DATA = MySQL.query.await("SELECT * FROM characters WHERE id = ?", {CID})
    local spawnData = {
        ["overwrites"] = "new",
        ["hospital"] = {
            ["illness"] = "none",
            ["level"] = 0,
            ["time"] = 0,
        },

        ["houses"] = {},
        ["keys"] = {},
        ['new'] = CHAR_DATA[1].isNew,
        ['jail'] = CHAR_DATA[1].injail,
        ['tier'] = 1
    }
    -- spawnData["houses"] = exports["erp_housing"]:getCurrentOwned(CID)
    -- spawnData["keys"] = exports["erp_housing"]:currentKeys(CID)
    spawnData["houses"] = {}
    spawnData["keys"] = {}
    TriggerEvent('player:checklastpos', src, CID)
    TriggerClientEvent("erp_spawn:client:OpenSpawnMenu", src, spawnData)
end)


RPC.register('erp_spawn:getBusinesses', function(source)
    local src = source
    local user = exports['erp_base']:GetModule('GetPlayer')(src)
    local BUSINESS_TABLE = MySQL.query.await('SELECT * FROM employment_data')
    local EMPLOYMENT_DATA = {}

    for k, v in ipairs(BUSINESS_TABLE) do
        local EMPLOYEES = json.decode(v.employees)

        for x, y in ipairs(EMPLOYEES) do
            if tonumber(y.cid) == tonumber(user['PlayerData']['id']) then
                table.insert(EMPLOYMENT_DATA, {
                    ['BUSINESS'] = v.business_name,
                    ['BUSINESS_ID'] = v.business_id
                })
            end
        end
    end
    return EMPLOYMENT_DATA
end)

RegisterServerEvent('player:checklastpos', function(source, cid)
    local src = source
    exports.oxmysql:execute('SELECT x,y,z FROM characters WHERE id = ?', {cid}, function(data)
        TriggerClientEvent('player:lastpos:cl', src, data[1].x, data[1].y, data[1].z)
    end)
end)

function round(x)
    return x>=0 and math.floor(x+0.5) or math.ceil(x-0.5)
end

function SQL1(coords)
    local src = source
    local user = exports["erp_base"]:GetCID(src)
    local ro = round(coords.x)
    exports.oxmysql:execute("UPDATE characters SET x = @x WHERE id = @id", {['@id'] = user,['@x'] = ro})
end

function SQL2(coords)
    local src = source
    local user = exports["erp_base"]:GetCID(src)
    local ro = round(coords.y)
    exports.oxmysql:execute("UPDATE characters SET y = @y WHERE id = @id", {['@id'] = user,['@y'] = ro})
end

function SQL3(coords)
    local src = source
    local user = exports["erp_base"]:GetCID(src)
    local ro = round(coords.z)
    exports.oxmysql:execute("UPDATE characters SET z = @z WHERE id = @id", {['@id'] = user,['@z'] = ro})
end
    
RegisterServerEvent('erp_spawn:SaveLastPos', function(coords)
    local src = source
    local user = exports["erp_base"]:GetCID(src)
    SQL1(coords)
    SQL2(coords)
    SQL3(coords)
end)