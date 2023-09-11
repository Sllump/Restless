function Login.playerLoaded() end

function Login.characterLoaded()
  -- Main events leave alone 
  TriggerEvent("erp-base:playerSpawned")
  TriggerEvent("playerSpawned")
  TriggerServerEvent('character:loadspawns')
  
  -- Main events leave alone 
  TriggerEvent("Relog")

  -- Everything that should trigger on character load 
  TriggerServerEvent('checkTypes')
  TriggerServerEvent('isVip')
  TriggerEvent('rehab:changeCharacter')
  TriggerEvent("resetinhouse")
  TriggerEvent("fx:clear")
  TriggerServerEvent("raid_clothes:retrieve_tats")
  TriggerServerEvent('Blemishes:retrieve')
  TriggerServerEvent("currentconvictions")
  TriggerServerEvent("GarageData")
  TriggerServerEvent("Evidence:checkDna")
  TriggerEvent("banking:viewBalance")
  TriggerServerEvent("police:getLicensesCiv")
  TriggerServerEvent('erp-doors:requestlatest')
  TriggerServerEvent("item:UpdateItemWeight")
  TriggerServerEvent("erp-weapons:getAmmo")
  TriggerServerEvent("ReturnHouseKeys")
  TriggerServerEvent("requestOffices")
  TriggerServerEvent('erp-base:addLicenses')
  Wait(500)
  TriggerServerEvent('commands:player:login')
  TriggerServerEvent("police:getAnimData")
  TriggerServerEvent("police:getEmoteData")
  TriggerServerEvent("police:SetMeta")
  TriggerServerEvent("retreive:licenes:server")
  TriggerServerEvent("clothing:checkIfNew")

  -- Anything that might need to wait for the client to get information, do it here.
  Wait(3000)
  TriggerServerEvent("bones:server:requestServer")
  TriggerEvent("apart:GetItems")

  Wait(4000)
  TriggerServerEvent('distillery:getDistilleryLocation')
  TriggerServerEvent("retreive:jail",exports["isPed"]:isPed("cid"))	
  TriggerServerEvent("bank:getLogs")
  TriggerEvent('cool-hud:initHud')
  exports.spawnmanager:setAutoSpawn(false)
  TriggerServerEvent('erp-phone:grabWallpaper')
  TriggerServerEvent('banking-loaded-in')
  TriggerServerEvent('erp-base:updatedphoneLicenses')
  TriggerServerEvent('getallplayers')
  TriggerEvent("erp-base:PolyZoneUpdate")
  TriggerServerEvent('erp-scoreboard:AddPlayer')
  TriggerServerEvent("server:currentpasses")
  TriggerServerEvent('dispatch:setcallsign')
  TriggerServerEvent('erp-base:addLicenses')
  TriggerEvent("erp-newphone:phone:fetch")
  TriggerEvent("arp:vehicles:giveKeys")
end

function Login.characterSpawned()

  isNear = false
  TriggerServerEvent('erp-base:sv:player_control')
  TriggerServerEvent('erp-base:sv:player_settings')

  TriggerServerEvent("TokoVoip:clientHasSelecterCharacter")
  TriggerEvent("spawning", false)
  TriggerEvent("attachWeapons")
  TriggerEvent("tokovoip:onPlayerLoggedIn", true)
  TriggerServerEvent("request-dropped-items")
  TriggerServerEvent("server-request-update", exports["isPed"]:isPed("cid"))

  if Spawn.isNew then
      Wait(1000)
      TriggerEvent("hud:saveCurrentMeta")
      TriggerEvent("player:receiveItem", "idcard", 1)
      TriggerEvent("player:receiveItem", "mobilephone", 1)
      TriggerEvent("player:receiveItem", "present", 1)

      local src = GetPlayerServerId(PlayerId())
      TriggerServerEvent("reviveGranted", src)
      TriggerEvent("Hospital:HealInjuries", src, true)
      TriggerServerEvent("ems:healplayer", src)
      TriggerEvent("heal", src)
      TriggerEvent("status:needs:restore", src)
  end

  SetPedMaxHealth(PlayerPedId(), 200)
  --SetPlayerMaxArmour(PlayerId(), 100) -- This is setting players armor on relog??
  Spawn.isNew = false
  exports.spawnmanager:setAutoSpawn(false)
  runGameplay()
end
RegisterNetEvent("erp-spawn:characterSpawned");
AddEventHandler("erp-spawn:characterSpawned", Login.characterSpawned);
