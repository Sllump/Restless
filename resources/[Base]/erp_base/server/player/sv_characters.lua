Characters = {}

CreateThread(function()
    Events = exports['erp_base']:GetModule('Events')
    Player = exports['erp_base']:GetModule('Player')
    Shared = exports['erp_base']:GetModule('Shared')

    Events.Create("erp_base:selectCharacter", function(source, args)
        local test = Player.SelectCharacter(source, args)
        return test
    end)
end)

CreateThread(function()
    while true do
        Wait(1)
        if exports and exports['erp_base'] then
            exports['erp_base']:AddModule('Characters', Characters)
            return
        end
    end
end)