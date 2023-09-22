import { makeStyles } from "@mui/styles";

export default makeStyles({
    newsCamContainer: {
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
        pointerEvents: 'all',
        position: 'relative'
    },
    bb: {
        height: '5vh',
        width: '100vw',
        backgroundColor: 'black'
    },
    bbMiddle: {
        flex: 1,
        backgroundColor: 'unset'
    },
    video: {
        height: '100vh',
        width: '100vw',
        position: 'absolute',
        top: '-3vh',
        margin: '0',
        objectFit: 'cover'
    },
    overlayText: {
        position: 'absolute',
        bottom: '7.5vw',
        left: '7.5vw',
        textTransform: 'uppercase',
        fontWeight: '700',
        fontSize: '4vh',
        textShadow: '0.2vh 0 0.4vh #575657',
        fontStyle: 'italic'
    }
});