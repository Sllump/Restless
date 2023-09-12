function Void.Core.LoginPlayer(self, args, src, callback)
    TriggerEvent("erp-base:playerAttemptLogin", src)

    local user = Void.Player:CreatePlayer(src, false)

    if not user then
        user = Void.Player:CreatePlayer(src, false)

        if not user then DropPlayer(src, "There was an error while creating your player object, if this persists, contact an administrator") return end
    end

    local function fetchData(_err)
        if _err and type(_err) == "string" then
            local errmsg = _err

            _err = {
                err = true,
                msg = errmsg
            }
            
            callback(_err)
            return
        end

        Void.DB:FetchPlayerData(src, function(data, err)
            if err then
                data = {
                    err = true,
                    msg = "Error fetching player data, there is a problem with the database"
                }
            end

            user:setRank(data.rank)

            callback(data)

            if not err then TriggerEvent("erp-base:playerLoggedIn", user) TriggerClientEvent("erp-base:playerLoggedIn", src) end
        end)
    end


	Void.DB:PlayerExistsDB(src, function(exists, err)
		if err then
			fetchData("Error checking player existence, there is a problem with the database")
			return -- my stepsister stuck
		end -- my mother stuck

		if not exists then
			Void.DB:CreateNewPlayer(src, function(created)
				if not created then
					fetchData("Error creating new user, there is a problem with the database")
					return
				end

				if created then fetchData() return end
			end)

			return
		end

		fetchData()
	end)
end
Void.Events:AddEvent(Void.Core, Void.Core.LoginPlayer, "erp-base:loginPlayer")

function Void.Core.FetchPlayerCharacters(self, args, src, callback)
	local user = Void.Player:GetUser(src)

	if not user then return end

	Void.DB:FetchCharacterData(user, function(data, err)
		if err then
			data = {
				err = true,
				msg = "Error fetching player character data, there is a problem with the database"
			}
		else
			user:setCharacters(data)
			user:setVar("charactersLoaded", true)
			TriggerEvent("erp-base:charactersLoaded", user, data)
			TriggerClientEvent("erp-base:charactersLoaded", src, data)
		end

		callback(data)
	end)
end

Void.Events:AddEvent(Void.Core, Void.Core.FetchPlayerCharacters, "erp-base:fetchPlayerCharacters")


function Void.Core.DeleteCharacter(self, id, src, callback)
	local user = Void.Player:GetUser(src)

	if not user or not user:getVar("charactersLoaded") then return end

	local ownsCharacter = false
	for k,v in pairs(user:getCharacters()) do
		if v.id == id then ownsCharacter = true break end
	end

	if not ownsCharacter then return end

	Void.DB:DeleteCharacter(user, id, function(deleted)
		callback(deleted)
	end)
end
Void.Events:AddEvent(Void.Core, Void.Core.DeleteCharacter, "erp-base:deleteCharacter")

function Void.Core.SelectCharacter(self, id, src, callback)
	local user = Void.Player:GetUser(src)
	if not user then callback(false) return end
	if not user:getCharacters() or user:getNumCharacters() <= 0 then callback(false) return end

	if not user:ownsCharacter(id) then callback(false) return end

	local selectedCharacter = user:getCharacter(id)
	selectedCharacter.phone_number = selectedCharacter.phone_number
	user:setCharacter(selectedCharacter)
	user:setVar("characterLoaded", true)
	local cid = selectedCharacter.id
	TriggerClientEvent('updatecid', src, cid)
	TriggerClientEvent('updatecids', src, cid)
	TriggerClientEvent('updateNameClient', src, tostring(selectedCharacter.first_name), tostring(selectedCharacter.last_name))
	TriggerClientEvent('erp-base:setcontrols', src)
	TriggerClientEvent("erp-base:characterLoaded", src, selectedCharacter)

	callback({loggedin = true, chardata = selectedCharacter})
end
Void.Events:AddEvent(Void.Core, Void.Core.SelectCharacter, "erp-base:selectCharacter")