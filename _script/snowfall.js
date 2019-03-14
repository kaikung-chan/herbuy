/*
 * Name: Snowfall Plugin
 * Author: Johnnson
 * Date: October, 2014
 * Dependency: jquery.transform2d.js
 * Effect: Let it Snow

 * each arguemnt described below:
 *   @el: snow images
 *   @size: image sizes
 *   @qty: qty of snowballs
 *   @range: snowfall speed ragne
 *   @final_x: snowballs fall to left or right range
 *   @scatter_on_init: choice of scatter display on init
 *   @path: image path
 *   @max_limit: max snowball allowed
 * 
 **/

(function($){
  $.Snowfall = function($this, options) {
    var defaults = {
      el: ['01.png', '02.png', '03.png', '04.png', '05.png', '06.png'],
      size: [15, 15],
      qty: 100,
      range: [2500, 8000], // speed
      final_x: 200,
      scatter_on_init: false, // scatterd display on init
      path: '_images/snow/',
      max_limit: 800
    },
    v = $.extend(true, defaults, options),
    el = v.el,
    size = v.size,
    qty = v.qty,
    range = v.range,
    final_x = v.final_x,
    scatter_on_init = v.scatter_on_init,
    path = v.path,
    max_limit = v.max_limit,
    rand_y = [100, 300],
    rand_sec = [20, 500],
    win_pos = {},
    c = {
      snowball: 'snowball'
    },
    count = 0,

    init = function() {
      var sec, init_y;
      // init win position
      win_pos = get_win_pos();
      // loop 
      for (var i = 0; i < qty; i++) {
        sec = get_rand(rand_sec[1]) + rand_sec[0];
        if (scatter_on_init) {
          setTimeout(
            function(i) { 
              return function() { 
                fall(i); 
              }; 
            }(i), i*sec); // delay exe time
        } else {
          init_y = -get_rand(rand_y[1]) - rand_y[0];
          setTimeout(
            function(i, init_y) { 
              return function() { 
                fall(i, init_y); 
              }; 
            }(i, init_y), i*sec);  // delay exe time
        }
      }
      // resize
      $(window).resize(function() {
        win_pos = get_win_pos();
        $('.'+c.snowball).each(function() {
          if ($(this).position().left > win_pos.w) {
            $(this).hide();
          } else {
            $(this).show();
          }
        });
      });
    },

    fall = function(i, pos) {
      var 
      n = get_rand(el.length), // image
      speed = get_rand(range[1]) + range[0],
      init_x = get_rand(win_pos.w),
      init_y = get_rand(win_pos.h),
      tween_x = get_rand(final_x),
      dir = (get_rand(2) == 0) ? -1 : 1,
      snowball = $('<img />').attr({'src': path + el[n], width: size[0], height: size[1]}),
      transforms = (pos == undefined) ? 'translate('+ dir * tween_x+ ','+ (win_pos.h - init_y)+''+'px'+')' : 'translate('+ dir * tween_x+ ','+ (win_pos.h - size[1]) +''+'px'+')';
      
      $('<div />', {id: i, 'class': c.snowball})
        .css({
          position: 'fixed', 
          zIndex: 112,
          top: function() { 
            return (pos == undefined) ? init_y - size[1] : pos;
          }, 
          left: init_x
        })
        .append(snowball)
        .animate({transform: transforms, opacity: 0}, speed, function() {
		  $(this).remove();
          if (count < max_limit) {
            var 
            init_y = -get_rand(rand_y[1]) - rand_y[0],
            sec = get_rand(rand_sec[1]) + rand_sec[0]*10;
            setTimeout(
              function(i, init_y) { 
                return function() { 
                  fall(i, init_y);
                }; 
              }(i, init_y), i*sec);  // delay exe time
              count++;
           }
         })
        .appendTo('body');
    },

    get_win_pos = function() {
      var 
      $win = $(window),
      w = $win.width() - final_x,
      h = $win.height();
      return {w: w, h: h};
    },

    get_rand = function(len) {
      var n;
      n = Math.floor(Math.random() * len);
      return n;
    };

    init();
  };

  $.fn.Snowfall = function(options) {
    if (this.data('Snowfall'))
      return;
    else {
      this.data('Snowfall', new $.Snowfall(this, options));
    }
    return this.data('Snowfall');
  };
})(jQuery);

