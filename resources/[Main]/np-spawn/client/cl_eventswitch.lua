pRan = false

function Login.playerLoaded() end

function Login.characterLoaded()
  -- Main events leave alone 
  TriggerEvent("np-base:playerSpawned")
  TriggerEvent("playerSpawned")
  TriggerServerEvent('character:loadspawns')
  TriggerEvent("np-base:initialSpawnModelLoaded")
  -- Main events leave alone 

  -- Everything that should trigger on character load 
  TriggerServerEvent('checkTypes')
  TriggerServerEvent('isVip')
  TriggerEvent("fx:clear")
  TriggerEvent('np-bankrobbery:client:CreateTrollysEvent')
  TriggerServerEvent("currentconvictions")
  TriggerServerEvent("Evidence:checkDna")
  TriggerEvent("banking:viewBalance")
  TriggerServerEvent('np-doors:requestlatest')
  TriggerServerEvent("item:UpdateItemWeight")
  TriggerServerEvent("ReturnHouseKeys")
  TriggerServerEvent("requestOffices")
  Wait(500)
  TriggerServerEvent("police:getAnimData")
  TriggerServerEvent("server:currentpasses")
  TriggerEvent("np-hud:SetValues", exports['isPed']:isPed('cid'))
  TriggerServerEvent("police:getEmoteData")
  TriggerServerEvent("police:SetMeta")
  TriggerServerEvent('np-scoreboard:AddPlayer')
  TriggerServerEvent("np-base:PolyZoneUpdate")
  TriggerEvent("np-housing:loadHousingClient")
  TriggerEvent("np-admin/client/loadMenu")
  TriggerServerEvent("np-housing:getGarages")
  TriggerServerEvent("np-phone:getAbdulTaxies")
  TriggerServerEvent("retreive:jail",exports["isPed"]:isPed("cid"))
  TriggerServerEvent("np-phone:checkForNonDocumentedLicenses", exports['isPed']:isPed("cid"))
  -- TriggerServerEvent("weapon:general:check")
  -- Anything that might need to wait for the client to get information, do it here.
  TriggerServerEvent("login:get:keys")
  TriggerServerEvent("raid_clothes:retrieve_tats")

  TriggerServerEvent("np-weapons:getAmmo")
  Wait(4000)
  TriggerServerEvent("bank:getLogs")
  TriggerEvent('np-hud:EnableHud', true)
end

function Login.characterSpawned()

  isNear = false
  TriggerServerEvent('np-base:sv:player_control')
  TriggerServerEvent('np-base:sv:player_settings')
  TriggerEvent("spawning", false)
  TriggerEvent("attachWeapons")
  TriggerServerEvent("request-dropped-items")
  TriggerServerEvent("server-request-update", exports["isPed"]:isPed("cid"))

    if Spawn.isNew then
        Wait(1000)
        TriggerEvent("player:receiveItem", "mobilephone", 1)
        TriggerEvent("player:receiveItem", "idcard", 1)
        TriggerEvent("player:receiveItem", "lockpick", 2)
        TriggerEvent("player:receiveItem", "sandwich", 3)
        TriggerEvent("player:receiveItem", "water", 3)
        TriggerEvent("player:receiveItem", "repairkit", 1)
        TriggerEvent("player:receiveItem", "skateboard", 1)

        TriggerEvent('np-hud:ChangeThirst', 95)
        TriggerEvent('np-hud:ChangeHunger', 95)
        TriggerEvent('np-hud:SaveValues')
        TriggerServerEvent('np-spawn:initBoosting')
        -- TriggerServerEvent('np-spawn:licenses')

        -- commands to make sure player is alive and full food/water/health/no injuries
        local src = GetPlayerServerId(PlayerId())
        TriggerServerEvent("reviveGranted", src)
        TriggerEvent("Hospital:HealInjuries", src, true)
        TriggerServerEvent("ems:healplayer", src)
        TriggerEvent("heal", src)
        TriggerEvent("status:needs:restore", src) 

        TriggerServerEvent("np-spawn:newPlayerFullySpawned")
    end
  SetPedMaxHealth(PlayerPedId(), 200)
  runGameplay()
  Spawn.isNew = false
end
RegisterNetEvent("np-spawn:characterSpawned");
AddEventHandler("np-spawn:characterSpawned", Login.characterSpawned);
