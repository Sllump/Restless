
local spawn1 = false

AddEventHandler("erp-base:spawnInitialized", function()
	if not spawn1 then
		ShutdownLoadingScreenNui()
		spawn1 = true
	end
end)

--TriggerEvent("erp-base:playerSpawned")