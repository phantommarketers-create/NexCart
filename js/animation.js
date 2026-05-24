const reveals = document.querySelectorAll(".reveal");

const revealOnScroll = () => {

    reveals.forEach(reveal => {

        const windowHeight =
            window.innerHeight;

        const revealTop =
            reveal.getBoundingClientRect().top;

        const revealPoint = 100;

        if (revealTop < windowHeight - revealPoint) {
            reveal.classList.add("active");
        }
    });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);
window.addEventListener("resize", revealOnScroll);