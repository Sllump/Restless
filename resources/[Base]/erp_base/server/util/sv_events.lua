Ethereal.Events = Ethereal.Events or {}
Ethereal.Events.Active = {}

function Ethereal.Events.Create(event, callback)
    Ethereal.Events.Active[event] = callback
end

RegisterServerEvent("fxevents:listenEvent")
AddEventHandler("fxevents:listenEvent", function(id, event, args)    
    local src = source
    local id = id
    if Ethereal.Events.Active[event] then
        local data = Ethereal.Events.Active[event](src, args)
        TriggerClientEvent("fxevents:listenEvent", src, id, data)
    else
        print("Warning: '" .. event .. "' event doesn't exist")
    end
end)