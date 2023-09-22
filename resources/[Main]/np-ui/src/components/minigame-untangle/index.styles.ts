import { makeStyles } from "@mui/styles";

export default makeStyles({
    minigameUntangleContainer: {
        position: 'absolute',
        whiteSpace: 'nowrap',
        left: '50%',
        top: '50%',    
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    board: {
        position:'relative',
        height: '500px',
        width: '500px',
        // background:'black',
        border: '2px solid black',
        margin: '0 auto',
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