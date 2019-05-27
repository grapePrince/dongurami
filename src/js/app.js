// import Common from 'common.js';
import { Main, Introduce, Process } from './pages.js';

const main = new Main();
const introcude = new Introduce();
const process = new Process();

$(window).on('load', onload); 

function onload() {
    if (main.getCurrentPage() === 'index') {
        main.init();    
    } else if (main.getCurrentPage() === 'introduce') {
        introcude.init(); 
    } else if (main.getCurrentPage() === 'process') {
        process.init();
    }
}
