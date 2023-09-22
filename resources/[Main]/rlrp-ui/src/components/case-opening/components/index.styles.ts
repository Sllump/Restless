import { makeStyles } from "@mui/styles";

export default makeStyles({
    caseOpeningContainer: {
      position: 'absolute',
      whiteSpace: 'nowrap',
      left: '50%',
      top: '50%',    
      transform: 'translate(-50%, -50%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '55%',
      bottom: '0px',
      height: '37%',
      zIndex: '20',
      minWidth: '55%',
      minHeight: '37%',
      pointerEvents: 'all',
      margin: 'unset',
      overflow: 'hidden',
      background:'rgb(34, 40, 49)',
      transition: 'bottom 800ms ease 0s',
      borderRadius: '6px',
  },
 
});