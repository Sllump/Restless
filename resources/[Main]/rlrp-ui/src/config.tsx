import React from "react";
import Drpager from "./components/drpager/components";
import NpolaroidPhotoBook from "./components/npolaroid-photobook/components";
import Watermark from "./components/watermark/components";
import BlackBars from "./components/blackbars/components";
import Hud from "./components/hud/components";
import { RestartAlert } from "./components/main/components";
import Preferences from "./components/preferences/components";
import Golf from "./components/golf/components";
import SniperScope from "./components/sniper-scope/components";
import Compass from "./components/compass/components";
import YachtEnvelope from "./components/yacht-envelope/components";
import Ballot from "./components/ballot/components";
import CaseOpening from "./components/case-opening/components";
import TcgCard from "./components/tcg-card/components";
import Bugs from "./components/bugs/components";
import Book from "./components/book/components";
import Notepad from "./components/notepad/components";
import TextPopup from "./components/textpopup/components";
import VoiceURL from "./components/voice-url/components";
import Showroom from "./components/showroom/components";
import MemoryGame from "./components/memory-game/components";
import MusicPlayer from "./components/musicplayer/components";
import Gopros from "./components/gopros/components";
import NewsPaper from "./components/newspaper/components";
import NewsCam from "./components/newscam/components";
import BoostingTablet from "./components/laptop/components";
import RangePicker from "./components/range-picker/components";
import DispatchApp from "./components/dispatch/components";
import Burner from "./components/burner/components";
import Phone from "@mui/icons-material/Phone";
import Financials from "./components/financials/components";
import Peek from "./components/peek/components";
import Mdw from "./components/mdw/components";
import Cash from "./components/cash/components";
import ClothingMenu from "./components/clothing/components";
import TextBox from "./components/textBox/components";
import Interaction from "./components/interaction/components";
import StatusHud from "./components/statushud/components";
import Badge from "./components/badge/components";
import Radio from "./components/radio/components";
import TaskBar from "./components/taskbar/components";
import Context from "./components/context/components";


const useApplicationsState = [
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
]


export default useApplicationsState;
