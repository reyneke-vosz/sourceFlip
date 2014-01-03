/**
 * sourceFlip
 * Version: 1.1.0
 * Description: Probably the best jQuery Responsive-Image Plugin in the world
 * Requires: jQuery 1.8+
 * Author: Christoph Stäblein (http://www.pixelkrieg.net)
 * License: WTFPL - http://www.wtfpl.net/about/
 */

;(function($, document, window, undefined) {

    "use strict";

    // Pass $.sourceFlip() to Main-Function
    $.sourceFlip = function(conditions, options) {
        return $.fn.sourceFlip(conditions, options);
    }


    // Main-Function
    $.fn.sourceFlip = function(conditions, options) {

        // Build main options before element iteration
        var options = $.extend({}, $.fn.sourceFlip.defaults, options);

        if (options.onResize || options.onLoad) {

            var selector = this.selector;
            if (!selector ) {
                selector = 'img';
            }
            var attr = $.fn.sourceFlip.getAttribute(conditions, options);

            if (selector != "" && attr != "") {

                if (options.onLoad && $(selector).size() > 0) {
                    // Flip that goddamn image, mofo!
                    $.fn.sourceFlip.flipIt(selector, attr, options, conditions);
                }

                if (options.onResize && $(selector).size() > 0) {

                    // Flip images when resize stops
                    var timer; var timerSensitivity = options.resizeSensitivity;
                    $(window).bind('resize', function(){
                        timer && clearTimeout(timer);
                        timer = setTimeout(function(){
                            options.onLoad = true;
                            options.onResize = false;
                            $(selector).sourceFlip(conditions, options);
                        }, options.resizeSensitivity);
                    });

                    /*
                    // Flip images in interval until resize stops
                    var timer; var timerSensitivity = options.resizeSensitivity + 20;
                    var loop; var loopSensitivity = options.resizeSensitivity;
                    $(window).bind('resize', function(){
                        if (loop == undefined) {
                            loop = setInterval(function(){
                            options.onLoad = true;
                            options.onResize = false;
                            $(selector).sourceFlip(conditions, options);
                            }, loopSensitivity);
                        }
                        timer && clearTimeout(timer);
                        timer = setTimeout(function(){ clearInterval(loop); var loop; }, timerSensitivity);
                    });
                    */
                }
                return true;
            }
        }
        return false;
    }


    // Flip Images
    $.fn.sourceFlip.flipIt = function(selector, attr, options, conditions) {

        if (selector != "" && attr != "") {

            // beforeFunction
            if ($.isFunction(options.beforeFlip)) {
                options.beforeFlip(selector, attr, options, conditions);
            }

            var amount = $(selector).size() - 1;

            $(selector).each(function(i){
                var newValue = $(this).attr(attr);
                var actSrc = $(this).attr('src');

                if (newValue != "" && actSrc !== undefined) {
                    $(this).attr('src', newValue);
                }

                // afterFunction
                if (i == amount) {
                    if ($.isFunction(options.afterFlip)) {
                        options.afterFlip(selector, attr, options, conditions);
                    }
                }
            });
            return true;
        }
        return false;
    }


    // Matches the screen-width with the conditions to get the necessary attribute
    $.fn.sourceFlip.getAttribute = function(conditions, options) {

        var container = false;
        if (jQuery.type(options.container) == 'string') {
            if (options.container != '') {
                container = jQuery(options.container);
            }
        }
        if (jQuery.type(options.container) == 'object') {
            container = options.container;
        }
        if (jQuery.type(container) == 'object') {

            var flipAttr = options.defaultAttr;

            if (container.prop("tagName") == undefined) {
                var width = $.fn.sourceFlip.getViewportWidth();
            } else {
                var width = container.width();
            }

            if (jQuery.isArray(conditions)) {

                // Check conditions for the essential source-attribute
                for (var i=0;i < conditions.length; i++) {

                    // Attribute must be set
                    var attr = conditions[i].attr;
                    if (attr != "") {

                        var min = parseInt(conditions[i].minWidth);
                        var max = parseInt(conditions[i].maxWidth);

                        // Minimum one condition - min or max
                        if (min > 0 || max > 0) {

                            var valid = false;

                            if (min > 0 && max > 0) {
                                // Check both condition-values if set
                                if (width >= min && width <= max) {
                                    valid = true;
                                }
                            } else {
                                // Check single condition-value
                                if (min > 0) {
                                    if (width >= min) {
                                        valid = true;
                                    }
                                }
                                if (max > 0) {
                                    if (width <= max) {
                                        valid = true;
                                    }
                                }
                            }
                            // if this condition is correct, set attr
                            if (valid) {
                                flipAttr = attr;
                            }
                        }
                    }
                }
            }
        }
        return flipAttr;
    }

    $.fn.sourceFlip.getViewportWidth = function() {
        var e = window, a = 'inner';
        if (!('innerWidth' in window )) {
            a = 'client';
            e = document.documentElement || document.body;
        }
        // return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
        return e[ a+'Width' ];
    }

    // Default settings
    $.fn.sourceFlip.defaults = {
        'afterFlip' : false,
        'beforeFlip' : false,
        'container' : $(window),
        'defaultAttr' : 'data-default',
        'onLoad'    : true,
        'onResize'  : false,
        'resizeSensitivity' : 100
    }

})(jQuery, document, window);