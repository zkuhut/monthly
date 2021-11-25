# 代码规范

## HTML 规范-代码规范

### DOCTYPE 设置

文档类型统一使用 html5 的 doctype:

```html
<!DOCTYPE html>
```

### 页面编码

编码默认使用 UTF-8GBK,特定情况下有指定要求也可以是 GBK

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

```
<!--Comment Text-->
```

错误写法:

```
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
.jdc {
  display: block;
  width: 50px;
}
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
.jdc {
}
.jdc li {
}
.jdc li p {
}

/* 不推荐 */
* {
}
#jdc {
}
.jdc div {
}
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
  box-shadow: 1px 1px 1px #333, 2px 2px 2px #ccc;
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

| about |	关于 |
| --- | ---- |
account|	账户
arrow	|箭头图标
article	|文章
aside	|边栏
audio	|音频
avatar|	头像
bg,background	|背景
bar	|栏（工具类）
branding|	品牌化
crumb,breadcrumbs|	面包屑
btn,button|	按钮
caption|	标题，说明
category|	分类
chart|	图表
clearfix|	清除浮动
close|	关闭
col,column|	列
comment|	评论
community|	社区
container|	容器
content|	内容
copyright|	版权
current|	当前态，选中态
default|	默认
description|	描述
details|	细节
disabled|	不可用
entry|	文章，博文
error|	错误
even|	偶数，常用于多行列表或表格中
fail|	失败（提示）
feature|	专题
fewer|	收起
field|	用于表单的输入区域
figure|	图
filter|	筛选
first|	第一个，常用于列表中
footer|	页脚
forum|	论坛
gallery|	画廊
group|	模块，清除浮动
header|	页头
help|	帮助
hide|	隐藏
hightlight|	高亮
home|	主页
icon|	图标
info,information|	信息
last|	最后一个，常用于列表中
links|	链接
login|	登录
logout|	退出
logo|	标志
main|	主体
menu|	菜单
meta|	作者、更新时间等信息栏，一般位于标题之下
module|	模块
more|	更多（展开）
msg,message|	消息
nav,navigation|	导航
next|	下一页
nub	|小块
odd	|奇数，常用于多行列表或表格中
off	|鼠标离开
on	|鼠标移过
output	|输出
pagination	|分页
pop,popup	|弹窗
preview	|预览
previous	|上一页
primary	|主要
progress	|进度条
promotion	|促销
rcommd,recommendations	|推荐
reg,register|	注册
save|	保存
search	|搜索
secondary	|次要
section	|区块
selected|	已选
share|	分享
show|	显示
sidebar|	边栏，侧栏
slide|	幻灯片，图片切换
sort|	排序
sub	|次级的，子级的
submit	|提交
subscribe|	订阅
subtitle|	副标题
success	|成功（提示）
summary	|摘要
tab	|标签页
table|	表格
txt,text|	文本
thumbnail|	缩略图
time|	时间
tips	|提示
title|	标题
video|	视频
wrap|	容器，包，一般用于最外层
wrapper|	容器，包，一般用于最外层

