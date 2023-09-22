import { makeStyles } from "@mui/styles";

export default makeStyles({
    vehicleMenuContainer: {
        position: 'absolute',
        whiteSpace: 'nowrap',
        left: '50%',
        bottom: '20%',    
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapper: {
        margin:'0',
        minWidth: 300,
        maxWidth: 300,
        minHeight: 100,
        maxHeight: 100,
        padding: 16,
        backgroundColor: '#20282e',
        pointerEvents: 'all',
        borderRadius:'0.5vh',
        '& :hover': {
            backgroundColor: '#31475E',

        }
    },
    item: {
        position:'relative',
        bottom:'13%',
        minWidth: 120,
        maxWidth: 120,
        minHeight: 85,
        maxHeight: 85,
        background:'#323C48',
        borderRadius:'0.5vh',
    },
    status: {
        position:'absolute',
        right:'10%',
        top:'10%',
        background:'#252E39',
        borderRadius:'0.5vh',
        width:'10%',
        height:'80%',
    },
    icon: {
        position:'absolute',
        color:'white',
        fontSize:'30px',
        left:'40%',
        top:'35%',
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