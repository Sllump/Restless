import { makeStyles } from "@mui/styles";

export default makeStyles({
    golfContainer: {
        position: 'absolute',
        whiteSpace: 'nowrap',
        left: '50%',
        bottom: '20%',    
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        position: 'absolute',
        top: '95%',
        left: '50%',
        transform: 'translate(-50%, -95%)',
        backgroundColor: '#30475e',
        outline: 'solid 0.4vmin #222831',
        width: '40vmin',
        height: '3vmin'
    },
    text: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: 'Arial, Helvetica, sans-serif !important',
        fontWeight: '600 !important',
        fontSize: '1.5vmin !important',
        color: 'white',
        textShadow: '-0.1vh 0.1vh 0 #37474F, 0.1vh 0.1vh 0 #37474F, 0.1vh -0.1vh 0 #37474F, -0.1vh -0.1vh 0 #37474F'
    },
    power: {
        backgroundImage: 'linear-gradient(90deg, #4C974A, #6BD768)',
        width: '0%',
        height: '100%',
        transitionDuration: '0.1s'
    }
});