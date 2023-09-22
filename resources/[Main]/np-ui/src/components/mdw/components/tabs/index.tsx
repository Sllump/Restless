import { Typography } from '@mui/material';
import '../index'
import useStyles from '../index.styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function Tabs({currentTab, setcurrentTab}: any) {
  const classes = useStyles();
  return (
    <>
      <div className={classes.mdwTabsOuterContainer}>
        <div className={classes.mdwTabsInnerContainer}>
          <div className={classes.mdwTabsFlexContainer}>
            <div onClick={function(){setcurrentTab(1)}} className={1 === currentTab ? 'mdw-tab active-tab' : 'mdw-tab'}>
              <Typography 
                style = {{
                  color: '#fff',
                  wordBreak: 'break-word',
                  fontSize: '1.7vh'
                }}
                variant={'h6'}
              >
                Dashboard
              </Typography>
            </div>
            <div onClick={function(){setcurrentTab(2)}} className={2 === currentTab ? 'mdw-tab active-tab' : 'mdw-tab'}>
              <Typography 
                style = {{
                  color: '#fff',
                  wordBreak: 'break-word',
                  fontSize: '1.7vh'
                }}
                variant={'h6'}
              >
                Incidents
              </Typography>
            </div>
            <div onClick={function(){setcurrentTab(3)}} className={3 === currentTab ? 'mdw-tab active-tab' : 'mdw-tab'}>
              <Typography 
                style = {{
                  color: '#fff',
                  wordBreak: 'break-word',
                  fontSize: '1.7vh'
                }}
                variant={'h6'}
              >
                Profiles
              </Typography>
            </div>
            <div onClick={function(){setcurrentTab(4)}} className={4 === currentTab ? 'mdw-tab active-tab' : 'mdw-tab'}>
              <Typography 
                style = {{
                  color: '#fff',
                  wordBreak: 'break-word',
                  fontSize: '1.7vh'
                }}
                variant={'h6'}
              >
                DMV
              </Typography>
            </div>
            <div onClick={function(){setcurrentTab(5)}} className={5 === currentTab ? 'mdw-tab active-tab' : 'mdw-tab'}>
              <Typography 
                style = {{
                  color: '#fff',
                  wordBreak: 'break-word',
                  fontSize: '1.7vh'
                }}
                variant={'h6'}
              >
                Reports
              </Typography>
            </div>
            <div onClick={function(){setcurrentTab(6)}} className={6 === currentTab ? 'mdw-tab active-tab' : 'mdw-tab'}>
              <Typography 
                style = {{
                  color: '#fff',
                  wordBreak: 'break-word',
                  fontSize: '1.7vh'
                }}
                variant={'h6'}
              >
                Evidence
              </Typography>
            </div>
            <div onClick={function(){setcurrentTab(7)}} className={7 === currentTab ? 'mdw-tab active-tab' : 'mdw-tab'}>
              <Typography 
                style = {{
                  color: '#fff',
                  wordBreak: 'break-word',
                  fontSize: '1.7vh'
                }}
                variant={'h6'}
              >
                Properties
              </Typography>
            </div>
            <div onClick={function(){setcurrentTab(8)}} className={8 === currentTab ? 'mdw-tab active-tab' : 'mdw-tab'}>
              <Typography 
                style = {{
                  color: '#fff',
                  wordBreak: 'break-word',
                  fontSize: '1.7vh'
                }}
                variant={'h6'}
              >
                Charges
              </Typography>
            </div>
            <div onClick={function(){setcurrentTab(9)}} className={9 === currentTab ? 'mdw-tab active-tab' : 'mdw-tab'}>
              <Typography 
                style = {{
                  color: '#fff',
                  wordBreak: 'break-word',
                  fontSize: '1.7vh'
                }}
                variant={'h6'}
              >
                Staff
              </Typography>
            </div>
            <div onClick={function(){setcurrentTab(10)}} className={10 === currentTab ? 'mdw-tab active-tab' : 'mdw-tab'}>
              <Typography 
                style = {{
                  color: '#fff',
                  wordBreak: 'break-word',
                  fontSize: '1.7vh'
                }}
                variant={'h6'}
              >
                Legislation
              </Typography>
            </div>
            <div onClick={function(){setcurrentTab(11)}} className={11 === currentTab ? 'mdw-tab active-tab' : 'mdw-tab'}>
              <Typography 
                style = {{
                  color: '#fff',
                  wordBreak: 'break-word',
                  fontSize: '1.7vh'
                }}
                variant={'h6'}
              >
                Businesses
              </Typography>
            </div>
            <div onClick={function(){setcurrentTab(12)}} style={{position:'relative', top:'15.5%'}} className={12 === currentTab ? 'mdw-tab active-tab' : 'mdw-tab'}>
              <Typography 
                style = {{
                  color: '#fff',
                  wordBreak: 'break-word',
                  fontSize: '1.7vh'
                }}
                variant={'h6'}
              >
                Config
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Tabs;