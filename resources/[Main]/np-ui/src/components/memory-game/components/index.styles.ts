import { makeStyles } from "@mui/styles";

export default makeStyles({
    root: {
        top: "0px",
        left: "0px",
        width: "100vw",
        height: "100vh",
        position: "absolute",
        maxWidth: "100vw",
        minWidth: "100vw",
        maxHeight: "100vh",
        minHeight: "100vh",
        pointerEvents: "none",
        border: "0px",
        margin: "0px",
        outline: "0px",
        padding: "0px",
        overflow: "hidden",
        "& .MuiInput-root": {
            color: "white",
            fontSize: '1.3vmin'
        },

        "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
            borderColor: "white"
        },
        "& .MuiInput-underline:before": {
            borderColor: "darkgray",
            color: "blue"
        },
        "& .MuiInput-underline:after": {
            borderColor: "white",
            color: "blue"

        },
        "& .MuiInputLabel-animated": {
            color: "darkgray",
            fontSize: '1.5vmin'

        },
        "& .MuiInputAdornment-root": {
            color: "darkgray",

        }
    },
    MemoryGameOuterContainer: {
        // position: 'absolute',
        // left: '50%',
        // top: '50%',    
        // width: '100vw',
        // height: '100vh',
        // display: 'flex',
        // alignItems: 'center',
        // justifyContent: 'center',
        // transform: 'translate(-50%, -50%)',
        color: '#fff',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        position: 'relative',

    },
    container: {
        height: '50vh',
        maxHeight: '50vh',
        minHeight: '50vh',
        width: '50vh',
        minWidth: '50vh',
        maxWidth: '50vh',
        position: 'relative',
        pointerEvents: 'all',
        backgroundColor: '#222831'
    },
    introBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        flexDirection: 'column'
    },
    clickSquare: {
        display:'grid',
        gridAutoColumns: 'auto',
        gridColumn: '1',
        border: '0.5vh #232832 solid',
        backgroundColor: '#34475C',
    },
    clickSquareShouldClick: {
        display:'grid',
        gridAutoColumns: 'auto',
        gridColumn: '1',
        border: '0.5vh #232832 solid',
        backgroundColor: '#CCC !important',
    },
    clickSquareShouldClickFailed: {
        display:'grid',
        gridAutoColumns: 'auto',
        gridColumn: '1',
        border: '0.5vh #232832 solid',
        backgroundColor: '#F00F18 !important',
    },
    clickSquareShouldClickTrue: {
        display:'grid',
        gridAutoColumns: 'auto',
        gridColumn: '1',
        border: '0.5vh #232832 solid',
        backgroundColor: '#3DEC55 !important',
    },
    boxClickBox: {
        display: 'flex',
        gridAutoColumns: 'auto',
        gridColumn: '1',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        height:'100%',
        minHeight:'100%',
        maxHeight:'100%',
        width:'100%',
        minWidth:'100%',
        maxWidth:'100%',
    },
    clickSquareWasClicked: { backgroundColor: '#CCC !important' },
    clickSquareWasClickedFail: { backgroundColor: 'red !important' }
});