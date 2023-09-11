const registered = [];

function RegisterUICallback(name, cb) {
    AddEventHandler(`_vui_uiReq:${name}`, cb);

    if (GetResourceState('arp-ui') === 'started') exports['arp-ui'].RegisterUIEvent(name);

    registered.push(name);
}

function SendUIMessage(data) {
    exports['arp-ui'].SendUIMessage(data);
}

function SetUIFocus(hasFocus, hasCursor) {
    exports['arp-ui'].SetUIFocus(hasFocus, hasCursor);
}

function GetUIFocus() {
    return exports['arp-ui'].GetUIFocus();
}

AddEventHandler('_vui_uiReady', () => {
    registered.forEach((eventName) => exports['arp-ui'].RegisterUIEvent(eventName));
});