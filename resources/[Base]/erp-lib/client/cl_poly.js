class PolyZone {
    static addBoxZone(pId, pCenter, pLength, pWidth, pOptions) {
        exports['erp-polyzone'].AddBoxZone(pId, pCenter, pLength, pWidth, pOptions);
    }

    static addCircleZone(pId, pCenter, pRadius, pOptions) {
        exports['erp-polyzone'].AddCircleZone(pId, pCenter, pRadius, pOptions);
    }
}

class PolyTarget {
    static addBoxZone(pId, pCenter, pLength, pWidth, pOptions) {
        exports['erp-polytarget'].AddBoxZone(pId, pCenter, pLength, pWidth, pOptions);
    }

    static addCircleZone(pId, pCenter, pRadius, pOptions) {
        exports['erp-polytarget'].AddCircleZone(pId, pCenter, pRadius, pOptions);
    }
}