var used_heading_ids = null;

function make_heading_slug(text) {
  // Approximate Pandoc's auto_identifiers: lower-case, keep unicode
  // letters/numbers, spaces become hyphens, drop other punctuation.
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s._-]/gu, '')
    .replace(/[\s\u00a0]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^[-.]+|[-.]+$/g, '');
}

function ensure_heading_ids(root) {
  if (!used_heading_ids) {
    used_heading_ids = new Set();
    document.querySelectorAll('[id]').forEach(function (el) {
      used_heading_ids.add(el.id);
    });
  }

  root.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach(function (heading) {
    if (heading.id) {
      used_heading_ids.add(heading.id);
      return;
    }

    var base = make_heading_slug(heading.textContent || '') || 'section';
    var id = base;
    var n = 1;
    while (used_heading_ids.has(id)) {
      id = base + '-' + n;
      n++;
    }
    heading.id = id;
    used_heading_ids.add(id);
  });
}

function generate_toc(menu) {
  post_content = document.querySelector('.post-content');
  if (!post_content) {
    return;
  }
  ensure_heading_ids(post_content);

  var flag = false;
  post_content.childNodes.forEach( node => {
    if (!node.tagName) {
      return;
    }
    if (node.tagName == 'H1' || node.tagName == 'H2' || node.tagName == 'H3' || node.tagName == 'H4') {
      flag = true;
    }
  });
 
  var createElement = (tag, innerText, classname) => {
    node = document.createElement(tag);
    node_text = document.createTextNode(innerText);
    node.appendChild(node_text);
    node.setAttribute('class', classname);
    return node;
  }

  var createMenuNode = (node) => {
    menu_node = createElement('div', '', 'menu-item menu-'+node.tagName.toLowerCase());
    a = createElement('a', node.innerText, 'menu-item-link');
    a.setAttribute('href', '#' + node.id);
    // console.log(menu_node);
    menu_node.appendChild(a);
    return menu_node;
  }
  if (!flag) {
    no_content = createElement('div', '无目录', 'menu-no-item');
    menu.appendChild(no_content);
    return;
  }
 
  post_content.childNodes.forEach( node => {
    if (!node.tagName || !node.innerText) {
      return;
    }
    if (node.tagName != 'H1' && node.tagName != 'H2' && node.tagName != 'H3' && node.tagName != 'H4' && node.tageName != 'HR') {
      return;
    }
    menu_node = createMenuNode(node);
    menu.appendChild(menu_node)
  })
}

function generate_all_toc() {
  menu = document.querySelectorAll('.post-menu');
  menu.forEach((value, key, array) => {
    generate_toc(value);
  })
}

generate_all_toc();
