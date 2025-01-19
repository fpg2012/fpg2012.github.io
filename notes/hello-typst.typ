#set page(width: 50em, height: 64em)
#set text(font: ("New Computer Modern", "Noto Serif CJK SC"), size: 1em)

#import "@preview/codly:1.0.0": *
#show: codly-init.with()
#codly(zebra-fill: none)

#show link: this => {
  text(this, fill: olive);
}

#show raw: this => {
    text(font: "Fira Code", size: 1.2em)[#this]
}

= Hello Typst

刚刚更新的#link("https://github.com/fpg2012/sushi")[sushi v0.2.10]静态页面生成器现在可以处理typst文件了。

== 使用方法

=== 引入新的converter

修改`_site.yml`，在`convert_ext`中添加`typ`，指定生成为`pdf`文件。

```yaml
convert_ext = ["html", "md", "xml", "typ"]
convert_to_ext:
  "typ": "pdf"
converter_choice:
  "md": "convert.sh"
  "typ: "convert-typ.sh"
```

然后往`_converters`里面添加一个新的converter，新建`converter-typ.sh`，并给予可执行权限

```bash
#!/bin/bash

typst compile - -
```

#box(inset: 1em, fill: luma(90%), width: 100%)[
如果使用#link("https://github.com/fpg2012/sushi-theme-empty")[theme empty]，直接更新主题就行了
]

=== 将frontmatter放在另一个文件中

由于typst不支持markdown语法加入frontmatter，因此只能将frontmatter放到另一个文件里面。假如要转换的typst文件名为`hello.typ`，那么则需要在相同目录创建一个`_hello.typ.yml`，也就是前面加上`_`，后面加上`.yml`，文件里正常写frontmatter。

== 局限性

typst文件还不能套liquid模板，要把一些站点相关的东西显示进来有一定难度。可能之后需要引入一套和liquid平行的系统来支持typst。

其次是由于typst目前自身的局限性，不能直接通过typst-cli生成html，只能生成pdf。用pandoc做转换，目前效果不佳。
