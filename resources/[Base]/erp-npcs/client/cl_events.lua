RegisterNetEvent("erp-npcs:set:ped")
AddEventHandler("erp-npcs:set:ped", function(pNPCs)
  if type(pNPCs) == "table" then
    for _, ped in ipairs(pNPCs) do
      RegisterNPC(ped, 'erp-npcs')
      EnableNPC(ped.id)
    end
  else
    RegisterNPC(ped, 'erp-npcs')
    EnableNPC(ped.id)
  end
end)

RegisterNetEvent("erp-npcs:ped:giveStolenItems")
AddEventHandler("erp-npcs:ped:giveStolenItems", function(pArgs, pEntity, pEntityFlags, pEntityCoords)
  local npcCoords = GetEntityCoords(pEntity)
  local finished = exports["erp-taskbar"]:taskBar(15000, "Preparing to receive goods, don't move.")
  if finished == 100 then
    if #(GetEntityCoords(PlayerPedId()) - npcCoords) < 2.0 then
      TriggerEvent("server-inventory-open", "1", "Stolen-Goods-1")
    else
      TriggerEvent("DoLongHudText", "You moved too far you idiot.", 2)
    end
  end
end)

RegisterNetEvent("erp-npcs:ped:exchangeRecycleMaterial")
AddEventHandler("erp-npcs:ped:exchangeRecycleMaterial", function(pArgs, pEntity, pEntityFlags, pEntityCoords)
  local npcCoords = GetEntityCoords(pEntity)
  local finished = exports["erp-taskbar"]:taskBar(3000, "Preparing to exchange material.")
  if finished == 100 then
    if #(GetEntityCoords(PlayerPedId()) - npcCoords) < 2.0 then
      TriggerEvent("server-inventory-open", "141", "Craft");
    else
      TriggerEvent("DoLongHudText", "You moved too far you idiot.", 2)
    end
  end
end)

RegisterNetEvent("erp-npcs:ped:signInJob")
AddEventHandler("erp-npcs:ped:signInJob", function(pArgs, pEntity, pEntityFlags, pEntityCoords)
  if #pArgs == 0 then
    local npcId = DecorGetInt(pEntity, 'NPC_ID')
    if npcId == `news_reporter` then
      TriggerServerEvent("jobssystem:jobs", "news")
    elseif npcId == `head_stripper` then
      TriggerServerEvent("jobssystem:jobs", "entertainer")
    end
  else
    TriggerServerEvent("jobssystem:jobs", "unemployed")
  end
end)

RegisterNetEvent("erp-npcs:ped:paycheckCollect")
AddEventHandler("erp-npcs:ped:paycheckCollect", function(pArgs, pEntity, pEntityFlags, pEntityCoords)
  TriggerServerEvent("server:paySlipPickup")
end)

RegisterNetEvent("erp-npcs:ped:receiptTradeIn")
AddEventHandler("erp-npcs:ped:receiptTradeIn", function(pArgs, pEntity, pEntityFlags, pEntityCoords)
  local cid = exports["isPed"]:isPed("cid")
  RPC.execute("ab-inventory:tradeInReceipts", cid, accountTarget)
end)

RegisterNetEvent("erp-npcs:ped:sellStolenItems")
AddEventHandler("erp-npcs:ped:sellStolenItems", function()
  RPC.execute("ab-inventory:sellStolenItems")
end)

RegisterNetEvent("erp-npcs:ped:keeper")
AddEventHandler("erp-npcs:ped:keeper", function(pArgs, pEntity, pEntityFlags, pEntityCoords)
  TriggerEvent("server-inventory-open", pArgs[1], "Shop");
end)


TriggerServerEvent("erp-npcs:location:fetch")

AddEventHandler("erp-npcs:ped:weedSales", function(pArgs, pEntity, pEntityFlags, pEntityCoords)
  local result, message = RPC.execute("erp-npcs:weedShopOpen")
  if not result then
    TriggerEvent("DoLongHudText", message, 2)
    return
  end
  TriggerEvent("server-inventory-open", "44", "Shop");
end)

AddEventHandler("erp-npcs:ped:licenseKeeper", function()
  RPC.execute("erp-npcs:purchaseDriversLicense")
end)

AddEventHandler("erp-npcs:ped:openDigitalDenShop", function()
  TriggerEvent("server-inventory-open", "42073", "Shop")
end)
RegisterNetEvent("erp-npcs:ped:giveidcard")
AddEventHandler("erp-npcs:ped:giveidcard", function()
  RPC.execute("erp-npcs:idcard")
end)

RegisterNetEvent("erp-npcs:ped:garbagejob")
AddEventHandler("erp-npcs:ped:garbagejob", function(pArgs, pEntity, pEntityFlags, pEntityCoords)
  RPC.execute("erp-npcs:GarbageVals")
end)


