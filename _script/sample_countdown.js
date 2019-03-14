// NARUKO 倒數功能
(function($){
	$.sample_countdown =function($this, settings){
		var _defaultSettings = {
			src : 'images/countdown/',
			number : ['0.jpg','1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg','7.jpg','8.jpg','9.jpg'],
			head : 'space.gif',
			day : 'day.jpg',
			hour : 'hr.jpg',
			minute : 'min.jpg',
			second : 'sec.jpg',
			width : 326,
			height : 42,
			callback: function() {}
		};
		var v, init, img_html, body_html,
		counttime = 0;
		if(typeof(settings) == 'number'){
			v = _defaultSettings;
			counttime = settings;
		}else{
			v = $.extend(_defaultSettings, settings);
			counttime = v.counttime;
		}
		init = function(){
			var i, t;
			$this.width(v.width).height(v.height);
			for(i=0;i<10;i++){
				t = new Image();
				t.src = v.src + v.number[i];
			}
			counting();
		}
		img_html = function(n){
			var img;
			switch(n){
				case 'head':
					img = v.src + v.head;
				break;
				case 'd':
					img = v.src + v.day;
				break;
				case 'h':
					img = v.src + v.hour;
				break;
				case 'm':
					img = v.src + v.minute;
				break;
				case 's':
					img = v.src + v.second;
				break;
				default:
					if(!isNaN(n) && n >= 0 && n <=9){
						img = v.src + v.number[n];
					}
				break;
			}
			return '<img src="' + img + '" alt="' + n + '" />';
		}
		body_html = function(ary){
			var tmp = img_html('head') + 
								img_html(ary[0]) + img_html(ary[1]) + img_html('d') + 
								img_html(ary[2]) + img_html(ary[3]) + img_html('h') + 
								img_html(ary[4]) + img_html(ary[5]) + img_html('m') + 
								img_html(ary[6]) + img_html(ary[7]) + img_html('s');
			return tmp;
		}
		get_timer = function(time){
			var s,m,h,d,tmp,ary = [];
			s = time % 60;
			tmp = (time - s) / 60;
			m = tmp % 60;
			tmp = (tmp - m) / 60;
			h = tmp % 24;
			d = (tmp - h) /24;
			ary.push(Math.floor(d/10));
			ary.push(d%10);
			ary.push(Math.floor(h/10));
			ary.push(h%10);
			ary.push(Math.floor(m/10));
			ary.push(m%10);
			ary.push(Math.floor(s/10));
			ary.push(s%10);
			return ary;
		}
		counting = function(){
			$this.html(body_html(get_timer(counttime)));
			counttime--;
			if(counttime < 0){
				v.callback();
			}else{
				setTimeout(counting,1000);
			}
		}
		init();
	}
	$.fn.sample_countdown = function(setting){
		var $this = $(this);
		if($this.data('sample_countdown')){
			return ;
		}else{
			$this.data('sample_countdown', new $.sample_countdown($this, setting));
		}
		return $this.data('sample_countdown');
	}
})(jQuery)