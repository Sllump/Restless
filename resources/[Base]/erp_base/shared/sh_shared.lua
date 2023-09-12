Ethereal = Ethereal or {}
Ethereal.Jobs = Ethereal.Jobs or {}
Ethereal.Shared = Ethereal.Shared or {}
Ethereal.Shared.SpawnLocation = { x = -1037.79, y = -2737.78, z = 20.17, h = 100 }

function Ethereal.Shared.GetHexId(self, src)
    for k,v in ipairs(GetPlayerIdentifiers(src)) do
        if string.sub(v, 1, 5) == "steam" then
            return v
        end
    end
    
    return false
end

function Ethereal.Shared.HexIdToComId(self, hexid)
    return math.floor(tonumber(string.sub(hexid, 7), 16))
end

function Ethereal.Shared.HexIdToSteamId(self, hexid)
    local cid = self:HexIdToComId(hexid)
    local steam64 = math.floor(tonumber(string.sub( cid, 2)))
	local a = steam64 % 2 == 0 and 0 or 1
	local b = math.floor(math.abs(6561197960265728 - steam64 - a) / 2)
	local sid = "STEAM_0:"..a..":"..(a == 1 and b -1 or b)
    return sid
end

function Ethereal.Shared.GetLicense(self, src)
    for k,v in ipairs(GetPlayerIdentifiers(src)) do
        if string.sub(v, 1, 7) == "license" then
            return v
        end
    end

    return false
end

Ethereal.Jobs.ValidJobs = {
    ["unemployed"] = {
        name = "Unemployed",
        paycheck = 30,
    },
    ["ems"] = {
        name = "EMS",
        paycheck = 600,
        whitelisted = true,
        ranks = {
            [1] = "Probie",
            [2] = "EMT",
            [3] = "Paramedic",
            [4] = "Lieutenant",
            [5] = "Nurse",
            [6] = "Doctor",
            [7] = "Head Nurse",
            [8] = "Head Doctor",
            [9] = "Assistant Chief of Medical",
            [10] = "Chief of Medical",
        },
    },
    ["police"] = {
        name = "Police Department",
        paycheck = 600,
        whitelisted = true,
        ranks = {
            [1] = "Patrol Officer",
            [2] = "FTO",
            [3] = "Command",
            [4] = "High Command"
        }
    },
    ["sheriff"] = {
        name = "Sheriff Department",
        paycheck = 600,
        whitelisted = true,
        ranks = {
            [1] = "Patrol Officer",
            [2] = "FTO",
            [3] = "Command",
            [4] = "High Command"
        }
    },
    ["state"] = {
        name = "State Police",
        paycheck = 600,
        whitelisted = true,
        ranks = {
            [1] = "Patrol Officer",
            [2] = "FTO",
            [3] = "Command",
            [4] = "High Command"
        }
    },
    ["doc"] = {
        name = "Department of Corrections",
        paycheck = 600,
        whitelisted = true,
    },
    ["towtruck"] = {
        name = "Tow Trucker",
        paycheck = 100,
    },
    ["foodtruck"] = {
        name = "Food Truck",
        paycheck = 100,
    },
    ["taxi"] = {
        name = "Taxi driver",
        paycheck = 100,
    },
    ["trucker"] = {
        name = "Delivery Job",
        paycheck = 100,
    },
    ["entertainer"] = {
        name = "Entertainer",
        paycheck = 100,
    },
    ["news"] = {
        name = "News Reporter",
        paycheck = 100,
    },
    ["defender"] = {
        name = "Public Defender",
        paycheck = 110,
    },
    ["district attorney"] = {
        name = "District Attorney",
        paycheck = 550,
    },
    ["ada"] = {
        name = "ada",
        paycheck = 550,
    },
    ["towunion"] = {
        name = "towunion",
        paycheck = 100,
    },
    ["in-n-out"] = {
        name = "In N Out",
        paycheck = 150,
    },
    ["white_widow"] = {
        name = "Cosmic Cannabis",
        paycheck = 150,
    },
    ["pdm"] = {
        name = "pdm",
        paycheck = 100,
    },
    ["sanders"] = {
        name = "sanders",
        paycheck = 100,
    },
    ["judge"] = {
        name = "Judge",
        paycheck = 700,
    },
    ["broadcaster"] = {
        name = "Broadcaster",
        paycheck = 100,
    },
    ["doctor"] = {
        name = "Doctor",
        paycheck = 100,
    },
    ["therapist"] = {
        name = "Therapist",
        paycheck = 100,
    },
    ["driving instructor"] = {
        name = "Driving Instructor",
        paycheck = 100,
    },
    ["foodtruckvendor"] = {
        name = "Food Truck Vendor",
        paycheck = 100,
    },
    ["garbage"] = {
        name = "Garbage",
        paycheck = 100,
    },
    ["judge"] = {
        name = "Judge",
        paycheck = 600,
    },
    ["public_defender"] = {
        name = "Public Defender",
        paycheck = 400,
    },
    ["district_attorney"] = {
        name = "District Attorney",
        paycheck = 200,
    },

    ["sanitation_worker"] = {
        name = "Sanitation Worker",
        paycheck = 100,
    },
    ["fisherman"] = {
        name = "Fisherman",
        paycheck = 50,
    },
}

Ethereal.Shared.Resources = {
}

Ethereal.Shared.NonRestartResources = {
	'warmenu'
}

Ethereal.Shared.Accounts = {
    ['cash'] = 1000,
    ['bank'] = 1000,
}

Ethereal.Shared.MetaData = {
	["BankHistory"] = {},
	["BankDailyLimit"] = 0,
    ['injail'] = false,
    ['jailitems'] = {},
}

Ethereal.Shared.Ranks = {
    'user',
	'admin',
	'management',
}

Ethereal.Shared.Jobs = {
    ["unemployed"] = { label = 'Unemployed', grades = { 'unemployed' } },
	['police'] = { label = 'Police', grades = { 'regular', 'boss' } },
	['sheriff'] = { label = 'Police', grade = { 'Hello', 'boss'} },
    ['ems'] = { label = 'EMS', grades = { 'regular', 'boss' } },
}

Ethereal.Shared.PedsModels = {
	["Female"] = {
		"mp_f_freemode_01", "a_f_m_beach_01", "a_f_m_bevhills_01", "a_f_m_bevhills_02", "a_f_m_bodybuild_01",
		"a_f_m_business_02", "a_f_m_downtown_01", "a_f_m_eastsa_01", "a_f_m_eastsa_02", "a_f_m_fatbla_01",
		"a_f_m_fatcult_01", "a_f_m_fatwhite_01", "a_f_m_ktown_01", "a_f_m_ktown_02", "a_f_m_prolhost_01",
		"a_f_m_salton_01", "a_f_m_skidrow_01", "a_f_m_soucentmc_01", "a_f_m_soucent_01", "a_f_m_soucent_02",
		"a_f_m_tourist_01", "a_f_m_trampbeac_01", "a_f_m_tramp_01", "a_f_o_genstreet_01", "a_f_o_indian_01",
		"a_f_o_ktown_01", "a_f_o_salton_01", "a_f_o_soucent_01", "a_f_o_soucent_02", "a_f_y_beach_01",
		"a_f_y_bevhills_01", "a_f_y_bevhills_02", "a_f_y_bevhills_03", "a_f_y_bevhills_04", "a_f_y_business_01",
		"a_f_y_business_02", "a_f_y_business_03", "a_f_y_business_04", "a_f_y_eastsa_01", "a_f_y_eastsa_02",
		"a_f_y_eastsa_03", "a_f_y_epsilon_01", "a_f_y_fitness_01", "a_f_y_fitness_02", "a_f_y_genhot_01",
		"a_f_y_golfer_01", "a_f_y_hiker_01", "a_f_y_hipster_01", "a_f_y_hipster_02", "a_f_y_hipster_03", "a_f_y_hipster_04",
		"a_f_y_indian_01", "a_f_y_juggalo_01", "a_f_y_runner_01", "a_f_y_rurmeth_01", "a_f_y_scdressy_01", "a_f_y_skater_01",
		"a_f_y_soucent_01", "a_f_y_soucent_02", "a_f_y_soucent_03", "a_f_y_tennis_01", "a_f_y_tourist_01",
		"a_f_y_tourist_02", "a_f_y_vinewood_01", "a_f_y_vinewood_02", "a_f_y_vinewood_03", "a_f_y_vinewood_04",
		"a_f_y_yoga_01", "g_f_y_ballas_01", "g_f_y_families_01", "g_f_y_lost_01", "g_f_y_vagos_01", "mp_f_deadhooker",
		"mp_f_freemode_01", "mp_f_misty_01", "mp_f_stripperlite", "mp_s_m_armoured_01", "s_f_m_fembarber", "s_f_m_maid_01",
		"s_f_m_shop_high", "s_f_m_sweatshop_01", "s_f_y_airhostess_01", "s_f_y_bartender_01", "s_f_y_baywatch_01",
		"s_f_y_cop_01", "s_f_y_factory_01", "s_f_y_hooker_01", "s_f_y_hooker_02", "s_f_y_hooker_03", "s_f_y_migrant_01",
		"s_f_y_movprem_01", "ig_kerrymcintosh", "ig_janet", "ig_jewelass", "ig_magenta", "ig_marnie", "ig_patricia",
		"ig_screen_writer", "ig_tanisha", "ig_tonya", "ig_tracydisanto", "u_f_m_corpse_01", "u_f_m_miranda", "u_f_m_promourn_01",
		"u_f_o_moviestar", "u_f_o_prolhost_01", "u_f_y_bikerchic", "u_f_y_comjane", "u_f_y_corpse_01", "u_f_y_corpse_02",
		"u_f_y_hotposh_01", "u_f_y_jewelass_01", "u_f_y_mistress", "u_f_y_poppymich", "u_f_y_princess", "u_f_y_spyactress",
		"ig_amandatownley", "ig_ashley", "ig_andreas", "ig_ballasog", "ig_maryannn", "ig_maude", "ig_michelle", "ig_mrs_thornhill",
		"ig_natalia", "s_f_y_scrubs_01", "s_f_y_sheriff_01", "s_f_y_shop_low", "s_f_y_shop_mid", "s_f_y_stripperlite",
		"s_f_y_stripper_01", "s_f_y_stripper_02", "ig_mrsphillips", "ig_mrs_thornhill", "ig_molly", "ig_natalia", "s_f_y_sweatshop_01", "s_m_y_hwaycop_01"
	},
	["Male"] = {
		"mp_m_freemode_01", "hc_driver", "hc_gunman", "hc_hacker", "ig_abigail",
		"ig_bankman", "ig_barry", "ig_bestmen", "ig_beverly", "ig_brad", "ig_bride",
		"ig_car3guy1", "ig_car3guy2", "ig_casey", "ig_chef", "ig_chengsr", "ig_chrisformage",
		"ig_clay", "ig_claypain", "ig_cletus", "ig_dale", "ig_davenorton", "ig_denise",
		"ig_devin", "ig_dom", "ig_dreyfuss", "ig_drfriedlander", "ig_fabien", "ig_fbisuit_01", "ig_floyd",
		"ig_groom", "ig_hao", "ig_hunter", "ig_jay_norris", "ig_jimmyboston", "ig_jimmydisanto",
		"ig_joeminuteman", "ig_johnnyklebitz", "ig_josef", "ig_josh", "ig_lamardavis", "ig_lazlow",
		"ig_lestercrest", "ig_lifeinvad_01", "ig_lifeinvad_02", "ig_manuel", "ig_milton", "ig_mrk",
		"ig_nervousron", "ig_nigel", "ig_old_man1a", "ig_old_man2", "ig_omega", "ig_oneil", "ig_orleans",
		"ig_ortega", "ig_paper", "ig_priest", "ig_prolsec_02", "ig_ramp_gang", "ig_ramp_hic",
		"ig_ramp_hipster", "ig_ramp_mex", "ig_roccopelosi", "ig_russiandrunk", "ig_siemonyetarian",
		"ig_solomon", "ig_stevehains", "ig_stretch", "ig_talina", "ig_taocheng", "ig_taostranslator",
		"ig_tenniscoach", "ig_terry", "ig_tomepsilon", "ig_tylerdix","ig_wade", "ig_zimbor",
		"a_m_m_afriamer_01", "a_m_m_beach_01", "a_m_m_beach_02", "a_m_m_bevhills_01", "a_m_m_bevhills_02",
		"a_m_m_business_01", "a_m_m_eastsa_01", "a_m_m_eastsa_02", "a_m_m_farmer_01", "a_m_m_fatlatin_01",
		"a_m_m_genfat_01", "a_m_m_genfat_02", "a_m_m_golfer_01", "a_m_m_hasjew_01", "a_m_m_hillbilly_01",
		"a_m_m_hillbilly_02", "a_m_m_indian_01", "a_m_m_ktown_01", "a_m_m_malibu_01", "a_m_m_mexcntry_01",
		"a_m_m_mexlabor_01", "a_m_m_og_boss_01", "a_m_m_paparazzi_01", "a_m_m_polynesian_01", "a_m_m_prolhost_01",
		"a_m_m_rurmeth_01", "a_m_m_salton_01", "a_m_m_salton_02", "a_m_m_salton_03", "a_m_m_salton_04",
		"a_m_m_skater_01", "a_m_m_skidrow_01", "a_m_m_socenlat_01", "a_m_m_soucent_01", "a_m_m_soucent_02",
		"a_m_m_soucent_03", "a_m_m_soucent_04", "a_m_m_stlat_02", "a_m_m_tennis_01", "a_m_m_tourist_01",
		"a_m_m_trampbeac_01", "a_m_m_tramp_01", "a_m_m_tranvest_01", "a_m_m_tranvest_02", "a_m_o_beach_01",
		"a_m_o_genstreet_01", "a_m_o_ktown_01", "a_m_o_salton_01", "a_m_o_soucent_01", "a_m_o_soucent_02",
		"a_m_o_soucent_03", "a_m_o_tramp_01", "a_m_y_beachvesp_01", "a_m_y_beachvesp_02", "a_m_y_beach_01",
		"a_m_y_beach_02", "a_m_y_beach_03", "a_m_y_bevhills_01", "a_m_y_bevhills_02", "a_m_y_breakdance_01",
		"a_m_y_busicas_01",	"a_m_y_business_01", "a_m_y_business_02", "a_m_y_business_03", "a_m_y_cyclist_01",
		"a_m_y_dhill_01", "a_m_y_downtown_01", "a_m_y_eastsa_01", "a_m_y_eastsa_02", "a_m_y_epsilon_01",
		"a_m_y_epsilon_02", "a_m_y_gay_01", "a_m_y_gay_02", "a_m_y_genstreet_01", "a_m_y_genstreet_02",
		"a_m_y_golfer_01", "a_m_y_hasjew_01", "a_m_y_hiker_01", "a_m_y_hipster_01", "a_m_y_hipster_02",
		"a_m_y_hipster_03", "a_m_y_indian_01", "a_m_y_jetski_01", "a_m_y_juggalo_01", "a_m_y_ktown_01",
		"a_m_y_ktown_02", "a_m_y_latino_01", "a_m_y_methhead_01", "a_m_y_mexthug_01", "a_m_y_motox_01",
		"a_m_y_motox_02", "a_m_y_musclbeac_01", "a_m_y_musclbeac_02", "a_m_y_polynesian_01", "a_m_y_roadcyc_01",
		"a_m_y_runner_01", "a_m_y_runner_02", "a_m_y_salton_01", "a_m_y_skater_01", "a_m_y_skater_02",
		"a_m_y_soucent_01", "a_m_y_soucent_02", "a_m_y_soucent_03", "a_m_y_soucent_04", "a_m_y_stbla_01",
		"a_m_y_stbla_02", "a_m_y_stlat_01", "a_m_y_stwhi_01", "a_m_y_stwhi_02", "a_m_y_sunbathe_01",
		"a_m_y_surfer_01", "a_m_y_vindouche_01", "a_m_y_vinewood_01", "a_m_y_vinewood_02", "a_m_y_vinewood_03",
		"a_m_y_vinewood_04", "a_m_y_yoga_01", "g_m_m_armboss_01", "g_m_m_armgoon_01", "g_m_m_armlieut_01",
		"g_m_m_chemwork_01", "g_m_m_chiboss_01", "g_m_m_chicold_01", "g_m_m_chigoon_01", "g_m_m_chigoon_02",
		"g_m_m_korboss_01", "g_m_m_mexboss_01", "g_m_m_mexboss_02", "g_m_y_armgoon_02", "g_m_y_azteca_01",
		"g_m_y_ballaeast_01", "g_m_y_ballaorig_01", "g_m_y_ballasout_01", "g_m_y_famca_01", "g_m_y_famdnf_01",
		"g_m_y_famfor_01","g_m_y_korean_01", "g_m_y_korean_02", "g_m_y_korlieut_01", "g_m_y_lost_01", "g_m_y_lost_02",
		"g_m_y_lost_03", "g_m_y_mexgang_01", "g_m_y_mexgoon_01", "g_m_y_mexgoon_02", "g_m_y_mexgoon_03", "g_m_y_pologoon_01",
		"g_m_y_pologoon_02", "g_m_y_salvaboss_01", "g_m_y_salvagoon_01", "g_m_y_salvagoon_02", "g_m_y_salvagoon_03",
		"g_m_y_strpunk_01", "g_m_y_strpunk_02", "mp_m_claude_01", "mp_m_exarmy_01", "mp_m_shopkeep_01", "s_m_m_ammucountry", 
		"s_m_m_autoshop_01", "s_m_m_autoshop_02", "s_m_m_bouncer_01", "s_m_m_chemsec_01", "s_m_m_cntrybar_01",
		"s_m_m_dockwork_01", "s_m_m_doctor_01", "s_m_m_fiboffice_01", "s_m_m_fiboffice_02", "s_m_m_gaffer_01",
		"s_m_m_gardener_01", "s_m_m_gentransport", "s_m_m_hairdress_01", "s_m_m_highsec_01", "s_m_m_highsec_02",
		"s_m_m_janitor", "s_m_m_lathandy_01", "s_m_m_lifeinvad_01", "s_m_m_linecook", "s_m_m_lsmetro_01",
		"s_m_m_mariachi_01", "s_m_m_marine_01", "s_m_m_marine_02", "s_m_m_migrant_01", "s_m_m_movalien_01","s_m_m_movprem_01",
		"s_m_m_movspace_01", "s_m_m_pilot_01",	"s_m_m_pilot_02", "s_m_m_postal_01", "s_m_m_postal_02", "s_m_m_scientist_01",
		"s_m_m_security_01", "s_m_m_strperf_01", "s_m_m_strpreach_01", "s_m_m_strvend_01", "s_m_m_trucker_01", "s_m_m_ups_01",
		"s_m_m_ups_02", "s_m_o_busker_01", "s_m_y_airworker", "s_m_y_ammucity_01", "s_m_y_armymech_01", "s_m_y_autopsy_01",
		"s_m_y_barman_01", "s_m_y_baywatch_01", "s_m_y_blackops_01", "s_m_y_blackops_02", "s_m_y_busboy_01", "s_m_y_chef_01",
		"s_m_y_clown_01", "s_m_y_construct_01", "s_m_y_construct_02", "s_m_y_cop_01", "s_m_y_dealer_01", "s_m_y_devinsec_01",
		"s_m_y_dockwork_01", "s_m_y_doorman_01", "s_m_y_dwservice_01", "s_m_y_dwservice_02", "s_m_y_factory_01", "s_m_y_garbage",
		"s_m_y_grip_01", "s_m_y_marine_01", "s_m_y_marine_02", "s_m_y_marine_03", "s_m_y_mime", "s_m_y_pestcont_01", "s_m_y_pilot_01",
		"s_m_y_prismuscl_01", "s_m_y_prisoner_01", "s_m_y_robber_01", "s_m_y_shop_mask", "s_m_y_strvend_01", "s_m_y_uscg_01",
		"s_m_y_valet_01", "s_m_y_waiter_01", "s_m_y_winclean_01", "s_m_y_xmech_01", "s_m_y_xmech_02", "u_m_m_aldinapoli",
		"u_m_m_bankman", "u_m_m_bikehire_01", "u_m_m_fibarchitect", "u_m_m_filmdirector", "u_m_m_glenstank_01", "u_m_m_griff_01",
		"u_m_m_jesus_01", "u_m_m_jewelsec_01", "u_m_m_jewelthief", "u_m_m_markfost", "u_m_m_partytarget", "u_m_m_prolsec_01",
		"u_m_m_promourn_01", "u_m_m_rivalpap", "u_m_m_spyactor", "u_m_m_willyfist", "u_m_o_finguru_01", "u_m_o_taphillbilly",
		"u_m_y_abner", "u_m_y_antonb", "u_m_y_babyd", "u_m_y_baygor", "u_m_y_burgerdrug_01", "u_m_y_chip", "u_m_y_cyclist_01",
		"u_m_y_fibmugger_01", "u_m_y_guido_01", "u_m_y_gunvend_01", "u_m_y_imporage", "u_m_y_mani", "u_m_y_militarybum",
		"u_m_y_paparazzi", "u_m_y_party_01", "u_m_y_pogo_01", "u_m_y_prisoner_01", "u_m_y_proldriver_01", "u_m_y_rsranger_01",
		"u_m_y_sbike", "u_m_y_staggrm_01", "u_m_y_tattoo_01", "u_m_y_zombie_01", "u_m_o_tramp_01",
	}
}

Ethereal.Shared.IsJobVaild = function(job)
    return Ethereal.Shared.Jobs[job] ~= nil
end

Ethereal.Shared.IsJobGradeVaild = function(job, grade)

    if not job or not Ethereal.Shared.Jobs(job) then
        return false
    end

    for k,v in pairs(Ethereal.Shared.Jobs[job][grades]) do
        if v == grade then
            return true
        end
    end

    return false
end

Ethereal.Shared.GetModule = function(module)
    if Ethereal[module] then 
        return Ethereal[module]
    else
        print("Warning: '" .. tostring(module) .. "' module doesn't exist")
    end
    
    return false
end

Ethereal.Shared.AddModule = function(module, tbl)
    Ethereal[module] = tbl
end

Ethereal.Shared.ConsoleLog = function(text, module)
    if module then
        print("^2[Ethereal " .. module .. "]^7 " .. text)
    else
        print("^2[Ethereal]^7 " .. text)
    end
end

Ethereal.Shared.GetIdentifier = function(source, type)
	for index, identifier in pairs(GetPlayerIdentifiers(source)) do
		if string.find(identifier,type) then
			return identifier, index
		end
	end

	return nil
end

Ethereal.Shared.HasValue = function(table, value)
	for k, v in pairs(table) do
		if v == value then
			return true
		end
	end

	return false
end

Ethereal.Shared.GetIndex = function(table, value)
	for k, v in pairs(table) do
		if v == value then
			return k
		end
	end

	return false
end

Citizen.CreateThread(function()
    while true do
        Citizen.Wait(0)
        if exports and exports[GetCurrentResourceName()] then
            TriggerEvent("erp_base:exportsReady", IM)
            print((
                [[^3-------------------------------------------------------
                ___________ __  .__                                .__ ____________________ 
                \_   _____//  |_|  |__   ___________   ____ _____  |  |\______   \______   \
                |    __)_\   __\  |  \_/ __ \_  __ \_/ __ \\__  \ |  | |       _/|     ___/
                |        \|  | |   Y  \  ___/|  | \/\  ___/ / __ \|  |_|    |   \|    |    
                /_______  /|__| |___|  /\___  >__|    \___  >____  /____/____|_  /|____|    
                        \/           \/     \/            \/     \/            \/         
                -------------------------------------------------------
                Status: Alpha
                Collaborators: Potato, Aspect, Slump
                -------------------------------------------------------]]
            ))
            return
        end
    end
end)

exports('AddModule', Ethereal.Shared.AddModule)
exports('GetModule', Ethereal.Shared.GetModule)
