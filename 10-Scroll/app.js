// Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
// pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
// slice extracts a section of a string without modifying original string
//offsetTop - A Number, representing the top position of the element, in pixels

// ********** set date ************
const date = document.getElementById('date');
date.innerHTML = new Date().getFullYear();
// ********** close links ************
const navToggle = document.querySelector('.nav-toggle');
const linksContainer = document.querySelector('.links-container');
const links = document.querySelector('.links');

navToggle.addEventListener('click', ()=>{
    //linkContainer.classList.toggle('show-links')
    //to make the height dynamic
    const containerHeight = linksContainer.getBoundingClientRect().height;
    const linksHeight = links.getBoundingClientRect().height;
    if(containerHeight === 0) {
        linksContainer.style.height = `${linksHeight}px`;
    }
    else{
        linksContainer.style.height = 0;
    }
});
// ********** fixed navbar ************
const navbar = document.getElementById('nav');
const topLink = document.querySelector('.top-link');
const navbarHeight = navbar.getBoundingClientRect().height;

window.addEventListener('scroll',()=>{    
    if(window.pageYOffset > navbarHeight){
        navbar.classList.add('fixed-nav');
    }
    else{
        navbar.classList.remove('fixed-nav');
    }
    //arbitrary height
    if(window.pageYOffset > 450){
        topLink.classList.add('show-link');
    }
    else{
        topLink.classList.remove('show-link');
    }
});
// ********** smooth scroll ************
// select links

const scrollLinks = document.querySelectorAll('.scroll-link');

scrollLinks.forEach((link)=>{
    link.addEventListener('click',(e)=>{
        //prevent default behavior
        e.preventDefault();
        //navigate to specific spot
        //first we get the id by getting the attribute and slicing the string from index 1
        const id = e.currentTarget.getAttribute('href').slice(1);
        const element = document.getElementById(id);
        // calculate the heights
        const navHeight = navbar.getBoundingClientRect().height;
        const containerHeight = linksContainer.getBoundingClientRect().height;
        const fixedNav = navbar.classList.contains('fixed-nav');
        let position = element.offsetTop;
        position -= navHeight;

        if(!fixedNav) {
            position -= navHeight;
        }

        if(navHeight > 82) {
            position += containerHeight;
        }
        window.scrollTo({
            left:0,
            top: position,
        });
        linksContainer.style.height = 0;
    });
});