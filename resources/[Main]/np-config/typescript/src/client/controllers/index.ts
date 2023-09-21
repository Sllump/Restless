const currentResource = GetCurrentResourceName();
let isCfgReady = false;
const pConfigMap = new Map();

const Delay = (ms: any) => new Promise(res => setTimeout(res, ms));

const serverType = GetConvar("sv_serverType", "whitelisted");
const serverCode = GetConvar("sv_serverCode", "wl");
const serverName = GetConvar("sv_serverName", "Main");

function getCfg(pId: string) {
  return GetModuleConfig(pId);
}

const getGameData = (pGame: string) => {
  const pGames = getCfg("np-games:games");
  return pGames["games"].find((game: any) => game['id'] == pGame);
};

RegisterCommand("getGameData", (src: number, args: string) => {
  console.log(getGameData(args[0]));
}, false)

async function initConfig() {
  console.log("[Config] Initializing config...");
  const clientConfig = await RPC.execute(currentResource + ":getClientConfig");
  for (const config of clientConfig) {
      pConfigMap.set(config["configId"], config["data"]);
      emit(currentResource + ":configLoaded", config["configId"], config["data"]);
  }
  isCfgReady = true;
  emit(currentResource + ":configReady");
  console.log("[Config] Config initialized.");
}

function setConfig(pId: string, pConfig: any) {
  pConfigMap.set(pId, pConfig);
  emit(currentResource + ":configLoaded", pId, pConfig);
}

function GetModuleConfig(pId: string) {
  return pConfigMap.get(pId);
}

global.exports("GetModuleConfig", GetModuleConfig);

function IsConfigReady() {
  return isCfgReady;
}

global.exports("IsConfigReady", IsConfigReady);

function GetMiscConfig(pId: string) {
  var returnVal;
  const config = GetModuleConfig("misc");
  if (config === undefined) return;
  return (returnVal = config[pId]) !== null && returnVal !== void 0 ? returnVal : null;
}

global.exports("GetMiscConfig", GetMiscConfig);

onNet(currentResource + ":setConfig", (configData: any) => {
  if (configData === undefined || !(configData instanceof Array)) return;
  for (const config of configData) {
      setConfig(config["configId"], config["data"]);
  }
})

const getConfig = (pModule: string, pId: string) => {
  const configData = GetModuleConfig(pModule);
  if (configData === undefined) return;
  return pId ? configData === null || configData === void 0 ? void 0 : configData[pId] : configData;
}

global.exports("GetConfigLib", () => {
  const invokingResource = GetInvokingResource();
  const pData: any = {};
  return pData["IsConfigReady"] = (): any => {
      return isCfgReady;
  }, 
  pData["GetModuleConfig"] = getConfig, pData["GetMainConfig"] = (pId: string) => {
      return getConfig("main", pId);
  }, pData["GetMiscConfig"] = (pId: string) => {
      return getConfig("misc", pId);
  }, pData["GetResourceConfig"] = (pId: string) => {
      return getConfig(invokingResource, pId);
  }, pData;
});

global.exports("GetServerType", () => serverType);
global.exports("GetServerCode", () => serverCode);
global.exports("GetServerName", () => serverName);

setImmediate(() => {
  initConfig();
  //toggleDiscoveredGangSprays();
})