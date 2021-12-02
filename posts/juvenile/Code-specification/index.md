# 代码规范

## HTML 规范-代码规范

### DOCTYPE 设置

文档类型统一使用 html5 的 doctype:

```html
<!DOCTYPE html>
```

### 页面编码

编码默认使用 UTF-8,特定情况下有指定要求也可以是 GBK

```html
<meta charset="GBK" />
```

```html
<meta charset="UTF-8" />
```

请尽量统一写成标准的 “UTF-8”，不要写成 “utf-8” 或 “utf8” 或 “UTF8”。根据 IETF 对 UTF-8 的定义，其编码标准的写法是 “UTF-8”；而 UTF8 或 utf8 的写法只是出现在某些编程系统中，如 .NET framework 的类 System.Text.Encoding 中的一个属性名就叫 UTF8。

### TDK

#### 页面标题(Title)

页面名称-产品中文全称-官方网站-产品 slogan，28 个汉字以内

```html
<title>前端-代码规范-小爱</title>
```

#### 页面关键字(Keywords)

Keywords 为产品名、专题名、专题相关名词，之间用英文半角逗号隔开

```html
<meta name="keywords" content="前端代码规范文档" />
```

#### 页面描述(Description)

不超过 150 个字符，描述内容要和页面内容相关。

```html
<meta name="description" content="前端代码规范文档" />
```

### 页面 Meta

PC 端 Meta：

```html
<meta charset="gbk" />
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta name="robots" content="all" />
<meta name="author" content="Tencent-CP" />
<meta name="Copyright" content="Tencent" />
<meta name="Description" content="页面的描述内容" />
<meta name="Keywords" content="页面关键字" />
```

移动端 Meta：

```html
<meta charset="gbk" />
<meta
  name="viewport"
  content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
/>
<!-- 为了防止页面数字被识别为电话号码，可根据实际需要添加： -->
<meta name="format-detection" content="telephone=no" />
<!-- 让添加到主屏幕的网页再次打开时全屏展示，可添加：   -->
<meta content="yes" name="mobile-web-app-capable" />
<meta content="yes" name="apple-mobile-web-app-capable" />
<meta name="robots" content="all" />
<meta name="author" content="Tencent-CP" />
<meta name="Copyright" content="Tencent" />
<meta name="Description" content="页面的描述内容" />
<meta name="Keywords" content="页面关键字" />
```

### 元素及标签闭合

HTML 元素共有以下 5 种：

- 空元素：area、base、br、col、command、embed、hr、img、input、keygen、link、meta、param、source、track、wbr
- 原始文本元素：script、style
- RCDATA 元素：textarea、title
- 外来元素：来自 MathML 命名空间和 SVG 命名空间的元素。
- 常规元素：其他 HTML 允许的元素都称为常规元素。

元素标签的闭合应遵循以下原则：

> Tags are used to delimit the start and end of elements in the markup. Raw text, escapable raw text, and normal elements have a start tag to indicate where they begin, and an end tag to indicate where they end. The start and end tags of certain normal elements can be omitted, as described below in the section on optional tags. Those that cannot be omitted must not be omitted. Void elements only have a start tag; end tags must not be specified for void elements. Foreign elements must either have a start tag and an end tag, or a start tag that is marked as self-closing, in which case they must not have an end tag.

- 原始文本元素、RCDATA 元素以及常规元素都有一个开始标签来表示开始，一个结束标签来表示结束。
- 某些元素的开始和结束标签是可以省略的，如果规定标签不能被省略，那么就绝对不能省略它。
- 空元素只有一个开始标签，且不能为空元素设置结束标签。
- 外来元素可以有一个开始标签和配对的结束标签，或者只有一个自闭合的开始标签，且后者情况下该元素不能有结束标签。

## HTML 规范-注释规范

### 遵循标准

HTML 注释规范写法应该遵循以下标准：

> Comments must start with the four character sequence U+003C LESS-THAN SIGN, U+0021 EXCLAMATION MARK, U+002D HYPHEN-MINUS, U+002D HYPHEN-MINUS (<!–). Following this sequence, the comment may have text, with the additional restriction that the text must not start with a single “>” (U+003E) character, nor start with a U+002D HYPHEN-MINUS character (-) followed by a “>” (U+003E) character, nor contain two consecutive U+002D HYPHEN-MINUS characters (–), nor end with a U+002D HYPHEN-MINUS character (-). Finally, the comment must be ended by the three character sequence U+002D HYPHEN-MINUS, U+002D HYPHEN-MINUS, U+003E GREATER-THAN SIGN (–>).

- 必须以 4 个有序字符开始：编码为 U+003C LESS-THAN SIGN 的小于号, 编码为 U+0021 EXCLAMATION MARK 的感叹号, 编码为 U+002D HYPHEN-MINUS 横线, 编码为 U+002D HYPHEN-MINUS 横线 ，即 “<!–”
- 在此之后是注释内容，注释的内容有以下限制：
  1. 不能以单个 “>” (U+003E) 字符开始
  2. 不能以由 “-“（U+002D HYPHEN-MINUS）和 ”>” (U+003E) 组合的字符开始，即 “->”
  3. 不能包含两个连续的 U+002D HYPHEN-MINUS 字符，即 “–”
  4. 不能以一个 U+002D HYPHEN-MINUS 字符结束，即 “-”
- 必须以 3 个有序字符结束：U+002D HYPHEN-MINUS, U+002D HYPHEN-MINUS, U+003E GREATER-THAN SIGN，即 “–>”

标准写法:

```md
<!--Comment Text-->
```

错误写法:

```md
<!-->The Wrong Comment Text-->

<!--->The Wrong Comment Text-->

<!--The--Wrong--Comment Text-->

<!--The Wrong Comment Text--->
```

[www.w3.org]: https://www.w3.org/
[#comments]: https://www.w3.org/TR/2014/REC-html5-20141028/syntax.html#comments

参考 [www.w3.org] [#Comments]

### 单行注释

一般用于简单的描述，如某些状态描述、属性描述等

注释内容前后各一个空格字符，注释位于要注释代码的上面，单独占一行

推荐:

```html
<!-- Comment Text -->
<div>...</div>
```

不推荐:

```html
<div>...</div>
<!-- Comment Text -->

<div>
  <!-- Comment Text -->
  ...
</div>
```

### 模块注释

一般用于描述模块的名称以及模块开始与结束的位置

注释内容前后各一个空格字符，<!-- S Comment Text --> 表示模块开始，<!-- E Comment Text --> 表示模块结束，模块与模块之间相隔一行

推荐写法：

```html
<!-- S Comment Text A -->
<div class="mod_a">...</div>
<!-- E Comment Text A -->

<!-- S Comment Text B -->
<div class="mod_b">...</div>
<!-- E Comment Text B -->
```

不推荐写法：

```html
<!-- S Comment Text A -->
<div class="mod_a">...</div>
<!-- E Comment Text A -->
<!-- S Comment Text B -->
<div class="mod_b">...</div>
<!-- E Comment Text B -->
```

## CSS 规范-代码规范

### 编码规范

CSS 样式表是一个序列通用字符集，传输和存储过程中，这些字符必须由支持 US-ASCII（例如 UTF-8, ISO 8859-x, SHIFT JIS 等）字符编码方式编译

### 文档内嵌样式表编码

> When a style sheet is embedded in another document, such as in the STYLE element or “style” attribute of HTML, the style sheet shares the character encoding of the whole document.

当样式出现在其它文档，如 HTML 的 STYLE 标签或标签属性 “style”，样式的编码由文档的决定。

### 文档外链样式表编码

> When a style sheet resides in a separate file, user agents must observe the following priorities when determining a style sheet’s character encoding (from highest priority to lowest):

> 1. An HTTP “charset” parameter in a “Content-Type” field (or similar parameters in other protocols)
> 2. BOM and/or @charset
> 3. or other metadata from the linking mechanism (if any)
> 4. charset of referring style sheet or document (if any)
> 5. Assume UTF-8

文档外链样式表的编码可以由以下各项按照由高到低的优先级顺序决定：

1. HTTP “Content-Type” 字段参数 “charset”（或其它协议相似的参数）
2. BOM（byte-order mark）和（或）@charset
3. Link 中的元数据设置（如果有的话）
4. 引用样式表字符集或文档编码（如果有的话）
5. 假定为 UTF-8 编码

### 样式表编码

> Authors using an @charset rule must place the rule at the very beginning of the style sheet, preceded by no characters. (If a byte order mark is appropriate for the encoding used, it may precede the @charset rule.)

> @charset must be written literally, i.e., the 10 characters ‘@charset “‘ (lowercase, no backslash escapes), followed by the encoding name, followed by ‘“;’.

- @charset 规则一定要在样式文件的第一行首个字符位置开始，否则的话就会有机会让 BOM 设置生效（如果有设置 BOM 的话）而优于 @charset 作为样式表的编码
- @charset ""; 一定要写上，并且用小写字母，不能出现转义符

#### 代码格式化

样式书写一般有两种：一种是紧凑格式 (Compact)

```css
.jdc {display: block; width: 50px;}
```

一种是展开格式（Expanded）

```css
.jdc {
  display: block;
  width: 50px;
}
```

统一使用展开格式书写样式

#### 代码大小写

样式选择器，属性名，属性值关键字全部使用小写字母书写，属性字符串允许使用大小写。

```css
/* 推荐 */
.jdc {
  display: block;
}

/* 不推荐 */
.JDC {
  display: BLOCK;
}
```

#### 选择器

- 尽量少用通用选择器 \*
- 不使用 ID 选择器
- 不使用无具体语义定义的标签选择器

```css
/* 推荐 */
.jdc {}
.jdc li {}
.jdc li p {}

/* 不推荐 */
* {}
#jdc {}
.jdc div {}
```

#### 代码缩进

强制使用 2 个空格做为一个缩进层级，不允许使用 4 个空格 或 tab 字符。属性名 与之后的 : 之间不允许包含空格， : 与 属性值 之间必须包含空格：增强代码易读性。

```css
/* 不推荐 */
.box {
    width: 100%;
}

/* 推荐 */
.box {
  width: 100%;
}
```

#### 逗号分隔的取值，逗号之后一个空格

```css
推荐： .jdc {
  box-shadow: 1px 1px 1px #333, 2px 2px 2px #ccc;
}
不推荐： .jdc {
  box-shadow: 1px 1px 1px #333,2px 2px 2px #ccc;
}
```

#### 不要为 0 指明单位

```css
推荐： .jdc {
  margin: 0 10px;
}
不推荐： .jdc {
  margin: 0px 10px;
}
```

#### 行长度

建议 每行不得超过 120 个字符，除非单行不可分割。
建议 对于超长的样式，在样式值的 空格 处或 , 后换行，建议按逻辑分组。

```css
/* 示例 */

/* 不同属性值按逻辑分组 */
background: transparent url(aVeryVeryVeryLongUrlIsPlacedHere) no-repeat 0 0;

/* 可重复多次的属性，每次重复一行 */
background-image: url(aVeryVeryVeryLongUrlIsPlacedHere)
  url(anotherVeryVeryVeryLongUrlIsPlacedHere);

/* 类似函数的属性值可以根据函数调用的缩进进行 */
background-image: -webkit-gradient(
  linear,
  left bottom,
  left top,
  color-stop(0.04, rgb(88, 94, 124)),
  color-stop(0.52, rgb(115, 123, 162))
);
```

#### CSS3 浏览器私有前缀写法

```css
.jdc {
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  -o-border-radius: 10px;
  -ms-border-radius: 10px;
  border-radius: 10px;
}
```

## CSS 代码规范-注释规范

### 单行注释

注释内容第一个字符和最后一个字符都是一个空格字符，单独占一行，行与行之间相隔一行

```css
推荐：

/* Comment Text */
.jdc {
}

/* Comment Text */
.jdc {
}
不推荐：

/*Comment Text*/
.jdc {
  display: block;
}
.jdc {
  display: block; /*Comment Text*/
}
```

### 模块注释

注释内容第一个字符和最后一个字符都是一个空格字符，/_ 与 模块信息描述占一行，多个横线分隔符-与_/占一行，行与行之间相隔两行

```css
推荐：

/* Module A
---------------------------------------------------------------- */
.mod_a {
}

/* Module B
---------------------------------------------------------------- */
.mod_b {
}
不推荐：

/* Module A ---------------------------------------------------- */
.mod_a {
}
/* Module B ---------------------------------------------------- */
.mod_b {
}
```

## CSS 代码规范-媒体查询

### 常用查询语句

判断设备横竖屏

```css
/* 横屏 */
@media all and (orientation: landscape) {
}

/* 竖屏 */
@media all and (orientation: portrait) {
}
```

判断设备宽高

```css
/* 设备宽度大于 320px 小于 640px */
@media all and (min-width: 320px) and (max-width: 640px) {
}
```

判断设备像素比

```css
/* 设备像素比为 1 */
@media only screen and (-webkit-min-device-pixel-ratio: 1),
  only screen and (min-device-pixel-ratio: 1) {
}

/* 设备像素比为 1.5 */
@media only screen and (-webkit-min-device-pixel-ratio: 1.5),
  only screen and (min-device-pixel-ratio: 1.5) {
}

/* 设备像素比为 2 */
@media only screen and (-webkit-min-device-pixel-ratio: 2),
  only screen and (min-device-pixel-ratio: 2) {
}
```

### 常用设备设置

#### iPhones

```css
/* ----------- iPhone 4 and 4S ----------- */

/* Portrait and Landscape */
@media only screen and (min-device-width: 320px) and (max-device-width: 480px) and (-webkit-min-device-pixel-ratio: 2) {
}

/* Portrait */
@media only screen and (min-device-width: 320px) and (max-device-width: 480px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
}

/* Landscape */
@media only screen and (min-device-width: 320px) and (max-device-width: 480px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
}

/* ----------- iPhone 5 and 5S ----------- */

/* Portrait and Landscape */
@media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) {
}

/* Portrait */
@media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
}

/* Landscape */
@media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
}

/* ----------- iPhone 6 ----------- */

/* Portrait and Landscape */
@media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) {
}

/* Portrait */
@media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
}

/* Landscape */
@media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
}

/* ----------- iPhone 6+ ----------- */

/* Portrait and Landscape */
@media only screen and (min-device-width: 414px) and (max-device-width: 736px) and (-webkit-min-device-pixel-ratio: 3) {
}

/* Portrait */
@media only screen and (min-device-width: 414px) and (max-device-width: 736px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: portrait) {
}

/* Landscape */
@media only screen and (min-device-width: 414px) and (max-device-width: 736px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: landscape) {
}
```

#### Galaxy Phones

```css
/* ----------- Galaxy S3 ----------- */

/* Portrait and Landscape */
@media screen and (device-width: 320px) and (device-height: 640px) and (-webkit-device-pixel-ratio: 2) {
}

/* Portrait */
@media screen and (device-width: 320px) and (device-height: 640px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait) {
}

/* Landscape */
@media screen and (device-width: 320px) and (device-height: 640px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape) {
}

/* ----------- Galaxy S4 ----------- */

/* Portrait and Landscape */
@media screen and (device-width: 320px) and (device-height: 640px) and (-webkit-device-pixel-ratio: 3) {
}

/* Portrait */
@media screen and (device-width: 320px) and (device-height: 640px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) {
}

/* Landscape */
@media screen and (device-width: 320px) and (device-height: 640px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape) {
}

/* ----------- Galaxy S5 ----------- */

/* Portrait and Landscape */
@media screen and (device-width: 360px) and (device-height: 640px) and (-webkit-device-pixel-ratio: 3) {
}

/* Portrait */
@media screen and (device-width: 360px) and (device-height: 640px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) {
}

/* Landscape */
@media screen and (device-width: 360px) and (device-height: 640px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape) {
}
```

#### HTC Phones

```css
/* ----------- HTC One ----------- */

/* Portrait and Landscape */
@media screen and (device-width: 360px) and (device-height: 640px) and (-webkit-device-pixel-ratio: 3) {
}

/* Portrait */
@media screen and (device-width: 360px) and (device-height: 640px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) {
}

/* Landscape */
@media screen and (device-width: 360px) and (device-height: 640px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape) {
}
```

#### iPads

```css
/* ----------- iPad mini ----------- */

/* Portrait and Landscape */
@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 1) {
}

/* Portrait */
@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 1) {
}

/* Landscape */
@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 1) {
}

/* ----------- iPad 1 and 2 ----------- */

/* Portrait and Landscape */
@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 1) {
}

/* Portrait */
@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 1) {
}

/* Landscape */
@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 1) {
}

/* ----------- iPad 3 and 4 ----------- */

/* Portrait and Landscape */
@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) {
}

/* Portrait */
@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 2) {
}

/* Landscape */
@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 2) {
}
```

## CSS 规范-命名规范

### ClassName 命名

ClassName 的命名应该尽量精短、明确，必须以字母开头命名，且全部字母为小写，单词之间统一使用下划线 “\_” 连接

基于姓氏命名法（继承 + 外来），如下图：
祖先模块不能出现下划线，除了是全站公用模块，如 mod\_ 系列的命名：

```html
推荐：

<div class="modulename">
  <div class="modulename_info">
    <div class="modulename_son"></div>
    <div class="modulename_son"></div>
    ...
  </div>
</div>

<!-- 这个是全站公用模块，祖先模块允许直接出现下划线 -->
<div class="mod_info">
  <div class="mod_info_son"></div>
  <div class="mod_info_son"></div>
  ...
</div>
不推荐：

<div class="modulename_info">
  <div class="modulename_info_son"></div>
  <div class="modulename_info_son"></div>
  ...
</div>
```

在子孙模块数量可预测的情况下，严格继承祖先模块的命名前缀

```html
<div class="modulename">
  <div class="modulename_cover"></div>
  <div class="modulename_info"></div>
</div>
```

当子孙模块超过 4 级或以上的时候，可以考虑在祖先模块内具有识辨性的独立缩写作为新的子孙模块

```html
推荐：

<div class="modulename">
  <div class="modulename_cover"></div>
  <div class="modulename_info">
    <div class="modulename_info_user">
      <div class="modulename_info_user_img">
        <img src="" alt="" />
        <!-- 这个时候 miui 为 modulename_info_user_img 首字母缩写-->
        <div class="miui_tit"></div>
        <div class="miui_txt"></div>
        ...
      </div>
    </div>
    <div class="modulename_info_list"></div>
  </div>
</div>
不推荐：

<div class="modulename">
  <div class="modulename_cover"></div>
  <div class="modulename_info">
    <div class="modulename_info_user">
      <div class="modulename_info_user_img">
        <img src="" alt="" />
        <div class="modulename_info_user_img_tit"></div>
        <div class="modulename_info_user_img_txt"></div>
        ...
      </div>
    </div>
    <div class="modulename_info_list"></div>
  </div>
</div>
```

### 模块命名

全站公共模块：以 mod\_ 开头

```html
<div class="mod_yours"></div>
```

业务公共模块：以 业务名*mod* 开头

```html
<div class="paipai_mod_yours"></div>
```

### 常用命名推荐

注意：ad、banner、gg、guanggao 等有机会和广告挂勾的字眠不建议直接用来做 ClassName，因为有些浏览器插件（Chrome 的广告拦截插件等）会直接过滤这些类名，因此

```html
<div class="ad"></div>
```

这种广告的英文或拼音类名不应该出现

另外，敏感不和谐字眼也不应该出现，如：

```html
<div class="fuck"></div>
<div class="jer"></div>
<div class="sm"></div>
<div class="gcd"></div>
<div class="ass"></div>
<div class="KMT"></div>
...
```

| about                  | 关于                                     |
| ---------------------- | ---------------------------------------- |
| account                | 账户                                     |
| arrow                  | 箭头图标                                 |
| article                | 文章                                     |
| aside                  | 边栏                                     |
| audio                  | 音频                                     |
| avatar                 | 头像                                     |
| bg,background          | 背景                                     |
| bar                    | 栏（工具类）                             |
| branding               | 品牌化                                   |
| crumb,breadcrumbs      | 面包屑                                   |
| btn,button             | 按钮                                     |
| caption                | 标题，说明                               |
| category               | 分类                                     |
| chart                  | 图表                                     |
| clearfix               | 清除浮动                                 |
| close                  | 关闭                                     |
| col,column             | 列                                       |
| comment                | 评论                                     |
| community              | 社区                                     |
| container              | 容器                                     |
| content                | 内容                                     |
| copyright              | 版权                                     |
| current                | 当前态，选中态                           |
| default                | 默认                                     |
| description            | 描述                                     |
| details                | 细节                                     |
| disabled               | 不可用                                   |
| entry                  | 文章，博文                               |
| error                  | 错误                                     |
| even                   | 偶数，常用于多行列表或表格中             |
| fail                   | 失败（提示）                             |
| feature                | 专题                                     |
| fewer                  | 收起                                     |
| field                  | 用于表单的输入区域                       |
| figure                 | 图                                       |
| filter                 | 筛选                                     |
| first                  | 第一个，常用于列表中                     |
| footer                 | 页脚                                     |
| forum                  | 论坛                                     |
| gallery                | 画廊                                     |
| group                  | 模块，清除浮动                           |
| header                 | 页头                                     |
| help                   | 帮助                                     |
| hide                   | 隐藏                                     |
| hightlight             | 高亮                                     |
| home                   | 主页                                     |
| icon                   | 图标                                     |
| info,information       | 信息                                     |
| last                   | 最后一个，常用于列表中                   |
| links                  | 链接                                     |
| login                  | 登录                                     |
| logout                 | 退出                                     |
| logo                   | 标志                                     |
| main                   | 主体                                     |
| menu                   | 菜单                                     |
| meta                   | 作者、更新时间等信息栏，一般位于标题之下 |
| module                 | 模块                                     |
| more                   | 更多（展开）                             |
| msg,message            | 消息                                     |
| nav,navigation         | 导航                                     |
| next                   | 下一页                                   |
| nub                    | 小块                                     |
| odd                    | 奇数，常用于多行列表或表格中             |
| off                    | 鼠标离开                                 |
| on                     | 鼠标移过                                 |
| output                 | 输出                                     |
| pagination             | 分页                                     |
| pop,popup              | 弹窗                                     |
| preview                | 预览                                     |
| previous               | 上一页                                   |
| primary                | 主要                                     |
| progress               | 进度条                                   |
| promotion              | 促销                                     |
| rcommd,recommendations | 推荐                                     |
| reg,register           | 注册                                     |
| save                   | 保存                                     |
| search                 | 搜索                                     |
| secondary              | 次要                                     |
| section                | 区块                                     |
| selected               | 已选                                     |
| share                  | 分享                                     |
| show                   | 显示                                     |
| sidebar                | 边栏，侧栏                               |
| slide                  | 幻灯片，图片切换                         |
| sort                   | 排序                                     |
| sub                    | 次级的，子级的                           |
| submit                 | 提交                                     |
| subscribe              | 订阅                                     |
| subtitle               | 副标题                                   |
| success                | 成功（提示）                             |
| summary                | 摘要                                     |
| tab                    | 标签页                                   |
| table                  | 表格                                     |
| txt,text               | 文本                                     |
| thumbnail              | 缩略图                                   |
| time                   | 时间                                     |
| tips                   | 提示                                     |
| title                  | 标题                                     |
| video                  | 视频                                     |
| wrap                   | 容器，包，一般用于最外层                 |
| wrapper                | 容器，包，一般用于最外层                 |

## JavaScript-代码规范

### 类型

1. 原始值:当你访问一个原始类型的时候,你可以直接使用它的值.

   - string
   - number
   - boolean
   - null
   - undefined
   - symbol

   ```js
   const foo = 1;
   let bar = foo;

   bar = 9;

   console.log(foo, bar); // => 1, 9
   ```

   - 标识符不能完全被支持，因此在针对不支持的浏览器或者环境时不应该使用它们。

2. 复杂类型: 当你访问一个复杂类型的时候，你需要一个值得引用。

   - object
   - array
   - function

   ```js
   const foo = [1, 2];
   const bar = foo;

   bar[0] = 9;

   console.log(foo[0], bar[0]); // => 9, 9
   ```

### 变量

1.  使用 `const` 定义你的所有引用；避免使用 `var`。 eslint: [prefer-const](https://eslint.org/docs/rules/prefer-const.html), [no-const-assign](https://eslint.org/docs/rules/no-const-assign.html)
    > 为什么? 这样能够确保你不能重新赋值你的引用，否则可能导致错误或者产生难以理解的代码。

```js
// bad
var a = 1;
var b = 2;

// good
const a = 1;
const b = 2;
```

2.  如果你必须重新赋值你的引用， 使用 `let` 代替 `var`。 >为什么? `let` 是块级作用域，而不像 `var` 是函数作用域.  eslint: [no-var](https://eslint.org/docs/rules/no-var.html)

```js
// bad
var count = 1;
if (true) {
  count += 1;
}

// good, use the let.
let count = 1;
if (true) {
  count += 1;
}
```

3. 注意，let 和 const 都是块级范围的。
   ```js
   // const 和 let 只存在于他们定义的块中。
   {
     let a = 1;
     const b = 1;
   }
   console.log(a); // ReferenceError
   console.log(b); // ReferenceError
   ```

### 对象

1. 使用字面语法来创建对象。 eslint: [no-new-object](https://eslint.org/docs/rules/no-new-object.html)

```js
// bad

const item = new Object();

// good
const item = {};
```

2. 在创建具有动态属性名称的对象时使用计算属性名。
   > 为什么? 它允许你在一个地方定义对象的所有属性。

```js
function getKey(k) {
  return `a key named ${k}`;
}

// bad
const obj = {
  id: 5,
  name: "San Francisco",
};
obj[getKey("enabled")] = true;

// good
const obj = {
  id: 5,
  name: "San Francisco",
  [getKey("enabled")]: true,
};
```

3. 使用对象方法的缩写。eslint: [object-shorthand](https://eslint.org/docs/rules/object-shorthand.html)

```js
// bad
const atom = {
  value: 1,

  addValue: function (value) {
    return atom.value + value;
  },
};

// good
const atom = {
  value: 1,

  addValue(value) {
    return atom.value + value;
  },
};
```

4. 使用属性值的缩写。 eslint: [object-shorthand](https://eslint.org/docs/rules/object-shorthand.html)
   > 为什么? 它的写法和描述较短。

```js
const lukeSkywalker = "Luke Skywalker";

// bad
const obj = {
  lukeSkywalker: lukeSkywalker,
};

// good
const obj = {
  lukeSkywalker,
};
```

5. 在对象声明的时候将简写的属性进行分组。
   > 为什么? 这样更容易的判断哪些属性使用的简写。

```js
const anakinSkywalker = "Anakin Skywalker";
const lukeSkywalker = "Luke Skywalker";

// bad
const obj = {
  episodeOne: 1,
  twoJediWalkIntoACantina: 2,
  lukeSkywalker,
  episodeThree: 3,
  mayTheFourth: 4,
  anakinSkywalker,
};

// good
const obj = {
  lukeSkywalker,
  anakinSkywalker,
  episodeOne: 1,
  twoJediWalkIntoACantina: 2,
  episodeThree: 3,
  mayTheFourth: 4,
};
```

6. 只使用引号标注无效标识符的属性。eslint: [quote-props](https://eslint.org/docs/rules/quote-props.html)
   > 为什么? 总的来说，我们认为这样更容易阅读。 它提升了语法高亮显示，并且更容易通过许多 JS 引擎优化。

```js
// bad
const bad = {
  'foo': 3,
  'bar': 4,
  'data-blah': 5,
};

// good
const good = {
  foo: 3,
  bar: 4,
  'data-blah': 5,
};
```

7. 不能直接调用 Object.prototype 的方法，如： hasOwnProperty 、 propertyIsEnumerable 和 isPrototypeOf。
   > 为什么? 这些方法可能被以下问题对象的属性追踪 - 相应的有 { hasOwnProperty: false } - 或者，对象是一个空对象 (Object.create(null))。

```js
// bad
console.log(object.hasOwnProperty(key));

// good
console.log(Object.prototype.hasOwnProperty.call(object, key));

// best
const has = Object.prototype.hasOwnProperty; // 在模块范围内的缓存中查找一次
/* or */
import has from "has"; // https://www.npmjs.com/package/has
// ...
console.log(has.call(object, key));
```

8. 更喜欢对象扩展操作符，而不是用 Object.assign 浅拷贝一个对象。 使用对象的 rest 操作符来获得一个具有某些属性的新对象。

```js
// very bad
const original = { a: 1, b: 2 };
const copy = Object.assign(original, { c: 3 }); // 变异的 `original` ಠ_ಠ
delete copy.a; // 这....

// bad
const original = { a: 1, b: 2 };
const copy = Object.assign({}, original, { c: 3 }); // copy => { a: 1, b: 2, c: 3 }

// good
const original = { a: 1, b: 2 };
const copy = { ...original, c: 3 }; // copy => { a: 1, b: 2, c: 3 }

const { a, ...noA } = copy; // noA => { b: 2, c: 3 }
```

### 数组

1. 使用字面语法创建数组。eslint: [no-array-constructor](https://eslint.org/docs/rules/no-array-constructor.html)

```js
// bad
const items = new Array();

// good
const items = [];
```

2. 使用 [Array#push](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push) 取代直接赋值来给数组添加项。

```js
const someStack = [];

// bad
someStack[someStack.length] = "abracadabra";

// good
someStack.push("abracadabra");
```

3. 使用数组展开方法 `...` 来拷贝数组。

```js
// bad
const len = items.length;
const itemsCopy = [];
let i;

for (i = 0; i < len; i += 1) {
  itemsCopy[i] = items[i];
}

// good
const itemsCopy = [...items];
```

4. 将一个类数组对象转换成一个数组， 使用展开方法 ... 代替 [Array.from](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from)。

```js
const foo = document.querySelectorAll(".foo");

// good
const nodes = Array.from(foo);

// best
const nodes = [...foo];
```

5.  对于对迭代器的映射，使用 [Array.from](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from) 替代展开方法 ... ， 因为它避免了创建中间数组。

```js
// bad
const baz = [...foo].map(bar);

// good
const baz = Array.from(foo, bar);
```

6. 在数组回调方法中使用 return 语句。 如果函数体由一个返回无副作用的表达式的单个语句组成，那么可以省略返回值。 eslint: [array-callback-return](https://eslint.org/docs/rules/array-callback-return)

```js
// good
[1, 2, 3].map((x) => {
  const y = x + 1;
  return x * y;
});

// good
[1, 2, 3].map((x) => x + 1);

// bad - 没有返回值，意味着在第一次迭代后 `acc` 没有被定义
[
  [0, 1],
  [2, 3],
  [4, 5],
].reduce((acc, item, index) => {
  const flatten = acc.concat(item);
  acc[index] = flatten;
});

// good
[
  [0, 1],
  [2, 3],
  [4, 5],
].reduce((acc, item, index) => {
  const flatten = acc.concat(item);
  acc[index] = flatten;
  return flatten;
});

// bad
inbox.filter((msg) => {
  const { subject, author } = msg;
  if (subject === "Mockingbird") {
    return author === "Harper Lee";
  } else {
    return false;
  }
});

// good
inbox.filter((msg) => {
  const { subject, author } = msg;
  if (subject === "Mockingbird") {
    return author === "Harper Lee";
  }

  return false;
});
```

7. 如果数组有多行，则在开始的时候换行，然后在结束的时候换行。

```js
// bad
const arr = [
  [0, 1], [2, 3], [4, 5],
];

const objectInArray = [{
  id: 1,
}, {
  id: 2,
}];

const numberInArray = [
  1, 2,
];

// good
const arr = [
  [0, 1],
  [2, 3],
  [4, 5],
];

const objectInArray = [
  {
    id: 1,
  },
  {
    id: 2,
  },
];

const numberInArray = [1, 2];
```

### 解构

1. 在访问和使用对象的多个属性的时候使用对象的解构。eslint: [prefer-destructuring](https://eslint.org/docs/rules/prefer-destructuring)
   > 为什么? 解构可以避免为这些属性创建临时引用。

```js
// bad
function getFullName(user) {
  const firstName = user.firstName;
  const lastName = user.lastName;

  return `${firstName} ${lastName}`;
}

// good
function getFullName(user) {
  const { firstName, lastName } = user;
  return `${firstName} ${lastName}`;
}

// best
function getFullName({ firstName, lastName }) {
  return `${firstName} ${lastName}`;
}
```

2. 使用数组解构。eslint: [prefer-destructuring](https://eslint.org/docs/rules/prefer-destructuring)

```js
const arr = [1, 2, 3, 4];

// bad
const first = arr[0];
const second = arr[1];

// good
const [first, second] = arr;
```

3.  对于多个返回值使用对象解构，而不是数组解构。
    > 为什么? 你可以随时添加新的属性或者改变属性的顺序，而不用修改调用方。

```js
// bad
function processInput(input) {
  // 处理代码...
  return [left, right, top, bottom];
}

// 调用者需要考虑返回数据的顺序。
const [left, __, top] = processInput(input);

// good
function processInput(input) {
  // 处理代码...
  return { left, right, top, bottom };
}

// 调用者只选择他们需要的数据。
const { left, top } = processInput(input);
```

### 字符

1. 使用单引号 '' 定义字符串 eslint: [quotes](https://eslint.org/docs/rules/quotes.html)

```js
// bad
const name = "Capt. Janeway";

// bad - 模板文字应该包含插值或换行。
const name = `Capt. Janeway`;

// good
const name = "Capt. Janeway";
```

2. 使行超过 100 个字符的字符串不应使用字符串连接跨多行写入。
   > 为什么? 断开的字符串更加难以工作，并且使代码搜索更加困难。

```js
// bad
const errorMessage =
  "This is a super long error that was thrown because \
of Batman. When you stop to think about how Batman had anything to do \
with this, you would get nowhere \
fast.";

// bad
const errorMessage =
  "This is a super long error that was thrown because " +
  "of Batman. When you stop to think about how Batman had anything to do " +
  "with this, you would get nowhere fast.";

// good
const errorMessage =
  "This is a super long error that was thrown because of Batman. When you stop to think about how Batman had anything to do with this, you would get nowhere fast.";
```

3. 当以编程模式构建字符串时，使用字符串模板代替字符串拼接。eslint: [prefer-template](https://eslint.org/docs/rules/prefer-template.html) [template-curly-spacing](https://eslint.org/docs/rules/template-curly-spacing)
   > 为什么? 字符串模板为您提供了一种可读的、简洁的语法，具有正确的换行和字符串插值特性。

```js
// bad
function sayHi(name) {
  return "How are you, " + name + "?";
}

// bad
function sayHi(name) {
  return ["How are you, ", name, "?"].join();
}

// bad
function sayHi(name) {
  return `How are you, ${name}?`;
}

// good
function sayHi(name) {
  return `How are you, ${name}?`;
}
```

4. 不要在字符串上使用 eval() ，它打开了太多漏洞。eslint: [no-eval](https://eslint.org/docs/rules/no-eval)

5. 不要转义字符串中不必要的字符。eslint: [no-useless-escape](https://eslint.org/docs/rules/no-useless-escape)
   > 为什么? 反斜杠损害了可读性，因此只有在必要的时候才会出现。

```js
// bad
const foo = '\'this\' \i\s \"quoted\"';

// good
const foo = '\'this\' is "quoted"';
const foo = `my name is '${name}'`;
```

### 方法

1. 使用命名的函数表达式代替函数声明。eslint: [func-style](https://eslint.org/docs/rules/func-style)
   > 为什么? 函数声明是挂起的，这意味着在它在文件中定义之前，很容易引用函数。这会损害可读性和可维护性。如果您发现函数的定义是大的或复杂的，以至于它干扰了对文件的其余部分的理解，那么也许是时候将它提取到它自己的模块中了!不要忘记显式地命名这个表达式，不管它的名称是否从包含变量(在现代浏览器中经常是这样，或者在使用诸如 Babel 之类的编译器时)。这消除了对错误的调用堆栈的任何假设。([Discussion](https://github.com/airbnb/javascript/issues/794))

```js
// bad
function foo() {
  // ...
}

// bad
const foo = function () {
  // ...
};

// good
// 从变量引用调用中区分的词汇名称
const short = function longUniqueMoreDescriptiveLexicalFoo() {
  // ...
};
```

2. Wrap 立即调用函数表达式。 eslint: [wrap-iife](https://eslint.org/docs/rules/wrap-iife.html)
   > 为什么? 立即调用的函数表达式是单个单元 - 包装， 并且拥有括号调用, 在括号内, 清晰的表达式。 请注意，在一个到处都是模块的世界中，您几乎不需要一个 IIFE 。

```js
// immediately-invoked function expression (IIFE) 立即调用的函数表达式
(function () {
  console.log("Welcome to the Internet. Please follow me.");
})();
```

3. 切记不要在非功能块中声明函数 (if, while, 等)。 将函数赋值给变量。 浏览器允许你这样做，但是他们都有不同的解释，这是个坏消息。eslint: [no-loop-func](https://eslint.org/docs/rules/no-loop-func.html)

4. 注意: ECMA-262 将 block 定义为语句列表。 函数声明不是语句。

```js
// bad
if (currentUser) {
  function test() {
    console.log("Nope.");
  }
}

// good
let test;
if (currentUser) {
  test = () => {
    console.log("Yup.");
  };
}
```

5. 永远不要定义一个参数为 arguments。 这将会优先于每个函数给定范围的 arguments 对象。

```js
// bad
function foo(name, options, arguments) {
  // ...
}

// good
function foo(name, options, args) {
  // ...
}
```

6. 不要使用 `arguments`, 选择使用 rest 语法 `...` 代替。 eslint: [prefer-rest-params](https://eslint.org/docs/rules/prefer-rest-params)
   > 为什么? `...` 明确了你想要拉取什么参数。 更甚, rest 参数是一个真正的数组，而不仅仅是类数组的 `arguments` 。

```js
// bad
function concatenateAll() {
  const args = Array.prototype.slice.call(arguments);
  return args.join("");
}

// good
function concatenateAll(...args) {
  return args.join("");
}
```

7. 使用默认的参数语法，而不是改变函数参数。

```js
// really bad
function handleThings(opts) {
  // No! We shouldn’t mutate function arguments.
  // Double bad: if opts is falsy it'll be set to an object which may
  // be what you want but it can introduce subtle bugs.
  opts = opts || {};
  // ...
}

// still bad
function handleThings(opts) {
  if (opts === void 0) {
    opts = {};
  }
  // ...
}

// good
function handleThings(opts = {}) {
  // ...
}
```

8. 避免使用默认参数的副作用。
   > 为什么? 他们很容易混淆。

```js
var b = 1;
// bad
function count(a = b++) {
  console.log(a);
}
count(); // 1
count(); // 2
count(3); // 3
count(); // 3
```

9. 总是把默认参数放在最后。

```js
// bad
function handleThings(opts = {}, name) {
  // ...
}

// good
function handleThings(name, opts = {}) {
  // ...
}
```

10. 永远不要使用函数构造器来创建一个新函数。 eslint: [no-new-func](https://eslint.org/docs/rules/no-new-func)
    > 为什么? 以这种方式创建一个函数将对一个类似于 eval() 的字符串进行计算，这将打开漏洞。

```js
// bad
var add = new Function("a", "b", "return a + b");

// still bad
var subtract = Function("a", "b", "return a - b");
```

11. 函数签名中的间距。 eslint: [space-before-function-paren](https://eslint.org/docs/rules/space-before-function-paren) [space-before-blocks](https://eslint.org/docs/rules/space-before-blocks)
    > 为什么? 一致性很好，在删除或添加名称时不需要添加或删除空格。

```js
// bad
const f = function () {};
const g = function () {};
const h = function () {};

// good
const x = function () {};
const y = function a() {};
```

12. 没用变异参数。eslint: [no-param-reassign](https://eslint.org/docs/rules/no-param-reassign.html)
    > 为什么? 将传入的对象作为参数进行操作可能会在原始调用程序中造成不必要的变量副作用。

```js
// bad
function f1(obj) {
  obj.key = 1;
}

// good
function f2(obj) {
  const key = Object.prototype.hasOwnProperty.call(obj, "key") ? obj.key : 1;
}
```

13. 不要再赋值参数。 eslint: [no-param-reassign](https://eslint.org/docs/rules/no-param-reassign.html)
    > 为什么? 重新赋值参数会导致意外的行为，尤其是在访问 arguments 对象的时候。 它还可能导致性能优化问题，尤其是在 V8 中。

```js
// bad
function f1(a) {
  a = 1;
  // ...
}

function f2(a) {
  if (!a) {
    a = 1;
  }
  // ...
}

// good
function f3(a) {
  const b = a || 1;
  // ...
}

function f4(a = 1) {
  // ...
}
```

14. 优先使用扩展运算符 `...` 来调用可变参数函数。 eslint: [prefer-spread](https://eslint.org/docs/rules/prefer-spread)
    > 为什么? 它更加干净，你不需要提供上下文，并且你不能轻易的使用 `apply` 来 `new` 。

```js
// bad
const x = [1, 2, 3, 4, 5];
console.log.apply(console, x);

// good
const x = [1, 2, 3, 4, 5];
console.log(...x);

// bad
new (Function.prototype.bind.apply(Date, [null, 2016, 8, 5]))();

// good
new Date(...[2016, 8, 5]);
```

15. 具有多行签名或者调用的函数应该像本指南中的其他多行列表一样缩进：在一行上只有一个条目，并且每个条目最后加上逗号。eslint: [function-paren-newline](https://eslint.org/docs/rules/function-paren-newline)

```js
// bad
function foo(bar,
             baz,
             quux) {
  // ...
}

// good
function foo(
  bar,
  baz,
  quux,
) {
  // ...
}

// bad
console.log(foo,
  bar,
  baz);

// good
console.log(
  foo,
  bar,
  baz,
);
```

### 箭头函数

1. 当你必须使用匿名函数时 (当传递内联函数时)， 使用箭头函数。eslint: [prefer-arrow-callback](https://eslint.org/docs/rules/prefer-arrow-callback.html), [arrow-spacing](https://eslint.org/docs/rules/arrow-spacing.html)
   > 为什么? 它创建了一个在 this 上下文中执行的函数版本，它通常是你想要的，并且是一个更简洁的语法。

> 为什么不? 如果你有一个相当复杂的函数，你可以把这个逻辑转移到它自己的命名函数表达式中。

```js
// bad
[1, 2, 3].map(function (x) {
  const y = x + 1;
  return x * y;
});

// good
[1, 2, 3].map((x) => {
  const y = x + 1;
  return x * y;
});
```

2. 如果函数体包含一个单独的语句，返回一个没有副作用的 [expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#expressions) ， 省略括号并使用隐式返回。否则，保留括号并使用 `return` 语句。 eslint: [arrow-parens](https://eslint.org/docs/rules/arrow-parens.html), [arrow-body-style](https://eslint.org/docs/rules/arrow-body-style.html)
   > 为什么? 语法糖。 多个函数被链接在一起时，提高可读性。

```js
// bad
[1, 2, 3].map((number) => {
  const nextNumber = number + 1;
  `A string containing the ${nextNumber}.`;
});

// good
[1, 2, 3].map((number) => `A string containing the ${number}.`);

// good
[1, 2, 3].map((number) => {
  const nextNumber = number + 1;
  return `A string containing the ${nextNumber}.`;
});

// good
[1, 2, 3].map((number, index) => ({
  [index]: number,
}));

// 没有副作用的隐式返回
function foo(callback) {
  const val = callback();
  if (val === true) {
    // 如果回调返回 true 执行
  }
}

let bool = false;

// bad
foo(() => (bool = true));

// good
foo(() => {
  bool = true;
});
```

3. 如果表达式跨越多个行，用括号将其括起来，以获得更好的可读性。
   > 为什么? 它清楚地显示了函数的起点和终点。

```js
// bad
['get', 'post', 'put'].map(httpMethod => Object.prototype.hasOwnProperty.call(
    httpMagicObjectWithAVeryLongName,
    httpMethod,
  )
);

// good
["get", "post", "put"].map((httpMethod) =>
  Object.prototype.hasOwnProperty.call(
    httpMagicObjectWithAVeryLongName,
    httpMethod
  )
);
```

4. 如果你的函数接收一个参数，则可以不用括号，省略括号。 否则，为了保证清晰和一致性，需要在参数周围加上括号。 注意：总是使用括号是可以接受的，在这种情况下，我们使用 “always” option 来配置 eslint. eslint: [arrow-parens](https://eslint.org/docs/rules/arrow-parens.html)
   > 为什么? 减少视觉上的混乱。

```js
// bad
[1, 2, 3].map((x) => x * x);

// good
[1, 2, 3].map((x) => x * x);

// good
[1, 2, 3].map(
  (number) =>
    `A long string with the ${number}. It’s so long that we don’t want it to take up space on the .map line!`
);

// bad
[1, 2, 3].map(x => {
  const y = x + 1;
  return x * y;
});

// good
[1, 2, 3].map((x) => {
  const y = x + 1;
  return x * y;
});
```

5. 避免箭头函数符号 (=>) 和比较运算符 (<=, >=) 的混淆。eslint: [no-confusing-arrow](https://eslint.org/docs/rules/no-confusing-arrow)

```js
// bad
const itemHeight = (item) =>
  item.height > 256 ? item.largeSize : item.smallSize;

// bad
const itemHeight = (item) =>
  item.height > 256 ? item.largeSize : item.smallSize;

// good
const itemHeight = (item) =>
  (item.height > 256 ? item.largeSize : item.smallSize);

// good
const itemHeight = (item) => {
  const { height, largeSize, smallSize } = item;
  return height > 256 ? largeSize : smallSize;
};
```

6. 注意带有隐式返回的箭头函数函数体的位置。eslint: [implicit-arrow-linebreak](https://eslint.org/docs/rules/implicit-arrow-linebreak)

```js
// bad
(foo) =>
  bar;

(foo) =>
  (bar);

// good
(foo) => bar;
(foo) => (bar);
(foo) => (
   bar
)
```

### 类和构造器

1. 尽量使用 `class`. 避免直接操作 `prototype` .
   > 为什么? class 语法更简洁，更容易推理。

```js
// bad
function Queue(contents = []) {
  this.queue = [...contents];
}
Queue.prototype.pop = function () {
  const value = this.queue[0];
  this.queue.splice(0, 1);
  return value;
};

// good
class Queue {
  constructor(contents = []) {
    this.queue = [...contents];
  }
  pop() {
    const value = this.queue[0];
    this.queue.splice(0, 1);
    return value;
  }
}
```

2. 使用 extends 来扩展继承。
   > 为什么? 它是一个内置的方法，可以在不破坏 instanceof 的情况下继承原型功能。

```js
// bad
const inherits = require("inherits");
function PeekableQueue(contents) {
  Queue.apply(this, contents);
}
inherits(PeekableQueue, Queue);
PeekableQueue.prototype.peek = function () {
  return this.queue[0];
};

// good
class PeekableQueue extends Queue {
  peek() {
    return this.queue[0];
  }
}
```

3. 方法返回了 this 来供其内部方法调用。

```js
// bad
Jedi.prototype.jump = function () {
  this.jumping = true;
  return true;
};

Jedi.prototype.setHeight = function (height) {
  this.height = height;
};

const luke = new Jedi();
luke.jump(); // => true
luke.setHeight(20); // => undefined

// good
class Jedi {
  jump() {
    this.jumping = true;
    return this;
  }

  setHeight(height) {
    this.height = height;
    return this;
  }
}

const luke = new Jedi();

luke.jump().setHeight(20);
```

4. 只要在确保能正常工作并且不产生任何副作用的情况下，编写一个自定义的 `toString()` 方法也是可以的。

```js
class Jedi {
  constructor(options = {}) {
    this.name = options.name || "no name";
  }

  getName() {
    return this.name;
  }

  toString() {
    return `Jedi - ${this.getName()}`;
  }
}
```

5. 如果没有指定类，则类具有默认的构造器。 一个空的构造器或是一个代表父类的函数是没有必要的。eslint: [no-useless-constructor](https://eslint.org/docs/rules/no-useless-constructor)

```js
// bad
class Jedi {
  constructor() {}

  getName() {
    return this.name;
  }
}

// bad
class Rey extends Jedi {
  constructor(...args) {
    super(...args);
  }
}

// good
class Rey extends Jedi {
  constructor(...args) {
    super(...args);
    this.name = "Rey";
  }
}
```

6. 避免定义重复的类成员。eslint: [no-dupe-class-members](https://eslint.org/docs/rules/no-dupe-class-members)
   > 为什么? 重复的类成员声明将会默认倾向于最后一个 - 具有重复的类成员可以说是一个错误。

```js
// bad
class Foo {
  bar() {
    return 1;
  }
  bar() {
    return 2;
  }
}

// good
class Foo {
  bar() {
    return 1;
  }
}

// good
class Foo {
  bar() {
    return 2;
  }
}
```

### 模块

1. 你可能经常使用模块 (`import/export`) 在一些非标准模块的系统上。 你也可以在你喜欢的模块系统上相互转换。
   > 为什么? 模块是未来的趋势，让我们拥抱未来。

```js
// bad
const AirbnbStyleGuide = require('./AirbnbStyleGuide');
module.exports = AirbnbStyleGuide.es6;

// ok
import AirbnbStyleGuide from './AirbnbStyleGuide';
export default AirbnbStyleGuide.es6;

// best
import { es6 } from './AirbnbStyleGuide';
export default es6;
```

2. 不要直接从导入导出。
   > 为什么? 虽然写在一行很简洁，但是有一个明确的导入和一个明确的导出能够保证一致性。

```js
// bad
// filename es6.js
export { es6 as default } from './AirbnbStyleGuide';

// good
// filename es6.js
import { es6 } from './AirbnbStyleGuide';
export default es6;
```

3. 只从一个路径导入所有需要的东西。eslint: [no-duplicate-imports](https://eslint.org/docs/rules/no-duplicate-imports)
   > 为什么? 从同一个路径导入多个行，使代码更难以维护。

```js
// bad
import foo from "foo";
// … 其他导入 … //
import { named1, named2 } from "foo";

// good
import foo, { named1, named2 } from "foo";

// good
import foo, { named1, named2 } from "foo";
```

4. 不要导出可变的引用。eslint: [import/no-mutable-exports](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-mutable-exports.md)
   > 为什么? 在一般情况下，应该避免发生突变，但是在导出可变引用时及其容易发生突变。虽然在某些特殊情况下，可能需要这样，但是一般情况下只需要导出常量引用。

```js
// bad
let foo = 3;
export { foo };

// good
const foo = 3;
export { foo };
```

5. 在单个导出的模块中，选择默认模块而不是指定的导出。eslint: [import/prefer-default-export](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/prefer-default-export.md)
   > 为什么? 在一般情况下，应该避免发生突变，但是在导出可变引用时及其容易发生突变。虽然在某些特殊情况下，可能需要这样，但是一般情况下只需要导出常量引用。

```js
// bad
let foo = 3;
export { foo };

// good
const foo = 3;
export { foo };
```

6. 将所有的 `imports` 语句放在所有非导入语句的上边。eslint: [import/first](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/first.md)
   > 为什么? 由于所有的 imports 都被提前，保持他们在顶部是为了防止意外发生

```js
// bad
import foo from "foo";
foo.init();

import bar from "bar";

// good
import foo from "foo";
import bar from "bar";

foo.init();
```

8. 多行导入应该像多行数组和对象一样缩进。
   > 为什么? 花括号和其他规范一样，遵循相同的缩进规则，后边的都好一样。

```js
// bad
import { longNameA, longNameB, longNameC, longNameD, longNameE } from "path";

// good
import { longNameA, longNameB, longNameC, longNameD, longNameE } from "path";
```

9. 在模块导入语句中禁止使用 Webpack 加载器语法。eslint: [import/no-webpack-loader-syntax](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-webpack-loader-syntax.md)
   > 为什么? 因为在导入语句中使用 webpack 语法，将代码和模块绑定在一起。应该在 webpack.config.js 中使用加载器语法。

```js
// bad
import fooSass from "css!sass!foo.scss";
import barCss from "style!css!bar.css";

// good
import fooSass from "foo.scss";
import barCss from "bar.css";
```

### 属性

1. 访问属性时使用点符号。eslint: [dot-notation](https://eslint.org/docs/rules/dot-notation.html)

```js
const luke = {
  jedi: true,
  age: 28,
};

// bad
const isJedi = luke["jedi"];

// good
const isJedi = luke.jedi;
```

2. 使用变量访问属性时，使用 `[]`表示法。

```js
const luke = {
  jedi: true,
  age: 28,
};

function getProp(prop) {
  return luke[prop];
}

const isJedi = getProp("jedi");
```

3. 计算指数时，可以使用 `**` 运算符。eslint: [no-restricted-properties](https://eslint.org/docs/rules/no-restricted-properties)

```js
// bad
const binary = Math.pow(2, 10);

// good
const binary = 2 ** 10;
```

### 变量

1. 使用 `const` 或者 `let` 来定义变量。 不这样做将创建一个全局变量。 我们希望避免污染全局命名空间。 Captain Planet 警告过我们。 eslint: [no-undef](https://eslint.org/docs/rules/no-undef) [prefer-const](https://eslint.org/docs/rules/prefer-const)

```js
// bad
superPower = new SuperPower();

// good
const superPower = new SuperPower();
```

2. 使用 const 或者 let 声明每一个变量。eslint: [one-var](https://eslint.org/docs/rules/one-var.html)
   > 为什么? 这样更容易添加新的变量声明，而且你不必担心是使用 ; 还是使用 , 或引入标点符号的差别。 你可以通过 debugger 逐步查看每个声明，而不是立即跳过所有声明。

```js
// bad
const items = getItems(),
  goSportsTeam = true,
  dragonball = "z";

// bad
// (compare to above, and try to spot the mistake)
const items = getItems(),
  goSportsTeam = true;
dragonball = "z";

// good
const items = getItems();
const goSportsTeam = true;
const dragonball = "z";
```

3. 把 const 声明的放在一起，把 let 声明的放在一起。
   > 为什么? 这在后边如果需要根据前边的赋值变量指定一个变量时很有用。

```js
// bad
let i,
  len,
  dragonball,
  items = getItems(),
  goSportsTeam = true;

// bad
let i;
const items = getItems();
let dragonball;
const goSportsTeam = true;
let len;

// good
const goSportsTeam = true;
const items = getItems();
let dragonball;
let i;
let length;
```

4. 在你需要的使用定义变量，但是要把它们放在一个合理的地方。
   > 为什么? `let` 和 `const` 是块级作用域而不是函数作用域。

```js
// bad - 不必要的函数调用
function checkName(hasName) {
  const name = getName();

  if (hasName === "test") {
    return false;
  }

  if (name === "test") {
    this.setName("");
    return false;
  }

  return name;
}

// good
function checkName(hasName) {
  if (hasName === "test") {
    return false;
  }

  const name = getName();

  if (name === "test") {
    this.setName("");
    return false;
  }

  return name;
}
```

5. 不要链式变量赋值。eslint: [no-multi-assign](https://eslint.org/docs/rules/no-multi-assign)
   > 为什么? 链式变量赋值会创建隐式全局变量。

```js
// bad
(function example() {
  // JavaScript 把它解释为
  // let a = ( b = ( c = 1 ) );
  // let 关键词只适用于变量 a ；变量 b 和变量 c 则变成了全局变量。
  let a = (b = c = 1);
})();

console.log(a); // throws ReferenceError
console.log(b); // 1
console.log(c); // 1

// good
(function example() {
  let a = 1;
  let b = a;
  let c = a;
})();

console.log(a); // throws ReferenceError
console.log(b); // throws ReferenceError
console.log(c); // throws ReferenceError

// 对于 `const` 也一样
```

6. 避免使用不必要的递增和递减 (++, --)。 eslint [no-plusplus](https://eslint.org/docs/rules/no-plusplus)
   > 为什么? 在 eslint 文档中，一元递增和递减语句以自动分号插入为主题，并且在应用程序中可能会导致默认值的递增或递减。它还可以用像 num += 1 这样的语句来改变您的值，而不是使用 num++ 或 num ++ 。不允许不必要的增量和减量语句也会使您无法预先递增/预递减值，这也会导致程序中的意外行为。

```js
// bad

const array = [1, 2, 3];
let num = 1;
num++;
--num;

let sum = 0;
let truthyCount = 0;
for (let i = 0; i < array.length; i++) {
  let value = array[i];
  sum += value;
  if (value) {
    truthyCount++;
  }
}

// good

const array = [1, 2, 3];
let num = 1;
num += 1;
num -= 1;

const sum = array.reduce((a, b) => a + b, 0);
const truthyCount = array.filter(Boolean).length;
```

7. 避免在赋值语句 `=` 前后换行。如果你的代码违反了 `max-len`， 使用括号包裹。eslint [operator-linebreak](https://eslint.org/docs/rules/operator-linebreak.html)
   > 为什么? 在 = 前后换行，可能混淆赋的值。

```js
// bad
const foo = superLongLongLongLongLongLongLongLongFunctionName();

// bad
const foo = "superLongLongLongLongLongLongLongLongString";

// good
const foo = superLongLongLongLongLongLongLongLongFunctionName();

// good
const foo = "superLongLongLongLongLongLongLongLongString";
```

### 提升

1. var 定义的变量会被提升到函数范围的最顶部，但是它的赋值不会。`const` 和 `let` 声明的变量受到一个称之为 [Temporal Dead Zones (TDZ)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#Temporal_Dead_Zone_and_errors_with_let) 的新概念保护。 知道为什么 [typeof](https://es.discourse.group/t/about-the-proposals-category/15) 不再安全 是很重要的。

```js
// 我们知道这个行不通 (假设没有未定义的全局变量)
function example() {
  console.log(notDefined); // => throws a ReferenceError
}

// 在引用变量后创建变量声明将会因变量提升而起作用。
// 注意: 真正的值 `true` 不会被提升。
function example() {
  console.log(declaredButNotAssigned); // => undefined
  var declaredButNotAssigned = true;
}

// 解释器将变量提升到函数的顶部
// 这意味着我们可以将上边的例子重写为：
function example() {
  let declaredButNotAssigned;
  console.log(declaredButNotAssigned); // => undefined
  declaredButNotAssigned = true;
}

// 使用 const 和 let
function example() {
  console.log(declaredButNotAssigned); // => throws a ReferenceError
  console.log(typeof declaredButNotAssigned); // => throws a ReferenceError
  const declaredButNotAssigned = true;
}
```

2. 匿名函数表达式提升变量名，而不是函数赋值。

```js
function example() {
  console.log(anonymous); // => undefined

  anonymous(); // => TypeError anonymous is not a function

  var anonymous = function () {
    console.log("anonymous function expression");
  };
}
```

3. 命名函数表达式提升的是变量名，而不是函数名或者函数体。

```js
function example() {
  console.log(named); // => undefined

  named(); // => TypeError named is not a function

  superPower(); // => ReferenceError superPower is not defined

  var named = function superPower() {
    console.log("Flying");
  };
}

// 当函数名和变量名相同时也是如此。
function example() {
  console.log(named); // => undefined

  named(); // => TypeError named is not a function

  var named = function named() {
    console.log("named");
  };
}
```

4. 函数声明提升其名称和函数体。

```js
function example() {
  superPower(); // => Flying

  function superPower() {
    console.log("Flying");
  }
}
```

### 比较运算符和等号

1. 使用 === 和 !== 而不是 == 和 !=。 eslint: [eqeqeq](https://eslint.org/docs/rules/eqeqeq.html)
2. 条件语句，例如 if 语句使用 ToBoolean 的抽象方法来计算表达式的结果，并始终遵循以下简单的规则：
   - Objects 的取值为： true
   - Undefined 的取值为： false
   - Null 的取值为： false
   - Booleans 的取值为： 布尔值的取值
   - Numbers 的取值为：如果为 +0, -0, or NaN 值为 false 否则为 true
   - Strings 的取值为: 如果是一个空字符串 '' 值为 false 否则为 true

```js
if ([0] && []) {
  // true
  // 一个数组（即使是空的）是一个对象，对象的取值为 true
}
```

3. 对于布尔值使用简写，但是对于字符串和数字进行显式比较。

```js
// bad
if (isValid === true) {
  // ...
}

// good
if (isValid) {
  // ...
}

// bad
if (name) {
  // ...
}

// good
if (name !== "") {
  // ...
}

// bad
if (collection.length) {
  // ...
}

// good
if (collection.length > 0) {
  // ...
}
```

4. 在 case 和 default 的子句中，如果存在声明 (例如. let, const, function, 和 class)，使用大括号来创建块eslint: [no-case-declarations](https://eslint.org/docs/rules/no-case-declarations.html)
   > 为什么? 语法声明在整个 switch 块中都是可见的，但是只有在赋值的时候才会被初始化，这种情况只有在 case 条件达到才会发生。 当多个 case 语句定义相同的东西是，这会导致问题问题。

```js
// bad
switch (foo) {
  case 1:
    let x = 1;
    break;
  case 2:
    const y = 2;
    break;
  case 3:
    function f() {
      // ...
    }
    break;
  default:
    class C {}
}

// good
switch (foo) {
  case 1: {
    let x = 1;
    break;
  }
  case 2: {
    const y = 2;
    break;
  }
  case 3: {
    function f() {
      // ...
    }
    break;
  }
  case 4:
    bar();
    break;
  default: {
    class C {}
  }
}
```

5. 三目表达式不应该嵌套，通常是单行表达式。eslint: [no-nested-ternary](https://eslint.org/docs/rules/no-nested-ternary.html)

```js
// bad
const foo = maybe1 > maybe2 ? "bar" : value1 > value2 ? "baz" : null;

// 分离为两个三目表达式
const maybeNull = value1 > value2 ? "baz" : null;

// better
const foo = maybe1 > maybe2 ? "bar" : maybeNull;

// best
const foo = maybe1 > maybe2 ? "bar" : maybeNull;
```

6. 避免不必要的三目表达式。eslint: [no-unneeded-ternary](https://eslint.org/docs/rules/no-unneeded-ternary.html)

```js
// bad
const foo = a ? a : b;
const bar = c ? true : false;
const baz = c ? false : true;

// good
const foo = a || b;
const bar = !!c;
const baz = !c;
```

7. 使用该混合运算符时，使用括号括起来。 唯一例外的是标准算数运算符 ```(+, -, \*, & /)``` 因为他们的优先级被广泛理解。 eslint: [no-mixed-operators](https://eslint.org/docs/rules/no-mixed-operators.html)
   > 为什么? 这能提高可读性并且表明开发人员的意图。

```js
// bad
const foo = (a && b < 0) || c > 0 || d + 1 === 0;

// bad
const bar = a ** b - (5 % d);

// bad
// 可能陷入一种 (a || b) && c 的思考
if (a || (b && c)) {
  return d;
}

// good
const foo = (a && b < 0) || c > 0 || d + 1 === 0;

// good
const bar = a ** b - (5 % d);

// good
if (a || (b && c)) {
  return d;
}

// good
const bar = a + (b / c) * d;
```

### 块

1. 当有多行代码块的时候，使用大括号包裹。eslint: [nonblock-statement-body-position](https://eslint.org/docs/rules/nonblock-statement-body-position)

```js
// bad
if (test) return false;

// good
if (test) return false;

// good
if (test) {
  return false;
}

// bad
function foo() {
  return false;
}

// good
function bar() {
  return false;
}
```

2. 如果你使用的是 if 和 else 的多行代码块，则将 else 语句放在 if 块闭括号同一行的位置。eslint: [brace-style](https://eslint.org/docs/rules/brace-style.html)

```js
// bad
if (test) {
  thing1();
  thing2();
} 
else {
  thing3();
}

// good
if (test) {
  thing1();
  thing2();
} else {
  thing3();
}
```

3. 如果一个 if 块总是执行一个 return 语句，那么接下来的 else 块就没有必要了。 如果一个包含 return 语句的 else if 块，在一个包含了 return 语句的 if 块之后，那么可以拆成多个 if 块。 eslint: [no-else-return](https://eslint.org/docs/rules/no-else-return)

```js
// bad
function foo() {
  if (x) {
    return x;
  } else {
    return y;
  }
}

// bad
function cats() {
  if (x) {
    return x;
  } else if (y) {
    return y;
  }
}

// bad
function dogs() {
  if (x) {
    return x;
  } else {
    if (y) {
      return y;
    }
  }
}

// good
function foo() {
  if (x) {
    return x;
  }

  return y;
}

// good
function cats() {
  if (x) {
    return x;
  }

  if (y) {
    return y;
  }
}

// good
function dogs(x) {
  if (x) {
    if (z) {
      return y;
    }
  } else {
    return z;
  }
}
```

### 控制语句

1. 如果你的控制语句 (if, while 等) 太长或者超过了一行最大长度的限制，则可以将每个条件（或组）放入一个新的行。 逻辑运算符应该在行的开始。
   > 为什么? 要求操作符在行的开始保持对齐并遵循类似方法衔接的模式。 这提高了可读性，并且使更复杂的逻辑更容易直观的被理解。

```js
// bad
if (
  (foo === 123 || bar === "abc") &&
  doesItLookGoodWhenItBecomesThatLong() &&
  isThisReallyHappening()
) {
  thing1();
}

// bad
if (foo === 123 && bar === "abc") {
  thing1();
}

// bad
if (foo === 123 && bar === "abc") {
  thing1();
}

// bad
if (foo === 123 && bar === "abc") {
  thing1();
}

// good
if (foo === 123 && bar === "abc") {
  thing1();
}

// good
if (
  (foo === 123 || bar === "abc") &&
  doesItLookGoodWhenItBecomesThatLong() &&
  isThisReallyHappening()
) {
  thing1();
}

// good
if (foo === 123 && bar === "abc") {
  thing1();
}
```

### 注释

1. 使用 `/** ... */` 来进行多行注释。

```js
// bad
// make() returns a new element
// based on the passed in tag name
//
// @param {String} tag
// @return {Element} element
function make(tag) {
  // ...

  return element;
}

// good
/**
 * make() returns a new element
 * based on the passed-in tag name
 */
function make(tag) {
  // ...

  return element;
}
```

2. 使用 // 进行单行注释。 将单行注释放在需要注释的行的上方新行。 在注释之前放一个空行，除非它在块的第一行。

```js
// bad
const active = true; // is current tab

// good
// is current tab
const active = true;

// bad
function getType() {
  console.log("fetching type...");
  // set the default type to 'no type'
  const type = this.type || "no type";

  return type;
}

// good
function getType() {
  console.log("fetching type...");

  // set the default type to 'no type'
  const type = this.type || "no type";

  return type;
}

// also good
function getType() {
  // set the default type to 'no type'
  const type = this.type || "no type";

  return type;
}
```

3. 用一个空格开始所有的注释，使它更容易阅读。

```js
// bad
//is current tab
const active = true;

// good
// is current tab
const active = true;

// bad
/**
 *make() returns a new element
 *based on the passed-in tag name
 */
function make(tag) {
  // ...

  return element;
}

// good
/**
 * make() returns a new element
 * based on the passed-in tag name
 */
function make(tag) {
  // ...

  return element;
}
```

4. 使用 // FIXME: 注释一个问题。

```js
class Calculator extends Abacus {
  constructor() {
    super();

    // FIXME: 这里不应该使用全局变量
    total = 0;
  }
}
```

5. 使用 // TODO: 注释解决问题的方法。

```js
class Calculator extends Abacus {
  constructor() {
    super();

    // TODO: total 应该由一个 param 的选项配置
    this.total = 0;
  }
}
```

### 空白

1. 使用 tabs (空格字符) 设置为 2 个空格。eslint: [indent](https://eslint.org/docs/rules/indent.html)

```js
// bad
function foo() {
∙∙∙∙let name;
}

// bad
function bar() {
∙let name;
}

// good
function baz() {
∙∙let name;
}
```

2. 在主体前放置一个空格。 eslint: [space-before-blocks](https://eslint.org/docs/rules/space-before-blocks.html)

```js
// bad
function test() {
  console.log("test");
}

// good
function test() {
  console.log("test");
}

// bad
dog.set("attr", {
  age: "1 year",
  breed: "Bernese Mountain Dog",
});

// good
dog.set("attr", {
  age: "1 year",
  breed: "Bernese Mountain Dog",
});
```

3. 在控制语句（if, while 等）开始括号之前放置一个空格。 在函数调用和是声明中，在参数列表和函数名之间没有空格eslint: [keyword-spacing](https://eslint.org/docs/rules/keyword-spacing.html)

```js
// bad
if (isJedi) {
  fight();
}

// good
if (isJedi) {
  fight();
}

// bad
function fight() {
  console.log("Swooosh!");
}

// good
function fight() {
  console.log("Swooosh!");
}
```

4. 用空格分离操作符。eslint: [space-infix-ops](https://eslint.org/docs/rules/space-infix-ops.html)

```js
// bad
const x = y + 5;

// good
const x = y + 5;
```

5. 使用单个换行符结束文件。eslint: [eol-last](https://github.com/eslint/eslint/blob/master/docs/rules/eol-last.md)

```js
// bad
import { es6 } from './AirbnbStyleGuide';
  // ...
export default es6;

// bad
import { es6 } from './AirbnbStyleGuide';
  // ...
export default es6;

// good
import { es6 } from './AirbnbStyleGuide';
  // ...
export default es6;
```

6. 在使用链式方法调用的时候使用缩进(超过两个方法链)。 使用一个引导点，强调该行是方法调用，而不是新的语句。eslint: [newline-per-chained-call](https://eslint.org/docs/rules/newline-per-chained-call) [no-whitespace-before-property](https://eslint.org/docs/rules/no-whitespace-before-property)

```js
// bad
$("#items").find(".selected").highlight().end().find(".open").updateCount();

// bad
$("#items").find(".selected").highlight().end().find(".open").updateCount();

// good
$("#items").find(".selected").highlight().end().find(".open").updateCount();

// bad
const leds = stage
  .selectAll(".led")
  .data(data)
  .enter()
  .append("svg:svg")
  .classed("led", true)
  .attr("width", (radius + margin) * 2)
  .append("svg:g")
  .attr("transform", `translate(${radius + margin},${radius + margin})`)
  .call(tron.led);

// good
const leds = stage
  .selectAll(".led")
  .data(data)
  .enter()
  .append("svg:svg")
  .classed("led", true)
  .attr("width", (radius + margin) * 2)
  .append("svg:g")
  .attr("transform", `translate(${radius + margin},${radius + margin})`)
  .call(tron.led);

// good
const leds = stage.selectAll(".led").data(data);
```

7. 在块和下一个语句之前留下一空白行。

```js
// bad
if (foo) {
  return bar;
}
return baz;

// good
if (foo) {
  return bar;
}

return baz;

// bad
const obj = {
  foo() {},
  bar() {},
};
return obj;

// good
const obj = {
  foo() {},

  bar() {},
};

return obj;

// bad
const arr = [function foo() {}, function bar() {}];
return arr;

// good
const arr = [function foo() {}, function bar() {}];

return arr;
```

8. 在花括号内添加空格。eslint: [object-curly-spacing](https://eslint.org/docs/rules/object-curly-spacing.html)

```js
// bad
const foo = { clark: "kent" };

// good
const foo = { clark: "kent" };
```

9. 避免让你的代码行超过 100 个字符（包括空格）。 注意：根据上边的 约束，长字符串可免除此规定，不应分解。eslint: [max-len](https://eslint.org/docs/rules/max-len.html)
   > 为什么? 这样能够确保可读性和可维护性。

```js
// bad
const foo =
  jsonData &&
  jsonData.foo &&
  jsonData.foo.bar &&
  jsonData.foo.bar.baz &&
  jsonData.foo.bar.baz.quux &&
  jsonData.foo.bar.baz.quux.xyzzy;

// bad
$.ajax({ method: "POST", url: "https://airbnb.com/", data: { name: "John" } })
  .done(() => console.log("Congratulations!"))
  .fail(() => console.log("You have failed this city."));

// good
const foo =
  jsonData &&
  jsonData.foo &&
  jsonData.foo.bar &&
  jsonData.foo.bar.baz &&
  jsonData.foo.bar.baz.quux &&
  jsonData.foo.bar.baz.quux.xyzzy;

// good
$.ajax({
  method: "POST",
  url: "https://airbnb.com/",
  data: { name: "John" },
})
  .done(() => console.log("Congratulations!"))
  .fail(() => console.log("You have failed this city."));
```

10. 要求打开的块标志和同一行上的标志拥有一致的间距。此规则还会在同一行关闭的块标记和前边的标记强制实施一致的间距。 eslint: [block-spacing](https://eslint.org/docs/rules/block-spacing)

```js
// bad
function foo() {
  return true;
}
if (foo) {
  bar = 0;
}

// good
function foo() {
  return true;
}
if (foo) {
  bar = 0;
}
```

11. 逗号之前避免使用空格，逗号之后需要使用空格。eslint: [comma-spacing](https://eslint.org/docs/rules/comma-spacing)

```js
// bad
var foo = 1,
  bar = 2;
var arr = [1, 2];

// good
var foo = 1,
  bar = 2;
var arr = [1, 2];
```

12. 在函数和它的调用之间强化间距。eslint: [func-call-spacing](https://eslint.org/docs/rules/func-call-spacing)

```js
// bad
func();

func();

// good
func();
```

13. 在对象的属性和值之间强化间距。 eslint: [key-spacing](https://eslint.org/docs/rules/key-spacing)

```js
// bad
var obj = { foo: 42 };
var obj2 = { foo: 42 };

// good
var obj = { foo: 42 };
```

### 分号

1. 分号 eslint: [semi](https://eslint.org/docs/rules/semi.html)
   > 为什么? 当 JavaScript 遇见一个没有分号的换行符时，它会使用一个叫做 Automatic Semicolon Insertion 的规则来确定是否应该以换行符视为语句的结束，并且如果认为如此，会在代码中断前插入一个分号到代码中。 但是，ASI 包含了一些奇怪的行为，如果 JavaScript 错误的解释了你的换行符，你的代码将会中断。 随着新特性成为 JavaScript 的一部分，这些规则将变得更加复杂。 明确地终止你的语句，并配置你的 linter 以捕获缺少的分号将有助于防止你遇到的问题。

```js
// bad - 可能异常
const luke = {};
const leia = {}[(luke, leia)].forEach((jedi) => (jedi.father = "vader"));

// bad - 可能异常
const reaction = "No! That's impossible!"(
  (async function meanwhileOnTheFalcon() {
    // handle `leia`, `lando`, `chewie`, `r2`, `c3p0`
    // ...
  })()
);

// bad - 返回 `undefined` 而不是下一行的值 - 当 `return` 单独一行的时候 ASI 总是会发生
function foo() {
  return;
  ("search your feelings, you know it to be foo");
}

// good
const luke = {};
const leia = {};
[luke, leia].forEach((jedi) => {
  jedi.father = "vader";
});

// good
const reaction = "No! That's impossible!";
(async function meanwhileOnTheFalcon() {
  // handle `leia`, `lando`, `chewie`, `r2`, `c3p0`
  // ...
})();

// good
function foo() {
  return "search your feelings, you know it to be foo";
}
```

### 类型转换和强制类型转换

1. 在语句开始前进行类型转换。

2. 字符类型 eslint: [no-new-wrappers](https://eslint.org/docs/rules/no-new-wrappers)

```js
// => this.reviewScore = 9;

// bad
const totalScore = new String(this.reviewScore); // typeof totalScore is "object" not "string"

// bad
const totalScore = this.reviewScore + ""; // invokes this.reviewScore.valueOf()

// bad
const totalScore = this.reviewScore.toString(); // isn’t guaranteed to return a string

// good
const totalScore = String(this.reviewScore);
```

3.  数字类型：使用 Number 进行类型铸造和 parseInt 总是通过一个基数来解析一个字符串。eslint: [radix](https://eslint.org/docs/rules/radix) [no-new-wrappers](https://eslint.org/docs/rules/no-new-wrappers)

```js
const inputValue = "4";

// bad
const val = new Number(inputValue);

// bad
const val = +inputValue;

// bad
const val = inputValue >> 0;

// bad
const val = parseInt(inputValue);

// good
const val = Number(inputValue);

// good
const val = parseInt(inputValue, 10);
```

4. 如果出于某种原因，你正在做一些疯狂的事情，而 parseInt 是你的瓶颈，并且出于 性能问题 需要使用位运算， 请写下注释，说明为什么这样做和你做了什么。

```js
// good
/**
 * parseInt 使我的代码变慢。
 * 位运算将一个字符串转换成数字更快。
 */
const val = inputValue >> 0;
```

5. 注意： 当你使用位运算的时候要小心。 数字总是被以 [64-bit](https://es5.github.io/#x4.3.19) 值 的形式表示，但是位运算总是返回一个 32-bit 的整数 [(来源)](https://es5.github.io/#x11.7)。 对于大于 32 位的整数值，位运算可能会导致意外行为。[讨论](https://github.com/airbnb/javascript/issues/109)。 最大的 32 位整数是： 2,147,483,647。

```js
2147483647 >> 0; // => 2147483647
2147483648 >> 0; // => -2147483648
2147483649 >> 0; // => -2147483647
```

6. 布尔类型

```js
const age = 0;

// bad
const hasAge = new Boolean(age);

// good
const hasAge = Boolean(age);

// best
const hasAge = !!age;
```

### 命名规范

1. 避免单字母的名字。用你的命名来描述功能。eslint: [id-length](https://eslint.org/docs/rules/id-length)

```js
// bad
function q() {
  // ...
}

// good
function query() {
  // ...
}
```

2. 在命名对象、函数和实例时使用驼峰命名法（camelCase）。eslint: [camelcase](https://eslint.org/docs/rules/camelcase.html)

```js
// bad
const OBJEcttsssss = {};
const this_is_my_object = {};
function c() {}

// good
const thisIsMyObject = {};
function thisIsMyFunction() {}
```

3. 只有在命名构造器或者类的时候才用帕斯卡拼命名法（PascalCase）。 eslint: [new-cap](https://eslint.org/docs/rules/new-cap.html)

```js
// bad
function user(options) {
  this.name = options.name;
}

const bad = new user({
  name: "nope",
});

// good
class User {
  constructor(options) {
    this.name = options.name;
  }
}

const good = new User({
  name: "yup",
});
```

4. 不要使用前置或者后置下划线。eslint: [no-underscore-dangle](https://eslint.org/docs/rules/no-underscore-dangle.html)
   > 为什么? JavaScript 在属性和方法方面没有隐私设置。 虽然前置的下划线是一种常见的惯例，意思是 “private” ，事实上，这些属性时公开的，因此，它们也是你公共 API 的一部分。 这种约定可能导致开发人员错误的认为更改不会被视为中断，或者不需要测试。建议：如果你想要什么东西是 “private” ， 那就一定不能有明显的表现。

```js
// bad
this.__firstName__ = "Panda";
this.firstName_ = "Panda";
this._firstName = "Panda";

// good
this.firstName = "Panda";

// 好，在 WeakMapx 可用的环境中
// see https://kangax.github.io/compat-table/es6/#test-WeakMap
const firstNames = new WeakMap();
firstNames.set(this, "Panda");
```

5. 不要保存 this 的引用。 使用箭头函数或者 [函数#bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)。

```js
// bad
function foo() {
  const self = this;
  return function () {
    console.log(self);
  };
}

// bad
function foo() {
  const that = this;
  return function () {
    console.log(that);
  };
}

// good
function foo() {
  return () => {
    console.log(this);
  };
}
```

6. 文件名应该和默认导出的名称完全匹配。

```js
// file 1 contents
class CheckBox {
  // ...
}
export default CheckBox;

// file 2 contents
export default function fortyTwo() { return 42; }

// file 3 contents
export default function insideDirectory() {}

// in some other file
// bad
import CheckBox from './checkBox'; // PascalCase import/export, camelCase filename
import FortyTwo from './FortyTwo'; // PascalCase import/filename, camelCase export
import InsideDirectory from './InsideDirectory'; // PascalCase import/filename, camelCase export

// bad
import CheckBox from './check_box'; // PascalCase import/export, snake_case filename
import forty_two from './forty_two'; // snake_case import/filename, camelCase export
import inside_directory from './inside_directory'; // snake_case import, camelCase export
import index from './inside_directory/index'; // requiring the index file explicitly
import insideDirectory from './insideDirectory/index'; // requiring the index file explicitly

// good
import CheckBox from './CheckBox'; // PascalCase export/import/filename
import fortyTwo from './fortyTwo'; // camelCase export/import/filename
import insideDirectory from './insideDirectory'; // camelCase export/import/directory name/implicit "index"
// ^ supports both insideDirectory.js and insideDirectory/index.js
```

7. 当你导出默认函数时使用驼峰命名法。 你的文件名应该和方法名相同。

```js
function makeStyleGuide() {
  // ...
}

export default makeStyleGuide;
```

8. 当你导出一个构造器 / 类 / 单例 / 函数库 / 暴露的对象时应该使用帕斯卡命名法。

```js
const AirbnbStyleGuide = {
  es6: {},
};

export default AirbnbStyleGuide;
```

9. 缩略词和缩写都必须是全部大写或者全部小写。
   > 为什么? 名字是为了可读性，不是为了满足计算机算法。

```js
// bad
import SmsContainer from "./containers/SmsContainer";

// bad
const HttpRequests = [
  // ...
];

// good
import SMSContainer from "./containers/SMSContainer";

// good
const HTTPRequests = [
  // ...
];

// also good
const httpRequests = [
  // ...
];

// best
import TextMessageContainer from "./containers/TextMessageContainer";

// best
const requests = [
  // ...
];
```

10. 你可以大写一个常量，如果它：（1）被导出，（2）使用 const 定义（不能被重新赋值），（3）程序员可以信任它（以及其嵌套的属性）是不变的。
    > 为什么? 这是一个可以帮助程序员确定变量是否会发生变化的辅助工具。UPPERCASE_VARIABLES 可以让程序员知道他们可以相信变量（及其属性）不会改变。

- 是否是对所有的 const 定义的变量？ - 这个是没有必要的，不应该在文件中使用大写。但是，它应该用于导出常量。
- 导出对象呢？ - 在顶级导出属性 (e.g. EXPORTED_OBJECT.key) 并且保持所有嵌套属性不变。

```js
// bad
const PRIVATE_VARIABLE = "should not be unnecessarily uppercased within a file";

// bad
export const THING_TO_BE_CHANGED = "should obviously not be uppercased";

// bad
export let REASSIGNABLE_VARIABLE = "do not use let with uppercase variables";

// ---

// 允许，但是不提供语义值
export const apiKey = "SOMEKEY";

// 多数情况下，很好
export const API_KEY = "SOMEKEY";

// ---

// bad - 不必要大写 key 没有增加语义值
export const MAPPING = {
  KEY: "value",
};

// good
export const MAPPING = {
  key: "value",
};
```
