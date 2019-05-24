// import Common from 'common.js';
import Main from './main.js';
import Introduce from './introduce.js';

const main = Main();
const introcude = Introduce();

$(window).on("load", function(){
    if (main.getCurrentPage() === "index") {
        main.init();    
    } else if (main.getCurrentPage() === "introduce") {
        introcude.init();
    }
}); 


