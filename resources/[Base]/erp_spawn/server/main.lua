RPC.register("erp_spawn:runSpawn", function(source, CID)
    local src = source
    
    local CHAR_DATA = MySQL.query.await("SELECT * FROM characters WHERE id = @Cid", {
        ['@Cid'] = CID
    })

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