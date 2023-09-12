Void.Logs = Void.Logs or {}

Void.Logs.Webhooks = {
    ['Connection'] = 'https://discord.com/api/webhooks/1001667412611043468/h5wkjRU-bvmtXKF6AUKXoeXIOk2f5mxiuBkqkQrwJ4PYVVIhTC-myfJQMWJClamRupsG',
    ['Leave'] = 'https://discord.com/api/webhooks/1001667486372085840/35LXtWTO5w6dgYuABrBMqBw7OyLtEIyyhrtXdGKilPgE12vg8xpd5RnsdDsjfMeRAsmw',
    ['Character'] = 'https://discord.com/api/webhooks/1001668467461730355/JOIFzPBsEBdN05aOQqS8SRI_B_v34mU-gHJZ9kb-Y8W2ClPCZL54dL7agviCiVbIbzKP',
    ['DeathLogs'] = 'https://discord.com/api/webhooks/1001667568639160360/gz4svvXUSc7zNGSrBdHnze68rUaxb_rFa453AXmGhp-OF9DlJ5EO8DKi2t2-9SiQEW_c',
    ['Widthdraw'] = 'https://discord.com/api/webhooks/1001668603575283824/nrEFSKd6lL32xoh79Wh3OOYm0lXiMDSFqrImC09qfDZeZDSx2D2LUyMmLX2LsG9zxJUJi',
    ['Deposit'] = 'https://discord.com/api/webhooks/1001668668154970183/NPCGIIx1xK48t7nS87AEagcSuOaa-XuFjeyOdNlu2ylLnNWMb9R8mnBwiZeG0HLmvMgK',
    ['Transfer'] = 'https://discord.com/api/webhooks/1001668747716735066/l9WLDjDOg-ZRx2jM04cgTFM1L2YtFt7L49eMGtUDAhcKphOWrQO7sQd5E1MbRV1JYY81',
    ['Givecash'] = 'https://discord.com/api/webhooks/1001668852435914853/ao7bwcgHIp3VeHG7xBCGz0TYs8ajezJVoTVR00A1TgVUV3Ez546PnkPqxvec9We8T55a',
    ['Fishing'] = 'https://discord.com/api/webhooks/1001668927123894312/I6ZUnEWL1-VckbVM4InkOEykklx2QXxmYxK7jF4dNjZOGHX-wxknj5yd42JgobYv8GWz',
    ['Garbage'] = 'https://discord.com/api/webhooks/1001669006996029482/OhcQNAgal-kmdpGpfIntewpVcZfOB3lOmCZhIP5KBD4pjWG5WBWJdtPduuT_KCLrpuzS',
    ['Hunting'] = 'https://discord.com/api/webhooks/1001669155486973962/UzfNtelxzjrdEuIPwUAb5plH9o5x3X-VtbHFChkkz1j2b6E6Itu7MLjEefmeZh07EQnI',
    ['Mining'] = 'https://discord.com/api/webhooks/1001669220398018570/nZGSeelDCNa17Qsf0j2iRUARtpYJJy5xWtKodz7jsLW7Wi-B1G4NF0KW3lwIArk7xkt0',
    ['PostOP'] = 'https://discord.com/api/webhooks/1001669284415676537/_Cktk_1dpEPE85CJs10tcyLNbE3CscKSLK41WRI2JEZJcB-z90mc6GjpxoJdQbslu0W4',
    ['WaterPower'] = 'https://discord.com/api/webhooks/1001669357811798117/tMR5oLDzz4KBRw7XliufFXc45zSgc0JUu249S8QtSl9qJbWYm1WNIPIBTYGumzvkdDJP',
    ['Chicken'] = 'https://discord.com/api/webhooks/1001669420889940030/01iMvpaQi2R5sHW1orJcomFZ_NjTCa7OgLzzkWhDDtwCtelfgqmFpCzYVf9nO8ocKgXM',
}

Void.Logs.JoinLog = function(self, pName, pSteam, pDiscord)
    local embed = {
        {
            ['description'] = string.format("`User is joining!`\n\n━━━━━━━━━━━━━━━━━━\n\n`• Steam: %s`\n\n`• Discord: %s`\n━━━━━━━━━━━━━━━━━━", pSteam, pDiscord),
            ['color'] = 3124231,
            ['author'] = {
                ['name'] = pName
            }
        }
    }
    PerformHttpRequest(Void.Logs.Webhooks['Connection'], function(err, text, headers) end, 'POST', json.encode({username = 'Connection Logs', embeds = embed}), { ['Content-Type'] = 'application/json' })
end

Void.Logs.ExitLog = function(self, dReason, pName, pSteam, pDiscord)
    local embed = {
        {
            ['description'] = string.format("`User has left!`\n\n`• Reason: %s`\n\n━━━━━━━━━━━━━━━━━━\n\n`• Steam: %s`\n\n`• Discord: %s`\n━━━━━━━━━━━━━━━━━━", dReason, pSteam, pDiscord),
            ['color'] = 14038582,
            ['author'] = {
                ['name'] = pName
            }
        }
    }
    PerformHttpRequest(Void.Logs.Webhooks['Leave'], function(err, text, headers) end, 'POST', json.encode({username = 'Connection Logs', embeds = embed}), { ['Content-Type'] = 'application/json' })
end

Void.Logs.DeathLogs = function(self, uId, message)
    local embed = {
        {
            ['description'] = string.format("`Death Log Created.`\n\n━━━━━━━━━━━━━━━━━━\n`• ".. message .. "`\n━━━━━━━━━━━━━━━━━━"),
            ['color'] = 3593942,
        }
    }
    PerformHttpRequest(Void.Logs.Webhooks['DeathLogs'], function(err, text, headers) end, 'POST', json.encode({username = 'User Logs', embeds = embed}), { ['Content-Type'] = 'application/json' })
end

Void.Logs.BankingWidthdraw = function(self, uId, pName, pSteam, pDiscord, pulled, cashleft, bankleft)
    local embed = {
        {
            ['description'] = string.format("`Bank Log Widthdraw Created.`\n\n`• User Id: %s`\n\n━━━━━━━━━━━━━━━━━━\n\n`• Steam: %s`\n\n`• Discord: %s`\n\n━━━━━━━━━━━━━━━━━━\n\n`• Amount Withdrawn: $%s`\n\n`• Cash Balance: $%s`\n\n`• Bank Balance: $%s`\n━━━━━━━━━━━━━━━━━━", uId, pSteam, pDiscord, pulled, cashleft, bankleft),
            ['color'] = 8795862,
            ['author'] = {
                ['name'] = pName
            }
        }
    }
    PerformHttpRequest(Void.Logs.Webhooks['Widthdraw'], function(err, text, headers) end, 'POST', json.encode({username = 'User Logs', embeds = embed}), { ['Content-Type'] = 'application/json' })
end

Void.Logs.BankingDeposit = function(self, uId, pName, pSteam, pDiscord, pulled, cashleft, bankleft)
    local embed = {
        {
            ['description'] = string.format("`Bank Deposit Log Created.`\n\n`• User Id: %s`\n\n━━━━━━━━━━━━━━━━━━\n\n`• Steam: %s`\n\n`• Discord: %s`\n\n━━━━━━━━━━━━━━━━━━\n\n`• Amount Deposited: $%s`\n\n`• Cash Balance: $%s`\n\n`• Bank Balance: $%s`\n━━━━━━━━━━━━━━━━━━", uId, pSteam, pDiscord, pulled, cashleft, bankleft),
            ['color'] = 8795862,
            ['author'] = {
                ['name'] = pName
            }
        }
    }
    PerformHttpRequest(Void.Logs.Webhooks['Deposit'], function(err, text, headers) end, 'POST', json.encode({username = 'User Logs', embeds = embed}), { ['Content-Type'] = 'application/json' })
end

Void.Logs.BankingTransfer = function(self, uId, uId2, pName, pName2, pSteam, pDiscord, pSteam2, pDiscord2, pulled, cashleft, bankleft, pulled2, cashleft2, bankleft2)
    local embed = {
        {
            ['description'] = string.format("`Bank Transfer Log Created.`\n\n`• Player User Id: %s`\n\n`• Target User Id: %s`\n\n━━━━━━━━━━━━━━━━━━\n\n`• Player Steam: %s`\n\n`• Player Discord: %s`\n\n━━━━━━━━━━━━━━━━━━\n\n`• Target Steam: %s`\n\n`• Target Discord: %s`\n\n━━━━━━━━━━━━━━━━━━\n\n`• Player Amount Transfered: $%s`\n\n`• Player Cash Balance: $%s`\n\n`• Player Bank Balance: $%s`\n\n━━━━━━━━━━━━━━━━━━\n\n`• Target Amount Received: $%s`\n\n`• Target Cash Balance: $%s`\n\n`• Target Bank Balance: $%s`\n━━━━━━━━━━━━━━━━━━", uId, uId2, pSteam, pDiscord, pSteam2, pDiscord2, pulled, cashleft, bankleft, pulled2, cashleft2, bankleft2),
            ['color'] = 8795862,
            ['author'] = {
                ['name'] = "Player : " .. pName .. " | Target : ".. pName2
            }
        }
    }
    PerformHttpRequest(Void.Logs.Webhooks['Transfer'], function(err, text, headers) end, 'POST', json.encode({username = 'User Logs', embeds = embed}), { ['Content-Type'] = 'application/json' })
end

Void.Logs.BankingGiveCash = function(self, uId, uId2, pName, pName2, pSteam, pDiscord, pSteam2, pDiscord2, pulled, cashleft, bankleft, pulled2, cashleft2, bankleft2)
    local embed = {
        {
            ['description'] = string.format("`Cash Given Log Created.`\n\n`• Player User Id: %s`\n\n`• Target User Id: %s`\n\n━━━━━━━━━━━━━━━━━━\n\n`• Player Steam: %s`\n\n`• Player Discord: %s`\n\n━━━━━━━━━━━━━━━━━━\n\n`• Target Steam: %s`\n\n`• Target Discord: %s`\n\n━━━━━━━━━━━━━━━━━━\n\n`• Player Amount Transfered: $%s`\n\n`• Player Cash Balance: $%s`\n\n`• Player Bank Balance: $%s`\n\n━━━━━━━━━━━━━━━━━━\n\n`• Target Amount Received: $%s`\n\n`• Target Cash Balance: $%s`\n\n`• Target Bank Balance: $%s`\n━━━━━━━━━━━━━━━━━━", uId, uId2, pSteam, pDiscord, pSteam2, pDiscord2, pulled, cashleft, bankleft, pulled2, cashleft2, bankleft2),
            ['color'] = 8795862,
            ['author'] = {
                ['name'] = "Player : " .. pName .. " | Target : ".. pName2
            }
        }
    }
    PerformHttpRequest(Void.Logs.Webhooks['Givecash'], function(err, text, headers) end, 'POST', json.encode({username = 'User Logs', embeds = embed}), { ['Content-Type'] = 'application/json' })
end

Void.Logs.FishingLog = function(self, uId, pName, pSteam, pDiscord, amount)
    local embed = {
        {
            ['description'] = string.format("`Fishing Payment Log Created.`\n\n`• Steam: %s`\n\n`• Discord: %s`\n━━━━━━━━━━━━━━━━━━\n\n`• User ID: %s`\n\n`• Payment Amount: %s`\n\n━━━━━━━━━━━━━━━━━━\n\n", pSteam, pDiscord, uId, amount),
            ['color'] = 0128128,
            ['author'] = {
                ['name'] = pName
            }
        }
    }
    PerformHttpRequest(Void.Logs.Webhooks['Fishing'], function(err, text, headers) end, 'POST', json.encode({username = 'Fishing Logs', embeds = embed}), { ['Content-Type'] = 'application/json' })
end

Void.Logs.GarbageLog = function(self, uId, pName, pSteam, pDiscord, amount)
    local embed = {
        {
            ['description'] = string.format("`Garbage Payment Log Created.`\n\n`• Steam: %s`\n\n`• Discord: %s`\n━━━━━━━━━━━━━━━━━━\n\n`• User ID: %s`\n\n`• Payment Amount: %s`\n\n━━━━━━━━━━━━━━━━━━\n\n", pSteam, pDiscord, uId, amount),
            ['color'] = 0128128,
            ['author'] = {
                ['name'] = pName
            }
        }
    }
    PerformHttpRequest(Void.Logs.Webhooks['Garbage'], function(err, text, headers) end, 'POST', json.encode({username = 'Garbage Logs', embeds = embed}), { ['Content-Type'] = 'application/json' })
end

Void.Logs.HuntingLog = function(self, uId, pName, pSteam, pDiscord, amount)
    local embed = {
        {
            ['description'] = string.format("`Hunting Payment Log Created.`\n\n`• Steam: %s`\n\n`• Discord: %s`\n━━━━━━━━━━━━━━━━━━\n\n`• User ID: %s`\n\n`• Payment Amount: %s`\n\n━━━━━━━━━━━━━━━━━━\n\n", pSteam, pDiscord, uId, amount),
            ['color'] = 0128128,
            ['author'] = {
                ['name'] = pName
            }
        }
    }
    PerformHttpRequest(Void.Logs.Webhooks['Hunting'], function(err, text, headers) end, 'POST', json.encode({username = 'Hunting Logs', embeds = embed}), { ['Content-Type'] = 'application/json' })
end

Void.Logs.MiningLog = function(self, uId, pName, pSteam, pDiscord, amount)
    local embed = {
        {
            ['description'] = string.format("`Mining Payment Log Created.`\n\n`• Steam: %s`\n\n`• Discord: %s`\n━━━━━━━━━━━━━━━━━━\n\n`• User ID: %s`\n\n`• Payment Amount: %s`\n\n━━━━━━━━━━━━━━━━━━\n\n", pSteam, pDiscord, uId, amount),
            ['color'] = 0128128,
            ['author'] = {
                ['name'] = pName
            }
        }
    }
    PerformHttpRequest(Void.Logs.Webhooks['Mining'], function(err, text, headers) end, 'POST', json.encode({username = 'Mining Logs', embeds = embed}), { ['Content-Type'] = 'application/json' })
end

Void.Logs.PostOPLog = function(self, uId, pName, pSteam, pDiscord, amount)
    local embed = {
        {
            ['description'] = string.format("`PostOP Payment Log Created.`\n\n`• Steam: %s`\n\n`• Discord: %s`\n━━━━━━━━━━━━━━━━━━\n\n`• User ID: %s`\n\n`• Payment Amount: %s`\n\n━━━━━━━━━━━━━━━━━━\n\n", pSteam, pDiscord, uId, amount),
            ['color'] = 0128128,
            ['author'] = {
                ['name'] = pName
            }
        }
    }
    PerformHttpRequest(Void.Logs.Webhooks['PostOP'], function(err, text, headers) end, 'POST', json.encode({username = 'PostOP Logs', embeds = embed}), { ['Content-Type'] = 'application/json' })
end

Void.Logs.WaterPowerLog = function(self, uId, pName, pSteam, pDiscord, amount)
    local embed = {
        {
            ['description'] = string.format("`Water & Power Payment Log Created.`\n\n`• Steam: %s`\n\n`• Discord: %s`\n━━━━━━━━━━━━━━━━━━\n\n`• User ID: %s`\n\n`• Payment Amount: %s`\n\n━━━━━━━━━━━━━━━━━━\n\n", pSteam, pDiscord, uId, amount),
            ['color'] = 0128128,
            ['author'] = {
                ['name'] = pName
            }
        }
    }
    PerformHttpRequest(Void.Logs.Webhooks['WaterPower'], function(err, text, headers) end, 'POST', json.encode({username = 'Water & Power Logs', embeds = embed}), { ['Content-Type'] = 'application/json' })
end

Void.Logs.ChickenLog = function(self, uId, pName, pSteam, pDiscord, amount)
    local embed = {
        {
            ['description'] = string.format("`Chicken Payment Log Created.`\n\n`• Steam: %s`\n\n`• Discord: %s`\n━━━━━━━━━━━━━━━━━━\n\n`• User ID: %s`\n\n`• Payment Amount: %s`\n\n━━━━━━━━━━━━━━━━━━\n\n", pSteam, pDiscord, uId, amount),
            ['color'] = 0128128,
            ['author'] = {
                ['name'] = pName
            }
        }
    }
    PerformHttpRequest(Void.Logs.Webhooks['Chicken'], function(err, text, headers) end, 'POST', json.encode({username = 'Chicken Logs', embeds = embed}), { ['Content-Type'] = 'application/json' })
end

RegisterServerEvent('erp-base:bankwidthdraw')
AddEventHandler('erp-base:bankwidthdraw',function(source, pulled, cashleft, bankleft)
    local pSteam = 'None'
    local pDiscord = 'None'
    local pName = GetPlayerName(source)
    local pIdentifiers = GetPlayerIdentifiers(source)
    for k, v in pairs(pIdentifiers) do
        if string.find(v, 'steam') then pSteam = v end
        if string.find(v, 'discord') then pDiscord = v end
    end
    Void.Logs:BankingWidthdraw(source, pName, pSteam, pDiscord, pulled, cashleft, bankleft)
end)

RegisterServerEvent('erp-base:bankdeposit')
AddEventHandler('erp-base:bankdeposit',function(source, pulled, cashleft, bankleft)
    local pSteam = 'None'
    local pDiscord = 'None'
    local pName = GetPlayerName(source)
    local pIdentifiers = GetPlayerIdentifiers(source)
    for k, v in pairs(pIdentifiers) do
        if string.find(v, 'steam') then pSteam = v end
        if string.find(v, 'discord') then pDiscord = v end
    end
    Void.Logs:BankingDeposit(source, pName, pSteam, pDiscord, pulled, cashleft, bankleft)
end)

RegisterServerEvent('erp-base:banktransfer')
AddEventHandler('erp-base:banktransfer',function(source, number, pName2, pSteam2, pDiscord2, pulled, cashleft, bankleft, pulled2, cashleft2, bankleft2)
    local pSteam = 'None'
    local pDiscord = 'None'
    local pName = GetPlayerName(source)
    local pIdentifiers = GetPlayerIdentifiers(source)
    for k, v in pairs(pIdentifiers) do
        if string.find(v, 'steam') then pSteam = v end
        if string.find(v, 'discord') then pDiscord = v end
    end
    Void.Logs:BankingTransfer(source, number, pName, pName2, pSteam, pDiscord, pSteam2, pDiscord2, pulled, cashleft, bankleft, pulled2, cashleft2, bankleft2)
end)

RegisterServerEvent('erp-base:bankgivecash')
AddEventHandler('erp-base:bankgivecash',function(source, number, pName2, pSteam2, pDiscord2, pulled, cashleft, bankleft, pulled2, cashleft2, bankleft2)
    local pSteam = 'None'
    local pDiscord = 'None'
    local pName = GetPlayerName(source)
    local pIdentifiers = GetPlayerIdentifiers(source)
    for k, v in pairs(pIdentifiers) do
        if string.find(v, 'steam') then pSteam = v end
        if string.find(v, 'discord') then pDiscord = v end
    end
    Void.Logs:BankingGiveCash(source, number, pName, pName2, pSteam, pDiscord, pSteam2, pDiscord2, pulled, cashleft, bankleft, pulled2, cashleft2, bankleft2)
end)

RegisterServerEvent('erp-base:deathlogs')
AddEventHandler('erp-base:deathlogs',function(message)
    Void.Logs:DeathLogs(source, message)
end)

RegisterServerEvent('erp-base:fishingLog')
AddEventHandler('erp-base:fishingLog',function(source, amount)
    local pSteam = 'None'
    local pDiscord = 'None'
    local pName = GetPlayerName(source)
    local pIdentifiers = GetPlayerIdentifiers(source)
    for k, v in pairs(pIdentifiers) do
        if string.find(v, 'steam') then pSteam = v end
        if string.find(v, 'discord') then pDiscord = v end
    end
    Void.Logs.FishingLog(source, source, pName, pSteam, pDiscord, amount)
end)

RegisterServerEvent('erp-base:garbageLog')
AddEventHandler('erp-base:garbageLog',function(source, amount)
    local pSteam = 'None'
    local pDiscord = 'None'
    local pName = GetPlayerName(source)
    local pIdentifiers = GetPlayerIdentifiers(source)
    for k, v in pairs(pIdentifiers) do
        if string.find(v, 'steam') then pSteam = v end
        if string.find(v, 'discord') then pDiscord = v end
    end
    Void.Logs.GarbageLog(source, source, pName, pSteam, pDiscord, amount)
end)

RegisterServerEvent('erp-base:huntingLog')
AddEventHandler('erp-base:huntingLog',function(source, amount)
    local pSteam = 'None'
    local pDiscord = 'None'
    local pName = GetPlayerName(source)
    local pIdentifiers = GetPlayerIdentifiers(source)
    for k, v in pairs(pIdentifiers) do
        if string.find(v, 'steam') then pSteam = v end
        if string.find(v, 'discord') then pDiscord = v end
    end
    Void.Logs.HuntingLog(source, source, pName, pSteam, pDiscord, amount)
end)

RegisterServerEvent('erp-base:miningLog')
AddEventHandler('erp-base:miningLog',function(source, amount)
    local pSteam = 'None'
    local pDiscord = 'None'
    local pName = GetPlayerName(source)
    local pIdentifiers = GetPlayerIdentifiers(source)
    for k, v in pairs(pIdentifiers) do
        if string.find(v, 'steam') then pSteam = v end
        if string.find(v, 'discord') then pDiscord = v end
    end
    Void.Logs.MiningLog(source, source, pName, pSteam, pDiscord, amount)
end)

RegisterServerEvent('erp-base:postopLog')
AddEventHandler('erp-base:postopLog',function(source, amount)
    local pSteam = 'None'
    local pDiscord = 'None'
    local pName = GetPlayerName(source)
    local pIdentifiers = GetPlayerIdentifiers(source)
    for k, v in pairs(pIdentifiers) do
        if string.find(v, 'steam') then pSteam = v end
        if string.find(v, 'discord') then pDiscord = v end
    end
    Void.Logs.PostOPLog(source, source, pName, pSteam, pDiscord, amount)
end)

RegisterServerEvent('erp-base:waterpowerLog')
AddEventHandler('erp-base:waterpowerLog',function(source, amount)
    local pSteam = 'None'
    local pDiscord = 'None'
    local pName = GetPlayerName(source)
    local pIdentifiers = GetPlayerIdentifiers(source)
    for k, v in pairs(pIdentifiers) do
        if string.find(v, 'steam') then pSteam = v end
        if string.find(v, 'discord') then pDiscord = v end
    end
    Void.Logs.WaterPowerLog(source, source, pName, pSteam, pDiscord, amount)
end)

RegisterServerEvent('erp-base:chickenLog')
AddEventHandler('erp-base:chickenLog',function(source, amount)
    local pSteam = 'None'
    local pDiscord = 'None'
    local pName = GetPlayerName(source)
    local pIdentifiers = GetPlayerIdentifiers(source)
    for k, v in pairs(pIdentifiers) do
        if string.find(v, 'steam') then pSteam = v end
        if string.find(v, 'discord') then pDiscord = v end
    end
    Void.Logs.ChickenLog(source, source, pName, pSteam, pDiscord, amount)
end)