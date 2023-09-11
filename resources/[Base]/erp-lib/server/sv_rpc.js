const FunctionsRegister = new Map(), Promises = new Map(), Resource = GetCurrentResourceName();
let CallIdentifier = 0;

function TriggerNetEvent(pEvent, pSrc, ...params) {
    const payload = msgpack_pack(params);
    payload.length < 5000 ? TriggerClientEventInternal(pEvent, pSrc, payload, payload.length) : TriggerLatentClientEventInternal(pEvent, pSrc, payload, payload.length, 128000);
}

function rpcRegister(name, func) { 
    FunctionsRegister[name] = func;
}

async function rpcExecute(name, src, ...params) {
    const callId = CallIdentifier;
    CallIdentifier++;
    const pProm = new Promise((resolve, reject) => {
        Promises.set(callId, {
            'resolve': resolve,
            'reject': reject
        });
    });
    TriggerNetEvent('rpc:request', src, Resource, name, callId, params, false);
    const pProm1 = new Promise(resolve => {
        setTimeout(() => {
            if (Promises.has(callId)) Promises.delete(callId);
            return resolve([]);
        }, 20000);
    });
    return await Promise.race([pProm, pProm1]);
}

const RPC = {
    'register': rpcRegister,
    'execute': rpcExecute
}

RegisterServerEvent("rpc:request")
on('rpc:request', async (origin, name, callID, params, pState) => { 
    if (pState == true) {
        return
    }
    const [a, b, c, d, e, f, g, h, j, k, l, m, n] = params;
    const src = source
    if (!FunctionsRegister[name]) {
        return
    }
    
    const selectfunc = FunctionsRegister[name];
    
    let response;
    try {
        response = await selectfunc(src, a, b, c, d, e, f, g, h, j, k, l, m, n)
    } catch (error) {
        emit("rpc:client:error", Resource, origin, name, error)
    }
    if (typeof response === null) {
        response = [];
    }
    emitNet("rpc:response", src, origin, callID, response, pState);
})

function rpcResponse(origin, callID, response, pBoolean) {
    if (Resource === origin && Promises.has(callID)) {
        pBoolean && (response = ParamUnpacker(response)), Promises.get(callID).resolve(response), Promises.delete(callID);
    }
}

onNet('rpc:response', rpcResponse)