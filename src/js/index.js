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
let portfolioNav = document.querySelector("#portfolio nav")
let currentIndex = 0
let indexScope;
let tagFilter = "All";
let portfoliotabs = document.querySelectorAll("#portfolio .nav-tabs button")
let portfolioDB = [
    {
        title: "Fnmilove Academy",
        desc: "A Vocational Academy",
        favicon: `Fnmilove-Academy`,
        link: "https://fnmilove.netlify.app",
        alt: "Fnmilove Academy Favicon",
        tag: "Websites"
    },
    {
        title: "Everything Church",
        desc: "A blogging website for christian content",
        favicon: `everythingchurch`,
        link: "https://everything-church.onrender.com/",
        alt: "Everything Church Favicon",
        tag: "Websites"
    },
    {
        title: "IADS",
        desc: "Institute of African and Diaspora Studies (University of Lagos)",
        favicon: `iads`,
        link: "https://iads.unilag.edu.ng",
        alt: "IADS Favicon",
        tag: "Websites"
    },
    {
        title: "React Todo App",
        desc: "A complex todo app built with React",
        favicon: `React-todo-app`,
        link: "https://todo-complex-app.netlify.app/",
        alt: "React Todo App Favicon",
        tag: "Lite Apps"
    },
    {
        title: "Wash & Dress",
        desc: "An online campus laundry Service",
        favicon: `dress-and-wash`,
        link: "https://wash-and-dress.onrender.com",
        alt: "Wash & Dress Favicon",
        tag: "Websites"
    },
    {
        title: "Mavnew",
        desc: "An affiliate blogging site for exercise bikes",
        favicon: `mavbike`,
        link: "https://mavnew.onrender.com",
        alt: "Mavnew Favicon",
        tag: "Websites"
    },
    {
        title: "LACC",
        desc: "The Lagos African Cluster Centre",
        favicon: `African-Cluster-Centre-Unilag`,
        link: "https://iads.unilag.edu.ng/lacc",
        alt: "Lagos African Cluster Centre Favicon",
        tag: "Websites"
    },
    {
        title: "NAMS-LASU",
        desc: "The Nigerian Association of Microbiology Students (Lagos State University)",
        favicon: `namslasu`,
        link: "https://namslasu.onrender.com",
        alt: "NAMSLASU Favicon",
        tag: "Websites"
    },
    {
        title: "Candy Station",
        desc: "A marketing website for sale of candy variants",
        favicon: `candy-station`,
        link: "https://candystation.netlify.app/",
        alt: "Candy Station Favicon",
        tag: "Websites"
    },
    {
        title: "The Piano Website",
        desc: "Make a sound just by pushing a keyboard button",
        favicon: `piano-website`,
        link: "https://pianowebsite.netlify.app/",
        alt: "The Piano Website Favicon",
        tag: "Lite Apps"
    },
    {
        title: "Todo App",
        desc: "A simple todo app",
        favicon: `Todo-List`,
        link: "https://plain-todo.netlify.app/",
        alt: "Todo App Favicon",
        tag: "Lite Apps"
    },
    {
        title: "RGB Color Game",
        desc: "A guessing color game",
        favicon: `RGB-color-game`,
        link: "https://bestrgbgame.netlify.app/",
        alt: "RGB Color Game Favicon",
        tag: "Lite Apps"
    },
    {
        title: "Education Website",
        desc: "Assiciation of Education Students",
        favicon: `education`,
        link: "https://facultyedu.onrender.com",
        alt: "Education Website Favicon",
        tag: "Websites"
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
    portfolioNav.classList.toggle("space-below")
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
        a.setAttribute("href", e.link || "");
        let img = document.createElement("img");
        img.setAttribute("loading", "lazy")
        img.setAttribute("src", `https://res.cloudinary.com/kkenny/image/upload/c_fill,q_auto,f_auto,${smallScreen.matches ? "ar_4:3,w_250" : "ar_16:9,w_400"},${"dpr_" + devicePixelRatio}/Web%20Portfolio/${e.favicon}` || "https://res.cloudinary.com/kkenny/image/upload/v1724084297/Web%20Portfolio/samp2_hidrov.jpg")
        img.setAttribute("alt", e.alt || "");
        img.classList.add("opacity-0")
        let h3 = document.createElement("h3");
        h3.textContent = e.title;
        let p = document.createElement("p");
        p.textContent = e.desc;
        let skeleton = document.createElement("div")
        skeleton.classList.add("skeleton")
        img.addEventListener("load", () => {
            img.classList.remove("opacity-0")
            skeleton.classList.remove("skeleton")
        })
        skeleton.replaceChildren(img)
        a.replaceChildren(skeleton, h3, p)
        div.replaceChildren(a)
        return div;
    })
    // Refreshing Portfolio Slide content
    portfolioSlideContent.replaceChildren(...portfolioContent)
}

// Developer contact button phase-in
let contactButton = document.querySelectorAll(".contact-button")
let contactAddress = document.querySelector("#contact-address")
let contactButtonEmail = document.querySelector("#contact-email")
contactButton.forEach(e => {
    e.addEventListener("click", () => {
        contactAddress.textContent !== "kehinde.yishawu@gmail.com" ? contactAddress.textContent = "kehinde.yishawu@gmail.com" : null;
    })
})

contactButtonEmail.addEventListener("click", ()=>{
    contactButtonEmail.classList.add("opacity-0")
})
contactButtonEmail.addEventListener("transitionend", ()=>{
    contactAddress.textContent = "kehinde.yishawu@gmail.com"
})