RegisterServerEvent("rlrp-inventory:cash:remove")
AddEventHandler("rlrp-inventory:cash:remove", function(src,amount)
    local user = exports["rlrp-base"]:getModule("Player"):GetUser(src)
    user:removeMoney(tonumber(amount))
end)

AddEventHandler('inventory:saveHoneyItem', function(pSource, pItemId, pAmount, pCost, pTargetInv)
    local user = exports["rlrp-base"]:getModule("Player"):GetUser(pSource)

    if not user then return end

    exports["rlrp-log"]:AddLog("Exploiter", user, ("User duped inventory item [%s]x%s"):format(pItemId or 'N/A', pAmount or 'N/A'), { item = pItemId, amount = pAmount, target = pTargetInv})
end)

AddEventHandler('onResourceStart', function(resource)    
	if resource == GetCurrentResourceName() then
    print('DELETE ALL DROPS')
    exports.oxmysql:execute( "DELETE FROM user_inventory2 WHERE name like '%Drop-%'" )
	end
end)