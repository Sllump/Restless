-- Console Shiiit
CreateThread( function()
	local version = GetResourceMetadata(GetCurrentResourceName(), 'version')
print(([[^3-------------------------------------------------------
UPDATE: 1.0
Collaborators: Potato
-------------------------------------------------------]]))
end)


function Void.Core.ConsoleLog(self, msg, mod, ply)
	if not tostring(msg) then return end
	if not tostring(mod) then mod = "No Module" end

	local pMsg = string.format("^3[ot LOG - %s]^7 %s", mod, msg)
	if not pMsg then return end

	if ply and tonumber(ply) then
		TriggerClientEvent("arp-base:consoleLog", ply, msg, mod)
	end
end

AddEventHandler("onResourceStart", function(resource)
	TriggerClientEvent("arp-base:waitForExports", -1)

	if not Void.Core.ExportsReady then return end

	Citizen.CreateThread(function()
		while true do 
			Citizen.Wait(0)
			if Void.Core.ExportsReady then
				TriggerEvent("arp-base:exportsReady")
				return
			else
			end
		end
	end)
end)

RegisterNetEvent("arp-base:playerSessionStarted")
AddEventHandler("arp-base:playerSessionStarted", function()

	local src = source
	local name = GetPlayerName(src)
	local user = Void.Player:GetUser(src)
end)

AddEventHandler("arp-base:characterLoaded", function(user, char)
	local src = source
	local hexId = user:getVar("hexid")

	if char.phone_number == 0 then
		-- Void.Core:CreatePhoneNumber(source, function(phonenumber, err)	
		-- 	local q = [[UPDATE characters SET phone_number = @phone WHERE owner = @owner and id = @cid]]
		-- 	local v = {
		-- 		["phone"] = phoneNumber,
		-- 		["owner"] = hexId,
		-- 		["cid"] = char.id
		-- 	}

			exports.oxmysql:execute(q, v, function()
				char.phone_number = char.phone_number
				user:setCharacter(char)
			end)
		-- end)
	end
end)