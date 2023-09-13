local tempHouses = {}

RegisterNetEvent('erp_spawn:client:OpenSpawnMenu')
AddEventHandler('erp_spawn:client:OpenSpawnMenu', function(data)
    MainFunctions.SpawnTable = Config.Spawns
    if data.new == 1 then
		DoScreenFadeOut(1)
		TriggerServerEvent('erp_appearence:newPlayer')
		return
    -- elseif data.jail > 0 then
	-- 	TriggerEvent('erp_spawn:jailPerson')
    --     DestroyAllCams(true)
    --     RenderScriptCams(false, true, 1, true, true)
    --     SetNuiFocus(false,false)
	-- 	FreezeEntityPosition(PlayerPedId(), false)
	-- 	return
	end
    
    tempHouses = data.houses

    for k, v in pairs(data.houses) do
        local houseTable = exports["erp_housing"]:retriveHousingTable()
        for e, d in pairs(houseTable) do 
            if e == v.house_id then
                local spawnInfoHouses = { 
                    coords = d.pos, 
                    header = e,
                    label = d.street
                }

                table.insert(MainFunctions.SpawnTable, spawnInfoHouses)
            end
        end
    end

    for k, v in pairs(data.keys) do
        local houseTable = exports["erp_housing"]:retriveHousingTable()
        for e, d in pairs(houseTable) do 
            if e == v.house_id then
                local spawnInfoKeys = { 
                    coords = d.pos, 
                    header = e,
                    label = d.street
                }

                table.insert(MainFunctions.SpawnTable, spawnInfoKeys)
            end
        end
    end

    -- local BUSINESS_DATA = RPC.execute('erp_spawn:getBusinesses')
	-- Citizen.Wait(1000)

	-- for k, v in ipairs(BUSINESS_DATA) do
	-- 	local success, businessSpawn = RPC.execute("GetBusinessSpawnByCode", v.BUSINESS_ID)

	-- 	if businessSpawn ~= nil then
	-- 		local spawnInfo = { 
	-- 			["coords"] = vector4(businessSpawn.coords.x, businessSpawn.coords.y, businessSpawn.coords.z, 0.0), 
	-- 			['label'] = "Business " .. v.BUSINESS       
	-- 		}
    --         table.insert(SpawnTable, spawnInfo)
	-- 	end
	-- end

    SendNUIMessage({
        action = 'OpenSpawnMenu',
        toggle = true,
        Spawns = MainFunctions.SpawnTable,
    })

    SetNuiFocus(true, true)
end)

RegisterNetEvent('erp_spawnselect:SetEverything')
AddEventHandler('erp_spawnselect:SetEverything', function()
	-- FreezeEntityPosition(PlayerPedId(), false)
	-- TriggerEvent('erp_base:PolyZoneUpdate')
	-- TriggerEvent("erp_housing:loadHousingClient")
	-- RPC.execute('erp_housing:fetchPropertyGarages')
    -- spawnedThread()
    TriggerServerEvent('raid_clothes:get_character_current')
end)


RegisterNUICallback('SpawnLocation', function(data, cb)
    if MainFunctions.SpawnTable[data.SpawnIndex].label == "Alta St Apartments" then 
        TriggerEvent('erp_apartments:enterApartment', 'Spawn')
        DestroyAllCams(true)
        RenderScriptCams(false, true, 1, true, true)
        SetNuiFocus(false,false)
        Citizen.Wait(1000)
        TriggerServerEvent('erp_appearence:getCharacterFaceForClient', source, exports['isPed']:isPed('cid'))
        TriggerServerEvent('erp_appearence:getCharacterClothes', source, exports['isPed']:isPed('cid'))
        TriggerServerEvent('erp_appearence:getCharacterTattoos', source, exports['isPed']:isPed('cid'))
        TriggerEvent('erp_spawnselect:SetEverything')
        SetEntityVisible(PlayerPedId(), true)
        SetPedCanRagdoll(PlayerPedId(), true)
        FreezeEntityPosition(GetPlayerPed(-1), false)
    end

    for k, v in pairs(tempHouses) do
        if MainFunctions.SpawnTable[data.SpawnIndex].header == v.house_id then 
            local houseTable = exports["erp_housing"]:retriveHousingTable()
            for e,d in pairs(houseTable) do 
                if e == v.house_id then
                    DoCamera(d.pos.x,d.pos.y,d.pos.z)
                    DoScreenFadeOut(2)

                    SetEntityCoords(PlayerPedId(), d.pos.x,d.pos.y,d.pos.z)
                    SetEntityHeading(PlayerPedId(),d.pos.w)
                    Wait(200)

                    DoScreenFadeIn(2500)
                    TriggerEvent("housing:playerSpawned", d.street)
                    DestroyAllCams(true)
                    RenderScriptCams(false, true, 1, true, true)
                    SetNuiFocus(false,false)
                    Citizen.Wait(1000)
                    TriggerServerEvent('erp_appearence:getCharacterFaceForClient', source, exports['isPed']:isPed('cid'))
                    TriggerServerEvent('erp_appearence:getCharacterClothes', source, exports['isPed']:isPed('cid'))
                    TriggerServerEvent('erp_appearence:getCharacterTattoos', source, exports['isPed']:isPed('cid'))
                    TriggerEvent('erp_spawnselect:SetEverything')

                    SetEntityVisible(PlayerPedId(), true)
                    SetPedCanRagdoll(PlayerPedId(), true)
                    FreezeEntityPosition(GetPlayerPed(-1), false)
                end
            end
        end
    end

    if data.SpawnIndex and not data.SubSpawnIndex then
        local coords = MainFunctions.SpawnTable[data.SpawnIndex].coords
        MainFunctions.DoCamera(coords.x, coords.y, coords.z)
    else
        local coords = MainFunctions.SpawnTable[data.SpawnIndex].hasSubSpawn[data.SubSpawnIndex].coords
        MainFunctions.DoCamera(coords.x, coords.y, coords.z)
    end
    cb('ok')
end)

-- RegisterNUICallback('SpawnLastLocation', function(data, cb)
--     local coords = vector3(x5, y5, z5)
--     MainFunctions.DoCamera(coords.x, coords.y, coords.z)
--     cb('ok')
-- end)

exports('SpawnLocation', function(x, y, z)
    MainFunctions.DoCamera(x, y , z)
end)

exports('RunSpawn', function()
    RPC.execute('erp_spawn:runSpawn', exports['isPed']:isPed('cid'))
end)