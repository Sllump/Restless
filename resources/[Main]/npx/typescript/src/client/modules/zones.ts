const Zones = new Set();
const ZoneHandlers = new Map();

on("np-polyzone:enter", (zone: string, data?: any) => {
    Zones.add(zone);
});

on("np-polyzone:exit", (zone: string, data?: any) => {
    Zones.delete(zone);
});

const HasActiveZone = (zone: string, data?: any) => {
    return Zones.has(data ? `${zone}-${data}` : zone);
}

const AddOnEnterHandler = (pZone: string, cb: Function) => {
    on("np-polyzone:enter", (zone: string, data?: any) => {
        if(zone === pZone){
            cb(data)
        }
    });
}

const AddOnExitHandler = (pZone: string, cb: Function) => {
    on("np-polyzone:exit", (zone: string, data?: any) => {
        if(zone === pZone){
            cb(data)
        }
    });
}

const AddBoxZone = (id: string, zone: string, vectors: Vector3, length: number, width: number, options: any, data = {}): void => {
    const opt = { ...options, data: data ?? {} };

    opt.data['id'] = id;

    global.exports["np-polyzone"].AddBoxZone(zone, vectors, length, width, opt);
}

const AddBoxTarget = (id: string, zone: string, vectors: Vector3, length: number, width: number, options: any, data = {}): void => {
    const opt = { ...options, data };

    opt.data['id'] = id;

    global.exports["np-polytarget"].AddBoxZone(zone, vectors, length, width, opt);
}

export default {
    isActive: HasActiveZone,
    onEnter: AddOnEnterHandler,
    onExit: AddOnExitHandler,
    addBoxZone: AddBoxZone,
    addBoxTarget: AddBoxTarget
}