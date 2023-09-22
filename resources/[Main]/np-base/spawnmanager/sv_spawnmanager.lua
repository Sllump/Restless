NPX.SpawnManager = {}

RegisterServerEvent('rlrp-base:spawnInitialized')
AddEventHandler('rlrp-base:spawnInitialized', function()
    local src = source
    TriggerClientEvent('rlrp-base:spawnInitialized', src)
end)