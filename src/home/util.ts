export const readMore = () => {
    const dots = document.getElementById("readMoreDots")!;
    const moreText = document.getElementById("more")!;

    if (dots.style.display === "none") {
        dots.style.display = "inline";
        moreText.style.display = "none";
    } else {
        dots.style.display = "none";
        moreText.style.display = "inline";
    }
}