import { useNuiEvent } from "../hooks/useNuiEvent";

export let characterData = {}

useNuiEvent('uiMessage', async (data) => {
    if (data.source === 'rlrp-nui' && data.app === 'character') {
        characterData = data.data
    }
});