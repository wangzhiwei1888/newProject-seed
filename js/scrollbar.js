
(function($){

	$.fn.scrollBar = function(options){

		var defaults = {
			
			content:"wzw_scroll_content",
			btn:'wzw_Scroll_btn',
			bar:'wzw_Scroll_bar',
			dis:120,
			hover:true,
			callback:function(){}

		};

		var scrollBar = $.extend(defaults, options);

		var $this = $(this);
		if($this.find('.'+scrollBar.btn).length==0)
		{
			$(this).append('<div class='+scrollBar.btn+'><div class='+scrollBar.bar+'></div></div>');
		}
		
		scrollBar.myAddEvent = function (obj, sEv, fn)
		{
			if(obj.attachEvent)
			{
				obj.attachEvent('on'+sEv, fn);
			}
			else
			{
				obj.addEventListener(sEv, fn, false);
			}
		}


		scrollBar.fnMouseScroll = function(ev)
		{
			var oEvent=ev||event;
			var bDown=true;
			
			bDown=oEvent.wheelDelta?oEvent.wheelDelta<0:oEvent.detail>0;
			
			var t=bar[0].offsetTop;
			
			if(bDown)
			{
				t+=scrollBar.dis;
			}
			else
			{
				t-=scrollBar.dis;
			}
			
			setTop(t);
			
			if(oEvent.preventDefault)
			{
				oEvent.preventDefault();
			}
			
			return false;
		}

		var setTop = function(t)
		{
			if(t<0)
			{
				t=0;
			}
			else if(t>btn.height()-bar.height())
			{
				t=btn.height()-bar.height();
			}
			

			bar.stop().animate({top:t},{duration: 500, easing: "easeOutCirc"});
			var scale=t/(btn.height()-bar.height());

			var t2 = -scale*(content.height()-$this.height());
			content.stop().animate({top:t2},{duration: 500, easing: "easeOutCirc"});

			if(scale==1)
			{
				scrollBar.callback();
			}

		}


		var content = $this.find('.'+scrollBar.content);
		var thisHeight = $(this).height();
		var conHeight = content.height();
		var bar = $this.find("."+scrollBar.bar);
		var btn = $this.find("."+scrollBar.btn);

		var barHeight = parseInt((thisHeight/conHeight)*100) + '%';

		bar.css("height",barHeight);


		if(conHeight>thisHeight)
		{
			
			scrollBar.myAddEvent(content[0], 'mousewheel', scrollBar.fnMouseScroll);
			scrollBar.myAddEvent(content[0], 'DOMMouseScroll', scrollBar.fnMouseScroll);

			bar[0].onmousedown=function (ev)
			{
				var oEvent=ev||event;
				
				var disY=oEvent.clientY-bar[0].offsetTop;
				
				document.onmousemove=function (ev)
				{
					var oEvent=ev||event;
					var t=oEvent.clientY-disY;
					
					setTop(t);
				};
				
				document.onmouseup=function ()
				{
					document.onmousemove=null;
					document.onmouseup=null;
				};
			};

			if(scrollBar.hover)
			{
				btn.hide();
				$(this).on("mouseenter",function(){

					btn.fadeIn();
				})
				$(this).on("mouseleave",function(){

					btn.fadeOut();
				})	
			}
			

		}

		return this;

	}

})(jQuery)
