Util = {}

if IsDuplicityVersion() then
   Util.GetIdentifiers = function(src)
      local identifiers = {
            name = GetPlayerName(src),
            steam = " ",
            license = " ",
            discord = " ",
            fivem = ' ',
            ip = GetPlayerEndpoint(src),
      }
      for i = 0, GetNumPlayerIdentifiers(src) - 1 do
            local id = GetPlayerIdentifier(src, i)
            if string.sub(id, 1, string.len("steam:")) == "steam:" then
               identifiers.steamid = string.gsub(id, "steam:", "")
            elseif string.sub(id, 1, string.len("discord:")) == "discord:" then
               identifiers.discord = string.gsub(id, "discord:", "")
            elseif string.sub(id, 1, string.len("license:")) == "license:" then
               identifiers.license = string.gsub(id, "license:", "")
            elseif string.sub(id, 1, string.len("fivem:")) == "fivem:" then
               identifiers.fivem = string.gsub(id, "fivem:", "")
            end
      end
      return identifiers
   end

   Util.GetTimeDifference = function(sent)
      diff = sent - os.time()
      return diff
   end
else

    Util.NUIFocus = function(hasKeyboard, hasMouse)
        SetNuiFocus(hasKeyboard, hasMouse)
    end

    Util.TaskAnim = function(animDict, animName, typeAnim, speed)
        ClearPedTasks(PlayerPedId())
        Util.LoadAnimDict(animDict)
        TaskPlayAnim(PlayerPedId(), animDict, animName, speed, 2.0, -1, typeAnim, 0, 0, 0, 0)
        RemoveAnimDict(animDict)
    end

    Util.TaskAnimTimed = function(animDict, animName, typeAnim, speed, duration)
        if exports['erp_deathhandler']:GetDeathStatus() then return end
        ClearPedSecondaryTask(PlayerPedId())
        Util.LoadAnimDict(animDict)
        TaskPlayAnim(PlayerPedId(), animDict, animName, speed, 2.0, duration, typeAnim, 0, 0, 0, 0)
        RemoveAnimDict(animDict)
    end

    Util.TaskAnimNoCancel = function(animDict, animName, typeAnim, speed)
        if exports['erp_deathhandler']:GetDeathStatus() then return end
        ClearPedSecondaryTask(PlayerPedId())
        Util.LoadAnimDict(animDict)
        TaskPlayAnim(PlayerPedId(), animDict, animName, speed, 2.0, -1, typeAnim, 0, 0, 0, 0)
        RemoveAnimDict(animDict)
    end

    Util.TaskAnimReallyNoCancel = function(animDict, animName, typeAnim, speed)
        Util.LoadAnimDict(animDict)
        TaskPlayAnim(PlayerPedId(), animDict, animName, speed, 2.0, -1, typeAnim, 0, 0, 0, 0)
        RemoveAnimDict(animDict)
    end

    Util.TaskAnimTimedNoCancel = function(animDict, animName, typeAnim, speed, duration)
        Util.LoadAnimDict(animDict)
        TaskPlayAnim(PlayerPedId(), animDict, animName, speed, 2.0, duration, typeAnim, 0, 0, 0, 0)
        RemoveAnimDict(animDict)
    end

   Util.GetClosestPlayer = function()
      local players = GetActivePlayers()
      local closestDistance = -1
      local closestPlayer = -1
      local closestServerId = nil
      local ply = PlayerPedId()
      local plyCoords = GetEntityCoords(ply, 0)

      for index, value in ipairs(players) do
         local target = GetPlayerPed(value)
         if (target ~= ply and GetPedRelationshipGroupHash(target) ~= GetHashKey("zombie")) then
            local targetCoords = GetEntityCoords(target, 0)
            local distance = #(targetCoords - plyCoords)
            if (closestDistance == -1 or closestDistance > distance) then
               closestPlayer = value
               closestDistance = distance
               closestServerId = GetPlayerServerId(value)
            end
         end
      end
      return closestPlayer, closestDistance, closestServerId
   end

   Util.IsPlayerNearMe = function(player)
      local players = GetActivePlayers()
      local ply = PlayerPedId()
      local plyCoords = GetEntityCoords(ply, 0)

      for index, value in ipairs(players) do
         local target = GetPlayerPed(value)
         if (target ~= ply) then
            if GetPlayerServerId(value) == player then
               local targetCoords = GetEntityCoords(target, 0)
               local distance = #(targetCoords - plyCoords)
               if (distance < 5.0) then
                  return true
               end
            end
         end
      end
      return false
   end

   Util.GetClosestLocalPed = function(Distance)
      local TargetPed
      local Handle, Ped = FindFirstPed()
      if not Distance then
         Distance = 2.0
      end
      repeat
         local DistanceBetween = Vdist(GetEntityCoords(PlayerPedId()), GetEntityCoords(Ped))
         if DoesEntityExist(Ped) and not IsEntityDead(Ped) and not IsPedAPlayer(Ped) and DistanceBetween <= Distance and
             IsPedHuman(Ped) and not DecorExistOn(Ped, "NPC") then
            TargetPed = Ped
         end

         Success, Ped = FindNextPed(Handle)
      until not Success

      EndFindPed(Handle)
      return TargetPed
   end

   Util.LoadAnimDict = function(dict)
      local timeout = false

      if not HasAnimDictLoaded(dict) then
         RequestAnimDict(dict)

         SetTimeout(1000, function() timeout = true end)

         while not HasAnimDictLoaded(dict) and not timeout do
            RequestAnimDict(dict)
            Wait(0)
         end
      end

      return HasAnimDictLoaded(dict)
   end

   Util.LoadModel = function(model)
      if IsModelInCdimage(model) and IsModelValid(model) then
         RequestModel(model)
         while not HasModelLoaded(model) do Wait(0) end
         return HasModelLoaded(model)
      end
   end

   Util.LoadModelAttempt = function(model)
      if IsModelInCdimage(model) and IsModelValid(model) then
         local timeout = false
         if not HasModelLoaded(model) then
            RequestModel(model)

            SetTimeout(2000, function() timeout = true end)

            while not HasModelLoaded(model) and not timeout do
               RequestModel(model)
               Wait(0)
            end
         end

         return HasModelLoaded(model)
      end
   end

   Util.DrawText2D = function(x, y, width, height, scale, font, color, text)
      SetTextFont(font)
      SetTextProportional(0)
      SetTextScale(scale, scale)
      SetTextColour(color[1], color[2], color[3], color[4])
      SetTextDropShadow(0, 0, 0, 0, 255)
      SetTextEdge(2, 0, 0, 0, 255)
      SetTextDropShadow()
      SetTextOutline()
      SetTextEntry("STRING")
      AddTextComponentString(text)
      DrawText(x - width / 2, y - height / 2 + 0.005)
   end

   Util.DrawText3D = function(x, y, z, color, scale, text)
      local onScreen, _x, _y = World3dToScreen2d(x, y, z)
      local px, py, pz = table.unpack(GetGameplayCamCoords())
      if onScreen then
         SetTextScale(scale, scale)
         SetTextFont(4)
         SetTextProportional(1)
         SetTextColour(color[1], color[2], color[3], color[4])
         SetTextDropshadow(0, 0, 0, 0, 55)
         SetTextEdge(2, 0, 0, 0, 150)
         SetTextDropShadow()
         SetTextOutline()
         SetTextEntry("STRING")
         SetTextCentre(1)
         AddTextComponentString(text)
         DrawText(_x, _y)
      end
   end

   Util.DrawText3DBox = function(x, y, z, text)
      local onScreen, _x, _y = World3dToScreen2d(x, y, z)
      local px, py, pz = table.unpack(GetGameplayCamCoords())
      SetTextScale(0.35, 0.35)
      SetTextFont(4)
      SetTextProportional(1)
      SetTextColour(255, 255, 255, 215)

      SetTextEntry("STRING")
      SetTextCentre(1)
      AddTextComponentString(text)
      DrawText(_x, _y)
      local factor = (string.len(text)) / 370
      DrawRect(_x, _y + 0.0125, 0.015 + factor, 0.03, 0, 0, 0, 90)
   end

   Util.CleanUpPeds = function()
      local playerped = PlayerPedId()
      local plycoords = GetEntityCoords(playerped)
      local handle, ObjectFound = FindFirstPed()
      local success
      repeat
         local pos = GetEntityCoords(ObjectFound)
         local distance = #(plycoords - pos)
         if distance < 30.0 and ObjectFound ~= playerped then
            if not IsPedAPlayer(ObjectFound) and not IsEntityAVehicle(ObjectFound) then
               Util.DeletePed(ObjectFound)
            end
         end
         success, ObjectFound = FindNextPed(handle)
      until not success
      EndFindPed(handle)
   end

   Util.GetTargetVeh = function(targetDist)
      local maxDist = targetDist

      local coordA = GetEntityCoords(PlayerPedId(), 1)
      local coordB = GetOffsetFromEntityInWorldCoords(PlayerPedId(), 0.0, 20.0, -1.0)
      local rayHandle = CastRayPointToPoint(coordA.x, coordA.y, coordA.z, coordB.x, coordB.y, coordB.z, 10, PlayerPedId()
         , 0)
      local a, b, c, d, targetVehicle = GetRaycastResult(rayHandle)
      local backupVeh = Util.TargetVeh(maxDist)
      if backupVeh ~= nil then
         targetVehicle = backupVeh
      end

      local distance = #(GetEntityCoords(targetVehicle) - GetEntityCoords(PlayerPedId()))

      if IsEntityAVehicle(targetVehicle) and DoesEntityExist(targetVehicle) and distance < maxDist then
         return targetVehicle, GetVehicleNumberPlateText(targetVehicle)
      end
      return nil
   end

   Util.TargetVeh = function(dist)
      local targetVehicle = Util.Target(dist)
      if IsEntityAVehicle(targetVehicle) and DoesEntityExist(targetVehicle) then
         return targetVehicle, GetVehicleNumberPlateText(targetVehicle)
      end
      return nil
   end

   Util.TargetAnimal = function(dist)
      local targetPed = Util.Target(dist)
      if DoesEntityExist(targetPed) and IsEntityAPed(targetPed) and IsEntityDead(targetPed) and
          not IsPedAPlayer(targetPed) then
         return targetPed
      end
      return nil
   end

   Util.Target = function(Distance)
      local Entity = nil
      local camCoords = GetGameplayCamCoord()
      local farCoordsX, farCoordsY, farCoordsZ = Util.GetCoordsFromCam(Distance)
      local RayHandle = StartShapeTestRay(camCoords.x, camCoords.y, camCoords.z, farCoordsX, farCoordsY, farCoordsZ, -1,
         PlayerPedId(), 0)
      local A, B, C, D, Entity = GetRaycastResult(RayHandle)
      return Entity, farCoordsX, farCoordsY, farCoordsZ
   end

   Util.GetCoordsFromCam = function(distance)
      local rot = GetGameplayCamRot(2)
      local coord = GetGameplayCamCoord()

      local tZ = rot.z * 0.0174532924
      local tX = rot.x * 0.0174532924
      ---@diagnostic disable-next-line: missing-parameter
      local num = math.abs(math.cos(tX))

      newCoordX = coord.x + (-math.sin(tZ)) * (num + distance)
      newCoordY = coord.y + (math.cos(tZ)) * (num + distance)
      newCoordZ = coord.z + (math.sin(tX) * 8.0)
      return newCoordX, newCoordY, newCoordZ
   end

   Util.GetVehicleMPH = function(veh)
      local speed = GetEntitySpeed(veh) * 2.23694
      return math.ceil(speed)
   end

   Util.VehicleCheck = function(t, entity)
      local vehicle = entity or GetVehiclePedIsIn(PlayerPedId())
      local model = GetEntityModel(vehicle)
      local types = {
         ["bicycle"] = IsThisModelABicycle(model),
         ["quad"] = IsThisModelAQuadbike(model),
         ["motorcycle"] = IsThisModelABike(model),
         ["heli"] = IsThisModelAHeli(model),
         ["wheelchair"] = model == GetHashKey("wheelchair")
      }
      if type(t) == "table" then
         for k, v in pairs(t) do
            if types[v] then
               return true
            end
         end
      else
         if types[t] then
            return true
         end
      end
      return false
   end

   Util.RequestControl = function(pEntity)
      local timeout = false

      if not NetworkHasControlOfEntity(pEntity) then
         NetworkRequestControlOfEntity(pEntity)

         Citizen.SetTimeout(1000, function() timeout = true end)

         while not NetworkHasControlOfEntity(pEntity) and not timeout do
            NetworkRequestControlOfEntity(pEntity)
            Wait(0)
         end
      end

      return NetworkHasControlOfEntity(pEntity)
   end

   Util.AttachProp = function(attachModelSent, boneNumberSent, x, y, z, xR, yR, zR, pVertexIndex, disableCollision)
      attachModel = GetHashKey(attachModelSent)
      boneNumber = boneNumberSent
      TriggerEvent("actionbar:setEmptyHanded")
      local bone = GetPedBoneIndex(PlayerPedId(), boneNumberSent)
      RequestModel(attachModel)
      while not HasModelLoaded(attachModel) do
         Citizen.Wait(100)
      end
      attachedProp = CreateObject(attachModel, 1.0, 1.0, 1.0, 1, 1, 0)
      if disableCollision then
         SetEntityCollision(attachedProp, false, false)
      end
      SetModelAsNoLongerNeeded(attachModel)
      AttachEntityToEntity(attachedProp, PlayerPedId(), bone, x, y, z, xR, yR, zR, 1, 1, 0, 0, pVertexIndex and pVertexIndex or 2, 1)
   end

   Util.RemoveAttachedProp = function()
      if DoesEntityExist(attachedProp) then
         DeleteEntity(attachedProp)
         attachedProp = 0
      end
   end

   Util.SkillBar = function(AMOUNT)
      local finished = exports["erp_skillbar"]:SkillCircle(AMOUNT)
      if not finished then
         return false
      end
      return true
   end

   Util.GetPedVehicleSeat = function(ped)
      local vehicle = GetVehiclePedIsIn(ped, false)
      for i = -2, GetVehicleMaxNumberOfPassengers(vehicle) do
         if (GetPedInVehicleSeat(vehicle, i) == ped) then return i end
      end
      return -2
   end

   Util.NearIsland = function(dist)
      local islandCoords = vector3(4840.571, -5174.425, 2.0)
      local pCoords = GetEntityCoords(PlayerPedId())
      if #(pCoords - islandCoords) < dist then
         return true
      end
   end

   Util.ScreenFadeOut = function(time)
      DoScreenFadeOut(time or 0)
      while IsScreenFadingOut() do Wait(0) end
   end

   Util.ScreenFadeIn = function(time)
      DoScreenFadeIn(time or 0)
      while IsScreenFadingOut() do Wait(0) end
   end

   Util.ScreenBlurOut = function(time)
      TriggerScreenblurFadeOut(time or 0)
      while IsScreenblurFadeRunning() do Wait(0) end
   end

   Util.ScreenBlurIn = function(time)
      TriggerScreenblurFadeIn(time or 0)
      while IsScreenblurFadeRunning() do Wait(0) end
   end

   Util.StationaryPed = function(model, coords, heading)
      if Util.ActiveTable(model) then
         coords = vector3(model.x, model.y, model.z - 1.0)
         heading = model.h
         model = model.model
      end
      Util.LoadModel(model)
      local ped = CreatePed(4, model, vector3(coords.x, coords.y, coords.z), heading, false, false)
      SetModelAsNoLongerNeeded(model)
      SetPedDefaultComponentVariation(ped)
      SetEntityHeading(ped, heading)
      SetEntityInvincible(ped, true)
      FreezeEntityPosition(ped, true)
      SetBlockingOfNonTemporaryEvents(ped, true)
      SetPedFleeAttributes(ped, 0, 0)
      SetPedCombatAttributes(ped, 17, 1)
      SetPedSeeingRange(ped, 0.0)
      SetPedHearingRange(ped, 0.0)
      SetPedAlertness(ped, 0)
      SetPedKeepTask(ped, true)
      DecorSetBool(ped, "NPC", true)
      return ped
   end

   Util.PedFaceCoord = function(pPed, pCoords)
      TaskTurnPedToFaceCoord(pPed, pCoords.x, pCoords.y, pCoords.z)

      Wait(100)

      while GetScriptTaskStatus(pPed, 0x574bb8f5) == 1 do
         Wait(0)
      end
   end

   Util.PedFaceEntity = function(pPed, Entity)
      TaskTurnPedToFaceEntity(pPed, Entity)

      Wait(100)
      local timeout = 3500
      while GetScriptTaskStatus(pPed, 0xCBCE4595) == 1 and timeout > 0 do
         timeout = timeout - 1
         Wait(0)
      end
   end

   Util.PedEnterVehicle = function(pPed, vehicle, seat, speed, flag)
      TaskEnterVehicle(pPed, vehicle, -1, seat, (speed or 2.0), flag, 0)

      Wait(100)

      while GetScriptTaskStatus(pPed, 0x950B6492) == 1 do
         Wait(0)
      end
   end

   Util.MapRange = function(s, a1, a2, b1, b2)
      return b1 + (s - a1) * (b2 - b1) / (a2 - a1)
   end

   Util.AwaitVehicleFromNetId = function(netId, noexist)
      while not NetworkDoesNetworkIdExist(netId) and not NetworkDoesEntityExistWithNetworkId(netId) do Wait(0) end
      local vehicle = NetToVeh(netId)
      if not noexist then
         while not DoesEntityExist(vehicle) do Wait(0) end
         local driverPed = GetPedInVehicleSeat(vehicle, -1)
         if DoesEntityExist(driverPed) and not IsPedAPlayer(driverPed) then
            Util.DeletePed(driverPed)
         end
      end
      return vehicle
   end

   Util.HotKeyDisableAll = function()
      if LocalPlayer.state.disableinput or LocalPlayer.state.disabled or exports['erp_deathhandler']:GetDeathStatus() or IsScreenFadedOut() or
          IsPauseMenuActive() then
         return true
      end
   end

   Util.HotKeyDisable = function(bool)
      if bool then
         if LocalPlayer.state.disableinput or exports['erp_deathhandler']:GetDeathStatus() or IsScreenFadedOut() or IsPauseMenuActive() then
            return true
         end
      else
         if LocalPlayer.state.disableinput or IsScreenFadedOut() or IsPauseMenuActive() then
            return true
         end
      end
   end
end

VehicleColors = {
   [-1] = "Unknown",
   [0] = "Metallic Black",
   [1] = "Metallic Graphite Black",
   [2] = "Metallic Black Steal",
   [3] = "Metallic Dark Silver",
   [4] = "Metallic Silver",
   [5] = "Metallic Blue Silver",
   [6] = "Metallic Steel Gray",
   [7] = "Metallic Shadow Silver",
   [8] = "Metallic Stone Silver",
   [9] = "Metallic Midnight Silver",
   [10] = "Metallic Gun Metal",
   [11] = "Metallic Anthracite Grey",
   [12] = "Matte Black",
   [13] = "Matte Gray",
   [14] = "Matte Light Grey",
   [15] = "Util Black",
   [16] = "Util Black Poly",
   [17] = "Util Dark silver",
   [18] = "Util Silver",
   [19] = "Util Gun Metal",
   [20] = "Util Shadow Silver",
   [21] = "Worn Black",
   [22] = "Worn Graphite",
   [23] = "Worn Silver Grey",
   [24] = "Worn Silver",
   [25] = "Worn Blue Silver",
   [26] = "Worn Shadow Silver",
   [27] = "Metallic Red",
   [28] = "Metallic Torino Red",
   [29] = "Metallic Formula Red",
   [30] = "Metallic Blaze Red",
   [31] = "Metallic Graceful Red",
   [32] = "Metallic Garnet Red",
   [33] = "Metallic Desert Red",
   [34] = "Metallic Cabernet Red",
   [35] = "Metallic Candy Red",
   [36] = "Metallic Sunrise Orange",
   [37] = "Metallic Classic Gold",
   [38] = "Metallic Orange",
   [39] = "Matte Red",
   [40] = "Matte Dark Red",
   [41] = "Matte Orange",
   [42] = "Matte Yellow",
   [43] = "Util Red",
   [44] = "Util Bright Red",
   [45] = "Util Garnet Red",
   [46] = "Worn Red",
   [47] = "Worn Golden Red",
   [48] = "Worn Dark Red",
   [49] = "Metallic Dark Green",
   [50] = "Metallic Racing Green",
   [51] = "Metallic Sea Green",
   [52] = "Metallic Olive Green",
   [53] = "Metallic Green",
   [54] = "Metallic Gasoline Blue Green",
   [55] = "Matte Lime Green",
   [56] = "Util Dark Green",
   [57] = "Util Green",
   [58] = "Worn Dark Green",
   [59] = "Worn Green",
   [60] = "Worn Sea Wash",
   [61] = "Metallic Midnight Blue",
   [62] = "Metallic Dark Blue",
   [63] = "Metallic Saxony Blue",
   [64] = "Metallic Blue",
   [65] = "Metallic Mariner Blue",
   [66] = "Metallic Harbor Blue",
   [67] = "Metallic Diamond Blue",
   [68] = "Metallic Surf Blue",
   [69] = "Metallic Nautical Blue",
   [70] = "Metallic Bright Blue",
   [71] = "Metallic Purple Blue",
   [72] = "Metallic Spinnaker Blue",
   [73] = "Metallic Ultra Blue",
   [74] = "Metallic Bright Blue",
   [75] = "Util Dark Blue",
   [76] = "Util Midnight Blue",
   [77] = "Util Blue",
   [78] = "Util Sea Foam Blue",
   [79] = "Util Lightning blue",
   [80] = "Util Maui Blue Poly",
   [81] = "Util Bright Blue",
   [82] = "Matte Dark Blue",
   [83] = "Matte Blue",
   [84] = "Matte Midnight Blue",
   [85] = "Worn Dark blue",
   [86] = "Worn Blue",
   [87] = "Worn Light blue",
   [88] = "Metallic Taxi Yellow",
   [89] = "Metallic Race Yellow",
   [90] = "Metallic Bronze",
   [91] = "Metallic Yellow Bird",
   [92] = "Metallic Lime",
   [93] = "Metallic Champagne",
   [94] = "Metallic Pueblo Beige",
   [95] = "Metallic Dark Ivory",
   [96] = "Metallic Choco Brown",
   [97] = "Metallic Golden Brown",
   [98] = "Metallic Light Brown",
   [99] = "Metallic Straw Beige",
   [100] = "Metallic Moss Brown",
   [101] = "Metallic Biston Brown",
   [102] = "Metallic Beechwood",
   [103] = "Metallic Dark Beechwood",
   [104] = "Metallic Choco Orange",
   [105] = "Metallic Beach Sand",
   [106] = "Metallic Sun Bleeched Sand",
   [107] = "Metallic Cream",
   [108] = "Util Brown",
   [109] = "Util Medium Brown",
   [110] = "Util Light Brown",
   [111] = "Metallic White",
   [112] = "Metallic Frost White",
   [113] = "Worn Honey Beige",
   [114] = "Worn Brown",
   [115] = "Worn Dark Brown",
   [116] = "Worn straw beige",
   [117] = "Brushed Steel",
   [118] = "Brushed Black steel",
   [119] = "Brushed Aluminium",
   [120] = "Chrome",
   [121] = "Worn Off White",
   [122] = "Util Off White",
   [123] = "Worn Orange",
   [124] = "Worn Light Orange",
   [125] = "Metallic Securicor Green",
   [126] = "Worn Taxi Yellow",
   [127] = "police car blue",
   [128] = "Matte Green",
   [129] = "Matte Brown",
   [130] = "Worn Orange",
   [131] = "Matte White",
   [132] = "Worn White",
   [133] = "Worn Olive Army Green",
   [134] = "Pure White",
   [135] = "Hot Pink",
   [136] = "Salmon pink",
   [137] = "Metallic Vermillion Pink",
   [138] = "Orange",
   [139] = "Green",
   [140] = "Blue",
   [141] = "Mettalic Black Blue",
   [142] = "Metallic Black Purple",
   [143] = "Metallic Black Red",
   [144] = "hunter green",
   [145] = "Metallic Purple",
   [146] = "Metaillic V Dark Blue",
   [147] = "MODSHOP BLACK1",
   [148] = "Matte Purple",
   [149] = "Matte Dark Purple",
   [150] = "Metallic Lava Red",
   [151] = "Matte Forest Green",
   [152] = "Matte Olive Drab",
   [153] = "Matte Desert Brown",
   [154] = "Matte Desert Tan",
   [155] = "Matte Foilage Green",
   [156] = "DEFAULT ALLOY COLOR",
   [157] = "Epsilon Blue",
   [158] = "Pure Gold",
   [159] = "Brushed Gold",
}

--- GLOBAL FUNCTIONS
function SendErrorMessage(resource, ...)
   print("------------------ ERROR IN RESOURCE: " .. resource)
   print(...)
   print("------------------ END OF ERROR")
end

--- SHARED UTIL FUNCTIONS
Util.SetInterval = function(f, ms)
   Citizen.CreateThread(function()
      while true do
         if f() then break end
         Wait(ms or 0)
      end
   end)
end

Util.Lerp = function(min, max, amt)
   local calculation = (1 - amt) * min + amt * max
   if calculation < 0 then
      calculation = 0
   end
   return calculation
end

Util.RangePercent = function(min, max, amt)
   return (((amt - min) * 100) / (max - min)) / 100
end

Util.Round = function(num, numDecimalPlaces)
   local mult = 10 ^ (numDecimalPlaces or 0)
   return math.floor(num * mult + 0.5) / mult
end

Util.SortedPairs = function(t, order)
   local keys = {}
   for k in pairs(t) do keys[#keys + 1] = k end

   if order then
      table.sort(keys, function(a, b) return order(t, a, b) end)
   else
      table.sort(keys)
   end

   local i = 0
   return function()
      i = i + 1
      if keys[i] then
         return keys[i], t[ keys[i] ]
      end
   end
end

Util.TableReverse = function(t)
   local tablereverse = {}
   local tableCount = #t
   for k, v in ipairs(t) do
      tablereverse[tableCount + 1 - k] = v
   end
   return tablereverse
end