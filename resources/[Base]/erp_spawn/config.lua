Config = {}

Config.Spawns = {
    {
        label = 'Alta St Apartments',
        header = 'Pillbox Hill',
        hasSubSpawn = false,
        coords = vector4(-263.86, -966.0, 31.22, 206.14),
    },
    {
        label = 'LS Bus Station',
        header = 'Textile City',
        hasSubSpawn = false,
        coords = vector4(453.29, -662.23, 28.01, 5.73),
    },
    {
        label = 'Vinewood Blvd Taxi Stand',
        header = 'Downtown Vinewood',
        hasSubSpawn = false,
        coords = vector4(272.16, 185.44, 104.67, 320.57),
    },
    {
        label = 'The Richman Hotel',
        header = 'Rockford Hills',
        hasSubSpawn = false,
        coords = vector4(-1266.53, 273.86, 64.66, 28.52),
    },
    {
        label = 'Paleto Gas Station',
        header = 'Paleto',
        hasSubSpawn = false,
        coords = vector4(145.62, 6563.19, 32.0, 42.83),
    },
    {
        label = 'Harmony Motel',
        header = 'Sandy',
        hasSubSpawn = false,
        coords = vector4(1122.11, 2667.24, 38.04, 180.39),
    },
    {
        label = 'Airport',
        header = 'Empire Way',
        hasSubSpawn = false,
        coords = vector4(-1036.0920410156, -2733.7995605469, 13.756637573242, 0),
    },
    {
        label = 'The Pier',
        header = 'Del Perro',
        hasSubSpawn = false,
        coords = vector4(-1835.58, -1222.65, 13.02, 7.27),
    },
    {
        label = 'Paleto Bus Stop',
        header = 'Paleto',
        hasSubSpawn = false,
        coords = vector4(-214.24, 6178.87, 31.17, 40.11),
    },
    {
        label = 'Sandy Shores',
        header = 'Sandy',
        hasSubSpawn = false,
        coords = vector4(1907.4090576172, 3709.6572265625, 32.713817596436, 215.96228027344),
    },
}

Config.JobSpawns = {
    {
        job = 'police',
        header = 'Mission Row',
        coords = vector4(436.97, -982.14, 30.69, 86.7),
        hasSubSpawn = {
            {
                header = 'Mission Row Police Department',
                label = 'Entrance',
                coords = vector4(436.97, -982.14, 30.69, 86.7),
            },
            {
                header = '',
                label = 'Garage',
                coords = vector4(462.47, -991.25, 25.7, 2.96),
            },
        },
    },
    {
        job = 'police',
        coords = vector4(1854.65, 3684.91, 34.26, 31.75),
        hasSubSpawn = {
            {
                header = 'Blaine County Sheriff DepartMent',
                label = 'Entrance',
                coords = vector4(1854.65, 3684.91, 34.26, 31.75),
            },
        },
    }
}