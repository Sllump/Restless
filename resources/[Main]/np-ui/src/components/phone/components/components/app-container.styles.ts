import { makeStyles } from '@mui/styles';

export default makeStyles({
    appOuterContainer: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        position: 'absolute',
        bottom: '0%',
        opacity: '1'
      },
      appInnerContainer: {
        top: '0px',
        left: '0px',
        width: '100%',
        height: '100%',
        position: 'absolute',
        transition: 'all 400ms ease 0s',
        willChange: 'left'
      },
      appSearch: {
        width: '100%',
        height: '64px',
        display: 'flex',
        padding: '8px 16px',
        position: 'relative',
        bottom:'45%',
        marginBottom: '8px'
      },
      appSearchWrapper: {
        width: '100%',
        position: 'relative'
      },
      appIcon: {
        top: '32px',
        right: '16px',
        display: 'flex',
        zIndex: '1',
        position: 'absolute',
        justifyContent: 'flex-end'
      },
      appIconWrapper: {
        color: '#fff',
        marginLeft: '16px'
      },
      appList: {
        position: 'absolute',
        flexGrow: 1,
        overflowY: 'auto',
        top:'85px',
        width:'100%',
        padding: '16px',
        height:'80%',
      },
});