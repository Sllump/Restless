const registered = [];

function RegisterUICallback(name, cb) {
    AddEventHandler(`_vui_uiReq:${name}`, cb);

    if (GetResourceState('erp-ui') === 'started') exports['erp-ui'].RegisterUIEvent(name);

    registered.push(name);
}

function SendUIMessage(data) {
    exports['erp-ui'].SendUIMessage(data);
}

function SetUIFocus(hasFocus, hasCursor) {
    exports['erp-ui'].SetUIFocus(hasFocus, hasCursor);
}

function GetUIFocus() {
    return exports['erp-ui'].GetUIFocus();
}

AddEventHandler('_vui_uiReady', () => {
    registered.forEach((eventName) => exports['erp-ui'].RegisterUIEvent(eventName));
});