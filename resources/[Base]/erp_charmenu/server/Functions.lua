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
    end
}