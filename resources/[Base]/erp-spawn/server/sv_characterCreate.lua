CreateCharacter = {
    checkExistence = function(source, data)
        exports.oxmysql:execute("SELECT first_name FROM characters WHERE first_name = @FirstName AND last_name = @LastName", {
            ["@FirstName"] = data.firstname, 
            ["@LastName"] = data.lastname
        }, function(result)
            if result[1] ~= nil then 
                return "This name is already in use, pick another."
            end
        end)
    end,

    Create = function(source, data)
        local Identifiers = GetPlayerIdentifiers(source)

        print(json.encode(data, {
            indent = true
        }))

        exports.oxmysql:execute('INSERT INTO characters (owner, first_name, last_name, dob, gender, phone_number) VALUES(@Owner, @FirstName, @LastName, @DOB, @Gender, @PhoneNumber)', {
            ['@Owner'] = Identifiers[1],
            ['@FirstName'] = data.param.firstname,
            ['@LastName'] = data.param.lastname,
            ['@DOB'] = data.param.dob,
            ['@Gender'] = data.param.gender,
            ['@PhoneNumber'] = 69
        })
    end,
}

RPC.register('erp-spawn:checkCharacterExistence', function(source, data)
    CreateCharacter.checkExistence(source, data)
end)

RPC.register('erp-spawn:createCharacter', function(source, data)
    CreateCharacter.Create(source, data)
end)