var counting_stars_state = {
    "count": -1,
    "liked": false,
    "btn": document.querySelectorAll('counting-stars-btn'),
    "indicator": document.querySelectorAll('counting-stars-indicator'),
    "debounce": false,
    "interval": null
};

function counting_stars_update_ui() {
    counting_stars_state.indicator.forEach((ele, key, array) => {
        ele.innerText = counting_stars_state.count.toString();
    })
    counting_stars_state.btn.forEach((ele, key, array) => {
        if (counting_stars_state.liked) {
            ele.setAttribute("class", "counting-stars-btn counting-stars-liked")
        } else {
            ele.setAttribute("class", "counting-stars-btn")
        }
    })
    console.log('update ui')
}

function counting_stars() {
    fetch(counting_stars_url + '?' + new URLSearchParams({
        'url': window.location.href
    }), {
        'method': "GET"
    })
    .then(resp => resp.text())
    .then(resp => {
        counting_stars_state.liked = parseInt(resp) == 1;
        console.log('liked', parseInt(resp), parseInt(resp) == 1);
        counting_stars_update_ui();
    });

    fetch(counting_stars_url + '/cnt?' + new URLSearchParams({
        'url': window.location.href
    }), {
        'method': "GET"
    })
    .then(resp => resp.text())
    .then(resp => {
        counting_stars_state.count = parseInt(resp);
        console.log('count', parseInt(resp));
        counting_stars_update_ui();
    });

    counting_stars_state.btn.forEach((btn, key, array) => {
        btn.addEventListener("click", function(event) {
            if (counting_stars_state.debounce) {
                return;
            }

            counting_stars.debounce = true;

            if (counting_stars_state.liked) {
                fetch(counting_stars_url + '?' + new URLSearchParams({
                    'url': window.location.href
                }), {
                    'method': "DELETE"
                })
                .then(resp => {
                    counting_stars_state.count -= 1;
                    counting_stars_state.liked = false;
                    counting_stars_update_ui();
                });
            } else {
                fetch(counting_stars_url + '?' + new URLSearchParams({
                    'url': window.location.href
                }), {
                    'method': "PUT"
                })
                .then(resp => {
                    counting_stars_state.count += 1;
                    counting_stars_state.liked = true;
                    counting_stars_update_ui();
                });
            }
            console.log('clicked')

            counting_stars_state.interval = setInterval(() => {
                counting_stars_state.debounce = false;
                clearInterval(counting_stars_state.interval);
            }, 1000);
        });
    })
}

window.addEventListener('load', () => {
    console.log('counting stars');
    counting_stars_state.btn = document.querySelectorAll('.counting-stars-btn');
    counting_stars_state.indicator = document.querySelectorAll('.counting-stars-indicator');
    counting_stars();
})