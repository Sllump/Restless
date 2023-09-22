import { makeStyles } from '@mui/styles';

export default makeStyles({
      ypComponentContainer: {
        display: 'inline-block',
        position: 'relative',
        backgroundColor: '#FBEA57',
        height: 'fit-content',
        padding: '5px 10px',
        width: '100%',
        color: '#fff',
        marginBottom: '6%',
      },
      ypPostModalContainer: {
        top: '0px',
        left: '0px',
        width: '100%',
        height: '100%',
        display: 'flex',
        zIndex: '1000',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
      },
      ypPostModalInnerContainer: {
        width: 'calc(100% - 64px)',
        height: 'auto',
        display: 'flex',
        padding: '16px',
        overflow: 'hidden scroll',
        position: 'relative',
        maxHeight: '80%',
        minHeight: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(48, 71, 94)'
      },
});