const regged = [];

function RegisterInterfaceCallback(name, cb) {
    AddEventHandler(`_vpx_uiReq:${name}`, cb);

    if (GetResourceState('erp-interface') === 'started') exports['erp-interface'].RegisterIntefaceEvent(name);

    regged.push(name);
}

function SendInterfaceMessage(data) {
    exports['erp-interface'].SendInterfaceMessage(data);
}

function SetInterfaceFocus(hasFocus, hasCursor) {
    exports['erp-interface'].SetInterfaceFocus(hasFocus, hasCursor);
}

function GetInterfaceFocus() {
    return exports['erp-interface'].GetInterfaceFocus();
}

AddEventHandler('_vpx_uiReady', () => {
    regged.forEach((eventName) => exports['erp-interface'].RegisterIntefaceEvent(eventName));
});