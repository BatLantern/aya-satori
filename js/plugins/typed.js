const config={usrTypeSpeed:theme.home_banner.subtitle.typing_speed,usrBackSpeed:theme.home_banner.subtitle.backing_speed,usrBackDelay:theme.home_banner.subtitle.backing_delay,usrStartDelay:theme.home_banner.subtitle.starting_delay,usrLoop:theme.home_banner.subtitle.loop,usrSmartBackspace:theme.home_banner.subtitle.smart_backspace,usrHitokotoAPI:theme.home_banner.subtitle.hitokoto.api};export default function initTyped(t){const{usrTypeSpeed:a,usrBackSpeed:o,usrBackDelay:s,usrStartDelay:r,usrLoop:n,usrSmartBackspace:c,usrHitokotoAPI:e}=config;var p;theme.home_banner.subtitle.hitokoto.enable?fetch(e).then(e=>e.json()).then(e=>{e="『"+e.hitokoto+"』——出自「"+e.from+"」",new Typed("#"+t,{strings:[e],typeSpeed:a||100,smartBackspace:c||!1,backSpeed:o||80,backDelay:s||1500,loop:n||!1,startDelay:r||500})}).catch(console.error):(p=[...theme.home_banner.subtitle.text],document.getElementById(t)&&new Typed("#"+t,{strings:p,typeSpeed:a||100,smartBackspace:c||!1,backSpeed:o||80,backDelay:s||1500,loop:n||!1,startDelay:r||500}))}export{config};