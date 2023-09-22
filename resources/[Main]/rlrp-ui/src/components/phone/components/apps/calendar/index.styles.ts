import { makeStyles } from '@mui/styles';

export default makeStyles({
  actions: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 12
  },
  buttonContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      alignItems: 'center',
      width: '100%'
  },
  entries: {
      overflow: 'auto',
      maxHeight: '90%'
  }
});