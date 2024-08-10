import {  } from "bootstrap";
import "../scss/index.scss";


// Page Custom Script
let heroSvgs = document.querySelectorAll("#hero-svgs use");
let svgCounter = 0;
let svgAnimationId = null
let mobileScreen = matchMedia("(max-width: 991px)")


let startHeroSvgAimation= ()=>{
    heroSvgs.forEach((e)=>{
        e.classList.contains("appear") ? e.classList.remove("appear") : null;
    }) 
    svgAnimationId = setInterval(() => {
        heroSvgs[svgCounter].classList.remove('appear')
        svgCounter++
        heroSvgs[svgCounter] || (svgCounter = 0)
        heroSvgs[svgCounter].classList.add('appear')
        // console.log(`animation running ${svgCounter}`)
    }, 3000)
}

mobileScreen.matches || startHeroSvgAimation()
// ########################################################################

let skills = document.getElementsByClassName("skill-set")[0]
const viewPortObserver = new IntersectionObserver((entry)=>{
    entry.forEach((e)=>{
        // e.target === skills ? e.target.classList.toggle("viewable", e.isIntersecting) : null
        e.target === skills && e.target.classList.toggle("viewable", e.isIntersecting) && console.log(e.boundingClientRect)
        // clearInterval(svgAnimationId)
    })
}, {
    threshold: 0.2
})

viewPortObserver.observe(skills)