var search_xml = null;
var search_button = document.getElementById('search-button');
var search_box = document.getElementById('search-box');
var search_result_area = document.getElementById('search-result-area');
var search_area = document.getElementById('search-area');
var main_area = document.querySelector('main');

var show_state = false;

function show_search_area() {
    if (!show_state) {
        show_state = true;
        main_area.setAttribute("class", "blur");
        search_box.value = "";
        search_area.setAttribute("class", "search-area");
        search_box.focus();
    }
}

function hide_search_area() {
    if (show_state) {
        show_state = false;
        search_area.setAttribute("class", "search-area hide");
        search_box.value = "";
        main_area.removeAttribute("class");
    }
}

function change_search_area_show_state(state) {
    if (state) {
        show_search_area()
    } else {
        hide_search_area();
    }
}

search_button.onclick = function(ev) {
    change_search_area_show_state(!show_state);
};

search_box.oninput = async function(ev) {
    var keyword = search_box.value;
    if (keyword == "") {
        search_result_area.innerText
        return;
    }
    var result = await search(keyword);
    show_search_results(result, keyword);
    console.log(result);
};

search_area.onsubmit = async function(ev) {
    var keyword = search_box.value;
    if (keyword == "") {
        search_result_area.innerText
        return;
    }
    var result = await search(keyword);
    show_search_results(result, keyword);
    console.log(result);
};

main_area.addEventListener('click', event => {
    hide_search_area();
});

async function fetch_search_xml() {
    var parser = new DOMParser();
    await fetch("/search.xml")
    .then(response => response.text())
    .then(response => {
        search_xml = parser.parseFromString(response, "application/xml");
    })
    .catch(error => {
        console.log("failed to fetch search.xml: ", error);
    });
}

async function search(keyword) {
    keyword = keyword.trim();
    if (search_xml == null) {
        await fetch_search_xml();
    }

    var pages = search_xml.querySelectorAll('page');
    var search_result = [];
    pages.forEach(page => {
        var title = page.querySelector('title').textContent.trim();
        var url = page.querySelector('url').textContent.trim();
        var search_text = page.querySelector('search-text').textContent.trim();


        var all_match = [...search_text.matchAll(keyword)];
        var total_match = all_match.length;
        if (total_match == 0) {
            return;
        }

        var first_match = search_text.search(keyword);
        var before_highlight = search_text.slice(Math.max(first_match - 10, 0), first_match);
        var after_hightlight = search_text.slice(first_match + keyword.length, Math.min(first_match + keyword.length + 10, search_text.length));
        
        search_result.push({
            "title": title,
            "url": url,
            "total_match": total_match,
            "before_highlight": before_highlight,
            "after_highlight": after_hightlight
        })
    });

    search_result.sort((a, b) => {
        return a.total_match > b.total_match;
    })

    return search_result;
}

function show_search_results(results, keyword) {
    search_result_area.innerText = '';
    if (results.length == 0) {
        var new_elem = document.createElement('span');
        new_elem.setAttribute('class', 'search-result-item no-result');
        new_elem.innerText = 'Not Found';
        search_result_area.appendChild(new_elem);
        return;
    }
    results.forEach(result => {
        var new_elem = document.createElement('a');
        new_elem.setAttribute('class', 'search-result-item');
        new_elem.setAttribute('href', result.url)

        // construct result title
        var title = document.createElement('div');
        title.setAttribute('class', 'search-result-title');
        title.innerText = result.title;

        // construct result text
        var result_text = document.createElement('div');
        result_text.setAttribute('class', 'search-result-text')

        var before_highlight = document.createTextNode(' ... ' +result.before_highlight);
        var highlight = document.createElement('span');
        highlight.setAttribute('class', 'search-result-highlight');
        highlight.innerText = keyword;
        var after_higlight = document.createTextNode(result.after_highlight + ' ... ');

        result_text.appendChild(before_highlight);
        result_text.appendChild(highlight);
        result_text.appendChild(after_higlight);
        
        new_elem.appendChild(title);
        new_elem.appendChild(result_text);

        search_result_area.appendChild(new_elem);
    });
}