pRan = false

function Login.playerLoaded() end

function Login.characterLoaded()
  -- Main events leave alone 
  TriggerEvent("rlrp-base:playerSpawned")
  TriggerEvent("playerSpawned")
  TriggerServerEvent('character:loadspawns')
  TriggerEvent("rlrp-base:initialSpawnModelLoaded")
  -- Main events leave alone 

  -- Everything that should trigger on character load 
  TriggerServerEvent('checkTypes')
  TriggerServerEvent('isVip')
  TriggerEvent("fx:clear")
  TriggerEvent('rlrp-bankrobbery:client:CreateTrollysEvent')
  TriggerServerEvent("currentconvictions")
  TriggerServerEvent("Evidence:checkDna")
  TriggerEvent("banking:viewBalance")
  TriggerServerEvent('rlrp-doors:requestlatest')
  TriggerServerEvent("item:UpdateItemWeight")
  TriggerServerEvent("ReturnHouseKeys")
  TriggerServerEvent("requestOffices")
  Wait(500)
  TriggerServerEvent("police:getAnimData")
  TriggerServerEvent("server:currentpasses")
  TriggerEvent("rlrp-hud:SetValues", exports['isPed']:isPed('cid'))
  TriggerServerEvent("police:getEmoteData")
  TriggerServerEvent("police:SetMeta")
  TriggerServerEvent('rlrp-scoreboard:AddPlayer')
  TriggerServerEvent("rlrp-base:PolyZoneUpdate")
  TriggerEvent("rlrp-housing:loadHousingClient")
  TriggerEvent("rlrp-admin/client/loadMenu")
  TriggerServerEvent("rlrp-housing:getGarages")
  TriggerServerEvent("rlrp-phone:getAbdulTaxies")
  TriggerServerEvent("retreive:jail",exports["isPed"]:isPed("cid"))
  TriggerServerEvent("rlrp-phone:checkForNonDocumentedLicenses", exports['isPed']:isPed("cid"))
  -- TriggerServerEvent("weapon:general:check")
  -- Anything that might need to wait for the client to get information, do it here.
  TriggerServerEvent("login:get:keys")
  TriggerServerEvent("raid_clothes:retrieve_tats")

  TriggerServerEvent("rlrp-weapons:getAmmo")
  Wait(4000)
  TriggerServerEvent("bank:getLogs")
  TriggerEvent('rlrp-hud:EnableHud', true)
end

function Login.characterSpawned()

  isNear = false
  TriggerServerEvent('rlrp-base:sv:player_control')
  TriggerServerEvent('rlrp-base:sv:player_settings')
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

        TriggerEvent('rlrp-hud:ChangeThirst', 95)
        TriggerEvent('rlrp-hud:ChangeHunger', 95)
        TriggerEvent('rlrp-hud:SaveValues')
        TriggerServerEvent('rlrp-spawn:initBoosting')
        -- TriggerServerEvent('rlrp-spawn:licenses')

        -- commands to make sure player is alive and full food/water/health/no injuries
        local src = GetPlayerServerId(PlayerId())
        TriggerServerEvent("reviveGranted", src)
        TriggerEvent("Hospital:HealInjuries", src, true)
        TriggerServerEvent("ems:healplayer", src)
        TriggerEvent("heal", src)
        TriggerEvent("status:needs:restore", src) 

        TriggerServerEvent("rlrp-spawn:newPlayerFullySpawned")
    end
  SetPedMaxHealth(PlayerPedId(), 200)
  runGameplay()
  Spawn.isNew = false
end
RegisterNetEvent("rlrp-spawn:characterSpawned");
AddEventHandler("rlrp-spawn:characterSpawned", Login.characterSpawned);
