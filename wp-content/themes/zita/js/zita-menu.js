/* 
zita Responsive Menu script
----------------------------------------*/
(function ($){
    $.fn.zitaResponsiveMenu = function (options){
        //plugin's default options
        var defaults = {
            resizeWidth: '',
            animationSpeed: 'fast',
            accoridonExpAll: false
        };
        //Variables
        var options = $.extend(defaults, options),
            opt = options,
            $resizeWidth = opt.resizeWidth,
            $animationSpeed = opt.animationSpeed,
            $expandAll = opt.accoridonExpAll,
            $aceMenu = $(this),
            $menuStyle = $(this).attr('data-menu-style');
        //Initilizing        
        $aceMenu.find('ul').addClass("sub-menu");
        $aceMenu.find('ul.social-icon').removeClass("sub-menu");
        $aceMenu.find('ul').siblings('a').append('<span class="arrow"></span>');
        if ($menuStyle == 'accordion') {$(this).addClass('collapse');}
        //Window resize on menu breakpoint 
        if($(window).innerWidth()<= $resizeWidth){
        menuCollapse();
        }
        $(window).resize(function(){
            menuCollapse();
        $('body').removeClass('mobile-menu-active');
        $('body').removeClass('mobile-above-menu-active');
        $('body').removeClass('mobile-bottom-menu-active');
        });
        jQuery(window).click(function(){
             if (jQuery('body').hasClass('mobile-menu-active')){
             jQuery('body').removeClass('mobile-menu-active');
             }
             if (jQuery('body').hasClass('mobile-above-menu-active')){
             jQuery('body').removeClass('mobile-above-menu-active');
             }
             if (jQuery('body').hasClass('mobile-bottom-menu-active')){
             jQuery('body').removeClass('mobile-bottom-menu-active');
             }
          });
          // replace mobile-nav with your entire nav container
         jQuery('#menu-btn,#menu-btn-abv,#menu-btn-btm,.sider').click(function(e){
           e.stopPropagation();
         });
        // Menu Toggle
        function menuCollapse(){
            var w = $(window).innerWidth();
            if (w <= $resizeWidth){
                $aceMenu.find('li.menu-active').removeClass('menu-active');
                $aceMenu.find('ul.slide').removeClass('slide').removeAttr('style');
                $aceMenu.addClass('collapse hide-menu');
                $('.menu-toggle').show();
                }else{
                $aceMenu.attr('data-menu-style', $menuStyle);
                $aceMenu.removeClass('collapse hide-menu').removeAttr('style');
                $('.menu-toggle').hide();
                if ($aceMenu.attr('data-menu-style') == 'accordion'){
                    $aceMenu.addClass('collapse');
                    return;
                }
                $aceMenu.find('li.menu-active').removeClass('menu-active');
                $aceMenu.find('ul.slide').removeClass('slide').removeAttr('style');
            }
        }
        // Main function 
        return this.each(function (){
            // Function for Horizontal menu on mouseenter
            $aceMenu.on('mouseover', '> li a', function (){
                if ($aceMenu.hasClass('collapse') === true){
                    return false;
                }
                $(this).off('click', '> li a');
                $(this).parent('li').siblings().children('.sub-menu').stop(true, true).slideUp($animationSpeed).removeClass('slide').removeAttr('style').stop();
                $(this).parent().addClass('menu-active').children('.sub-menu').slideDown($animationSpeed).addClass('slide');
                return;
            });
            $aceMenu.on('mouseleave', 'li', function () {
                if ($aceMenu.hasClass('collapse') === true) {
                    return false;
                }
                $(this).off('click', '> li a');
                $(this).removeClass('menu-active');
                $(this).children('ul.sub-menu').stop(true, true).slideUp($animationSpeed).removeClass('slide').removeAttr('style');
                return;
            });
            //End of Horizontal menu function
            //Function for Vertical/Responsive Menu on mouse click
            $aceMenu.on('click', 'li span.arrow', function (e){
                 e.preventDefault();
                if ($aceMenu.hasClass('collapse')==false){
                   // return true;
                }
                $(this).off('mouseover', '> li a');
                if ($(this).parent().parent().hasClass('menu-active')){
                    $(this).parent().parent().children('.sub-menu').slideUp().removeClass('slide');
                    $(this).parent().parent().removeClass('menu-active');
                }else{ 
                    if ($expandAll == true){
                        $(this).parent().parent().addClass('menu-active').children('.sub-menu').slideDown($animationSpeed).addClass('slide');
                        return;
                    }
                }
            });
            //End of responsive menu function
        });
        //End of Main function
    }
})(jQuery);



