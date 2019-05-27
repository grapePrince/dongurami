// import Common from 'common.js';
import { Main, Introduce, Process, Sample } from './pages.js';

const main = new Main();
const introcude = new Introduce();
const process = new Process();
const sample = new Sample();

$(window).on('load', onload); 

function onload() {
    if (main.getCurrentPage() === 'index') {
        main.init();    
    } else if (main.getCurrentPage() === 'introduce') {
        introcude.init(); 
    } else if (main.getCurrentPage() === 'process') {
        process.init();
    } else if (main.getCurrentPage() === 'sample') {
        sample.init();
    }
}
