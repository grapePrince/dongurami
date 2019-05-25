// import Common from 'common.js';
import Main from './main.js';
import Introduce from './introduce.js';

const main = new Main();
const introcude = new Introduce();

$(window).on('load', onload); 

function onload() {
    if (main.getCurrentPage() === 'index') {
        main.init();    
    } else if (main.getCurrentPage() === 'introduce') {
        introcude.init(); 
    }
}




