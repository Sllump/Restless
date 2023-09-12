local cam = nil
local cam2 = nil
local PlayerCharClothing = {}
local ActiveChar = 1
local nextChar = 0
local newSpawnCam = nil
local otherCam = nil
local ChoosingClothes = false
local charactersFix = {}

local drawable_names = {"face", "masks", "hair", "torsos", "legs", "bags", "shoes", "neck", "undershirts", "vest", "decals", "jackets"}
local prop_names = {"hats", "glasses", "earrings", "mouth", "lhand", "rhand", "watches", "braclets"}
local head_overlays = {"Blemishes","FacialHair","Eyebrows","Ageing","Makeup","Blush","Complexion","SunDamage","Lipstick","MolesFreckles","ChestHair","BodyBlemishes","AddBodyBlemishes"}
local face_features = {"Nose_Width","Nose_Peak_Hight","Nose_Peak_Lenght","Nose_Bone_High","Nose_Peak_Lowering","Nose_Bone_Twist","EyeBrown_High","EyeBrown_Forward","Cheeks_Bone_High","Cheeks_Bone_Width","Cheeks_Width","Eyes_Openning","Lips_Thickness","Jaw_Bone_Width","Jaw_Bone_Back_Lenght","Chimp_Bone_Lowering","Chimp_Bone_Lenght","Chimp_Bone_Width","Chimp_Hole","Neck_Thikness"}
tatCategory = nil
tattooHashList = nil

function LoadPed(ped, data, model)
    SetClothing(ped, data.drawables, data.props, data.drawtextures, data.proptextures)
    Citizen.Wait(500)
    if (model == `mp_f_freemode_01` or model == `mp_m_freemode_01`) then
        SetPedHeadBlend(ped, data.headBlend)
        SetHeadStructure(ped, data.headStructure)
        SetHeadOverlayData(ped, data.headOverlay)
        SetPedHairColor(ped, tonumber(data.hairColor[1]), tonumber(data.hairColor[2]))
    end
    return
end

function SetClothing(ped, drawables, props, drawTextures, propTextures)
    for i = 1, #drawable_names do
        if drawables[0] == nil then
            if drawable_names[i] == "undershirts" and drawables[tostring(i-1)][2] == -1 then
                SetPedComponentVariation(ped, i-1, 15, 0, 2)
            else
                SetPedComponentVariation(ped, i-1, drawables[tostring(i-1)][2], drawTextures[i][2], 2)
            end
        else
            if drawable_names[i] == "undershirts" and drawables[i-1][2] == -1 then
                SetPedComponentVariation(ped, i-1, 15, 0, 2)
            else
                SetPedComponentVariation(ped, i-1, drawables[i-1][2], drawTextures[i][2], 2)
            end
        end
    end

    for i = 1, #prop_names do
        local propZ = (drawables[0] == nil and props[tostring(i-1)][2] or props[i-1][2])
        ClearPedProp(ped, i-1)
        SetPedPropIndex(
            ped,
            i-1,
            propZ,
            propTextures[i][2], true)
    end
end


function SetPedHeadBlend(ped,data)
    SetPedHeadBlendData(ped,
        tonumber(data['shapeFirst']),
        tonumber(data['shapeSecond']),
        tonumber(data['shapeThird']),
        tonumber(data['skinFirst']),
        tonumber(data['skinSecond']),
        tonumber(data['skinThird']),
        tonumber(data['shapeMix']),
        tonumber(data['skinMix']),
        tonumber(data['thirdMix']),
        false)
end

function SetHeadStructure(ped,data)
    for i = 1, #face_features do
        SetPedFaceFeature(ped, i-1, data[i])
    end
end

function SetHeadOverlayData(ped,data)
    if json.encode(data) ~= "[]" then
        for i = 1, #head_overlays do
            SetPedHeadOverlay(ped,  i-1, tonumber(data[i].overlayValue),  tonumber(data[i].overlayOpacity))
            -- SetPedHeadOverlayColor(ped, i-1, data[i].colourType, data[i].firstColour, data[i].secondColour)
        end

        SetPedHeadOverlayColor(ped, 0, 0, tonumber(data[1].firstColour), tonumber(data[1].secondColour))
        SetPedHeadOverlayColor(ped, 1, 1, tonumber(data[2].firstColour), tonumber(data[2].secondColour))
        SetPedHeadOverlayColor(ped, 2, 1, tonumber(data[3].firstColour), tonumber(data[3].secondColour))
        SetPedHeadOverlayColor(ped, 3, 0, tonumber(data[4].firstColour), tonumber(data[4].secondColour))
        SetPedHeadOverlayColor(ped, 4, 2, tonumber(data[5].firstColour), tonumber(data[5].secondColour))
        SetPedHeadOverlayColor(ped, 5, 2, tonumber(data[6].firstColour), tonumber(data[6].secondColour))
        SetPedHeadOverlayColor(ped, 6, 0, tonumber(data[7].firstColour), tonumber(data[7].secondColour))
        SetPedHeadOverlayColor(ped, 7, 0, tonumber(data[8].firstColour), tonumber(data[8].secondColour))
        SetPedHeadOverlayColor(ped, 8, 2, tonumber(data[9].firstColour), tonumber(data[9].secondColour))
        SetPedHeadOverlayColor(ped, 9, 0, tonumber(data[10].firstColour), tonumber(data[10].secondColour))
        SetPedHeadOverlayColor(ped, 10, 1, tonumber(data[11].firstColour), tonumber(data[11].secondColour))
        SetPedHeadOverlayColor(ped, 11, 0, tonumber(data[12].firstColour), tonumber(data[12].secondColour))
    end
end

function SetSkin(model, setDefault)
    SetEntityInvincible(PlayerPedId(),true)
    if IsModelInCdimage(model) and IsModelValid(model) then
        RequestModel(model)
        while (not HasModelLoaded(model)) do
            Citizen.Wait(0)
        end

        SetPlayerModel(PlayerId(), model)
        SetModelAsNoLongerNeeded(model)
        player = GetPlayerPed(-1)
        FreezePedCameraRotation(player, true)
        
        if (model ~= `mp_f_freemode_01` and model ~= `mp_m_freemode_01`) then
            SetPedRandomComponentVariation(GetPlayerPed(-1), true)
        else
            SetPedHeadBlendData(player, 0, 0, 0, 15, 0, 0, 0, 1.0, 0, false)
            SetPedComponentVariation(player, 11, 0, 11, 0)
            SetPedComponentVariation(player, 8, 0, 1, 0)
            SetPedComponentVariation(player, 6, 1, 2, 0)
            SetPedHeadOverlayColor(player, 1, 1, 0, 0)
            SetPedHeadOverlayColor(player, 2, 1, 0, 0)
            SetPedHeadOverlayColor(player, 4, 2, 0, 0)
            SetPedHeadOverlayColor(player, 5, 2, 0, 0)
            SetPedHeadOverlayColor(player, 8, 2, 0, 0)
            SetPedHeadOverlayColor(player, 10, 1, 0, 0)
            SetPedHeadOverlay(player, 1, 0, 0.0)
            SetPedHairColor(player, 1, 1)
        end
        
    end
    SetEntityInvincible(PlayerPedId(),false)
end

function FindNextAvailableSlot()
    local nextSlot = 1
    

    local sortedCharacters = {}
    for _, data in pairs(charactersFix) do
        table.insert(sortedCharacters, data)
    end
    table.sort(sortedCharacters, function(a, b) return a.id < b.id end)
    

    for _, data in ipairs(sortedCharacters) do
        data.slotpos = nextSlot
        nextSlot = nextSlot + 1
    end
end

function GetSlot(id)
    local slot = 0
    for k,v in pairs(charactersFix) do
        if tonumber(v.id) == id then 
            slot = v.slotpos
        end
    end
    return slot 
end

local function CreateCharacters(bool, characters)
    if bool then
        local executionCount = 0 -- Counter to track the number of executions

        for k, v in pairs(characters) do
            charactersFix = v.result
            FindNextAvailableSlot()

            while not HasAnimDictLoaded(Config.SitAnim.dict) do
                RequestAnimDict(Config.SitAnim.dict)
                Wait(10)
            end

            RequestModel(tonumber(v.model))
            while not HasModelLoaded(tonumber(v.model)) do
                Wait(0)
            end
            local Ped = CreatePed(2, tonumber(v.model), Config.PedChairCoords[GetSlot(v.id)].z, Config.PedChairCoords[GetSlot(v.id)].w, false, false)
            FreezeEntityPosition(Ped, true)
            SetModelAsNoLongerNeeded(tonumber(v.model))
            TaskPlayAnimAdvanced(Ped, Config.SitAnim.dict, Config.SitAnim.anim, Config.PedChairCoords[GetSlot(v.id)].x, Config.PedChairCoords[GetSlot(v.id)].y, Config.PedChairCoords[GetSlot(v.id)].z, 0.0, 0.0,Config.PedChairCoords[GetSlot(v.id)].w, 3.0, 3.0, -1, 7, 2.0, 1, 1)
            LoadPed(Ped, characters[v.id], tonumber(v.model))
            PlayerCharClothing[#PlayerCharClothing + 1] = Ped
        end
    else
        for k, v in pairs(PlayerCharClothing) do
            DeletePed(v)
        end
        PlayerCharClothing = {}
    end
end


local function CharMenuCams(new, old)
    if new then
        cam = CreateCamWithParams("DEFAULT_SCRIPTED_CAMERA", Config.Camera.x, Config.Camera.y, Config.Camera.z, 0.0 ,0.0, Config.Camera.w, 60.00, false, 0)
        SetCamActive(cam, true)
        RenderScriptCams(true, false, 1, true, true)
    elseif old then
        if tonumber(ActiveChar) < tonumber(nextChar) then
            local newCamCoords = GetCamCoord(cam)
            cam2 = CreateCamWithParams("DEFAULT_SCRIPTED_CAMERA", Config.PedCamCoords[nextChar].x, Config.PedCamCoords[nextChar].y, Config.PedCamCoords[nextChar].z, 0.0 ,0.0, Config.PedCamCoords[nextChar].w, 60.00, false, 0)
            SetCamActiveWithInterp(cam2, cam, 1000, false, true)
            Wait(1000)
            cam = cam2
            ActiveChar = nextChar
            nextChar = nil
        elseif tonumber(ActiveChar) > tonumber(nextChar) then
            local newCamCoords = GetCamCoord(cam)
            cam2 = CreateCamWithParams("DEFAULT_SCRIPTED_CAMERA", Config.PedCamCoords[nextChar].x, Config.PedCamCoords[nextChar].y, Config.PedCamCoords[nextChar].z, 0.0 ,0.0, Config.PedCamCoords[nextChar].w, 60.00, false, 0)
            SetCamActiveWithInterp(cam2, cam, 1000, false, true)
            Wait(1000)
            cam = cam2
            ActiveChar = nextChar
            nextChar = nil
        end
    elseif not new then
        SetCamActive(cam)
        DestroyCam(cam)
        SetCamActive(cam2)
        DestroyCam(cam2)
    end
end

local function OpenCharacterMenu(bool)
    if bool then
        local TVHash = GetHashKey('prop_tv_flat_01_screen')
        RequestModel(TVHash)
        while not HasModelLoaded(TVHash) do
            Wait(1)
        end
        local Object = CreateObject(TVHash, Config.TVCoords, false, false, false)
        SetEntityHeading(Object, 146.88)
        FreezeEntityPosition(Object, true)
        SetModelAsNoLongerNeeded(TVHash)
        FreezeEntityPosition(PlayerPedId(), true)
        SetEntityCoords(PlayerPedId(), Config.PedHiddenCoords.x, Config.PedHiddenCoords.y, Config.PedHiddenCoords.z, false, false, false, false)
    end
    local clothes = RPC.execute('erp_charmenu:server:GetPlayerClothing')
    CreateCharacters(bool, clothes)
    CharMenuCams(bool)
    SetNuiFocus(bool, bool)
    local characters = RPC.execute('erp_charmenu:server:GetUserCharacters')
    TriggerServerEvent('erp_charmenu:setRoutingBucket', true)
    DoScreenFadeIn(1)
    SendNUIMessage({
        action = 'OpenCharMenu',
        characters = charactersFix,
        toggle = bool,
    })
end

local function DestroyAll()
    OpenCharacterMenu(false)
    CharMenuCams(false, false)
    CreateCharacters(false, false)
    ActiveChar = 1
    nextChar = 0
    cam = nil
    cam2 = nil
end

RegisterNUICallback('ChangeCam', function(data, cb)
    nextChar = tonumber(data.char)
    CharMenuCams(false, true)
end)

RegisterNUICallback('PlayCharacter', function(data, cb)
    otherCam = nil
    newCamSpawn = nil
    newCamSpawn = CreateCamWithParams("DEFAULT_SCRIPTED_CAMERA", Config.MapCamCoords[1].x, Config.MapCamCoords[1].y, Config.MapCamCoords[1].z, 0.0 ,0.0, Config.MapCamCoords[1].w, 40.00, false, 0)
    SetCamActiveWithInterp(newCamSpawn, cam, 1000, false, true)
    otherCam = newCamSpawn
    Wait(1000)
    newCamSpawn = CreateCamWithParams("DEFAULT_SCRIPTED_CAMERA", Config.MapCamCoords[2].x, Config.MapCamCoords[2].y, Config.MapCamCoords[2].z, 0.0 ,0.0, Config.MapCamCoords[2].w, 40.00, false, 0)
    SetCamActiveWithInterp(newCamSpawn, otherCam, 1000, false, true)
    Events = exports['erp_base']:GetModule('Events')
    Events.Trigger("erp_base:selectCharacter", data.citizenid, function(returnData)
        if not returnData then
            TriggerEvent('erp_ui:sentNotification', 'error', 'There was a problem logging in as that character, if the problem persists, contact an administrator <br/> Cid: ' .. tostring(data.citizenid), 5000)
            return 
        end
        TriggerServerEvent('erp_base:currentpasses')
        TriggerEvent('erp_charmenu:SpawnPlayer')
        TriggerServerEvent('erp_charmenu:setRoutingBucket', false)
        TriggerServerEvent('erp_charmenu:server:PlayCharacter', data.citizenid)
        ExecuteCommand('hotreload')
        Wait(100)
        SetNuiFocus(false, false)
        SetCamActive(otherCam)
        DestroyCam(otherCam)
        otherCam = nil
    end)
end)

RegisterNUICallback('CreateCharacter', function(data, cb)
    TriggerEvent('erp_charmenu:playCharacter2', data)
    TriggerServerEvent('erp_charmenu:server:CreateCharacter', data)
    DestroyAllCams(true)
    RenderScriptCams(false, true, 1, true, true)
    TriggerEvent('erp_charmenu:playCharacter', data.firstname, data.lastname)
    Citizen.Wait(2000)
    TriggerServerEvent('erp_appearence:newPlayer', data.firstname, data.lastname) 
    cb("ok")
end)

local myCid = 0

RegisterNetEvent('erp_charmenu:sendCid', function(cid)
    myCid = cid 
end)

RegisterNetEvent('erp_charmenu:playCharacter', function(firstname, lastname)
    Citizen.Wait(500)
    TriggerServerEvent('erp_charmenu:getCid', firstname, lastname)
    Citizen.Wait(500)
    Events = exports['erp_base']:GetModule('Events')
        Events.Trigger("erp_base:selectCharacter", myCid, function(returnData)
    end)
end)

RegisterNetEvent('erp_charmenu:playCharacter2', function(data5)
    Events = exports['erp_base']:GetModule('Events')
        Events.Trigger("erp_base:createCharacter", data5, function(returnData)
    end)
end)

RegisterNUICallback('EndWait', function(data, cb)
    TriggerEvent('DoScreenFadeIn')
end)

RegisterNUICallback('DeleteCharacter', function(data, cb)
    DestroyAll()
    TriggerEvent('DoScreenFadeOut')
    DestroyAllCams(true)
    RenderScriptCams(false, true, 1, true, true)
    TriggerServerEvent('erp_charmenu:server:DeleteCharacter', data.citizenid)
end)

RegisterNetEvent('erp_charmenu:client:CharMenuCams', function()
    DestroyAll()
end)

RegisterNetEvent('erp_charmenu:client:OpenCharmenu', function()
    OpenCharacterMenu(true)
end)

RegisterNetEvent('erp_charmenu:server:CloseNUI', function()
    CreateCharacters(false, false)
    SetNuiFocus(false, false)
    DestroyAll()
    --exports['erp_spawn']:SpawnLocation(Config.ApartCoords.x, Config.ApartCoords.y, Config.ApartCoords.z)
end)

RegisterCommand('OpenCharMenu', function(source, args)
    OpenCharacterMenu(true)
end)

gameplayFunction = false

AddEventHandler("erp_charmenu:runGameplay", function()
    if gameplayFunction then return end
    Citizen.CreateThread(function()
        for i = 1, 15 do
            EnableDispatchService(i, false)
        end

        -- enable pvp
        for i = 0, 255 do
            if NetworkIsPlayerConnected(i) then
                if NetworkIsPlayerConnected(i) and GetPlayerPed(i) ~= nil then
                    SetCanAttackFriendly(GetPlayerPed(i), true, true)
                end
            end
        end

        SetMaxWantedLevel(0)

        NetworkSetFriendlyFireOption(true)

        -- Disable vehicle rewards
        DisablePlayerVehicleRewards(PlayerId())
    end)

    Citizen.CreateThread(function()
        while true do
            Citizen.Wait(1000)
            local pos = GetEntityCoords(PlayerPedId(), false)
            local dist = GetDistanceBetweenCoords(GetEntityCoords(PlayerPedId()), 2729.47, 1514.56, 23.79,false)
            if dist > 150.0 then
                ClearAreaOfCops(pos, 400.0)
            else
                Wait(5000)
            end
        end
    end)
end)
Citizen.CreateThread(function()
    ShutdownLoadingScreen();
    ShutdownLoadingScreenNui();
end)