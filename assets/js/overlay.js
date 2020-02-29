
// In the map section when the screen is on mobile phone size, the lisitng for the map can be displayed on click as overlay occupying 50% of the sceen

function mapListBtn() {
    var x = document.getElementById("maplist");
    if (x.style.width === "0%") {
        x.style.width = "50%";
    } else {
        x.style.width = "0%";
    }
}