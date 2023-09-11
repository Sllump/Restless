const regged = [];

function RegisterInterfaceCallback(name, cb) {
    AddEventHandler(`_vpx_uiReq:${name}`, cb);

    if (GetResourceState('arp-interface') === 'started') exports['arp-interface'].RegisterIntefaceEvent(name);

    regged.push(name);
}

function SendInterfaceMessage(data) {
    exports['arp-interface'].SendInterfaceMessage(data);
}

function SetInterfaceFocus(hasFocus, hasCursor) {
    exports['arp-interface'].SetInterfaceFocus(hasFocus, hasCursor);
}

function GetInterfaceFocus() {
    return exports['arp-interface'].GetInterfaceFocus();
}

AddEventHandler('_vpx_uiReady', () => {
    regged.forEach((eventName) => exports['arp-interface'].RegisterIntefaceEvent(eventName));
});