import {  } from "bootstrap";
import "../scss/index.scss";


// Page Custom Script
// Variables
let heroSection = document.querySelector("#hero")
let heroSvgs = document.querySelectorAll("#hero-svgs use");
let svgCounter = 0;
let svgAnimationId = null
let smallScreen = matchMedia("(max-width: 767px)");
let mediumScreen = matchMedia("(max-width: 991px)");


// Hero Partial Section ########################################
let startHeroSvgAimation= ()=>{
    svgAnimationId = setInterval(() => {
        heroSvgs[svgCounter].classList.remove('appear')
        svgCounter++
        heroSvgs[svgCounter] || (svgCounter = 0)
        heroSvgs[svgCounter].classList.add('appear')
        // console.log(`animation running ${svgCounter}`)
    }, 3000)
}

mediumScreen.matches || startHeroSvgAimation()
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
        e.target === hero && e.isIntersecting && !mediumScreen.matches ? restartHeroSvgAnimation() : stopHeroSvgAnimation()
    })
}, {
    threshold: 0.2
})

viewPortObserver.observe(skills)
viewPortObserver.observe(hero)

// POrtfolio partial Section
let portfolioSlideButtons = document.querySelectorAll(".slide-button")
let portfolioSlideContent = document.querySelector(".portfolio-content")
let mobileChangeView = document.querySelector(".change-view")
let currentIndex = 0
let indexScope;
let tagFilter = "All";
let portfoliotabs = document.querySelectorAll("#portfolio .nav-tabs button")
let portfolioDB = [
    {
        title: "IADS",
        desc: "Institute of African and Diaspora Studies (University of Lagos)",
        tag: "Generic Websites"
    },
    {
        title: "Everything Church",
        desc: "A blogging website for christian content",
        tag: "Generic Websites"
    },
    {
        title: "React Todo App",
        desc: "A complex todo app built with React",
        tag: "Specialized Apps"
    },
    {
        title: "E-laudromat",
        desc: "An online laundry Service",
        tag: "Generic Websites"
    },
    {
        title: "Mavnew",
        desc: "An affiliate blogging site for exercise bikes",
        tag: "Generic Websites"
    },
    {
        title: "LACC",
        desc: "The Lagos African Cluster Centre",
        tag: "Generic Websites"
    },
    {
        title: "NAMS-LASU",
        desc: "The Nigerian Association of Microbiology Students (Lagos State University)",
        tag: "Generic Websites"
    },
    {
        title: "Candy Station",
        desc: "A marketing website for sale of candy variants",
        tag: "Generic Websites"
    },
    {
        title: "The Piano Website",
        desc: "Make a sound just by pushing a keyboard button",
        tag: "Specialized Apps"
    },
    {
        title: "Todo App",
        desc: "A classic todo app",
        tag: "Specialized Apps"
    },
    {
        title: "RGB Color Game",
        desc: "A guessing color game",
        tag: "Specialized Apps"
    },
    {
        title: "Education Website",
        desc: "Assiciation of Education Students",
        tag: "Generic Websites"
    },
]

portfoliotabs.forEach((e) => {
    e.addEventListener("click", () => {
        (e.textContent !== tagFilter) && (tagFilter = e.textContent)
        refreshSlideContent()
    })
})

portfolioSlideButtons.forEach((e,i) => {
    e.addEventListener("click", ()=>{
        i ? refreshSlideContent("next") : refreshSlideContent("prev")
        portfolioSlideContent.animate({
            translate: [i? "-3%": "3%", "0"],
            opacity: [0, 1]
        },300)
    })
})

mobileChangeView.addEventListener("click", ()=>{
    portfolioSlideContent.classList.toggle("flex-wrap")
    portfolioSlideContent.classList.toggle("justify-content-center")
    mobileChangeView.classList.toggle("expanded-view")
    if(mobileChangeView.children[0].textContent === "Expand View"){
        mobileChangeView.children[0].textContent = "Collapse View"
    } else{
        mobileChangeView.children[0].textContent = "Expand View"
    }
})

refreshSlideContent()
function refreshSlideContent(operation) {
    // tab glow style and accessibility switch
    portfoliotabs.forEach((e)=>{
        (e.textContent === tagFilter) ? e.classList.add("active") || e.setAttribute("aria-current", "page") : e.classList.remove("active") || e.removeAttribute("aria-current")
    })
    // Media query screen check
    if(smallScreen.matches){
        indexScope = portfolioDB.length;
    }else if(mediumScreen.matches){
        indexScope = 6;
    }else{
        indexScope = 8;
    }

    // operation type
    if (operation === "next"){
        currentIndex += indexScope;
    }else if(operation === "prev"){
        currentIndex -= indexScope;
    } 
    else{
        currentIndex = 0;
    }

    // filtering portfolio database by index range (currentIndex and indexScope) and tags
    let sortedList = []
    if (tagFilter === "All"){
        sortedList = portfolioDB
    }else{
        sortedList = portfolioDB.filter((e)=>{
            return e.tag === tagFilter
        })
    }
    let newList = sortedList.filter((e, i)=>{
        return (i >= currentIndex && i < indexScope + currentIndex)
    })

    // evaluate and correct index ranges, plus disabling corresponding buttons
    if(currentIndex <= 0){
        currentIndex = 0;
        portfolioSlideButtons[0].setAttribute("disabled", true)
    }else if(portfolioSlideButtons[0].getAttribute("disabled")){
        portfolioSlideButtons[0].removeAttribute("disabled")
    }
    
    if (currentIndex + indexScope >= sortedList.length){
        portfolioSlideButtons[1].setAttribute("disabled", true)
    } else if (portfolioSlideButtons[1].getAttribute("disabled")) {
        portfolioSlideButtons[1].removeAttribute("disabled")
    }

    // creating new portfolio Slide Content
    let portfolioContent = newList.map((e) => {
        let div = document.createElement("div")
        div.classList.add("col")
        let a = document.createElement("a")
        let img = document.createElement("img")
        img.setAttribute("src", "https://res.cloudinary.com/kkenny/image/upload/v1724084297/Web%20Portfolio/samp2_hidrov.jpg")
        let h3 = document.createElement("h3");
        h3.textContent = e.title;
        let p = document.createElement("p");
        p.textContent = e.desc;
        a.replaceChildren(img, h3, p)
        div.replaceChildren(a)
        return div;
    })
    // Refreshing Portfolio Slide content
    portfolioSlideContent.replaceChildren(...portfolioContent)
}

