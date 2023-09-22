import { atom } from "recoil";

export const devMode = atom({
    key: 'devMode',
    default: true,
})

export const fontWhiteLaptopState = atom({
    key: 'fontWhiteLaptopState',
    default: true,
})

export const hasBurnerState = atom({
    key: 'hasBurnerState',
    default: false,
})

export const filteredContactsState = atom({
    key: 'filteredContactsState',
    default: [],
})

export const activeHoverIdState = atom({
    key: 'activeHoverIdState',
    default: '',
})

export const purchaseModalState = atom({
    key: 'purchaseModalState',
    default: false,
})

export const exchangeModalState = atom({
    key: 'exchangeModalState',
    default: false,
})

export const cryptoIdState = atom({
    key: 'cryptoIdState',
    default: 1,
})

export const sellModalState = atom({
    key: 'sellModalState',
    default: false,
})

export const sellStateIdState = atom({
    key: 'sellStateIdState',
    default: 0,
})

export const sellPriceState = atom({
    key: 'sellPriceState',
    default: 0,
})

export const sellPlateState = atom({
    key: 'sellPlateState',
    default: "",
})

export const hasVPNState = atom({
    key: 'hasVPNState',
    default: false,
})

export const cidState = atom({
    key: 'cidState',
    default: 0,
})

export const callsDataState = atom({
    key: 'callsDataState',
    default: [],
})

export const filteredCallsDataState = atom({
    key: 'filteredCallsDataState',
    default: [],
})

export const editModeState = atom({
    key: 'editModeState',
    default: false,
})

export const editDataState = atom({
    key: 'editDataState',
    default: {},
})

export const phoneBrandState = atom({
    key: 'phoneBrandState',
    default: "android",
})

export const phoneBackgroundState = atom({
    key: 'phoneBackgroundState',
    default: "https://i.imgur.com/3KTfLIV.jpg",
})

export const phoneReceiveSMSState = atom({
    key: 'phoneReceiveSMSState',
    default: true,
})

export const phoneNewTweetState = atom({
    key: 'phoneNewTweetState',
    default: true,
})

export const phoneReceiveEmailState = atom({
    key: 'phoneReceiveEmailState',
    default: true,
})

export const phoneEmbeddedImagesState = atom({
    key: 'phoneEmbeddedImagesState',
    default: true,
})

export const phoneEmploymentBusinessId = atom({
    key: 'phoneEmploymentBusinessId',
    default: '',
})

export const filteredContactDataState = atom({
    key: 'filteredContactDataState',
    default: [
        {
            name:'dvex',
            number:11111111,
        }
    ],
})

export const contactsData = atom({
    key: 'contactsData',
    default: [
        {
            name:'dvex',
            number:11111111,
        }
    ],
})

export const phoneAbdtDrivers = atom({
    key: 'phoneAbdtDrivers',
    default: [
        {
            name: 'DveX Dev',
            phoneNumber: '123456789',
            status: 'Busy'
        },
        {
            name: 'PFOP Dev',
            phoneNumber: '9999999999',
            status: 'Available'
        },
    ],
})

export const phoneNltsDrivers = atom({
    key: 'phoneNltsDrivers',
    default: [
        {
            name: 'DveX Dev',
            phoneNumber: '123456789',
            status: 'Busy'
        },
        {
            name: 'PFOP Dev',
            phoneNumber: '9999999999',
            status: 'Available'
        },
    ],
})

export const phoneCurrentApp = atom({
    key: 'phoneCurrentApp',
    default: 'home',
})

export const hudShowHealth = atom({
    key: 'hudShowHealth',
    default: true,
})

export const hudShowArmor = atom({
    key: 'hudShowArmor',
    default: true,
})

export const hudShowHunger = atom({
    key: 'hudShowHunger',
    default: true,
})

export const hudShowThirst = atom({
    key: 'hudShowThirst',
    default: true,
})

export const hudShowOxygen = atom({
    key: 'hudShowOxygen',
    default: true,
})

export const hudShowStress = atom({
    key: 'hudShowStress',
    default: true,
})

export const hudShowCrosshair = atom({
    key: 'hudShowCrosshair',
    default: false,
})

export const compassFpsState = atom({
    key: 'compassFpsState',
    default: '16',
})

export const compassShowTime = atom({
    key: 'compassShowTime',
    default: false,
})

export const hudSpeedometerFps = atom({
    key: 'hudSpeedometerFps',
    default: '16',
})

export const blackbarsValue = atom({
    key: 'blackbarsValue',
    default: '10',
})

export const blackbarsValueState = atom({
    key: 'blackbarsValueState',
    default: '10',
})

export const compassEnabledState = atom({
    key: 'compassEnabledState',
    default: true,
})

export const compassStreetNamesEnabledState = atom({
    key: 'compassStreetNamesEnabledState',
    default: true,
})

export const blackbarsEnabledState = atom({
    key: 'blackbarsEnabledState',
    default: false,
})

export const hudCircleTaskbarEnabled = atom({
    key: 'hudCircleTaskbarEnabled',
    default: false,
})

export const hudHideEnhancements = atom({
    key: 'hudHideEnhancements',
    default: false,
})

export const hudMinimapEnabled = atom({
    key: 'hudMinimapEnabled',
    default: true,
})

export const hudDefaultMinimap = atom({
    key: 'hudDefaultMinimap',
    default: false,
})

export const hudMinimapOutline = atom({
    key: 'hudMinimapOutline',
    default: true,
})

export const radioChannelVisibilityState = atom({
    key: 'radioChannelVisibilityState',
    default: '3',
})

export const radioClicksOutgoingState = atom({
    key: 'radioClicksOutgoingState',
    default: true,
})

export const radioClicksIncomingState = atom({
    key: 'radioClicksIncomingState',
    default: true,
})

export const radioVolumeState = atom({
    key: 'radioVolumeState',
    default: 100,
})

export const radioClicksVolumeState = atom({
    key: 'radioClicksVolumeState',
    default: 100,
})

export const phoneVolumeState = atom({
    key: 'phoneVolumeState',
    default: 100,
})

export const buffedOxygenState = atom({
    key: 'buffedOxygenState',
    default: false,
})

export const buffedHungerState = atom({
    key: 'buffedHungerState',
    default: false,
})

export const buffedStressState = atom({
    key: 'buffedStressState',
    default: false,
})