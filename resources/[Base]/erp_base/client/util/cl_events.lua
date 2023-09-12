Ethereal.Events = Ethereal.Events or {}
Ethereal.Events.Total = 1
Ethereal.Events.Active = {}

function Ethereal.Events.Trigger(event, args, callback)
    local id = event .. ':' .. Ethereal.Events.Total
    if not Ethereal.Events.Active[id] then
        Ethereal.Events.Active[id] = callback
        TriggerServerEvent("fxevents:listenEvent", id, event, args)
    end

    Ethereal.Events.Total = Ethereal.Events.Total + 1
end

RegisterNetEvent("fxevents:listenEvent")
AddEventHandler("fxevents:listenEvent", function(id, data)   
    if Ethereal.Events.Active[id] then
        Ethereal.Events.Active[id](data)
        Ethereal.Events.Active[id] = nil
    end
end)