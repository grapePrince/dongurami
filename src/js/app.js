// import Common from 'common.js';
import { Main, Introduce, Process, Sample, Login, Join } from './pages.js';

const main = new Main();
const introcude = new Introduce();
const process = new Process();
const sample = new Sample();
const login = new Login();
const join = new Join();

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
    } else if (main.getCurrentPage() === 'login') {
        login.init();
    } else if (main.getCurrentPage() === 'join') {
        join.init();
    }
}
