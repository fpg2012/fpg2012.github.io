window.onload = () => {
    let gen_onclick = function(img) {
        return function(e) {
            var container = document.getElementById("fullscreen-img-container");
            container.appendChild(img.cloneNode())
            container.setAttribute("class", "show")
            state = 0;
        }
    }

    let imgs = document.getElementsByTagName("img");
    for (let i = 0; i < imgs.length; ++i) {
        var state = 0;
        imgs[i].onclick = gen_onclick(imgs[i]);
    }

    var container = document.getElementById("fullscreen-img-container");
    container.onclick = (e) => {
        var container = document.getElementById("fullscreen-img-container");
        container.setAttribute("class", "hidden");
        container.innerText = "";
    }
};