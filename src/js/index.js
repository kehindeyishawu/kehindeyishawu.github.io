import {  } from "bootstrap";
import "../scss/index.scss";


// Page Custom Script
let heroSvgs = document.querySelectorAll("#hero-svgs use");
// let svgAnimationQue = [...heroSvgs];
// let heroShowUpAnimation = document.querySelector("#intro-content .show-up");
// let currentAnimatingSvg;
let svgCounter = 0;


let startHeroSvgAimation= ()=>{
    heroSvgs.forEach((e)=>{
        e.classList.contains("appear") ? e.classList.remove("appear") : null;
    }) 
    let svgAnimationId = setInterval(() => {
        heroSvgs[svgCounter].classList.remove('appear')
        svgCounter++
        heroSvgs[svgCounter] || (svgCounter = 0)
        heroSvgs[svgCounter].classList.add('appear')
        console.log(`${svgCounter} round`)
    }, 3000)
    console.log(svgAnimationId)
}

startHeroSvgAimation()
