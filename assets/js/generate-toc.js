function generate_toc() {
  post_content = document.querySelector('.post-content');
  menu = document.querySelector('.post-menu');
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
    console.log(menu_node);
    console.log(a);
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

generate_toc();
