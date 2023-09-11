Void.BlipManager = Void.BlipManager or {}
Void.Blips = Void.Blips or {}

function Void.BlipManager.CreateBlip(self, id, data)
    local blip = AddBlipForCoord(data.x, data.y, data.z)

    if data.sprite then SetBlipSprite(blip, data.sprite) end
    if data.range then SetBlipAsShortRange(blip, data.range) else SetBlipAsShortRange(blip, true) end
    if data.color then SetBlipColour(blip, data.color) end
    if data.display then SetBlipDisplay(blip, data.display) end
    if data.playername then SetBlipNameToPlayerName(blip, data.playername) end
    if data.showcone then SetBlipShowCone(blip, data.showcone) end
    if data.secondarycolor then SetBlipSecondaryColour(blip, data.secondarycolor) end
    if data.friend then SetBlipFriend(blip, data.friend) end
    if data.mission then SetBlipAsMissionCreatorBlip(blip, data.mission) end
    if data.route then SetBlipRoute(blip, data.route) end
    if data.friendly then SetBlipAsFriendly(blip, data.friendly) end
    if data.routecolor then SetBlipRouteColour(blip, data.routecolor) end
    if data.scale then SetBlipScale(blip, data.scale) else SetBlipScale(blip, 0.7) end

    BeginTextCommandSetBlipName("STRING")
    AddTextComponentString(data.name)
    EndTextCommandSetBlipName(blip)

    Void.Blips[id] = {blip = blip, data = data}
end

function Void.BlipManager.RemoveBlip(self, id)
    local blip = Void.Blips[id]
    if blip then RemoveBlip(blip.blip) end
    Void.Blips[id] = nil
end

function Void.BlipManager.HideBlip(self, id, toggle)
    local blip = Void.Blips[id]
    if not blip then return end
    if toggle then SetBlipAlpha(blip, 0) else SetBlipAlpha(blip, 255) end
end

function Void.BlipManager.GetBlip(self, id)
    local blip = Void.Blips[id]
    if not blip then return false end
    return blip
end