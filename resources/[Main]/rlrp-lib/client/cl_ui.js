const registered = [];

function RegisterUICallback(name, cb) {
	AddEventHandler(`_npx_uiReq:${name}`, cb);

	if (GetResourceState("rlrp-ui") === "started") exports["rlrp-ui"].RegisterUIEvent(name);

	registered.push(name);
}

function SendUIMessage(data) {
	exports["rlrp-ui"].SendUIMessage(data);
}

function SetUIFocus(hasFocus, hasCursor) {
	exports["rlrp-ui"].SetUIFocus(hasFocus, hasCursor);
}

function GetUIFocus() {
	return exports["rlrp-ui"].GetUIFocus();
}

AddEventHandler("_npx_uiReady", () => {
	registered.forEach((eventName) => exports["rlrp-ui"].RegisterUIEvent(eventName));
});
