# VW vs REM

## VW和REM相比的话VW更加灵活，而REM则兼容性更加好，其实还有一种方法其实早就支持了，即使在
> <meta name="viewport" content="width=xxxx">,但是这种方法的兼容行不行，同样都是adnroid的webkit内核，各个浏览器对他支持却不一致，有的支持，有的不支持。内核太大，需要阉割

那接下来我来对一VW和REM做一下解释，很简单的

## rem
先说一rem，也是一种相对尺寸，em是相对于父节点的，rem是相对于根结点的。em计算起来太麻烦，而rem因为参照物就只有一个，所以相对简单，据一个例子吧：

```
html {
  font-size: 16px
}

.nav {
  width: 2.5rem; //也就是40px
}
```

也就是说rem实际显示的大小是这样计算的
**与px的换算**
> actual size = rem x root_font_size 单位是px

这时候如果你需要做到自适应的话，就需要不断的指定根结点的font-size，这个就比较麻烦，首先我们需要给出一个屏幕组小宽度，之后所有的大小根据这个最小宽度来，只会变大.

> 这里有个只是点是，为什么大家都喜欢用16px作为根结点字体的大小，其实我找了很多资料，资料上说，因为许多浏览器的默认字体大小就是16px，我琢磨了一下，这个说法立不住脚，因为浏览器的默认字体大小是可以变的，每个厂商都可以自己设置，连用户都可以改动默认字体大小，那这样做的目的何在，其实很简单，浏览器对于字体的最小尺寸是有限制的，最小是12px，但是如果要找一个内被任何数整除的最小公约数，无疑就是16了。否则就会出现小数点后面n位，所以16是最适合的数字。

上代码
**html**
```
<head>
  <script>
    const standWidth = 320; // 默认开发的最小屏幕宽度，iphone4/5

    function setRootFontSize () {
      /**
       * 获得当前屏幕的宽度算出计算因子，然后和16进行计算，就可以动态改变各个屏幕下的尺寸。
       */
      const fector = document.documentElement.clientWidth / standWidth;
      console.log(fector)
      document.documentElement.style.fontSize = 16 * fector + 'px';
    }

    window.onresize = setRootFontSize;
    setRootFontSize();
  </script>
</head>
```

**sass**
```
/**
 * @parameter $factor default 16 其实16 17的都没有关系，你只要确认你自己在最小屏幕下换算的rem没有问题就可以了，16只是因为 16是4*4，可以除尽所有数字，这个比较方便
 */
@function setSize($width, $factor:16) {
  @return ($width / $factor) + rem;
}
```
详细示例请查看[1_rem](./1_rem/)，这里唯一比较烦的就是需要有一段js来动态设置html的字体，一般来说，在桌面应用中还需要加一个节流函数，以防止内核paint的过于频繁。你要知道，像整个html容器大小改变的情况，calucate，layout，paint的量是非常大的。

## vw
vw相对于rem就简单了许多，全写就是viewport width,是按照viewport宽度等比缩放的

**与px的换算**
`1vw = 1px/ viewport width`

上代码

**sass**
```
/** 只有sass部分
  * @param $factor number default 320 最小是按照320的屏幕宽度进行开发的，320是对应iphone4/5的宽度;
  */
@function setSize($width, $factor:320) {
  @return ($width / $factor * 100) + vw;
}

```
