function Login.playerLoaded() end

function Login.characterLoaded()
  return
end

function Login.characterSpawned()
  return
    if Spawn.isNew then
      return
  end
    SetPedMaxHealth(PlayerPedId(), 200)
    --SetPlayerMaxArmour(PlayerId(), 100) -- This is setting players armor on relog??
    Spawn.isNew = false
    exports.spawnmanager:setAutoSpawn(false)
    runGameplay()
end
RegisterNetEvent("erp-spawn:characterSpawned");
AddEventHandler("erp-spawn:characterSpawned", Login.characterSpawned);
