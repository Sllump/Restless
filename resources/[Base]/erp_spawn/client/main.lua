local SpawnTable = {}
local tempHouses = {}

local x5 = 0 
local y5 = 0 
local z5 = 0

RegisterNetEvent('player:lastpos:cl', function(x2,y2,z2)
    x5 = x2
    y5 = y2
    z5 = z2
end)

RegisterNetEvent('erp_spawn:client:OpenSpawnMenu', function(data)
    SpawnTable = Config.Spawns
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

    for k,v in pairs(data.houses) do
        local houseTable = exports["erp_housing"]:retriveHousingTable()
        for e,d in pairs(houseTable) do 
            if e == v.house_id then
                local spawnInfoHouses = { 
                    ["coords"] = d.pos, 
                    ['header'] = e,
                    ['label'] = d.street
                }
                table.insert(SpawnTable, spawnInfoHouses)
            end
        end
    end

    for k,v in pairs(data.keys) do
        local houseTable = exports["erp_housing"]:retriveHousingTable()
        for e,d in pairs(houseTable) do 
            if e == v.house_id then
                local spawnInfoKeys = { 
                    ["coords"] = d.pos, 
                    ['header'] = e,
                    ['label'] = d.street
                }
                table.insert(SpawnTable, spawnInfoKeys)
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
        Spawns = SpawnTable,
    })
    SetNuiFocus(true, true)
end)

RegisterNetEvent('erp_spawn:jailPerson', function()
    print('[DEBUG] Send character into jail.')
	RPC.execute('erp_jobs:spawnSetJail')
end)

local spawncam = nil

local function DoCamera(x,y,z)
	SetNuiFocus(false, false)
    Wait(2000)
    SetEntityCoords(PlayerPedId(), x, y, z)
    Wait(500)
    SetEntityVisible(PlayerPedId(), true)
    Wait(500)
	if(not DoesCamExist(spawncam)) then
		spawncam = CreateCam('DEFAULT_SCRIPTED_CAMERA', true)
	end
	i = 3200
	SetFocusArea(x, y, z, 0.0, 0.0, 0.0)
	SetCamActive(spawncam,  true)
	RenderScriptCams(true,  false,  0,  true,  true)
	TriggerEvent('DoScreenFadeIn')
	camAngle = -90.0
	while i > 1 do
		factor = i / 50
		if i < 1 then i = 1 end
		i = i - factor
		SetCamCoord(spawncam, x,y,z+i)
		if i < 1200 then
			DoScreenFadeIn(600)
		end
		if i < 90.0 then
			camAngle = i - i - i
		end
		SetCamRot(spawncam, camAngle, 0.0, 0.0)
		Wait(2/i)
	end
    SetNuiFocus(false,false)
    FreezeEntityPosition(PlayerPedId(), false)
    RenderScriptCams(false, true, 500, true, true)
    SetCamActive(spawncam, false)
    DestroyCam(spawncam, true)
    spawncam = nil
    SetEntityVisible(PlayerPedId(), true)
    SetFocusEntity(PlayerPedId())

    TriggerServerEvent('erp_appearence:getCharacterFaceForClient', source, exports['isPed']:isPed('cid'))
	TriggerServerEvent('erp_appearence:getCharacterClothes', source, exports['isPed']:isPed('cid'))
    TriggerServerEvent('erp_appearence:getCharacterTattoos', source, exports['isPed']:isPed('cid'))
    TriggerEvent('erp_spawnselect:SetEverything')
    SetEntityVisible(PlayerPedId(), true)
    SetPedCanRagdoll(PlayerPedId(), true)
    FreezeEntityPosition(GetPlayerPed(-1), false)
end

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
    TriggerEvent('DoScreenFadeOut')

    if SpawnTable[data.SpawnIndex].label == "Alta St Apartments" then 
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

    for k,v in pairs(tempHouses) do
        if SpawnTable[data.SpawnIndex].header == v.house_id then 
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
        local coords = SpawnTable[data.SpawnIndex].coords
        DoCamera(coords.x, coords.y, coords.z)
    else
        local coords = SpawnTable[data.SpawnIndex].hasSubSpawn[data.SubSpawnIndex].coords
        DoCamera(coords.x, coords.y, coords.z)
    end
    cb('ok')
end)

RegisterNUICallback('SpawnLastLocation', function(data, cb)
    local coords = vector3(x5, y5, z5)
    DoCamera(coords.x, coords.y, coords.z)
    cb('ok')
end)

exports('SpawnLocation', function(x, y, z)
    DoCamera(x, y , z)
end)

RegisterNetEvent('erp_spawn:runSpawn:cl', function()
    TriggerServerEvent('erp_spawn:runSpawn', exports['isPed']:isPed('cid'))
end)

function saveLastPos()
    local coords = GetEntityCoords(PlayerPedId())
    TriggerServerEvent('erp_spawn:SaveLastPos', coords)
end

spawnedThread = function()
    Citizen.CreateThread(function()
        while true do 
            Citizen.Wait((60 * 1000) * 1)
            if spawned then 
                saveLastPos()
            end
        end
    end)
end