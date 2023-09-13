Main = {
    NextChar = 0,
    ActiveChar = 1,
    OtherCamera = nil,
    PlayCharacterCamera = {}
}

RegisterNUICallback('ChangeCam', function(data, cb)
    Main.NextChar = data.char
    CharMenuFunctions.CharMenuCams(false, true)
end)

RegisterNUICallback('PlayCharacter', function(data, cb)
    Main.OtherCamera = nil
    Main.PlayCharacterCamera = nil

    Main.PlayCharacterCamera = CreateCamWithParams("DEFAULT_SCRIPTED_CAMERA", Config.MapCamCoords[1].x, Config.MapCamCoords[1].y, Config.MapCamCoords[1].z, 0.0 ,0.0, Config.MapCamCoords[1].w, 40.00, false, 0)

    SetCamActiveWithInterp(Main.PlayCharacterCamera, CharMenuFunctions.Camera, 1000, false, true)

    Main.OtherCamera = Main.PlayCharacterCamera

    Wait(1000)

    Main.PlayCharacterCamera = CreateCamWithParams("DEFAULT_SCRIPTED_CAMERA", Config.MapCamCoords[2].x, Config.MapCamCoords[2].y, Config.MapCamCoords[2].z, 0.0 ,0.0, Config.MapCamCoords[2].w, 40.00, false, 0)

    SetCamActiveWithInterp(Main.PlayCharacterCamera, Main.OtherCamera, 1000, false, true)

    Events = exports['erp_base']:GetModule('Events')
    Events.Trigger("erp_base:selectCharacter", data.citizenid, function(returnData)
        if not returnData then print('[ERROR] [erp_charmenu] Could not select character...') return end
        TriggerEvent('erp_charmenu:SetEverything')

        RPC.execute('erp_charmenu:setRoutingBucket', false)

        Wait(100)

        SetNuiFocus(false, false)
        SetCamActive(Main.OtherCamera)
        DestroyCam(Main.OtherCamera)

        Main.OtherCamera = nil
    end)
end)

RegisterNUICallback('CreateCharacter', function(data, cb)
    DoScreenFadeOut(1000)

    RPC.execute('erp_charmenu:createCharacter', data)
    DestroyAllCams(true)

    RenderScriptCams(false, true, 1, true, true)
    Citizen.Wait(2000)

    CharMenuFunctions.OpenCharacterMenu(true)

    DoScreenFadeIn(1000)
    cb("ok")
end)

RegisterNUICallback('DeleteCharacter', function(data, cb)
    DoScreenFadeOut(1000)
    CharMenuFunctions.DestroyAll()

    DestroyAllCams(true)
    RenderScriptCams(false, true, 1, true, true)

    RPC.execute('erp_charmenu:server:DeleteCharacter', data.citizenid)

    Wait(5000)
    DoScreenFadeIn(1000)

    CharMenuFunctions.OpenCharacterMenu(true)
end)

AddEventHandler("erp_charmenu:SetEverything", function()
    SetEntityVisible(PlayerPedId(), true)
    SetPedCanRagdoll(PlayerPedId(), true)
end)

exports('OpenCharacterMenu', function()
    CharMenuFunctions.OpenCharacterMenu(true)
end)