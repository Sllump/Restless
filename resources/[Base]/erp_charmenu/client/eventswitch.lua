AddEventHandler("erp_charmenu:SpawnPlayer", function()
    SetEntityVisible(PlayerPedId(), true)
    SetPedCanRagdoll(PlayerPedId(), true)
end)