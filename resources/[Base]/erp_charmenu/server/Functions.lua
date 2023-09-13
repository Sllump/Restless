Character = {
    GeneratePhoneNumber = function()
        local result = MySQL.query.await(true, "SELECT `phone_number` FROM `characters`")
        local number = false
    
        while not number do
            Wait(1)
            local newNumber = tostring(math.random(55555, 99999) .. math.random(11111, 55555))
            local taken = false
    
            for k, v in pairs(result) do
    
                v.phone_number = v.phone_number
    
                if v.phone_number == newNumber then
                    taken = true
                end
            end
    
            if not taken then
                number = newNumber
            end
        end
    
        return number
    end,

    Decode = function(tableString)
        if tableString == nil or tableString =="" then
            return {}
        else
            return json.decode(tableString)
        end
    end,

    setRoutingBucket = function(src, bool)
        if bool then 
            SetPlayerRoutingBucket(src, src)
        end

        if not not bool then
            SetPlayerRoutingBucket(src, 0)
        end
    end
}

RPC.register('erp_charmenu:setRoutingBucket', function(source, bool)
    Character.setRoutingBucket(source, bool)
end)