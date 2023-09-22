import { makeStyles } from "@mui/styles";

export default makeStyles({
    minigameNumbersContainer: {
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
        height: '20vh',
        width: '50vh',
        position: 'relative',
        pointerEvents: 'all',
        backgroundColor: '#222831'
    },
    introBox: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center'
    },
});