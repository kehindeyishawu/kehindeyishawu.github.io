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
        // console.log(`${svgCounter} round`)
    }, 3000)
}

startHeroSvgAimation()
// ########################################################################

let skills = document.getElementsByClassName("skill-set")[0]
const viewPortObserver = new IntersectionObserver((entry)=>{
    entry.forEach((e)=>{
        e.target === skills ? e.target.classList.toggle("viewable", e.isIntersecting) : null
        // e.target === skills ? e.target.classList.toggle("viewable", e.isIntersecting) : null
        console.log(e.intersectionRatio)
    })
}, {
    threshold: 0.2
})

viewPortObserver.observe(skills)