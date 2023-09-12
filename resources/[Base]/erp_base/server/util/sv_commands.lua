Ethereal.Commands = Ethereal.Commands or {}
Ethereal.Commands.List = Ethereal.Commands.List or {}

Ethereal.Commands.Add = function(command, rank, help, arguments, handler)
    local command, rank, help, arguments, handler = command, rank, help, arguments, handler

    Ethereal.Commands.List[command] = {
		name = command,
		help = help,
		arguments = arguments,
    }

    RegisterCommand(command, function(source,args,rawcommand)
        local src = source
        local player = Ethereal.GetPlayer(src)

        if player.HasRank(rank) then
            handler(source,args,rawcommand)
        else
            TriggerClientEvent('chat:addMessage', src, {
                template = '<div class="chat-message-system"><b>SYSTEM :</b> {0}</div>',
                args = { 'This command is not for you!' }
            })
        end
    end)
    
    TriggerClientEvent('chat:addSuggestion', -1, "/" .. Ethereal.Commands.List[command]["name"], Ethereal.Commands.List[command]["help"], Ethereal.Commands.List[command]["arguments"])
end

Ethereal.Commands.Refresh = function(source)
	for index, command in pairs(Ethereal.Commands.List) do
		TriggerClientEvent('chat:addSuggestion', source, "/" .. command["name"], command["help"], command["arguments"])
	end
end

-- Ethereal.Commands.Add("skin", 'admin', 'Clothing menu for admin', {{ name = 'id', help = 'Player ID' }}, function(source,args)
--     local src = source
--     local player = Ethereal.GetPlayer(src)
--     local target = Ethereal.GetPlayer(tonumber(args[1]))

--     TriggerClientEvent("erp_clothingmenu:openmenu", target ~= nil and tonumber(args[1]) or src)
-- end)


Ethereal.Commands.Add("ban", 'admin', 'Ban player', {{ name = 'id', help = 'Player ID' }, { name = 'expire', help = 'Ban expire in days' }, { name = 'reason', help = 'Ban Reason' }}, function(source,args)
    local src = source
    local player = Ethereal.GetPlayer(src)
    local target = Ethereal.GetPlayer(tonumber(args[1]))

    if target then
        if args[2] and tonumber(args[2]) > 0 then
            if args[3] and string.len(args[3]) > 2 then
                Ethereal.Player.Ban(tonumber(args[1]), args[3], args[2])
            else
                TriggerClientEvent('chat:addMessage', src, {
                    template = '<div class="chat-message-system"><b>SYSTEM :</b> {0}</div>',
                    args = { 'Reason Too Short' }
                })
            end
        else
            TriggerClientEvent('chat:addMessage', src, {
                template = '<div class="chat-message-system"><b>SYSTEM :</b> {0}</div>',
                args = { 'Invaild Ban Expire' }
            })
        end
    else
        TriggerClientEvent('chat:addMessage', src, {
            template = '<div class="chat-message-system"><b>SYSTEM :</b> {0}</div>',
            args = { 'Player Offline' }
        })
    end
end)

Ethereal.Commands.Add("kick", 'admin', 'Kick player', {{ name = 'id', help = 'Player ID' }, { name = 'reason', help = 'Ban Reason' }}, function(source,args)
    local src = source
    local player = Ethereal.GetPlayer(src)
    local target = Ethereal.GetPlayer(tonumber(args[1]))

    if target then
        if args[2] and string.len(args[2]) > 2 then
            DropPlayer(tonumber(args[1]), args[2])
        else
            TriggerClientEvent('chat:addMessage', src, {
                template = '<div class="chat-message-system"><b>SYSTEM :</b> {0}</div>',
                args = { 'Reason Too Short' }
            })
        end
    else
        TriggerClientEvent('chat:addMessage', src, {
            template = '<div class="chat-message-system"><b>SYSTEM :</b> {0}</div>',
            args = { 'Player Offline' }
        })
    end
end)
