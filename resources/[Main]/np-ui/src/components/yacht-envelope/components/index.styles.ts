import { makeStyles } from "@mui/styles";

export default makeStyles({
    yachtEnvelopeContainer: {
        position: 'absolute',
        whiteSpace: 'nowrap',
        left: '50%',
        top: '50%',    
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapper: {
        minWidth: 256,
        maxWidth: 720,
        padding: 32,
        backgroundColor: '#20282e',
        pointerEvents: 'all'
    },
    clueIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '12%'
    },
    openButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none'
    }
});