/*
Template Name: Material Pro Admin
Author: Themedesigner
Email: niravjoshi87@gmail.com
File: js
*/


$(function () {
    "use strict";
    $(function () {
        $(".preloader").fadeOut();
    });
    jQuery(document).on('click', '.mega-dropdown', function (e) {
        e.stopPropagation()
    });


    
        /* ---------------------------------------------- /*
         * Scroll top
         /* ---------------------------------------------- */

        $(window).scroll(function() {
            if ($(this).scrollTop() > 100) {
                $('.scroll-up').fadeIn();
            } else {
                $('.scroll-up').fadeOut();
            }
        });

        $('a[href="#totop"]').click(function() {
            $('html, body').animate({ scrollTop: 0 }, 'slow');
            return false;
        });


    
    // ============================================================== 
    // This is for the top header part and sidebar part
    // ==============================================================  
    var set = function () {
            var width = (window.innerWidth > 0) ? window.innerWidth : this.screen.width;
            var topOffset = 70;
            if (width < 1170) {
                $("body").addClass("mini-sidebar");
                $('.navbar-brand span').hide();
                $(".scroll-sidebar, .slimScrollDiv").css("overflow-x", "visible").parent().css("overflow", "visible");
                $(".sidebartoggler i").addClass("ti-menu");
            }
            else {
                $("body").removeClass("mini-sidebar");
                $('.navbar-brand span').show();
                //$(".sidebartoggler i").removeClass("ti-menu");
            }
            
            var height = ((window.innerHeight > 0) ? window.innerHeight : this.screen.height) - 1;
            height = height - topOffset;
            if (height < 1) height = 1;
            if (height > topOffset) {
                $(".page-wrapper").css("min-height", (height) + "px");
            }
       
    };
  /*  $(window).ready(function());
    $(window).on("resize", set);*/
    // ============================================================== 
    // Theme options
    // ==============================================================     
    


    // topbar stickey on scroll
    
   // $(".fix-header .topbar").stick_in_parent({});
    
    
    
    $(".sidebartoggler").on('click', function () {
        //$(".sidebartoggler i").toggleClass("ti-menu");
    }); 
    
    // ============================================================== 
    // Right sidebar options
    // ============================================================== 
    $(".right-side-toggle").click(function () {
        $(".right-sidebar").slideDown(50);
        $(".right-sidebar").toggleClass("shw-rside");
    });

    $('.floating-labels .form-control').on('focus blur', function (e) {
        $(this).parents('.form-group').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
    }).trigger('blur');

    // ============================================================== 
    // Auto select left navbar
    // ============================================================== 
    $(function () {
        var url = window.location;
        var element = $('ul#sidebarnav a').filter(function () {
            return this.href == url;
        }).addClass('active').parent().addClass('active');
        while (true) {
            if (element.is('li')) {
                element = element.parent().addClass('in').parent().addClass('active');
            }
            else {
                break;
            }
        }
        
    });
    // ============================================================== 
    //tooltip
    // ============================================================== 
    $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        })
    // ============================================================== 
    //Popover
    // ============================================================== 
    $(function () {

            $(document).on("click", ".profile-tab .nav-item", function(e){
                $(".profile-tab .nav-item").removeClass('active')
            })
             

            // this is for close icon when navigation open in mobile view
            $(document).on("click", ".nav-toggler", function () {
                $("body").toggleClass("show-sidebar");
                $(".nav-toggler i").toggleClass("ti-menu");
                $(".nav-toggler i").addClass("ti-close");
            });

             $(document).on('show.bs.modal', '.modal-append-to-body', function(){
                $(this).appendTo("body");
             })

             $(document).on('shown.bs.modal', '.topmost-modal', function(){
               
               /*
               ** Set last .backdrop's z-index 50 points higher than second last .backdrop
               */
                let l = $(".modal-backdrop").length;
                if (l > 1) {
                    $(".modal-backdrop").eq(l-1).css("z-index", (parseInt($(".modal-backdrop").eq(l-2).css("z-index")) + 40) )
                }
             })

            $(document).on("mouseover", ".image-popup-vertical-fit", function(){

                $('.image-popup-vertical-fit').magnificPopup({
                    type: 'image',
                    closeOnContentClick: true,
                    mainClass: 'mfp-img-mobile',
                    image: {
                        verticalFit: true
                    }
                });
            })
            
            $(document).on("mouseover", ".answer-content-wrap img, .img-zoom-enable", function(){

                initMagnificPopup($(this))
            })

            function initMagnificPopup (ele) {
            	let src = ele.attr('src')

               ele.magnificPopup({
                    type: 'image',
                    items: {
                        src: src
                    },
                    closeOnContentClick: true,
                    mainClass: 'mfp-img-mobile',
                    image: {
                        verticalFit: true
                    },
                    callbacks: {
    open: function() {
      $.magnificPopup.instance.close = function() {
        // Do whatever else you need to do here
        ele.removeData('magnificPopup')

        // Call the original close method to close the popup
        $.magnificPopup.proto.close.call(this);
      };
    }
  }
                });
            }

            $(document).on("click", ".search-box a, .search-box .app-search .srh-btn", function () {
                $(".app-search").toggle(200);
                $(".app-search").find('input:first').focus()
            });

            $(document).on("click", ".sidebartoggler", function () {
                if ($("body").hasClass("mini-sidebar")) {
                    $("body").trigger("resize");
                    $(".scroll-sidebar, .slimScrollDiv").css("overflow", "hidden").parent().css("overflow", "visible");
                    $("body").removeClass("mini-sidebar");
                    $('.navbar-brand span').show();
                    //$(".sidebartoggler i").addClass("ti-menu");
                }
                else {
                    $("body").trigger("resize");
                    $(".scroll-sidebar, .slimScrollDiv").css("overflow-x", "visible").parent().css("overflow", "visible");
                    $("body").addClass("mini-sidebar");
                    $('.navbar-brand span').hide();
                    //$(".sidebartoggler i").removeClass("ti-menu");
                }
            });

             $(document).on("mouseover",'[data-toggle-tooltip="tooltip"]', function(){
                $(this).tooltip('show')
             });
           
              $(document).on("mouseover",'[data-toggle="popover"]', function(){
               var atr = "done-tip";

                 $(this).popover();

                 return;

               var attr = $(this).attr(atr);

               if (typeof attr !== typeof undefined && attr !== false) {


               }

               else {
                     $(this).popover();
                     $(this).attr(atr, "true");

               }


                
            });
        })

    $('body').on('click', function (e) {
        $('[data-toggle=popover]').each(function () {
            // hide any open popovers when the anywhere else in the body is clicked
            if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                $(this).popover('hide');
            }
        });
    });
   /*
    // ============================================================== 
    // Sidebarmenu
    // ============================================================== 
    $(function () {
        $('#sidebarnav').metisMenu();
    });
    // ============================================================== 
    // Slimscrollbars
    // ============================================================== 
    /*$('.scroll-sidebar').slimScroll({
        position: 'left'
        , size: "5px"
        , height: '100%'
        , color: '#dcdcdc'
     });
    $('.message-center').slimScroll({
        position: 'right'
        , size: "5px"
        
        , color: '#dcdcdc'
     });
    
    
    $('.aboutscroll').slimScroll({
        position: 'right'
        , size: "5px"
        , height: '80'
        , color: '#dcdcdc'
     });
    $('.message-scroll').slimScroll({
        position: 'right'
        , size: "5px"
        , height: '570'
        , color: '#dcdcdc'
     });
    $('.chat-box').slimScroll({
        position: 'right'
        , size: "5px"
        , height: '470'
        , color: '#dcdcdc'
     });
    
    $('.slimscrollright').slimScroll({
        height: '100%'
        , position: 'right'
        , size: "5px"
        , color: '#dcdcdc'
     });
*/
    // ============================================================== 
    // Resize all elements
    // ============================================================== 
    $("body").trigger("resize");
    // ============================================================== 
    // To do list
    // ============================================================== 
    $(".list-task li label").click(function () {
        $(this).toggleClass("task-done");
    });
    
    // ============================================================== 
    // Login and Recover Password 
    // ============================================================== 
    $('#to-recover').on("click", function () {
        $("#loginform").slideUp();
        $("#recoverform").fadeIn();
    });

    // ============================================================== 
    // Collapsable cards
    // ==============================================================
        $('a[data-action="collapse"]').on('click',function(e){
            e.preventDefault();
            $(this).closest('.card').find('[data-action="collapse"] i').toggleClass('ti-minus ti-plus');
            $(this).closest('.card').children('.card-body').collapse('toggle');
           
        }); 
        // Toggle fullscreen
        $('a[data-action="expand"]').on('click',function(e){
            e.preventDefault();
            $(this).closest('.card').find('[data-action="expand"] i').toggleClass('mdi-arrow-expand mdi-arrow-compress');
            $(this).closest('.card').toggleClass('card-fullscreen');
        });

        // Close Card
        $('a[data-action="close"]').on('click',function(){
            $(this).closest('.card').removeClass().slideUp('fast');
        });
    // ============================================================== 
    // This is for the sparkline charts which is coming in the bradcrumb section
    // ==============================================================
   
   /* $('#monthchart').sparkline([5, 6, 2, 9, 4, 7, 10, 12], {
            type: 'bar',
            height: '35',
            barWidth: '4',
            resize: true,
            barSpacing: '4',
            barColor: '#1e88e5'
        });
    $('#lastmonthchart').sparkline([5, 6, 2, 9, 4, 7, 10, 12], {
            type: 'bar',
            height: '35',
            barWidth: '4',
            resize: true,
            barSpacing: '4',
            barColor: '#7460ee'
        });
    var sparkResize;
 
        // Switchery
        var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));*/
           
    
});