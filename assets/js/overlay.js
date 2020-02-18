
// Add some text to explain and reference

function pleaseBeGood() {
    if ("@media screen and (max-width: 450px)")
        return mapListBtn()
}



function mapListBtn() {
    var x = document.getElementById("maplist");
    if (x.style.width === "0%") {
        x.style.width = "50%";
    } else {
        x.style.width = "0%";
    }
}