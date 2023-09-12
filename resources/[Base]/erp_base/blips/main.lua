-- Citizen.CreateThread(function()
--     local BUSINESS_BLIPS = RPC.execute('erp_base:config:passInformation', 'BLIPS')
--     local JOB_BLIPS = RPC.execute('erp_base:config:passInformation', 'JOB_BLIPS')

--     for k, v in ipairs(BUSINESS_BLIPS) do
--         print('^2[Framework]^7 Creating blip at: ' .. v.BLIP_LOCATION .. ' | Label: ' .. v.BLIP_TEXT)
--         BUSINESS_BLIP = AddBlipForCoord(v.BLIP_LOCATION)
--         SetBlipSprite(BUSINESS_BLIP, v.BLIP_SPRITE)
--         SetBlipDisplay(BUSINESS_BLIP, v.BLIP_DISPLAY)
--         SetBlipScale(BUSINESS_BLIP, v.BLIP_SCALE)
--         SetBlipAsShortRange(BUSINESS_BLIP, true)
--         SetBlipColour(BUSINESS_BLIP, v.BLIP_COLOR)

--         BeginTextCommandSetBlipName("STRING")
--         AddTextComponentString(v.BLIP_TEXT)
--         EndTextCommandSetBlipName(BUSINESS_BLIP)
--     end

--     for k, v in ipairs(JOB_BLIPS) do
--         print('^2[Framework]^7 Creating job blip: ' .. v.vector3 .. ' | Job name: ' .. v.JOB_NAME)
--         JOB_BLIP = AddBlipForCoord(v.vector3)
--         SetBlipSprite(JOB_BLIP, v.blipSprite)
--         SetBlipDisplay(JOB_BLIP, v.blipDisplay)
--         SetBlipScale(JOB_BLIP, v.blipScale)
--         SetBlipAsShortRange(JOB_BLIP, true)
--         SetBlipColour(JOB_BLIP, v.blipColour)

--         BeginTextCommandSetBlipName("STRING")
--         AddTextComponentString(v.JOB_NAME)
--         EndTextCommandSetBlipName(JOB_BLIP)
--     end
-- end)