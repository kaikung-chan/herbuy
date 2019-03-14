// 滑鼠移上去換圖
$(function(){
	$('img[hover_img]').live({
		mouseenter : function(){
			var $this = $(this);
			if(typeof($this.attr('link_img')) == 'undefined')$this.attr('link_img',$this.attr('src'));
			$this.attr('src',$this.attr('hover_img'));
		},
		mouseleave : function(){
			var $this = $(this);
			if(!$this.hasClass('current'))$this.attr('src',$this.attr('link_img'));
		}
	});
});