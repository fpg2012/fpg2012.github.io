var command_text = document.getElementById('command');
var item_sel = document.getElementById('item-selection');
var ec_sel = document.getElementById('enchantment-selection');
var mat_sel = document.getElementById('material-selection');
var player = document.getElementById('player-name');
var ammount = document.getElementById('ammount');

const item_list = [
  {
    'name': 'enchanted_book',
    'name_cn': '书',
    'name_en': 'Book',
    'materials': null
  },
  {
    'name': 'pickaxe',
    'name_cn': '镐',
    'name_en': 'Pickaxe',
    'materials': ['netherite', 'diamond', 'iron', 'stone', 'golden', 'wooden']
  },
  {
    'name': 'shovel',
    'name_cn': '铲',
    'name_en': 'Shovel',
    'materials': ['netherite', 'diamond', 'iron', 'stone', 'golden', 'wooden']
  },
  {
    'name': 'axe',
    'name_cn': '斧',
    'name_en': 'Axe',
    'materials': ['netherite', 'diamond', 'iron', 'stone', 'golden', 'wooden']
  },
  {
    'name': 'sword',
    'name_cn': '剑',
    'name_en': 'Sword',
    'materials': ['netherite', 'diamond', 'iron', 'stone', 'golden', 'wooden']
  },
  {
    'name': 'hoe',
    'name_cn': '锄',
    'name_en': 'Hoe',
    'materials': ['netherite', 'diamond', 'iron', 'stone', 'golden', 'wooden']
  },
  {
    'name': 'helmet',
    'name_cn': '盔',
    'name_en': 'Helmet',
    'materials': [
      'netherite', 'diamond', 'iron', 'stone', 'golden', 'wooden', 'leather',
      'chainmail'
    ]
  },
  {
    'name': 'chestplate',
    'name_cn': '甲',
    'name_en': 'Chestplate',
    'materials': [
      'netherite', 'diamond', 'iron', 'stone', 'golden', 'wooden', 'leather',
      'chainmail'
    ]
  },
  {
    'name': 'leggings',
    'name_cn': '护腿',
    'name_en': 'Leggings',
    'materials': [
      'netherite', 'diamond', 'iron', 'stone', 'golden', 'wooden', 'leather',
      'chainmail'
    ]
  },
  {
    'name': 'boots',
    'name_cn': '靴',
    'name_en': 'Boots',
    'materials': [
      'netherite', 'diamond', 'iron', 'stone', 'golden', 'wooden', 'leather',
      'chainmail'
    ]
  },
  {'name': 'bow', 'name_cn': '弓', 'name_en': 'Bow', 'materials': null},
  {
    'name': 'crossbow',
    'name_cn': '弩',
    'name_en': 'Crossbow',
    'materials': null
  },
  {
    'name': 'fishing_rod',
    'name_cn': '钓竿',
    'name_en': 'Fishing Rod',
    'materials': null
  },
  {
    'name': 'trident',
    'name_cn': '三叉戟',
    'name_en': 'Trident',
    'materials': null
  },
  {'name': 'shield', 'name_cn': '盾', 'name_en': 'Shield', 'materials': null},
  {'name': 'elytra', 'name_cn': '鞘翅', 'name_en': 'Elytra', 'materials': null},
  {
    'name': 'flint_and_steel',
    'name_cn': '打火石',
    'name_en': 'Flint&Steel',
    'materials': null
  },
  {
    'name': 'carrot_and_stick',
    'name_cn': '胡萝卜竿',
    'name_en': 'Carrot&Stick',
    'materials': null
  },
  {
    'name': 'warped_fungus_on_a_stick',
    'name_cn': '诡异菌竿',
    'name_en': 'Fungus&Stick',
    'materials': null
  },
  {'name': 'shears', 'name_cn': '剪刀', 'name_en': 'Shears', 'materials': null},
  {
    'name': 'turtle_shell',
    'name_cn': '龟壳帽',
    'name_en': 'Turtle Shell',
    'materials': null
  }
];

const enchant_list = [
  {
    'name': 'aqua_affinity',
    'name_cn': '水下速掘',
    'name_en': 'Aqua Affinity',
    'incompatible_to': [],
    'appliable_to': ['helmet', 'turtle_shell', 'enchanted_book'],
    'max_lv': 1
  },
  {
    'name': 'bane_of_arthropods',
    'name_cn': '节肢杀手',
    'name_en': 'Bane of Arthropods',
    'incompatible_to': ['smite', 'sharpness', 'enchanted_book'],
    'appliable_to': ['sword', 'axe'],
    'max_lv': 5
  },
  {
    'name': 'blast_protection',
    'name_cn': '爆炸保护',
    'name_en': 'Blast Protection',
    'incompatible_to':
        ['fire_protection', 'protection', 'projectile_protection'],
    'appliable_to': [
      'helmet', 'turtle_shell', 'chestplate', 'leggings', 'boots',
      'enchanted_book'
    ],
    'max_lv': 4
  },
  {
    'name': 'channeling',
    'name_cn': '引雷',
    'name_en': 'Channeling',
    'incompatible_to': ['riptide'],
    'appliable_to': ['trident', 'enchanted_book'],
    'max_lv': 1
  },
  {
    'name': 'binding_curse',
    'name_cn': '绑定诅咒',
    'name_en': 'Binding Curse',
    'incompatible_to': [],
    'appliable_to': [
      'helmet', 'leggings', 'boots', 'elytra', 'chestplate', 'turtle_shell',
      'enchanted_book'
    ],
    'max_lv': 1
  },
  {
    'name': 'vanishing_curse',
    'name_cn': '消失诅咒',
    'name_en': 'Vanishing Curse',
    'incompatible_to': [],
    'appliable_to': [],
    'max_lv': 1
  },
  {
    'name': 'depth_strider',
    'name_cn': '水下行走',
    'name_en': 'Depth Strider',
    'incompatible_to': ['frost_walker'],
    'appliable_to': ['boots', 'enchanted_book'],
    'max_lv': 3
  },
  {
    'name': 'efficiency',
    'name_cn': '效率',
    'name_en': 'Efficiency',
    'incompatible_to': [],
    'appliable_to':
        ['pickaxe', 'axe', 'hoe', 'shovel', 'shears', 'enchanted_book'],
    'max_lv': 5
  },
  {
    'name': 'feather_falling',
    'name_cn': '掉落保护',
    'name_en': 'Feather Falling',
    'incompatible_to': [],
    'appliable_to': ['boots', 'enchanted_book'],
    'max_lv': 4
  },
  {
    'name': 'fire_aspect',
    'name_cn': '火焰附加',
    'name_en': 'Fire Aspect',
    'incompatible_to': [],
    'appliable_to': ['sword', 'axe', 'enchanted_book'],
    'max_lv': 2
  },
  {
    'name': 'fire_protection',
    'name_cn': '火焰保护',
    'name_en': 'Fire Protection',
    'incompatible_to':
        ['blast_protection', 'projectile_protection', 'protection'],
    'appliable_to': [
      'helmet', 'turtle_shell', 'chestplate', 'leggings', 'boots',
      'enchanted_book'
    ],
    'max_lv': 4
  },
  {
    'name': 'flame',
    'name_cn': '火矢',
    'name_en': 'Flame',
    'incompatible_to': [],
    'appliable_to': ['bow', 'enchanted_book'],
    'max_lv': 1
  },
  {
    'name': 'fortune',
    'name_cn': '时运',
    'name_en': 'Fortune',
    'incompatible_to': ['silk_touch'],
    'appliable_to': ['pickaxe', 'axe', 'hoe', 'shovel', 'enchanted_book'],
    'max_lv': 3
  },
  {
    'name': 'frost_walker',
    'name_cn': '冰霜行者',
    'name_en': 'Frost Walker',
    'incompatible_to': ['depth_strider'],
    'appliable_to': ['boots', 'enchanted_book'],
    'max_lv': 2
  },
  {
    'name': 'impaling',
    'name_cn': '穿刺',
    'name_en': 'Impaling',
    'incompatible_to': [],
    'appliable_to': ['trident', 'enchanted_book'],
    'max_lv': 5
  },
  {
    'name': 'infinity',
    'name_cn': '无限',
    'name_en': 'Infinity',
    'incompatible_to': ['mending', 'enchanted_book'],
    'appliable_to': ['bow'],
    'max_lv': 1
  },
  {
    'name': 'knockback',
    'name_cn': '击退',
    'name_en': 'Knockback',
    'incompatible_to': [],
    'appliable_to': ['sword', 'enchanted_book'],
    'max_lv': 2
  },
  {
    'name': 'looting',
    'name_cn': '抢夺',
    'name_en': 'Looting',
    'incompatible_to': [],
    'appliable_to': ['sword', 'enchanted_book'],
    'max_lv': 3
  },
  {
    'name': 'loyalty',
    'name_cn': '忠诚',
    'name_en': 'Loyalty',
    'incompatible_to': ['riptide'],
    'appliable_to': ['trident', 'enchanted_book'],
    'max_lv': 3
  },
  {
    'name': 'luck_of_sea',
    'name_cn': '海之眷顾',
    'name_en': 'Luck of Sea',
    'incompatible_to': [],
    'appliable_to': ['fishing_rod', 'enchanted_book'],
    'max_lv': 3
  },
  {
    'name': 'lure',
    'name_cn': '饵钓',
    'name_en': 'Lure',
    'incompatible_to': [],
    'appliable_to': ['fishing_rod', 'enchanted_book'],
    'max_lv': 3
  },
  {
    'name': 'mending',
    'name_cn': '经验修补',
    'name_en': 'Mending',
    'incompatible_to': ['infinity', 'enchanted_book'],
    'appliable_to': [],
    'max_lv': 1
  },
  {
    'name': 'multishot',
    'name_cn': '多发',
    'name_en': 'Multishot',
    'incompatible_to': ['piercing'],
    'appliable_to': ['crossbow', 'enchanted_book'],
    'max_lv': 1
  },
  {
    'name': 'piercing',
    'name_cn': '穿透',
    'name_en': 'Piercing',
    'incompatible_to': ['multishot'],
    'appliable_to': ['crossbow', 'enchanted_book'],
    'max_lv': 4
  },
  {
    'name': 'power',
    'name_cn': '力量',
    'name_en': 'Power',
    'incompatible_to': [],
    'appliable_to': ['bow', 'enchanted_book'],
    'max_lv': 5
  },
  {
    'name': 'projectile_protection',
    'name_cn': '弹射物保护',
    'name_en': 'Projectile Protection',
    'incompatible_to': ['protection', 'blast_protection', 'fire_protection'],
    'appliable_to': [
      'helmet', 'turtle_shell', 'chestplate', 'leggings', 'boots',
      'enchanted_book'
    ],
    'max_lv': 4
  },
  {
    'name': 'protection',
    'name_cn': '保护',
    'name_en': 'Protection',
    'incompatible_to':
        ['projectile_protection', 'blast_protection', 'fire_protection'],
    'appliable_to': [
      'helmet', 'turtle_shell', 'chestplate', 'leggings', 'boots',
      'enchanted_book'
    ],
    'max_lv': 4
  },
  {
    'name': 'punch',
    'name_cn': '冲击',
    'name_en': 'Punch',
    'incompatible_to': [],
    'appliable_to': ['bow', 'enchanted_book'],
    'max_lv': 2
  },
  {
    'name': 'quick_charge',
    'name_cn': '快速装填',
    'name_en': 'Quick Charge',
    'incompatible_to': [],
    'appliable_to': ['crossbow', 'enchanted_book'],
    'max_lv': 3
  },
  {
    'name': 'respiration',
    'name_cn': '水下呼吸',
    'name_en': 'Respiration',
    'incompatible_to': [],
    'appliable_to': ['helmet', 'turtle_shell', 'enchanted_book'],
    'max_lv': 3
  },
  {
    'name': 'riptide',
    'name_cn': '激流',
    'name_en': 'Riptide',
    'incompatible_to': ['channeling', 'loyalty'],
    'appliable_to': ['trident', 'enchanted_book'],
    'max_lv': 3
  },
  {
    'name': 'sharpness',
    'name_cn': '锋利',
    'name_en': 'Sharpness',
    'incompatible_to': ['smite', 'bane_of_arthropods'],
    'appliable_to': ['sword', 'axe', 'enchanted_book'],
    'max_lv': 5
  },
  {
    'name': 'silk_touch',
    'name_cn': '精准采集',
    'name_en': 'Silk Touch',
    'incompatible_to': ['fortune'],
    'appliable_to': ['pickaxe', 'axe', 'hoe', 'shovel', 'enchanted_book'],
    'max_lv': 1
  },
  {
    'name': 'smite',
    'name_cn': '亡灵杀手',
    'name_en': 'Smite',
    'incompatible_to': ['sharpness', 'bane_of_arthropods'],
    'appliable_to': ['sword', 'axe', 'enchanted_book'],
    'max_lv': 5
  },
  {
    'name': 'soul_speed',
    'name_cn': '灵魂疾行',
    'name_en': 'Soul Speed',
    'incompatible_to': [],
    'appliable_to': ['boots', 'enchanted_book'],
    'max_lv': 3
  },
  {
    'name': 'sweeping_edge',
    'name_cn': '横扫之刃',
    'name_en': 'Sweeping Edge',
    'incompatible_to': [],
    'appliable_to': ['sword', 'enchanted_book'],
    'max_lv': 3
  },
  {
    'name': 'swift_sneak',
    'name_cn': '快速潜行',
    'name_en': 'Swift Sneak',
    'incompatible_to': [],
    'appliable_to': ['leggings', 'enchanted_book'],
    'max_lv': 3
  },
  {
    'name': 'thorns',
    'name_cn': '荆棘',
    'name_en': 'Thorns',
    'incompatible_to': [],
    'appliable_to': [
      'chestplate', 'helmet', 'leggings', 'boots', 'turtle_shell',
      'enchanted_book'
    ],
    'max_lv': 3
  },
  {
    'name': 'unbreaking',
    'name_cn': '耐久',
    'name_en': 'Unbreaking',
    'incompatible_to': [],
    'appliable_to': [],
    'max_lv': 3
  }
];

const materials = [
  {name: 'diamond', name_cn: '钻石', name_en: 'Diamond'},
  {name: 'netherite', 'name_cn': '下界合金', name_en: 'Netherite'},
  {name: 'iron', 'name_cn': '铁', name_en: 'Iron'},
  {name: 'stone', 'name_cn': '石', name_en: 'Stone'},
  {name: 'golden', 'name_cn': '金', name_en: 'Golden'},
  {name: 'wooden', 'name_cn': '木', name_en: 'Wooden'},
  {name: 'chainmail', 'name_cn': '锁链', name_en: 'Chainmail'},
  {name: 'leather', 'name_cn': '皮革', name_en: 'Leather'}
];

var STATE =
    {
      item_selected: null,
      item_selected_span: null,
      material_selected: null,
      material_selected_span: null,
      enchantment_selected: [],
      enchantment_displayed: [],
      enchant_span_map: {},
      enchant_lv_map: {},
      player: '@p',
      ammount: 1,
    }

function filterOutEnchantments() {
  var ok_ench = enchant_list.filter(ench => {
    var flag = true;
    if (ench.appliable_to.length > 0) {
      if (STATE.item_selected !== null &&
          !ench.appliable_to.includes(STATE.item_selected.name)) {
        flag = false;
      }
    }
    return flag;
  });

  // console.log(ok_ench);

  var to_be_deselect = STATE.enchantment_selected.filter(ench => {
    return !ok_ench.includes(ench);
  });
  to_be_deselect.forEach(ench => {
    STATE.enchantment_selected.splice(
        STATE.enchantment_selected.indexOf(ench), 1);
  });

  var compatible_ench =
      ok_ench.filter(ench => {return STATE.enchantment_selected.every(ench2 => {
                       return !ench2.incompatible_to.includes(ench.name);
                     })});

  STATE.enchantment_displayed.splice(0, STATE.enchantment_displayed.length);
  compatible_ench.forEach(ench => {
    STATE.enchantment_displayed.push(ench);
  });

  // console.log(STATE);

  updateEnchantments();
}

function updateEnchantments() {
  ec_sel.innerHTML = '';
  STATE.enchantment_selected.forEach(ench => {
    var ech_name = document.createElement('span');
    var ech_name_text = document.createTextNode(tr(ench));
    ech_name.appendChild(ech_name_text);

    var level_input = document.createElement('input');
    level_input.type = 'number';
    level_input.setAttribute('min', 0);
    level_input.setAttribute('max', ench.max_lv);
    level_input.value = ench.max_lv;
    level_input.addEventListener('change', event => {
      STATE.enchant_lv_map[ench.name] = level_input.value;
      updateCommand();
    })
    level_input.addEventListener('click', event => event.stopPropagation());

    var li = document.createElement('div');
    li.appendChild(ech_name);
    li.appendChild(level_input);
    li.setAttribute('class', 'selected');

    STATE.enchant_span_map[ench.name] = li;
    li.addEventListener('click', event => {
      if (STATE.enchantment_selected.includes(ench)) {
        STATE.enchantment_selected.splice(
            STATE.enchantment_selected.indexOf(ench));
      } else {
        STATE.enchantment_selected.push(ench);
      }
      filterOutEnchantments();
    })

    ec_sel.appendChild(li);
  })

  STATE.enchantment_displayed
      .filter(ench => !STATE.enchantment_selected.includes(ench))
      .forEach(ench => {
        var ech_name = document.createElement('span');
        var ech_name_text = document.createTextNode(tr(ench));
        ech_name.appendChild(ech_name_text);

        var level_input = document.createElement('input');
        level_input.type = 'number';
        level_input.setAttribute('min', 0);
        level_input.setAttribute('max', ench.max_lv);
        level_input.value = ench.max_lv;
        level_input.addEventListener('change', event => {
          STATE.enchant_lv_map[ench.name] = level_input.value;
          updateCommand();
        })
        level_input.addEventListener('click', event => event.stopPropagation());

        var li = document.createElement('div');
        li.appendChild(ech_name);
        li.appendChild(level_input);

        STATE.enchant_span_map[ench.name] = li;
        li.addEventListener('click', event => {
          if (STATE.enchantment_selected.includes(ench)) {
            STATE.enchantment_selected.splice(
                STATE.enchantment_selected.indexOf(ench));
          } else {
            STATE.enchantment_selected.push(ench);
          }
          filterOutEnchantments();
        })

        ec_sel.appendChild(li);
      })
  updateCommand();
}

function updateCommand() {
  var nbt = {'Enchantments': []};
  STATE.enchantment_selected.forEach(
      ench => {nbt['Enchantments'].push(
          {'id': ench.name, 'lvl': STATE.enchant_lv_map[ench.name]})})
  var mat = STATE.material_selected;
  if (mat === null) {
    mat = materials[0];
  }
  var item = STATE.item_selected;
  if (item === null) {
    item = item_list[0];
  }
  if (item.materials === null) {
    command_text.value = '/give ' + STATE.player + ' ' + item.name +
        JSON.stringify(nbt) + ' ' + STATE.ammount;
  } else {
    command_text.value = '/give ' + STATE.player + ' ' + mat.name + '_' +
        item.name + JSON.stringify(nbt) + ' ' + STATE.ammount;
  }
}

function tr(item) {
  var lang = localStorage.getItem('lang');
  if (lang == 'zh_CN') {
    return item.name_cn;
  } else {
    return item.name_en;
  }
}

function init() {
  item_list.forEach(item => {
    var item_span = document.createElement('span');
    var item_span_text = document.createTextNode(tr(item));
    item_span.appendChild(item_span_text);

    item_span.addEventListener('click', event => {
      if (STATE.item_selected !== null) {
        STATE.item_selected_span.removeAttribute('class');

        STATE.item_selected = item;
        STATE.item_selected_span = item_span;
        item_span.setAttribute('class', 'selected');
      } else {
        STATE.item_selected = item;
        STATE.item_selected_span = item_span;
        item_span.setAttribute('class', 'selected');
      }
      filterOutEnchantments();
    });
    item_sel.appendChild(item_span);
  });

  enchant_list.forEach(ench => {
    var ech_name = document.createElement('span');
    var ech_name_text = document.createTextNode(tr(ench));
    ech_name.appendChild(ech_name_text);

    var level_input = document.createElement('input');
    level_input.type = 'number';
    level_input.setAttribute('min', 0);
    level_input.setAttribute('max', ench.max_lv);
    level_input.value = ench.max_lv;
    STATE.enchant_lv_map[ench.name] = ench.max_lv;
    level_input.addEventListener('change', event => {
      STATE.enchant_lv_map[ench.name] = level_input.value;
      updateCommand();
    })
    level_input.addEventListener('click', event => event.stopPropagation());

    var li = document.createElement('div');
    li.appendChild(ech_name);
    li.appendChild(level_input);

    STATE.enchant_span_map[ench.name] = li;
    li.addEventListener('click', event => {
      if (STATE.enchantment_selected.includes(ench)) {
        STATE.enchantment_selected.splice(
            STATE.enchantment_selected.indexOf(ench));
      } else {
        STATE.enchantment_selected.push(ench);
      }
      filterOutEnchantments();
    })

    ec_sel.appendChild(li);
  });

  materials.forEach(mat => {
    var item_span = document.createElement('span');
    var item_span_text = document.createTextNode(tr(mat));
    item_span.appendChild(item_span_text);

    item_span.addEventListener('click', event => {
      if (STATE.item_selected === null || STATE.item_selected.materials === null || !STATE.item_selected.materials.includes(mat.name)) {
        return true;
      }
      if (STATE.material_selected !== null) {
        STATE.material_selected_span.removeAttribute('class');

        STATE.material_selected = mat;
        STATE.material_selected_span = item_span;
        item_span.setAttribute('class', 'selected');
      } else {
        STATE.material_selected = mat;
        STATE.material_selected_span = item_span;
        item_span.setAttribute('class', 'selected');
      }
      updateCommand();
    });

    mat_sel.appendChild(item_span);
  });
  command_text.value = '';
  player.value = '@p';

  player.addEventListener('change', event => {
    STATE.player = player.value;
    updateCommand();
  })
  ammount.addEventListener('change', event => {
    STATE.ammount = ammount.value;
    updateCommand();
  })

  command_text.addEventListener('click', event => {
    copyCommand();
  })
}

function copyCommand() {
  navigator.clipboard.writeText(command_text.value);
}

function changeLang() {
  if (localStorage.getItem('lang') === null ||
      localStorage.getItem('lang') == 'en') {
    localStorage.setItem('lang', 'zh_CN');
  } else {
    localStorage.setItem('lang', 'en');
  }
  location.reload();
}

init();