import { makeStyles } from "@mui/styles";

export default makeStyles({
    goprosContainer: {
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
        pointerEvents: 'all'
    },
    bb: {
        height: '10vh',
        width: '100vw',
        backgroundColor: 'black'
    },
    bbMiddle: {
        flex: 1,
        // backgroundColor: e.switchingViews ? 'black' : 'unset'
    },
    camChooserContent: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        padding: 8
    },
    camChooserTitle: {
        fontFamily: 'Arial, Helvetica, sans-serif !important',
        letterSpacing: '0.7 !important',
        fontWeight: '600 !important',
        textDecoration: 'none !important',
        fontStyle: 'normal !important',
        fontVariant: 'small-caps !important',
        textTransform: 'none',
        textShadow: '-1px 1px 0 #37474F, 1px 1px 0 #37474F, 1px -1px 0 #37474F, -1px -1px 0 #37474F',
        width: 'auto !important'
    },
    camSelector: {
        width: '15vw',
        marginLeft: 100
    }
});