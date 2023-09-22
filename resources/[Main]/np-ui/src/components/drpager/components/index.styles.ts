import { makeStyles } from "@mui/styles";

export default makeStyles({
    '@global': {
        '@keyframes gonuts': {
            '0%': { transform: 'rotate(-2deg)' },
            '50%': { transform: 'rotate(2deg)' },
            '100%': { transform: 'rotate(-2deg)' }
        }
    },
    wrapper: {
        position:'absolute',
        top:'0',
        left:'0',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'right'
    },
    pager: {
        width: '400px',
        height: '300px',
        backgroundSize: 'cover',
        animation: 'gonuts',
        animationDuration: '200ms',
        animationIterationCount: 'infinite'
    },
    pagerPillbox: { backgroundImage: 'url(https://gta-assets.nopixel.net/images/dr-pager.png)' },
    pagerViceroy: { backgroundImage: 'url(https://gta-assets.nopixel.net/images/dr-pager-viceroy.png)' },
    pagerSandy: { backgroundImage: 'url(https://gta-assets.nopixel.net/images/dr-pager-sandy.png)' },
    pagerCentral: { backgroundImage: 'url(https://gta-assets.nopixel.net/images/dr-pager-central.png)' }
});