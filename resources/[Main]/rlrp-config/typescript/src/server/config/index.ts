import * as main from "../../../../config/main.json";
import * as miscConfig from "../../../../config/misc/misc.json";
import * as games from "../../../../config/rlrp-games/games.json";
import * as vehicletag from "../../../../config/rlrp-games/vehicle_tag.json";
import * as demolition from "../../../../config/rlrp-games/demolition.json";
import * as storageunits from "../../../../config/rlrp-storageunits/units.json";
import * as lockpicking from "../../../../config/rlrp-vehicles/lockpicking/main.json";
import * as voice from "../../../../config/rlrp-voice/main.json";
import * as jobmanager from "../../../../config/rlrp-jobmanager/main.json";
import * as policeConfig from "../../../../config/rlrp-police/main.json";
import * as signinConfig from "../../../../config/rlrp-signin/main.json";
import * as weed_main from "../../../../config/rlrp-weed/main.json";
import * as weed_plant from "../../../../config/rlrp-weed/plant.json";
import * as weed from "../../../../config/rlrp-weed/weed.json";
import * as weed_corner from "../../../../config/rlrp-weed/corner.json";
import * as DriftingConfig from "../../../../config/DriftingConfig/main.json";

function getFileNameOnly(filePath: any) {
    return filePath.split('/').pop().split('.').shift();
}

function loadGarages() {
    const requireContext = require.context('../../../../config/rlrp-vehicles/garages', false, /\.json$/);
    const json: any = {};
    requireContext.keys().forEach((key) => {
        const obj = requireContext(key);
        const simpleKey = getFileNameOnly(key);
        json[simpleKey] = obj;
    });

    return json;
}

export const clientConfig = [
    {
        configId: "main",
        data: main
    },
    {
        configId: "misc",
        data: miscConfig
    },
    {
        configId: "rlrp-games:games",
        data: games
    },
    {
        configId: "rlrp-games:vehicle-tag",
        data: vehicletag
    },
    {
        configId: "rlrp-games:demolition",
        data: demolition
    },
    {
        configId: "rlrp-storageunits",
        data: storageunits
    },
    {
        configId: "rlrp-vehicles:garages",
        data: loadGarages()
    },
    {
        configId: "rlrp-vehicles:lockpicking",
        data: lockpicking
    },
    {
        configId: "rlrp-voice",
        data: voice
    },
    {
        configId: 'rlrp-police',
        client: {},
        server: {},
        data: policeConfig,
    },
    {
        configId: 'rlrp-signin',
        client: {},
        server: {},
        data: signinConfig,
    },
    {
        configId: "rlrp-jobmanager",
        data: jobmanager
    },
    {
        configId: 'rlrp-weed',
        client: {},
        server: {},
        data: weed_main,
    },
    {
        configId: 'rlrp-weed:plant',
        client: {},
        server: {},
        data: weed_plant,
    },
    {
        configId: 'rlrp-weed:weed',
        client: {},
        server: {},
        data: weed,
    },
    {
        configId: 'rlrp-weed:corner',
        client: {},
        server: {},
        data: weed_corner,
    },
    {
        configId: 'DriftingConfig',
        client: {},
        server: {},
        data: DriftingConfig,
    },
];