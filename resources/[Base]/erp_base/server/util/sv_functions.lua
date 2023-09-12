Ethereal.Functions = Ethereal.Functions or {}

SQL = function(query, parameters, cb)
    local res = nil
    local IsBusy = true
    exports.oxmysql:execute(query, parameters, function(result)
        if cb then
            cb(result)
        else
            res = result
            IsBusy = false
        end
    end)
    while IsBusy do
        Citizen.Wait(0)
    end
    return res
end

AddEventHandler('onResourceStop', function(resourceName)
	if (GetCurrentResourceName() == resourceName) then
        for k,v in pairs(Ethereal.Shared.Resources) do
            local state = GetResourceState(v)
            if state == 'starting' or state == 'started' then
                StopResource(v)
            end
        end
    end
end)

AddEventHandler('onResourceStart', function(resourceName)
	if (GetCurrentResourceName() == resourceName) then
        Wait(1500)
        for k,v in pairs(Ethereal.Shared.Resources) do
            local state = GetResourceState(v)
            if state == 'stopped' or state == 'stopping' then
                StartResource(v)
            end
            Wait(150)
		end

		for k,v in pairs(Ethereal.Shared.NonRestartResources) do
            local state = GetResourceState(v)
            if state == 'stopped' or state == 'stopping' then
                StartResource(v)
            end
            Wait(150)
		end
		
    end
end)