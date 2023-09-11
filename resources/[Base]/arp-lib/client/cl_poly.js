class PolyZone {
    static addBoxZone(pId, pCenter, pLength, pWidth, pOptions) {
        exports['arp-polyzone'].AddBoxZone(pId, pCenter, pLength, pWidth, pOptions);
    }

    static addCircleZone(pId, pCenter, pRadius, pOptions) {
        exports['arp-polyzone'].AddCircleZone(pId, pCenter, pRadius, pOptions);
    }
}

class PolyTarget {
    static addBoxZone(pId, pCenter, pLength, pWidth, pOptions) {
        exports['arp-polytarget'].AddBoxZone(pId, pCenter, pLength, pWidth, pOptions);
    }

    static addCircleZone(pId, pCenter, pRadius, pOptions) {
        exports['arp-polytarget'].AddCircleZone(pId, pCenter, pRadius, pOptions);
    }
}