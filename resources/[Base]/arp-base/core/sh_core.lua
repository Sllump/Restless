Void.Core = Void.Core or {}

function Void.Core.ConsoleLog(self, msg, mod)
    if not tostring(msg) then return end
    if not tostring(mod) then mod = "No Module" end
    
    local pMsg = string.format("[ot LOG - %s] %s", mod, msg)
    if not pMsg then return end

end

RegisterNetEvent("arp-base:consoleLog")
AddEventHandler("arp-base:consoleLog", function(msg, mod)
    Void.Core:ConsoleLog(msg, mod)
end)

function getModule(module)
    if not Void[module] then print("Warning: '" .. tostring(module) .. "' module doesn't exist") return false end
    return Void[module]
end

function addModule(module, tbl)
    if Void[module] then print("Warning: '" .. tostring(module) .. "' module is being overridden") end
    Void[module] = tbl
end

Void.Core.ExportsReady = false

function Void.Core.WaitForExports(self)
    Citizen.CreateThread(function()
        while true do
            Citizen.Wait(0)
            if exports and exports["arp-base"] then
                TriggerEvent("arp-base:exportsReady")
                Void.Core.ExportsReady = true
                return
            end
        end
    end)
end

exports("getModule", getModule)
exports("addModule", addModule)
Void.Core:WaitForExports()