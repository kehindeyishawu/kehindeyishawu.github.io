import {  } from "bootstrap";
import "../scss/index.scss";


// Page Custom Script
// Variables
let heroSection = document.querySelector("#hero")
let heroSvgs = document.querySelectorAll("#hero-svgs use");
let svgCounter = 0;
let svgAnimationId = null
let mobileScreen = matchMedia("(max-width: 991px)")


// Hero Partial Section ########################################
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
let restartHeroSvgAnimation = ()=>{
    svgAnimationId || startHeroSvgAimation()
}
let stopHeroSvgAnimation = ()=>{
    svgAnimationId && clearInterval(svgAnimationId) || (svgAnimationId = null)
}

// Skill set Partial Section ########################################################################
let skills = document.getElementsByClassName("skill-set")[0]
const viewPortObserver = new IntersectionObserver((entry)=>{
    entry.forEach((e)=>{
        e.target === skills && e.target.classList.toggle("viewable", e.isIntersecting)
        e.target === hero && e.isIntersecting && !mobileScreen.matches ? restartHeroSvgAnimation() : stopHeroSvgAnimation()
    })
}, {
    threshold: 0.2
})

viewPortObserver.observe(skills)
viewPortObserver.observe(hero)

// POrtfolio partial Section
let portfolioSlideButtons = document.querySelectorAll(".slide-button")
let portfolioSlideContent = document.querySelector(".portfolio-content")
let portfolioList = [
    {
        title: "IADS",
        desc: "Institute of African and Diaspora Studies (University of Lagos)"
    },
    {
        title: "Everything Church",
        desc: "A blogging website for christian content"
    },
    {
        title: "React Todo App",
        desc: "A complex todo app built with React"
    },
    {
        title: "E-laudromat",
        desc: "An online laundry Service"
    },
    {
        title: "Mavnew",
        desc: "An affiliate blogging site for exercise bikes"
    },
    {
        title: "LACC",
        desc: "The Lagos African Cluster Centre"
    },
    {
        title: "NAMS-LASU",
        desc: "The Nigerian Association of Microbiology Students (Lagos State University)"
    },
    {
        title: "Candy Station",
        desc: "A marketing website for sale of candy variants"
    },
    {
        title: "The Piano Website",
        desc: "Make a sound just by pushing a keyboard button"
    },
    {
        title: "Todo App",
        desc: "A classic todo app"
    },
    {
        title: "RGB Color Game",
        desc: "A guessing color game"
    },
    {
        title: "Education Website",
        desc: "Assiciation of Education Students"
    },
]

portfolioSlideButtons.forEach((e,i) => {
    e.addEventListener("click", ()=>{
        portfolioSlideContent.animate({
            translate: [i? "-3%": "3%", "0"],
            opacity: [0, 1]
        },300)
    })
})
let portfolioContent = portfolioList.map((e)=>{
    let div = document.createElement("div")
    div.classList.add("col")
    let a = document.createElement("a")
    let img = document.createElement("img")
    img.setAttribute("src", "./image/samp2.jpg")
    let h3 = document.createElement("h3");
    h3.textContent = e.title;
    let p = document.createElement("p");
    p.textContent = e.desc;
    a.replaceChildren(img,h3,p)
    div.replaceChildren(a)
    return div;
})

portfolioSlideContent.replaceChildren(...portfolioContent)
