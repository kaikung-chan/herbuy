(function($) {
	$.Floater = function($this, options) {
		var _defaults = {

		},
		c = {
			target: 'target'
		},
		v = $.extend(_defaults, options),
		target,
		
		init = function() {
			target = get_target();
			set_scroll();
			set_resize();
		},

		get_target = function() {
			var offset = 70;
			target = $('.'+c.target).position().top + offset;
			return target;
		},

		set_resize = function() {
			$(window).resize(function() {
				target = get_target();
				set_scroll();
			});
		},

		set_scroll = function() {
			$(window).scroll(function() {
				if ($(this).scrollTop() >= target) {
					$this.stop().animate({opacity: 1}, 300).show();
				} else {
					$this.stop().animate({opacity: 0}, 30, function() {$(this).hide();});
				}
			});
		};

		init();
	}

	$.fn.Floater = function(options) {
		var $this = $(this);
		if ($this.data('Floater')) {
			return;
		} else {
			$this.data('Floater', new $.Floater($this, options));
		}
		return $this.data('Floater');
	}
})(jQuery);