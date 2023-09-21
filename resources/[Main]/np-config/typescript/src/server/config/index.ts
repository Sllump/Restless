import * as main from "../../../../config/main.json";
import * as miscConfig from "../../../../config/misc/misc.json";
import * as games from "../../../../config/np-games/games.json";
import * as vehicletag from "../../../../config/np-games/vehicle_tag.json";
import * as demolition from "../../../../config/np-games/demolition.json";
import * as storageunits from "../../../../config/np-storageunits/units.json";
import * as lockpicking from "../../../../config/np-vehicles/lockpicking/main.json";
import * as voice from "../../../../config/np-voice/main.json";
import * as jobmanager from "../../../../config/np-jobmanager/main.json";
import * as policeConfig from "../../../../config/np-police/main.json";
import * as signinConfig from "../../../../config/np-signin/main.json";
import * as weed_main from "../../../../config/np-weed/main.json";
import * as weed_plant from "../../../../config/np-weed/plant.json";
import * as weed from "../../../../config/np-weed/weed.json";
import * as weed_corner from "../../../../config/np-weed/corner.json";
import * as DriftingConfig from "../../../../config/DriftingConfig/main.json";

function getFileNameOnly(filePath: any) {
    return filePath.split('/').pop().split('.').shift();
}

function loadGarages() {
    const requireContext = require.context('../../../../config/np-vehicles/garages', false, /\.json$/);
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
        configId: "np-games:games",
        data: games
    },
    {
        configId: "np-games:vehicle-tag",
        data: vehicletag
    },
    {
        configId: "np-games:demolition",
        data: demolition
    },
    {
        configId: "np-storageunits",
        data: storageunits
    },
    {
        configId: "np-vehicles:garages",
        data: loadGarages()
    },
    {
        configId: "np-vehicles:lockpicking",
        data: lockpicking
    },
    {
        configId: "np-voice",
        data: voice
    },
    {
        configId: 'np-police',
        client: {},
        server: {},
        data: policeConfig,
    },
    {
        configId: 'np-signin',
        client: {},
        server: {},
        data: signinConfig,
    },
    {
        configId: "np-jobmanager",
        data: jobmanager
    },
    {
        configId: 'np-weed',
        client: {},
        server: {},
        data: weed_main,
    },
    {
        configId: 'np-weed:plant',
        client: {},
        server: {},
        data: weed_plant,
    },
    {
        configId: 'np-weed:weed',
        client: {},
        server: {},
        data: weed,
    },
    {
        configId: 'np-weed:corner',
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