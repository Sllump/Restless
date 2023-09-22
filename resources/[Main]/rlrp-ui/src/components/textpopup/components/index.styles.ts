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
    wrapper: {
        minWidth: 256,
        maxWidth: 720,
        padding: 16,
        backgroundColor: '#20282e',
        pointerEvents: 'all'
    },
    inputs: {
        minWidth: 256,
        maxWidth: 720,
        display: 'block',
        overflow: 'auto',
        backgroundColor: '#20282e'
    },
    text: {
        color: 'white',
        fontFamily: 'Arial, Helvetica, sans-serif',
        marginBottom: 16
    },
    button: {
        padding: 16,
        paddingTop: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
});