Void.Commands = Void.Commands or {}
Void.Commands.Registered = Void.Commands.Registered or {}

AddEventHandler("erp-base:exportsReady", function()
    addModule("Commands", Void.Commands)
end)
