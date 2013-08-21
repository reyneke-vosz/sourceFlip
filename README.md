sourceFlip
==========

**sourceFlip - "Probably the best jQuery Responsive-Image Plugin in the world."**

SourceFlip is a light jQuery Plugin which automagically makes your images responsive.
Just define a few conditions, set your src-attributes and you're off!

Features
--------

- [x] Automatically flips image sources on different window-sizes!
- [x] Define your own conditions!
- [x] Define your own bunch of pics to flip!
- [x] Possibility to define after- and before-functions!
- [x] Flips your sources by resizing the browser-window (only if you want it)!
- [x] *Probably* brings peace to mother earth and *probably* makes the internet a better place!


Usage
-----

**1 Make sure you're using a valid html5-DOCTYPE and everything is fine with your source code**

**2 Also make sure that you have included jQuery 1.8 or higher**

You can directly include it via CDN if you want to

```html
    <script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js"></script>
```

**3 Include the script in your website**

```html
    <script type="text/javascript" src="/sourceflip/jquery.sourceflip.js"></script>
```

**4 Give your images additional sources by adding html5 "data"-attributes**

You definitely need the attributes "src" and "data-default"
Now feel free to define your own attributes each for your custom responsive steps - it's valid with html5!

```html
    <img src="default.jpg" alt="" data-default="default.jpg" data-mobile="mobile.jpg" data-tablet="tablet.jpg" data-desktop="desktop.jpg">
```

**5 Define the conditions and set some options**

```javascript

    /* No-frills Basic Usage */

    // Set up your conditions
    var sfConditions = [
        { "maxWidth" : 480, "attr" : "data-mobile" },
        { "minWidth" : 481, "maxWidth" : 768, "attr" : "data-tablet" },
        { "minWidth" : 769, "attr" : "data-desktop" }
    ];

    // Define your options
    var sfOptions = {
        'onLoad'    : true,
        'onResize'  : true
    };

    // Initialize
    jQuery.sourceFlip(sfConditions, sfOptions);
```

**6 (Advanced) Give it some extra juice!**

```javascript

    /* Full usage with custom settings */

    // Set up your conditions
    var sfConditions = [
        { "maxWidth" : 480, "attr" : "data-mobile" },
        { "minWidth" : 481, "maxWidth" : 768, "attr" : "data-tablet" },
        { "minWidth" : 769, "attr" : "data-desktop" }
    ];

    // Define your options
    var sfOptions = {
        'afterFlip' : function(){ alert('after'); },
        'beforeFlip' : function(){ alert('before'); },
        'container' : $(window),
        'defaultAttr' : 'data-default',
        'onLoad'    : true,
        'onResize'  : true,
        'resizeSensitivity' : 250
    };


    // Now initialize on all images of you website
    jQuery.sourceFlip(sfConditions, sfOptions);

    // or initialize on specific images
    jQuery('#container img').sourceFlip(sfConditions, sfOptions);
    jQuery('img.sourceflip').sourceFlip(sfConditions, sfOptions);
```

**That's it! Any questions? No? Great.**


Additional Info
---------------

Erm.. if you have some questions, here's some additional info:

**What's this conditions-thing? What's sourceFlip doing exactly?**

1. sourceFlip compares the size of the browser-window (or a custom container) with the specified conditions.
2. It checks all your images (or some specified images) for the custom source attribute of the active condition.
3. The value of the custom source attribute will be taken as new image source.


**How about the behavior of conditions?**

* sourceFlip will only flip sources, if one (or more) of the conditions are true and the defined source-attribute of the condition is existing
* if more than one condition is true, the first true condition will be taken (you should prevent that :)). The order of your condition array is important.


If you do have any more questions, give me a buzz here: https://github.com/pixelkrieg/sourceFlip/issues


Options
-------

Usage | Option | Possible values | Default | Description
--- | --- | --- | --- | ---
*required* | onLoad | bool | true | Will images be flipped on site-load?
*required* | onResize | bool | false | Will images be flipped on browser window resize? (will also work on rotation of mobile/tablet-devices)
*optional* | afterFlip | function or false | false | Function which is called after flipping
*optional* | beforeFlip | function or false | false | Function which is called before flipping
*optional* | container | object or string | $(window) | The width of this element will be compared with the conditions - you can use $('#container') or '#container'
*optional* | defaultAttr | string | data-default | If all conditions are failing or something else went terribly wrong the image of this attribute will be taken
*optional* | resizeSensitivity | int | 100 | Flip images if resize stops for this amount of milliseconds