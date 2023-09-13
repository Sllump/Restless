MainFunctions = {
    SpawnTable = {},
    SpawnCamera = nil,

    DoCamera = function(x,y,z)
        SetNuiFocus(false, false)
        Wait(2000)
        SetEntityCoords(PlayerPedId(), x, y, z)
        Wait(500)
        SetEntityVisible(PlayerPedId(), true)
        Wait(500)
        if(not DoesCamExist(MainFunctions.SpawnCamera)) then
            MainFunctions.SpawnCamera = CreateCam('DEFAULT_SCRIPTED_CAMERA', true)
        end
        i = 3200
        SetFocusArea(x, y, z, 0.0, 0.0, 0.0)
        SetCamActive(MainFunctions.SpawnCamera,  true)
        RenderScriptCams(true,  false,  0,  true,  true)
        TriggerEvent('DoScreenFadeIn')
        camAngle = -90.0
        while i > 1 do
            factor = i / 50
            if i < 1 then i = 1 end
            i = i - factor
            SetCamCoord(MainFunctions.SpawnCamera, x,y,z+i)
            if i < 1200 then
                DoScreenFadeIn(600)
            end
            if i < 90.0 then
                camAngle = i - i - i
            end
            SetCamRot(MainFunctions.SpawnCamera, camAngle, 0.0, 0.0)
            Wait(2/i)
        end
        SetNuiFocus(false,false)
        FreezeEntityPosition(PlayerPedId(), false)
        RenderScriptCams(false, true, 500, true, true)
        SetCamActive(MainFunctions.SpawnCamera, false)
        DestroyCam(MainFunctions.SpawnCamera, true)
        MainFunctions.SpawnCamera = nil
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
}