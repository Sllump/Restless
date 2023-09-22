import { makeStyles } from "@mui/styles";

export default makeStyles({
    textPopupContainer: {
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
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh',
        pointerEvents: 'all'
    },
    innerContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    statusBox: {
        backgroundColor: '#20282e',
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 32,
        paddingRight: 32,
        border: '1px solid black',
        width: 480
    },
    textContainer: { marginBottom: 4 },
    textContainerCenter: { textAlign: 'center' },
    fullWidth: { width: '100%' },
    iconColor: {},
    icon: {}
});