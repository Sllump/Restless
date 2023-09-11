RegisterNetEvent("arp-npcs:set:ped")
AddEventHandler("arp-npcs:set:ped", function(pNPCs)
  if type(pNPCs) == "table" then
    for _, ped in ipairs(pNPCs) do
      RegisterNPC(ped, 'arp-npcs')
      EnableNPC(ped.id)
    end
  else
    RegisterNPC(ped, 'arp-npcs')
    EnableNPC(ped.id)
  end
end)

RegisterNetEvent("arp-npcs:ped:giveStolenItems")
AddEventHandler("arp-npcs:ped:giveStolenItems", function(pArgs, pEntity, pEntityFlags, pEntityCoords)
  local npcCoords = GetEntityCoords(pEntity)
  local finished = exports["arp-taskbar"]:taskBar(15000, "Preparing to receive goods, don't move.")
  if finished == 100 then
    if #(GetEntityCoords(PlayerPedId()) - npcCoords) < 2.0 then
      TriggerEvent("server-inventory-open", "1", "Stolen-Goods-1")
    else
      TriggerEvent("DoLongHudText", "You moved too far you idiot.", 2)
    end
  end
end)

RegisterNetEvent("arp-npcs:ped:exchangeRecycleMaterial")
AddEventHandler("arp-npcs:ped:exchangeRecycleMaterial", function(pArgs, pEntity, pEntityFlags, pEntityCoords)
  local npcCoords = GetEntityCoords(pEntity)
  local finished = exports["arp-taskbar"]:taskBar(3000, "Preparing to exchange material.")
  if finished == 100 then
    if #(GetEntityCoords(PlayerPedId()) - npcCoords) < 2.0 then
      TriggerEvent("server-inventory-open", "141", "Craft");
    else
      TriggerEvent("DoLongHudText", "You moved too far you idiot.", 2)
    end
  end
end)

RegisterNetEvent("arp-npcs:ped:signInJob")
AddEventHandler("arp-npcs:ped:signInJob", function(pArgs, pEntity, pEntityFlags, pEntityCoords)
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

RegisterNetEvent("arp-npcs:ped:paycheckCollect")
AddEventHandler("arp-npcs:ped:paycheckCollect", function(pArgs, pEntity, pEntityFlags, pEntityCoords)
  TriggerServerEvent("server:paySlipPickup")
end)

RegisterNetEvent("arp-npcs:ped:receiptTradeIn")
AddEventHandler("arp-npcs:ped:receiptTradeIn", function(pArgs, pEntity, pEntityFlags, pEntityCoords)
  local cid = exports["isPed"]:isPed("cid")
  RPC.execute("ab-inventory:tradeInReceipts", cid, accountTarget)
end)

RegisterNetEvent("arp-npcs:ped:sellStolenItems")
AddEventHandler("arp-npcs:ped:sellStolenItems", function()
  RPC.execute("ab-inventory:sellStolenItems")
end)

RegisterNetEvent("arp-npcs:ped:keeper")
AddEventHandler("arp-npcs:ped:keeper", function(pArgs, pEntity, pEntityFlags, pEntityCoords)
  TriggerEvent("server-inventory-open", pArgs[1], "Shop");
end)


TriggerServerEvent("arp-npcs:location:fetch")

AddEventHandler("arp-npcs:ped:weedSales", function(pArgs, pEntity, pEntityFlags, pEntityCoords)
  local result, message = RPC.execute("arp-npcs:weedShopOpen")
  if not result then
    TriggerEvent("DoLongHudText", message, 2)
    return
  end
  TriggerEvent("server-inventory-open", "44", "Shop");
end)

AddEventHandler("arp-npcs:ped:licenseKeeper", function()
  RPC.execute("arp-npcs:purchaseDriversLicense")
end)

AddEventHandler("arp-npcs:ped:openDigitalDenShop", function()
  TriggerEvent("server-inventory-open", "42073", "Shop")
end)
RegisterNetEvent("arp-npcs:ped:giveidcard")
AddEventHandler("arp-npcs:ped:giveidcard", function()
  RPC.execute("arp-npcs:idcard")
end)

RegisterNetEvent("arp-npcs:ped:garbagejob")
AddEventHandler("arp-npcs:ped:garbagejob", function(pArgs, pEntity, pEntityFlags, pEntityCoords)
  RPC.execute("arp-npcs:GarbageVals")
end)


