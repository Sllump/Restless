import { makeStyles } from "@mui/styles";

export default makeStyles({
    voiceURLContainer: {
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
        backgroundColor: '#20282e',
        padding: 32,
        display: 'inline-block',
        pointerEvents: 'all',
        // opacity: e.copied ? 0 : 1,
        transition: 'opacity 5s ease',
        '&:hover': {
            opacity: 1,
            transition: 'opacity 0s ease'
        }
    },
});