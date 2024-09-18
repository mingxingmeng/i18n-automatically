# i18n-automatically

## 介绍

一键扫描整个项目的`中文`替换成`key`，并生成指定的语言包翻译文件。

- 支持文案回显
- 支持一键扫描中文
- 支持一键生成指定翻译包文件
- 支持语言切换显示

### 扫描中文

扫描当前文件的所有的中文，并替换成`key`，并生成 `zh.json` 文件。

![20240905155251](https://gcore.jsdelivr.net/gh/wu529778790/image/blog/20240905155251.png)

### 批量扫描中文

弹出选择文件夹，扫描所选文件夹的所有的中文，并替换成`key`，并生成 `zh.json` 文件。

### 生成语言包

弹出输入框(默认en),根据 `zh.json` 生成指定语言包文件

![20240905160119](https://gcore.jsdelivr.net/gh/wu529778790/image/blog/20240905160119.png)

### 切换语言

替换之后在有`key`的每一行后面会显示对应的中文, 点击切换语言会切换成对应的语言。

读取的是本地文件，比如刚才生成了 `en.json` 就可以切换`en`语言

![20240905160252](https://gcore.jsdelivr.net/gh/wu529778790/image/blog/20240905160252.png)

## 配置文件

|属性|描述|默认值|
|:--|:--|:--|
|i18nFilePath|指定国际化文件的根目录。| '/src/i18n' |
|templateI18nCall|在 Vue 模板中调用翻译函数的语法。| '$t' |
|scriptI18nCall|在 JavaScript 文件中调用翻译函数的语法。| 'i18n.t' |
|autoImportI18n|自动导入i18n模块的代码。| 'import i18n from '@/i18n';' |
|keyFilePathLevel|生成的语言包的键中文件路径的层级。| 2 |
|excludedExtensions|在扫描和生成语言包时需要排除的文件扩展名列表。| [".svg", ".png", ".jpg", ".jpeg", ".gif", ".bmp", ".ico", ".md", ".txt", ".json", ".css", ".scss", ".less", ".sass", ".styl"] |
|debug|是否开启调试模式。|  false |
|baidu.appid|百度翻译的应用ID。| - |
|baidu.secretKey|百度翻译的密钥。| - |

### 申请百度翻译

<https://api.fanyi.baidu.com/doc/21>

按照流程申请百度翻译api权限

![20240910201102](https://gcore.jsdelivr.net/gh/wu529778790/image/blog/20240910201102.png)

然后点击开发者信息, <https://api.fanyi.baidu.com/manage/developer>,复制`appid`和`secretKey`到配置文件中

![20240910201237](https://gcore.jsdelivr.net/gh/wu529778790/image/blog/20240910201237.png)

## 开发

<https://github.com/wu529778790/i18n-automatically>

安装依赖

```bash
yarn
```

F5 启动, 调试

下载打包依赖

```bash
yarn add @vscode/vsce -g
```

打包

```bash
vsce package --yarn
```

## 为什么选择 AST 而不是正则？

- 正则表达式的局限性：正则无法正确解析嵌套的结构、注释、模板中的字符串等复杂情况，容易导致误判或替换错误。

- AST 的优势：通过将代码解析成 AST，能够准确地识别代码结构（如函数、变量、注释、模板中的表达式等），并基于位置、作用域等做精准的修改，不会因为某些边界情况出现不正确的替换。

## jscodeshift

<https://github.com/facebook/jscodeshift>

jscodeshift 是一个基于 codemod 理念的 JavaScript/TypeScript 重构工具，其原理是将 JS/TS 代码解析为抽象语法树（Abstract Syntax Tree，AST），并提供一系列用于访问和修改 AST 的 API 以实现自动化的代码重构。jscodeshift 将 babel parser、ast-types（用于快速创建新的 AST 节点）和 recast（维护生成代码的代码风格信息）三大工具整合在一起，提供了简便快捷的操作接口；同时它还提供了多任务并行执行的功能，使其对于海量代码文件的重构操作可以并行运行，充分利用多核 CPU 算力，缩短重构任务执行时间。

### 抽象语法树

> 在计算机科学中，抽象语法树（Abstract Syntax Tree，AST），或简称语法树（Syntax tree），是源代码语法结构的一种抽象表示。它以树状的形式表现编程语言的语法结构，树上的每个节点都表示源代码中的一种结构。之所以说语法是“抽象”的，是因为这里的语法并不会表示出真实语法中出现的每个细节。

抽象语法树可视化工具

<https://astexplorer.net/>
