const dot = document.getElementById("cursor-dot");
const ring = document.getElementById("cursor-ring");

let mx = 0, my = 0;
let rx = 0, ry = 0;

document.addEventListener("mouseover", e => {
  mx = e.clientX
  my = e.clientY
  dot.style.left = mx + 'px'
  dot.style.top = my + 'px'
})

function animRing() {
  rx += (mx - rx) * 0.12
  ry += (my - ry) * 0.12
  ring.style.left = rx + 'px'
  ring.style.top = ry + 'px'
  requestAnimationFrame(animRing)
}

animRing()

const hoverTargets = 'a, button, .work-item, .game-item, .stat-item, .skill-pill, .art-item'
document.querySelectorAll(hoverTargets).forEach(el => {
  el.addEventListener("mouseenter", () => document.body.classList.add('hovering'))
  el.addEventListener("mouseleave", () => document.body.classList.remove('hovering'))
})

const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting) {
      e.target.classList.add(visible)
    }
  })
}, {
  threshold: 0.08,
  rootMargin: "0px 0px -40px 0px"
})

document.querySelectorAll(".reveal, .line-draw, .work-item, .game-item, .art-item").forEach((el, i) => {
  if(
    el.classList.contains("work-item") ||
    el.classList.contains("game-item") ||
    el.classList.contains("art-item")
  ) {
    el.style.transitionDelay = (i % 4 * 0.08 + 's')
  }
  io.observe(el)
})

const bgText = document.querySelector(".hero-bg-text")

window.addEventListener("scroll", () => {
  const y = window.scrollY
  if(bgText) {
    bgText.style.transform = `translate(-50%, calc(-55% + ${y * 0.15}px))`
  }
})