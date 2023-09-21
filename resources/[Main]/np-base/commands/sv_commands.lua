NPX.Commands = NPX.Commands or {}
NPX.Commands.Registered = NPX.Commands.Registered or {}

AddEventHandler("np-base:exportsReady", function()
    addModule("Commands", NPX.Commands)
end)

function NPX.Commands.AddCommand(self, command, suggestion, source, cb, args)
    print("[Base] Adding Command "..command)
    if NPX.Commands.Registered[command] then return end
	table.insert(NPX.Commands.Registered, { ['command'] = command, ['suggestion'] = suggestion, ['args'] = args })
	NPX.Commands.Registered[command] = true
	cb(ok)
end

function NPX.Commands.RemoveCommand(self, command, suggestion, source, cb, args)
    print('[Base] Removing Command')
    if not NPX.Commands.Registered[command] or nil then return end
    NPX.Commands.Registered[command] = false
    cb(ok)
end