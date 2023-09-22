local isRadioOpen = false

RegisterNetEvent('ChannelSet')
AddEventHandler('ChannelSet', function(chan)
    exports["rlrp-ui"]:sendAppEvent("radio", { value = chan })
end)

RegisterNetEvent('radioGui')
AddEventHandler('radioGui', function()
    local currentJob = exports["isPed"]:isPed("myjob")

    if exports["isPed"]:isPed("incall") then
    TriggerEvent("DoShortHudText","You can not do that while in a call!",2)
        return
    end

    if not hasRadio() then
        TriggerEvent("DoShortHudText","You need a radio.",2)
        toggleRadioAnimation(false)
        return
    end

    if not isRadioOpen then
        exports["rlrp-ui"]:openApplication("radio", {
            emergency = (currentJob == "police" or currentJob == "ems" or currentJob == "doc")
        })
        local _, isAnimalModel = pcall(function () return exports["rlrp-misc-code"]:isAnimalModel(GetEntityModel(PlayerPedId())) end)
        if not isAnimalModel then toggleRadioAnimation(true) end
    else
        exports["rlrp-ui"]:closeApplication("radio")
        closeEvent()
    end

    isRadioOpen = not isRadioOpen
end)

RegisterUICallback('rlrp-ui:radioVolumeUp', function(data, cb)
    exports["rlrp-voice"]:IncreaseRadioVolume()
    cb({ data = {}, meta = { ok = true, message = '' } })
end)

RegisterUICallback('rlrp-ui:radioVolumeDown', function(data, cb)
    exports["rlrp-voice"]:DecreaseRadioVolume()
    cb({ data = {}, meta = { ok = true, message = '' } })
end)

RegisterUICallback('rlrp-ui:toggleRadioOn', function(data, cb)
    exports["rlrp-voice"]:SetRadioPowerState(true)
    cb({ data = {}, meta = { ok = true, message = '' } })
end)

RegisterUICallback('rlrp-ui:toggleRadioOff', function(data, cb)
    exports["rlrp-voice"]:SetRadioPowerState(false)
    cb({ data = {}, meta = { ok = true, message = '' } })
end)

RegisterUICallback('rlrp-ui:setRadioChannel', function(data, cb)
    local success = handleConnectionEvent(data.channel)
    cb({ data = success, meta = { ok = true, message = '' } })
end)

AddEventHandler('rlrp-radio:setChannel', function(params)
    handleConnectionEvent(params[1])
    exports["rlrp-ui"]:sendAppEvent("radio", { value = params[1] })
end)

AddEventHandler('rlrp-radio:updateRadioState', function (frequency, powered)
    exports["rlrp-ui"]:sendAppEvent("radio", { value = frequency, state = powered })
end)

AddEventHandler("rlrp-ui:application-closed", function (name, data)
    if name ~= "radio" then return end
    isRadioOpen = false
    closeEvent()
end)

RegisterNetEvent('rlrp-inventory:itemCheck')
AddEventHandler('rlrp-inventory:itemCheck', function (item, state, quantity)
    if item ~= "civradio" and item ~= "radio" then return end
    if state or quantity > 0 then return end
    exports["rlrp-voice"]:SetRadioPowerState(false)
    exports["rlrp-ui"]:sendAppEvent("radio", { value = 0, state = false })
    TriggerEvent("DoLongHudText", "You have been disconnected from the radio.")
end)