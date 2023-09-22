import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './index.css'
import Context from './context/components';
import Application from '../Application';
import Hud from './hud/components';
import Preferences from './preferences/components';
import Compass from './compass/components';
import Peek from './peek/components';
import Interaction from './interaction/components';
import TextBox from './textBox/components';
import TaskBar from './taskbar/components';
import ClothingMenu from './clothing/components';
import Mdw from './mdw/components';
import Financials from './financials/components';
import Phone from './phone/components';
import Burner from './burner/components';
import DispatchApp from './dispatch/components';
import Badge from './badge/components';
import StatusHud from './statushud/components';
import Radio from './radio/components';
import BlackBars from './blackbars/components';
import Cash from './cash/components';
import SniperScope from './sniper-scope/components';
import RangePicker from './range-picker/components';
import CaseOpening from './case-opening/components';
import MemoryGame from './memory-game/components';
import BoostingTablet from './laptop/components';
import Notepad from './notepad/components';
import Golf from './golf/components';
import NewsCam from './newscam/components';
import Gopros from './gopros/components';
import YachtEnvelope from './yacht-envelope/components';
import Book from './book/components';
import VoiceURL from './voice-url/components';
import MusicPlayer from './musicplayer/components';
import TcgCard from './tcg-card/components';
import Showroom from './showroom/components';
import Watermark from './watermark/components';
import NewsPaper from './newspaper/components';
import TextPopup from './textpopup/components';
import NpolaroidPhotoBook from './npolaroid-photobook/components';
import Bugs from './bugs/components';
import VehicleMenu from './vehiclemenu/components';
import Ballot from './ballot/components';
import Drpager from './drpager/components';
import {RestartAlert} from './main/components';
import MinigameNumbers from './minigame-numbers';
import MinigameUntangle from './minigame-untangle';

const darkTheme = createTheme({
  components: {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          backgroundColor: "#2f2f2f",
          "&.Mui-selected": {
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            "&.Mui-focusVisible": { background: "rgba(0, 0, 0, 0.24)" }
          },
          "&.Mui-selected:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.08)",
          }
        }
      }
    },
    MuiCircularProgress: {
      styleOverrides: {
        circle: {
          strokeLinecap: 'butt'
        }
      }
    },
    MuiInput: {
      styleOverrides: {
        root: {
          "& .MuiInput-root": {
            color: "white",
            fontSize: '1.3vmin'
          },
          "& label.Mui-focused": {
            color: "darkgray"
          },
          "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
            borderColor: "darkgray"
          },
          "& .MuiInput-underline:before": {
            borderColor: "darkgray",
            color: "darkgray"
          },
          "& .MuiInput-underline:after": {
            borderColor: "white",
            color: "darkgray"
          },
          "& .Mui-focused:after": {
            color: "darkgray",
            fontSize: '1.5vmin'
          },
          "& .MuiInputAdornment-root": {
            color: "darkgray",
          }
        }
      }
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "1em",
          maxWidth: "1000px"
        },
      }
    }
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#95ef77'
    },
    secondary: {
      main: '#424cab'
    },
    success: {
      main: '#95ef77'
    },
    warning: {
      main: '#f2a365'
    },
    error: {
      main: '#ffffff'
    },
    info: {
      main: '#CDCED0'
    },
  },
});

const App: React.FC = () => {
  const [applications] = React.useState([
    {
      name: 'radio',
      render: <Radio />,
    },
    {
      name: 'contextmenu',
      render: <Context />,
    },
    {
      name: 'taskbar',
      render: <TaskBar />,
    },
    {
      name: 'badge',
      render: <Badge />,
    },
    {
      name: 'statushud',
      render: <StatusHud />,
    },
    {
      name: 'interaction',
      render: <Interaction />,
    },
    {
      name: 'textbox',
      render: <TextBox />,
    },
    {
      name: 'textbox',
      render: <TextBox />,
    },
    {
      name: 'clothingmenu',
      render: <ClothingMenu />,
    },
    {
      name: 'cash',
      render: <Cash />,
    },
    {
      name: 'mdw',
      render: <Mdw />,
    },
    {
      name: 'peek',
      render: <Peek />,
    },
    {
      name: 'financials',
      render: <Financials />,
    },
    {
      name: 'phone',
      render: <Phone />,
    },
    {
      name: 'burner',
      render: <Burner />,
    },
    {
      name: 'dispatch',
      render: <DispatchApp />,
    },
    {
      name: 'rangepicker',
      render: <RangePicker />,
    },
    {
      name: 'laptop',
      render: <BoostingTablet />,
    },
    {
      name: 'newscam',
      render: <NewsCam />,
    },
    {
      name: 'newspaper',
      render: <NewsPaper />,
    },
    {
      name: 'gopros',
      render: <Gopros />,
    },
    {
      name: 'musicplayer',
      render: <MusicPlayer />,
    },
    {
      name: 'memorygame',
      render: <MemoryGame />,
    },
    {
      name: 'minigame-numbers',
      render: <MinigameNumbers />,
    },
    {
      name: 'minigame-untangle',
      render: <MinigameUntangle />,
    },
    {
      name: 'showroom',
      render: <Showroom />,
    },
    {
      name: 'voice-url',
      render: <VoiceURL />,
    },
    {
      name: 'textpopup',
      render: <TextPopup />,
    },
    {
      name: 'notepad',
      render: <Notepad />,
    },
    {
      name: 'book',
      render: <Book />,
    },
    {
      name: 'bugs',
      render: <Bugs />,
    },
    {
      name: 'tcg-card',
      render: <TcgCard />,
    },
    {
      name: 'case-opening',
      render: <CaseOpening />,
    },
    {
      name: 'ballot',
      render: <Ballot />,
    },
    {
      name: 'yacht-envelope',
      render: <YachtEnvelope />,
    },
    {
      name: 'compass',
      render: <Compass />,
    },
    {
      name: 'sniper-scope',
      render: <SniperScope />,
    },
    {
      name: 'golf',
      render: <Golf />,
    },
    {
      name: 'preferences',
      render: <Preferences />,
    },
    {
      name: 'restart-alert',
      render: <RestartAlert />,
    },
    {
      name: 'hud',
      render: <Hud />,
    },
    {
      name: 'blackbars',
      render: <BlackBars />,
    },
    {
      name: 'watermark',
      render: <Watermark />,
    },
    {
      name: 'npolaroid-photobook',
      render: <NpolaroidPhotoBook />,
    },
    {
      name: 'drpager',
      render: <Drpager />,
    },
    {
      name: 'vehiclemenu',
      render: <VehicleMenu />,
    },
  ]);

  return (
    <ThemeProvider theme={darkTheme}>      
      {applications.map((data)=>{
        return (
          <Application name={data.name} render={data.render} />
        )
      })}  
    </ThemeProvider>
  );
}

export default App;