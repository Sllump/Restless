Ethereal.Player = Ethereal.Player or {}
Ethereal.LocalPlayer = {}
Ethereal.DiscordData = {}

Citizen.CreateThread(function()
    while true do
        if NetworkIsSessionStarted() then
            TriggerEvent("erp_base:playerSessionStarted")
            TriggerServerEvent("erp_base:playerSessionStarted")
            break
        end
    end
end)

RegisterNetEvent("erp_base:updateClient")
AddEventHandler("erp_base:updateClient", function(data)
    Ethereal.LocalPlayer = data
end)

RegisterNetEvent("erp_base:playerSessionStarted")
AddEventHandler("erp_base:playerSessionStarted", function()
    Citizen.CreateThread(function()
        FreezeEntityPosition(PlayerPedId(), true)
        ShutdownLoadingScreen()

        SetCanAttackFriendly(GetPlayerPed(-1), true, false)
        NetworkSetFriendlyFireOption(true)
        exports['erp_charmenu']:OpenCharacterMenu(true)
        TriggerEvent('erp_charmenu:client:OpenCharmenu')
        TriggerEvent("erp_weathersync:spawned")

        while IsScreenFadingIn() do
            Citizen.Wait(0)
        end
    end)
end)

Ethereal.Player.PlayerLoop = function()
    SetNuiFocus(false, false)
    Citizen.CreateThread(function()
        while true do
            Citizen.Wait(15000)
            ped = PlayerPedId()
            coords = GetEntityCoords(ped)
            heading = GetEntityHeading(ped)
            TriggerServerEvent("erp_base:updatePlayerLocation", { x = coords.x, y = coords.y, z = coords.z, h = heading })
        end
    end)
end

RegisterNetEvent("erp_base:networkDiscord")
AddEventHandler("erp_base:networkDiscord", function(data)
    Ethereal.DiscordData = data
end)

Ethereal.GetPlayerName = function(source, discriminator)
    local src = source ~= source and source or PlayerId()

    if GetPlayerServerId(source) and Ethereal.DiscordData[GetPlayerServerId(source)] then
        return discriminator == true and (Ethereal.DiscordData[GetPlayerServerId(source)].user.username .. '#' .. Ethereal.DiscordData[GetPlayerServerId(source)].user.discriminator) or (Ethereal.DiscordData[GetPlayerServerId(source)].user.username)
    end
    return nil
end

exports("GetPlayerName", Ethereal.GetPlayerName)

blacklists = {
    "APC",
    "BALLER5",
    "BALLER6",
    "BLIMP",
    "BLIMP2",
    "BLAZER4",
    "BLAZER5",
    "BRICKADE",
    "BUZZARD",
    "BOXVILLE5",
    "CARGOPLANE",
    "COG552",
    "COGNOSCENTI2",
    "DUKES2",
    "DUNE2",
    "DUNE3",
    "DUNE4",
    "DUNE5",
    "DUMP",
    "HYDRA",
    "INSURGENT",
    "INSURGENT2",
    "INSURGENT3",
    "JET",
    "LAZER",
    "LIMO2",
    "MARSHALL",
    "MONSTER",
    "RHINO",
    "SAVAGE",
    "SCHAFTER5",
    "SCHAFTER6",
    "SHEAVA",
    "SHOTARO",
    "SKYLIFT",
    "TECHNICAL",
    "TECHNICAL2",
    "TECHNICAL3",
    "TROPHYTRUCK",
    "TROPHYTRUCK2",
    "TUG",
    "VALKYRIE",
    "VALKYRIE2",
    "XLS2",
    "OPPRESSOR",
    "TAMPA3",
    "TRAILERSMALL2",
    "ARDENT",
    "HALFTRACK",
    "PHANTOM2",
    "RUINER2",
    "VOLTIC2",
    "WASTELANDER",
    "NIGHTSHARK",
    "CARTRAILER",
    "RAMPTRUCK",
    "HUNTER",
    "VIGILANTE",
    "BOMBUSHKA",
    "ROGUE",
    "ALPHAZ1",
    "STARLING",
    "TULA",
    "RIOT2",
    "AKULA",
    "AVENGER",
    "AVENGER2",
    "BARRAGE",
    "CHERNOBOG",
    "KHANJALI",
    "STROMBERG",
    "VOLATOL",
    "THRUSTER",
    "PYRO",
    "MOGUL",
    "NOKOTA",
    "BOMBUSHKA",
    "MOLOTOK",
    "MICROLIGHT",
    "REVOLTER",
    "DELUXO",
    "SEABREEZE",
    "CARACARA",
    "ISSI4",
    "ISSI5",
    "ISSI6",
    "DOMINATOR4",
    "DOMINATOR5",
    "DOMINATOR6",
    "IMPALER",
    "IMPALER2",
    "IMPALER3",
    "IMPALER4",
    "IMPERATOR",
    "IMPERATOR2",
    "IMPERATOR3",
    "RUINER3",
    "SLAMVAN4",
    "SLAMVAN5",
    "SLAMVAN6",
    "COMET4",
    "ZR380",
    "ZR3802",
    "ZR3803",
    "DEATHBIKE",
    "DEATHBIKE2",
    "DEATHBIKE3",
    "OPPRESSOR2",
    "BRUISER",
    "BRUISER2",
    "BRUISER3",
    "BRUTUS",
    "BRUTUS2",
    "BRUTUS3",
    "MENACER",
    "MONSTER3",
    "MONSTER4",
    "MONSTER5",
    "RCBANDITO",
    "CUTTER",
    "RUMPO3",
    "MULE4",
    "HAULER2",
    "CERBERUS",
    "CERBERUS2",
    "CERBERUS3",
    "PHANTOM3",
    "POUNDER2",
    "TERBYTE",
    "CABLECAR",
    "FRIEGHT",
    "FRIEGHTCAR",
    "FRIEGHTCONT1",
    "FRIEGHTCONT2",
    "FRIEGHTGRAIN",
    "METROTRAIN",
    "TANKERCAR",
}


Citizen.CreateThread(function()
    while true do
        Citizen.Wait(1)
        local ped = GetPlayerPed(-1)
        if DoesEntityExist(ped) and not IsEntityDead(ped) then
            local ped = PlayerPedId()
            veh = nil
        
            if IsPedInAnyVehicle(ped, false) then
                veh = GetVehiclePedIsUsing(ped)
            else
                veh = GetVehiclePedIsTryingToEnter(ped)
            end
            
            
            if veh and DoesEntityExist(veh) then
                local model = GetEntityModel(veh)
                local driver = GetPedInVehicleSeat(veh, -1)
                if driver == ped then
                    for i = 1, #blacklists do
                        local rmodel1 = GetHashKey(blacklists[i])
                        if (model == rmodel1) or (GetVehicleClass(veh) == 19) then -- Military
                            DeleteE(veh)
                            ClearPedTasksImmediately(ped)
                        end
                    end
                end
            end
        end
    end
end)

function DeleteE(entity)
	Citizen.InvokeNative(0xAE3CBE5BF394C9C9, Citizen.PointerValueIntInitialized(entity))
end
