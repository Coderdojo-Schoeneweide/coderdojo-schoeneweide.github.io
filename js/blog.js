
// generates an h4 under every blog image containing the image title (provided by the cms)
document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll("#blog-content img")
    for (const image of images) {
        const h4 = document.createElement("h4")
        h4.innerHTML = image.title;
        h4.classList.add("blog-image-title")
        image.parentNode.appendChild(h4)
    }
});
