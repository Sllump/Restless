
-- // Hydra Incorporation Meeting Table Chairs // --

-- // Polyzones // --

-- // Chair 1 // --

RegisterNetEvent('emotes:hydra_incorporation:chair1')
AddEventHandler('emotes:hydra_incorporation:chair1', function()
    SetEntityCoords(PlayerPedId(), -718.0867, 264.59802, 83.32862)
    SetEntityHeading(PlayerPedId(), 99.897529)
    TriggerEvent('animation:Chair2')
end)

HydraChair1 = false

Citizen.CreateThread(function()
    exports["erp-polyzone"]:AddBoxZone("chair_1", vector3(-717.54, 264.65, 84.1), 1, 1.4, {
        name="chair_1",
        heading=285,
        minZ=82.1,
        maxZ=85.5
    })
end)

RegisterNetEvent('erp-polyzone:enter')
AddEventHandler('erp-polyzone:enter', function(name)
    if name == "chair_1" then
        HydraChair1 = true     
        exports['erp-interface']:showInteraction("[E] Sit Down")
        Chair1()
    end
end)

RegisterNetEvent('erp-polyzone:exit')
AddEventHandler('erp-polyzone:exit', function(name)
    if name == "chair_1" then
        HydraChair1 = false
        exports['erp-interface']:hideInteraction()
    end
end)

function Chair1()
	Citizen.CreateThread(function()
        while HydraChair1 do
            Citizen.Wait(5)
			if IsControlJustReleased(0, 38) then
                TriggerEvent('emotes:hydra_incorporation:chair1')
                exports['erp-interface']:hideInteraction()
			end
		end
	end)
end

-- // Chair 2 // --

RegisterNetEvent('emotes:hydra_incorporation:chair2')
AddEventHandler('emotes:hydra_incorporation:chair2', function()
    SetEntityCoords(PlayerPedId(), -718.7024, 265.88601, 83.154853)
    SetEntityHeading(PlayerPedId(), 99.428909)
    TriggerEvent('animation:Chair2')
end)

HydraChair2 = false

Citizen.CreateThread(function()
    exports["erp-polyzone"]:AddBoxZone("chair_2", vector3(-718.07, 266.23, 84.1), 1, 1.4, {
        name="chair_2",
        heading=285,
        minZ=81.5,
        maxZ=85.5
    })
end)

RegisterNetEvent('erp-polyzone:enter')
AddEventHandler('erp-polyzone:enter', function(name)
    if name == "chair_2" then
        HydraChair2 = true     
        exports['erp-interface']:showInteraction("[E] Sit Down")
        Chair2()
    end
end)

RegisterNetEvent('erp-polyzone:exit')
AddEventHandler('erp-polyzone:exit', function(name)
    if name == "chair_2" then
        HydraChair2 = false
        exports['erp-interface']:hideInteraction()
    end
end)

function Chair2()
	Citizen.CreateThread(function()
        while HydraChair2 do
            Citizen.Wait(5)
			if IsControlJustReleased(0, 38) then
                TriggerEvent('emotes:hydra_incorporation:chair2')
                exports['erp-interface']:hideInteraction()
			end
		end
	end)
end

-- // Chair 3 // --

RegisterNetEvent('emotes:hydra_incorporation:chair3')
AddEventHandler('emotes:hydra_incorporation:chair3', function()
    SetEntityCoords(PlayerPedId(), -719.9909, 265.35678, 83.197975)
    SetEntityHeading(PlayerPedId(), 291.5794)
    TriggerEvent('animation:Chair2')
end)

HydraChair3 = false

Citizen.CreateThread(function()
    exports["erp-polyzone"]:AddBoxZone("chair_3", vector3(-720.47, 265.3, 84.13), 1, 1.4, {
        name="chair_3",
        heading=295,
        minZ=81.53,
        maxZ=85.53
    })
end)

RegisterNetEvent('erp-polyzone:enter')
AddEventHandler('erp-polyzone:enter', function(name)
    if name == "chair_3" then
        HydraChair3 = true     
        exports['erp-interface']:showInteraction("[E] Sit Down")
        Chair3()
    end
end)

RegisterNetEvent('erp-polyzone:exit')
AddEventHandler('erp-polyzone:exit', function(name)
    if name == "chair_3" then
        HydraChair3 = false
        exports['erp-interface']:hideInteraction()
    end
end)

function Chair3()
	Citizen.CreateThread(function()
        while HydraChair3 do
            Citizen.Wait(5)
			if IsControlJustReleased(0, 38) then
                TriggerEvent('emotes:hydra_incorporation:chair3')
                exports['erp-interface']:hideInteraction()
			end
		end
	end)
end

-- // Chair 4 // --

RegisterNetEvent('emotes:hydra_incorporation:chair4')
AddEventHandler('emotes:hydra_incorporation:chair4', function()
    SetEntityCoords(PlayerPedId(), -719.3582, 263.85879, 83.206802)
    SetEntityHeading(PlayerPedId(), 294.82189)
    TriggerEvent('animation:Chair2')
end)

HydraChair4 = false

Citizen.CreateThread(function()
    exports["erp-polyzone"]:AddBoxZone("chair_4", vector3(-719.74, 263.5, 84.13), 1.4, 1, {
        name="chair_4",
        heading=25,
        minZ=81.53,
        maxZ=85.53
    })
end)

RegisterNetEvent('erp-polyzone:enter')
AddEventHandler('erp-polyzone:enter', function(name)
    if name == "chair_4" then
        HydraChair4 = true     
        exports['erp-interface']:showInteraction("[E] Sit Down")
        Chair4()
    end
end)

RegisterNetEvent('erp-polyzone:exit')
AddEventHandler('erp-polyzone:exit', function(name)
    if name == "chair_4" then
        HydraChair4 = false
        exports['erp-interface']:hideInteraction()
    end
end)

function Chair4()
	Citizen.CreateThread(function()
        while HydraChair4 do
            Citizen.Wait(5)
			if IsControlJustReleased(0, 38) then
                TriggerEvent('emotes:hydra_incorporation:chair4')
                exports['erp-interface']:hideInteraction()
			end
		end
	end)
end