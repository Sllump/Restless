import { makeStyles } from "@mui/styles";

export default makeStyles({
    bugsContainer: {
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
        pointerEvents: 'all',
        color: 'white',
        transition: 'all 800ms ease',
        backgroundColor: '#20282e',
        borderRadius: '4px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        width: '1280px',
        maxHeight: '80vh',
        position: 'relative',
        textAlign: 'center',
        padding: 16,
        '& p, h6': {
            marginTop: 8,
            marginBottom: 8
        }
    }
});