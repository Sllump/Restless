Ethereal.Database = Ethereal.Database or {}

Ethereal.Database.Execute = function(wait, query, cb)
	local rtndata = {}
	local waiting = true
	exports['oxmysql']:execute(query, {}, function(data)
		if cb ~= nil and wait == false then
			cb(data)
		end
		rtndata = data
		waiting = false
	end)
	if wait then
		while waiting do
			Citizen.Wait(5)
		end
		if cb ~= nil and wait == true then
			cb(rtndata)
		end
	end
	return rtndata
end