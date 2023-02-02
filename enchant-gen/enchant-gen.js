var command_text = document.getElementById('command');
var item_sel = document.getElementById('item-selection');
var ec_sel = document.getElementById('enchantment-selection');
var mat_sel = document.getElementById('material-selection');
var player = document.getElementById('player-name');
var ammount = document.getElementById('ammount');

const item_list = [
    {
        "name": "enchanted_book",
        "name_cn": "书",
        "materials": null
    },
    {
        "name": "pickaxe",
        "name_cn": "镐",
        "materials": ["netherite", "diamond", "iron", "stone", "golden", "wooden"]
    },
    {
        "name": "shovel",
        "name_cn": "铲",
        "materials": ["netherite", "diamond", "iron", "stone", "golden", "wooden"]
    },
    {
        "name": "axe",
        "name_cn": "斧",
        "materials": ["netherite", "diamond", "iron", "stone", "golden", "wooden"]
    },
    {
        "name": "sword",
        "name_cn": "剑",
        "materials": ["netherite", "diamond", "iron", "stone", "golden", "wooden"]
    },
    {
        "name": "hoe",
        "name_cn": "铲",
        "materials": ["netherite", "diamond", "iron", "stone", "golden", "wooden"]
    },
    {
        "name": "helmet",
        "name_cn": "盔",
        "materials": ["netherite", "diamond", "iron", "stone", "golden", "wooden"]
    },
    {
        "name": "chestplate",
        "name_cn": "甲",
        "materials": ["netherite", "diamond", "iron", "stone", "golden", "wooden"]
    },
    {
        "name": "leggings",
        "name_cn": "护腿",
        "materials": ["netherite", "diamond", "iron", "stone", "golden", "wooden"]
    },
    {
        "name": "boots",
        "name_cn": "靴",
        "materials": ["netherite", "diamond", "iron", "stone", "golden", "wooden"]
    },
    {
        "name": "bow",
        "name_cn": "弓",
        "materials": null
    },
    {
        "name": "crossbow",
        "name_cn": "弩",
        "materials": null
    },
    {
        "name": "fishing_rod",
        "name_cn": "钓竿",
        "materials": null
    },
    {
        "name": "trident",
        "name_cn": "三叉戟",
        "materials": null
    },
    {
        "name": "shield",
        "name_cn": "盾",
        "materials": null
    },
    {
        "name": "elytra",
        "name_cn": "鞘翅",
        "materials": null
    },
    {
        "name": "flint_and_steel",
        "name_cn": "打火石",
        "materials": null
    },
    {
        "name": "carrot_and_stick",
        "name_cn": "胡萝卜竿",
        "materials": null
    },
    {
        "name": "warped_fungus_on_a_stick",
        "name_cn": "诡忆菌竿",
        "materials": null
    },
    {
        "name": "shears",
        "name_cn": "剪刀",
        "materials": null
    },
    {
        "name": "turtle_shell",
        "name_cn": "龟壳帽",
        "materials": null
    }
];

const enchant_list = [
    {
        "name": "aqua_affinity",
        "name_cn": "水下速掘",
        "incompatible_to": [],
        "appliable_to": ["helmet", "turtle_shell", "enchanted_book"],
        "max_lv": 1
    },
    {
        "name": "bane_of_arthropods",
        "name_cn": "节肢杀手",
        "incompatible_to": ["smite", "sharpness", "enchanted_book"],
        "appliable_to": ["sword", "axe"],
        "max_lv": 5
    },
    {
        "name": "blast_protection",
        "name_cn": "爆炸保护",
        "incompatible_to": ["fire_protection", "protection", "projectile_protection"],
        "appliable_to": ["helmet", "turtle_shell", "chestplate", "leggings", "boots", "enchanted_book"],
        "max_lv": 4
    },
    {
        "name": "channeling",
        "name_cn": "引雷",
        "incompatible_to": ["riptide"],
        "appliable_to": ["trident", "enchanted_book"],
        "max_lv": 1
    },
    {
        "name": "binding_curse",
        "name_cn": "绑定诅咒",
        "incompatible_to": [],
        "appliable_to": ["helmet", "leggings", "boots", "elytra", "chestplate", "turtle_shell", "enchanted_book"],
        "max_lv": 1
    },
    {
        "name": "vanishing_curse",
        "name_cn": "消失诅咒",
        "incompatible_to": [],
        "appliable_to": [],
        "max_lv": 1
    },
    {
        "name": "depth_strider",
        "name_cn": "水下行走",
        "incompatible_to": ["frost_walker"],
        "appliable_to": ["boots", "enchanted_book"],
        "max_lv": 3
    },
    {
        "name": "efficiency",
        "name_cn": "效率",
        "incompatible_to": [],
        "appliable_to": ["pickaxe", "axe", "hoe", "shovel", "shears", "enchanted_book"],
        "max_lv": 5
    },
    {
        "name": "feather_falling",
        "name_cn": "掉落保护",
        "incompatible_to": [],
        "appliable_to": ["boots", "enchanted_book"],
        "max_lv": 4
    },
    {
        "name": "fire_aspect",
        "name_cn": "火焰附加",
        "incompatible_to": [],
        "appliable_to": ["sword", "axe", "enchanted_book"],
        "max_lv": 2
    },
    {
        "name": "fire_protection",
        "name_cn": "火焰保护",
        "incompatible_to": ["blast_protection", "projectile_protection", "protection"],
        "appliable_to": ["helmet", "turtle_shell", "chestplate", "leggings", "boots", "enchanted_book"],
        "max_lv": 4
    },
    {
        "name": "flame",
        "name_cn": "火矢",
        "incompatible_to": [],
        "appliable_to": ["bow", "enchanted_book"],
        "max_lv": 1
    },
    {
        "name": "fortune",
        "name_cn": "时运",
        "incompatible_to": ["silk_touch"],
        "appliable_to": ["pickaxe", "axe", "hoe", "shovel", "enchanted_book"],
        "max_lv": 3
    },
    {
        "name": "frost_walker",
        "name_cn": "冰霜行者",
        "incompatible_to": ["depth_strider"],
        "appliable_to": ["boots", "enchanted_book"],
        "max_lv": 2
    },
    {
        "name": "impaling",
        "name_cn": "穿刺",
        "incompatible_to": [],
        "appliable_to": ["trident", "enchanted_book"],
        "max_lv": 5
    },
    {
        "name": "infinity",
        "name_cn": "无限",
        "incompatible_to": ["mending", "enchanted_book"],
        "appliable_to": ["bow"],
        "max_lv": 1
    },
    {
        "name": "knockback",
        "name_cn": "击退",
        "incompatible_to": [],
        "appliable_to": ["sword", "enchanted_book"],
        "max_lv": 2
    },
    {
        "name": "looting",
        "name_cn": "抢夺",
        "incompatible_to": [],
        "appliable_to": ["sword", "enchanted_book"],
        "max_lv": 3
    },
    {
        "name": "loyalty",
        "name_cn": "忠诚",
        "incompatible_to": ["riptide"],
        "appliable_to": ["trident", "enchanted_book"],
        "max_lv": 3
    },
    {
        "name": "luck_of_sea",
        "name_cn": "海之眷顾",
        "incompatible_to": [],
        "appliable_to": ["fishing_rod", "enchanted_book"],
        "max_lv": 3
    },
    {
        "name": "lure",
        "name_cn": "饵钓",
        "incompatible_to": [],
        "appliable_to": ["fishing_rod", "enchanted_book"],
        "max_lv": 3
    },
    {
        "name": "mending",
        "name_cn": "经验修补",
        "incompatible_to": ["infinity", "enchanted_book"],
        "appliable_to": [],
        "max_lv": 1
    },
    {
        "name": "multishot",
        "name_cn": "多发",
        "incompatible_to": ["piercing"],
        "appliable_to": ["crossbow", "enchanted_book"],
        "max_lv": 1
    },
    {
        "name": "piercing",
        "name_cn": "穿透",
        "incompatible_to": ["multishot"],
        "appliable_to": ["crossbow", "enchanted_book"],
        "max_lv": 4
    },
    {
        "name": "power",
        "name_cn": "力量",
        "incompatible_to": [],
        "appliable_to": ["bow", "enchanted_book"],
        "max_lv": 5
    },
    {
        "name": "projectile_protection",
        "name_cn": "弹射物保护",
        "incompatible_to": ["protection", "blast_protection", "fire_protection"],
        "appliable_to": ["helmet", "turtle_shell", "chestplate", "leggings", "boots", "enchanted_book"],
        "max_lv": 4
    },
    {
        "name": "protection",
        "name_cn": "保护",
        "incompatible_to": ["projectile_protection", "blast_protection", "fire_protection"],
        "appliable_to": ["helmet", "turtle_shell", "chestplate", "leggings", "boots", "enchanted_book"],
        "max_lv": 4
    },
    {
        "name": "punch",
        "name_cn": "冲击",
        "incompatible_to": [],
        "appliable_to": ["bow", "enchanted_book"],
        "max_lv": 2
    },
    {
        "name": "quick_charge",
        "name_cn": "快速装填",
        "incompatible_to": [],
        "appliable_to": ["crossbow", "enchanted_book"],
        "max_lv": 3
    },
    {
        "name": "respiration",
        "name_cn": "水下呼吸",
        "incompatible_to": [],
        "appliable_to": ["helmet", "turtle_shell", "enchanted_book"],
        "max_lv": 3
    },
    {
        "name": "riptide",
        "name_cn": "激流",
        "incompatible_to": ["channeling", "loyalty"],
        "appliable_to": ["trident", "enchanted_book"],
        "max_lv": 3
    },
    {
        "name": "sharpness",
        "name_cn": "锋利",
        "incompatible_to": ["smite", "bane_of_arthropods"],
        "appliable_to": ["sword", "axe", "enchanted_book"],
        "max_lv": 5
    },
    {
        "name": "silk_touch",
        "name_cn": "精准采集",
        "incompatible_to": ["fortune"],
        "appliable_to": ["pickaxe", "axe", "hoe", "shovel", "enchanted_book"],
        "max_lv": 1
    },
    {
        "name": "smite",
        "name_cn": "亡灵杀手",
        "incompatible_to": ["sharpness", "bane_of_arthropods"],
        "appliable_to": ["sword", "axe", "enchanted_book"],
        "max_lv": 5
    },
    {
        "name": "soul_speed",
        "name_cn": "灵魂疾行",
        "incompatible_to": [],
        "appliable_to": ["boots", "enchanted_book"],
        "max_lv": 3
    },
    {
        "name": "sweeping_edge",
        "name_cn": "横扫之刃",
        "incompatible_to": [],
        "appliable_to": ["sword", "enchanted_book"],
        "max_lv": 3
    },
    {
        "name": "swift_sneak",
        "name_cn": "快速潜行",
        "incompatible_to": [],
        "appliable_to": ["leggings", "enchanted_book"],
        "max_lv": 3
    },
    {
        "name": "thorns",
        "name_cn": "荆棘",
        "incompatible_to": [],
        "appliable_to": ["chestplate", "helmet", "leggings", "boots", "turtle_shell", "enchanted_book"],
        "max_lv": 3
    },
    {
        "name": "unbreaking",
        "name_cn": "耐久",
        "incompatible_to": [],
        "appliable_to": [],
        "max_lv": 3
    }
];

var STATE = {
    item_selected: null,
    item_selected_span: null,
    material_selected: null,
    material_selected_span: null,
    enchantment_selected: [],
    enchantment_displayed: [],
    enchant_span_map: {},
    enchant_lv_map: {},
    player: "@p",
    ammount: 1,
}

function filterOutEnchantments() {
    var ok_ench = enchant_list.filter(ench => {
        var flag = true;
        if (ench.appliable_to.length > 0) {
            if (STATE.item_selected !== null && !ench.appliable_to.includes(STATE.item_selected.name)) {
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
        STATE.enchantment_selected.splice(indexOf(ench), 1);
    });

    var compatible_ench = ok_ench.filter(ench => {
        return STATE.enchantment_selected.every(ench2 => {
            return !ench2.incompatible_to.includes(ench.name);
        })
    });

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

        var li = document.createElement('div');
        li.appendChild(ech_name);
        li.appendChild(level_input);
        li.setAttribute('class', 'selected');

        STATE.enchant_span_map[ench.name] = li;
        li.addEventListener('click', event => {
            if (STATE.enchantment_selected.includes(ench)) {
                STATE.enchantment_selected.splice(STATE.enchantment_selected.indexOf(ench));
            } else {
                STATE.enchantment_selected.push(ench);
            }
            filterOutEnchantments();
        })

        ec_sel.appendChild(li);
    })

    STATE.enchantment_displayed.filter(ench => !STATE.enchantment_selected.includes(ench)).forEach(ench => {
        var ech_name = document.createElement('span');
        var ech_name_text = document.createTextNode(tr(ench));
        ech_name.appendChild(ech_name_text);

        var level_input = document.createElement('input');
        level_input.type = 'number';
        level_input.setAttribute('min', 0);
        level_input.setAttribute('max', ench.max_lv);
        level_input.value = ench.max_lv;

        var li = document.createElement('div');
        li.appendChild(ech_name);
        li.appendChild(level_input);

        STATE.enchant_span_map[ench.name] = li;
        li.addEventListener('click', event => {
            if (STATE.enchantment_selected.includes(ench)) {
                STATE.enchantment_selected.splice(STATE.enchantment_selected.indexOf(ench));
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
    var nbt = {
        "Enchantments": []
    };
    STATE.enchantment_selected.forEach(ench => {
        nbt["Enchantments"].push({
            "id": ench.name,
            "lvl": STATE.enchant_lv_map[ench.name]
        })
    })
    var mat = STATE.material_selected;
    if (mat === null) {
        mat = 'iron';
    }
    var item = STATE.item_selected;
    if(item === null) {
        item = pickaxe;
    }
    if (item.materials === null) {
        command_text.value = '/give ' + STATE.player + ' ' + item.name + JSON.stringify(nbt) + ' ' + STATE.ammount;
    } else {
        command_text.value = '/give ' + STATE.player + ' ' + mat.name + '_' + item.name + JSON.stringify(nbt) + ' ' + STATE.ammount;
    }
}

function tr(item) {
    var lang = localStorage.getItem('lang');
    if (lang == 'zh_CN') {
        return item.name_cn;
    } else {
        return item.name;
    }
}

function getMaterials() {
    var lang = localStorage.getItem('lang');
    if (lang == 'zh_CN') {
        return ['钻石', '下界合金', '铁', '石', '金', '木', '锁链', '皮革'];
    } else {
        return ;
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
        })

        var li = document.createElement('div');
        li.appendChild(ech_name);
        li.appendChild(level_input);

        STATE.enchant_span_map[ench.name] = li;
        li.addEventListener('click', event => {
            if (STATE.enchantment_selected.includes(ench)) {
                STATE.enchantment_selected.splice(STATE.enchantment_selected.indexOf(ench));
            } else {
                STATE.enchantment_selected.push(ench);
            }
            filterOutEnchantments();
        })

        ec_sel.appendChild(li);
    });

    var materials = [{name: 'diamond', name_cn: "钻石"}, 
        {name: 'netherite', "name_cn": "下界合金"}, 
        {name: 'iron', "name_cn": "铁"}, 
        {name: 'stone', "name_cn": "石"}, 
        {name: 'golden', "name_cn": "金"},
        {name: 'wooden', "name_cn": "木"},
        {name: 'chainmail', "name_cn": "锁链"},
        {name: 'leather', "name_cn": "皮革"}];
    materials.forEach(mat => {
        var item_span = document.createElement('span');
        var item_span_text = document.createTextNode(tr(mat));
        item_span.appendChild(item_span_text);

        item_span.addEventListener('click', event => {
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
    })
    ammount.addEventListener('change', event => {
        STATE.ammount = ammount.value;
    })

    command_text.addEventListener('click', event => {
        copyCommand();
    })
}

function copyCommand() {
    navigator.clipboard.writeText(command_text.value);
}

function changeLang() {
    if (localStorage.getItem('lang') === null || localStorage.getItem('lang') == 'en') {
        localStorage.setItem('lang', 'zh_CN');
    } else {
        localStorage.setItem('lang', 'en');
    }
    location.reload();
}

init();