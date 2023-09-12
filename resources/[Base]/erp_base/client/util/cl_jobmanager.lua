local playerJob = 'unemployed'
local weaponsLicence = 0
local passes = {}
local PlayerDatas = {}

RegisterNetEvent("erp_base:GetCurrentJob", function(pJob)
    playerJob = pJob
end)

function CurrentJob()
    return playerJob
end

exports("CurrentJob", CurrentJob)

exports("GroupRank", function(groupid) 
    local rank = 0
    for i=1, #passes do
        if passes[i]["pass_type"] == groupid then
            rank = passes[i]["rank"]
        end 
    end
    return rank
end)

exports("WeaponLicense", function() 
    if weaponsLicence == 1 then
        return true
    else
        return false
    end
end)

exports("Passes", function() 
    return passes
end)

RegisterNetEvent('erp_manager:GetWeaponLicenses', function(weaponPass)
    weaponsLicence = weaponPass
end)

RegisterNetEvent('erp_base:passes', function(newpasses)
    passes = newpasses 
end)