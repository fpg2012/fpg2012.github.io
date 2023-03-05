var emojis = ['🌑', '🌗', '☀️'];
var theme_switch = document.getElementById('theme-switch');
var doc = document.documentElement;
const themeMedia = window.matchMedia('(prefers-color-scheme: light)');

var theme_setting = localStorage.getItem('theme');
if (!theme_setting) {
  localStorage.setItem('theme', 'auto');
}
var theme = 'light';

if (theme_setting == 'light') {
  theme = 'light';
} else if (theme_setting == 'dark') {
  theme = 'dark';
} else {
  if (themeMedia.matches) {
    theme = 'light';
  } else {
    theme = 'dark';
  }
  theme_setting = 'auto';
}

var update_theme = function(to_theme, to_theme_setting) {
  if (to_theme == 'light') {
    doc.removeAttribute('class');
    localStorage.setItem('theme', to_theme_setting);
  } else {
    doc.setAttribute('class', 'dark-theme')
    localStorage.setItem('theme', to_theme_setting);
  }
};

update_theme(theme, theme_setting);

theme_switch.onclick = function() {
  var themeMedia_ = window.matchMedia('(prefers-color-scheme: light)');
  if (theme_setting == 'dark') {
    if (themeMedia_.matches) {
      theme_setting = 'auto';
    } else {
      theme_setting = 'light'
    }
    theme = 'light';
    update_theme(theme, theme_setting);
  } else if (theme_setting == 'light') {
    if (themeMedia_.matches) {
      theme_setting = 'auto';
    } else {
      theme_setting = 'dark'
    }
    theme = 'dark';
    update_theme(theme, theme_setting);
  } else {
    if (theme == 'light') {
      theme = 'dark';
      theme_setting = 'dark';
      update_theme(theme, theme_setting);
    } else {
      theme = 'light';
      theme_setting = 'light';
      update_theme(theme, theme_setting);
    }
  }
};

// themeMedia.addEventListener(e => {
//   if (e.matches) {
//     theme = 'light';
//     update_theme('light');
//   } else {
//     theme = 'dark';
//     update_theme('dark');
//   }
// });