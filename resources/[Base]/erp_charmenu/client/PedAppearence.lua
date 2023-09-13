CharMenuFunctions = {
    PlayerCharClothing = {},
    Characters = {},
    Camera = nil,
    SecondCamera = nil,

    LoadPed = function(ped, data, model)
        CharMenuFunctions.SetClothing(ped, data.drawables, data.props, data.drawtextures, data.proptextures)
        Citizen.Wait(500)
    
        if (model == `mp_f_freemode_01` or model == `mp_m_freemode_01`) then
            CharMenuFunctions.SetPedHeadBlend(ped, data.headBlend)
            CharMenuFunctions.SetHeadStructure(ped, data.headStructure)
            CharMenuFunctions.SetHeadOverlayData(ped, data.headOverlay)
            SetPedHairColor(ped, tonumber(data.hairColor[1]), tonumber(data.hairColor[2]))
        end
    
        return
    end,

    SetClothing = function(ped, drawables, props, drawTextures, propTextures)
        for i = 1, #ClothingLabels.DrawableNames do
            if drawables[0] == nil then
                if ClothingLabels.DrawableNames[i] == "undershirts" and drawables[tostring(i-1)][2] == -1 then
                    SetPedComponentVariation(ped, i-1, 15, 0, 2)
                else
                    SetPedComponentVariation(ped, i-1, drawables[tostring(i-1)][2], drawTextures[i][2], 2)
                end
            else
                if ClothingLabels.DrawableNames[i] == "undershirts" and drawables[i-1][2] == -1 then
                    SetPedComponentVariation(ped, i-1, 15, 0, 2)
                else
                    SetPedComponentVariation(ped, i-1, drawables[i-1][2], drawTextures[i][2], 2)
                end
            end
        end
    
        for i = 1, #ClothingLabels.PropNames do
            local propZ = (drawables[0] == nil and props[tostring(i-1)][2] or props[i-1][2])
            ClearPedProp(ped, i-1)
            SetPedPropIndex(ped, i-1, propZ, propTextures[i][2], true)
        end
    end,

    SetPedHeadBlend = function(ped,data)
        SetPedHeadBlendData(ped, tonumber(data['shapeFirst']), tonumber(data['shapeSecond']), tonumber(data['shapeThird']),tonumber(data['skinFirst']), tonumber(data['skinSecond']), tonumber(data['skinThird']), tonumber(data['shapeMix']), tonumber(data['skinMix']), tonumber(data['thirdMix']), false)
    end,

    SetHeadStructure = function(ped,data)
        for i = 1, #ClothingLabels.FaceFeatures do
            SetPedFaceFeature(ped, i-1, data[i])
        end
    end,

    SetHeadOverlayData = function(ped,data)
        if json.encode(data) ~= "[]" then
            for i = 1, #ClothingLabels.HeadOverlays do
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
    end,

    -- SetSkin = function(model, setDefault)
    --     SetEntityInvincible(PlayerPedId(),true)
    --     if IsModelInCdimage(model) and IsModelValid(model) then
    --         RequestModel(model)
    --         while (not HasModelLoaded(model)) do
    --             Citizen.Wait(0)
    --         end
    
    --         SetPlayerModel(PlayerId(), model)
    --         SetModelAsNoLongerNeeded(model)
    --         player = GetPlayerPed(-1)
    --         FreezePedCameraRotation(player, true)
            
    --         if (model ~= `mp_f_freemode_01` and model ~= `mp_m_freemode_01`) then
    --             SetPedRandomComponentVariation(GetPlayerPed(-1), true)
    --         else
    --             SetPedHeadBlendData(player, 0, 0, 0, 15, 0, 0, 0, 1.0, 0, false)
    --             SetPedComponentVariation(player, 11, 0, 11, 0)
    --             SetPedComponentVariation(player, 8, 0, 1, 0)
    --             SetPedComponentVariation(player, 6, 1, 2, 0)
    --             SetPedHeadOverlayColor(player, 1, 1, 0, 0)
    --             SetPedHeadOverlayColor(player, 2, 1, 0, 0)
    --             SetPedHeadOverlayColor(player, 4, 2, 0, 0)
    --             SetPedHeadOverlayColor(player, 5, 2, 0, 0)
    --             SetPedHeadOverlayColor(player, 8, 2, 0, 0)
    --             SetPedHeadOverlayColor(player, 10, 1, 0, 0)
    --             SetPedHeadOverlay(player, 1, 0, 0.0)
    --             SetPedHairColor(player, 1, 1)
    --         end
            
    --     end
    --     SetEntityInvincible(PlayerPedId(),false)
    -- end,

    FindAvailableSlot = function()
        local nextSlot = 1
        
    
        local sortedCharacters = {}
        for _, data in pairs(CharMenuFunctions.Characters) do
            table.insert(sortedCharacters, data)
        end
        table.sort(sortedCharacters, function(a, b) return a.id < b.id end)
        
    
        for _, data in ipairs(sortedCharacters) do
            data.slotpos = nextSlot
            nextSlot = nextSlot + 1
        end
    end,

    GetSlot = function(id)
        local slot = 0
        for k,v in pairs(CharMenuFunctions.Characters) do
            if tonumber(v.id) == id then 
                slot = v.slotpos
            end
        end
        return slot 
    end,

    CreateCharacters = function(bool, characters)
        if bool then
            local executionCount = 0 -- Counter to track the number of executions
    
            for k, v in pairs(characters) do
                CharMenuFunctions.Characters = v.result
                CharMenuFunctions.FindAvailableSlot()
    
                while not HasAnimDictLoaded(Config.SitAnim.dict) do
                    RequestAnimDict(Config.SitAnim.dict)
                    Wait(10)
                end
    
                RequestModel(tonumber(v.model))
                while not HasModelLoaded(tonumber(v.model)) do
                    Wait(0)
                end
                local Ped = CreatePed(2, tonumber(v.model), Config.PedChairCoords[CharMenuFunctions.GetSlot(v.id)].z, Config.PedChairCoords[CharMenuFunctions.GetSlot(v.id)].w, false, false)
                FreezeEntityPosition(Ped, true)
                SetModelAsNoLongerNeeded(tonumber(v.model))
                TaskPlayAnimAdvanced(Ped, Config.SitAnim.dict, Config.SitAnim.anim, Config.PedChairCoords[CharMenuFunctions.GetSlot(v.id)].x, Config.PedChairCoords[CharMenuFunctions.GetSlot(v.id)].y, Config.PedChairCoords[CharMenuFunctions.GetSlot(v.id)].z, 0.0, 0.0,Config.PedChairCoords[CharMenuFunctions.GetSlot(v.id)].w, 3.0, 3.0, -1, 7, 2.0, 1, 1)
                CharMenuFunctions.LoadPed(Ped, characters[v.id], tonumber(v.model))
                CharMenuFunctions.PlayerCharClothing[#CharMenuFunctions.PlayerCharClothing + 1] = Ped
            end
        else
            for k, v in pairs(CharMenuFunctions.PlayerCharClothing) do
                DeletePed(v)
            end
            CharMenuFunctions.PlayerCharClothing = {}
        end
    end,

    CharMenuCams = function(new, old)
        if new then
            CharMenuFunctions.Camera = CreateCamWithParams("DEFAULT_SCRIPTED_CAMERA", Config.Camera.x, Config.Camera.y, Config.Camera.z, 0.0 ,0.0, Config.Camera.w, 60.00, false, 0)
            SetCamActive(CharMenuFunctions.Camera, true)
            RenderScriptCams(true, false, 1, true, true)
        elseif old then
            if tonumber(Main.ActiveChar) < tonumber(Main.NextChar) then
                local newCamCoords = GetCamCoord(CharMenuFunctions.Camera)
                CharMenuFunctions.SecondCamera = CreateCamWithParams("DEFAULT_SCRIPTED_CAMERA", Config.PedCamCoords[Main.NextChar].x, Config.PedCamCoords[Main.NextChar].y, Config.PedCamCoords[Main.NextChar].z, 0.0 ,0.0, Config.PedCamCoords[Main.NextChar].w, 60.00, false, 0)
                SetCamActiveWithInterp(CharMenuFunctions.SecondCamera, CharMenuFunctions.Camera, 1000, false, true)
                Wait(1000)
                CharMenuFunctions.Camera = CharMenuFunctions.SecondCamera
                Main.ActiveChar = Main.NextChar
                Main.NextChar = nil
            elseif tonumber(Main.ActiveChar) > tonumber(Main.NextChar) then
                local newCamCoords = GetCamCoord(CharMenuFunctions.Camera)
                CharMenuFunctions.SecondCamera = CreateCamWithParams("DEFAULT_SCRIPTED_CAMERA", Config.PedCamCoords[Main.NextChar].x, Config.PedCamCoords[Main.NextChar].y, Config.PedCamCoords[Main.NextChar].z, 0.0 ,0.0, Config.PedCamCoords[Main.NextChar].w, 60.00, false, 0)
                SetCamActiveWithInterp(CharMenuFunctions.SecondCamera, CharMenuFunctions.Camera, 1000, false, true)
                Wait(1000)
                CharMenuFunctions.Camera = CharMenuFunctions.SecondCamera
                Main.ActiveChar = Main.NextChar
                Main.NextChar = nil
            end
        elseif not new then
            SetCamActive(CharMenuFunctions.Camera)
            DestroyCam(CharMenuFunctions.Camera)
            SetCamActive(CharMenuFunctions.SecondCamera)
            DestroyCam(CharMenuFunctions.SecondCamera)
        end
    end,

    OpenCharacterMenu = function(bool)
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
        CharMenuFunctions.CreateCharacters(bool, clothes)
        CharMenuFunctions.CharMenuCams(bool)
        SetNuiFocus(bool, bool)
        local characters = RPC.execute('erp_charmenu:server:GetUserCharacters')
        RPC.execute('erp_charmenu:setRoutingBucket', true)
        DoScreenFadeIn(1)

        SendNUIMessage({
            action = 'OpenCharMenu',
            characters = CharMenuFunctions.Characters,
            toggle = bool,
        })
    end,

    DestroyAll = function()
        CharMenuFunctions.OpenCharacterMenu(false)
        CharMenuFunctions.CharMenuCams(false, false)
        CreateCharacters.CreateCharacters(false, false)
        Main.ActiveChar = 1
        nextChar = 0
        CharMenuFunctions.Camera = nil
        CharMenuFunctions.SecondCamera = nil
    end
}

ClothingLabels = {
    DrawableNames = {
        "face",
        "masks",
        "hair",
        "torsos",
        "legs",
        "bags",
        "shoes",
        "neck",
        "undershirts",
        "vest",
        "decals",
        "jackets"
    },

    PropNames = {
        "hats",
        "glasses",
        "earrings",
        "mouth",
        "lhand",
        "rhand",
        "watches",
        "braclets"
    },

    HeadOverlays = {
        "Blemishes",
        "FacialHair",
        "Eyebrows",
        "Ageing",
        "Makeup",
        "Blush",
        "Complexion",
        "SunDamage",
        "Lipstick",
        "MolesFreckles",
        "ChestHair",
        "BodyBlemishes",
        "AddBodyBlemishes"
    },

    FaceFeatures = {
        "Nose_Width",
        "Nose_Peak_Hight",
        "Nose_Peak_Lenght",
        "Nose_Bone_High",
        "Nose_Peak_Lowering",
        "Nose_Bone_Twist",
        "EyeBrown_High",
        "EyeBrown_Forward",
        "Cheeks_Bone_High",
        "Cheeks_Bone_Width",
        "Cheeks_Width",
        "Eyes_Openning",
        "Lips_Thickness",
        "Jaw_Bone_Width",
        "Jaw_Bone_Back_Lenght",
        "Chimp_Bone_Lowering",
        "Chimp_Bone_Lenght",
        "Chimp_Bone_Width",
        "Chimp_Hole",
        "Neck_Thikness"
    }
}