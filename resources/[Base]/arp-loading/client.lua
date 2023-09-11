
local spawn1 = false

AddEventHandler("arp-base:spawnInitialized", function()
	if not spawn1 then
		ShutdownLoadingScreenNui()
		spawn1 = true
	end
end)

--TriggerEvent("arp-base:playerSpawned")