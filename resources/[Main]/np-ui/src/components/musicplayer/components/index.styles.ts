import { makeStyles } from "@mui/styles";

export default makeStyles({
    musicPlayerContainer: {
        position: 'absolute',
        whiteSpace: 'nowrap',
        left: '50%',
        top: '50%',    
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        position: 'relative'
    },
    musicPlayer: {
        height: 128,
        width: '25vw',
        position: 'relative',
        pointerEvents: 'all'
    },
    controlsBlocker1: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '25%'
    },
    controlsBlocker2: {
        position: 'absolute',
        top: 0,
        right: 0,
        height: '45%',
        width: '65%'
    },
    musicControls: {
        pointerEvents: 'all',
        position: 'absolute',
        right: 0,
        // top: e.minimized ? 0 : Object(v.a)(116),
        // width: e.minimized ? 'unset' : '25vw',
        height: 'auto',
        backgroundColor: '#20282e',
        padding: 8,
        display: 'flex',
        flexDirection: 'row'
    },
    volume: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    closeButton: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
});