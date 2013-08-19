/**
 * @author 作者:剧中人
 * @blog http://bh-lay.com/
 *  
 */
var panel = {};

(function(exports){
	var tpl = ['<div class="panel_menu">',
		'<ul class="pa_me_list">{-content-}</ul>',
	'</div>'];
	
	//try to close panel
	$(function(){
		var bingo = false;
		$('body').on('mousedown',function(){
			setTimeout(function(){
				if(!bingo){
					$('.panel_menu').remove();
				}else{
					bingo = false;
				}
			},20);
		}).on('mousedown','.panel_menu',function(){
			bingo = true ;
			console.log('123456')
		});
	});
	
	
	function show(x,y,param){
		var panel_html = tpl.join('');
		var list_html = '';
		for(var i=0,total=param.length;i<total;i++){
			list_html += '<li><a href="javascript:;">' + param[i]['txt'] + '</a></li>';
		}
		panel_html = panel_html.replace(/{-content-}/,list_html);
		var panel = $(panel_html);
		panel.css({left:x,top:y});
		$('body').append(panel);
	}
	
	exports.init = function(dom,param){
		
		dom.mousedown(function(e){
			if(e.button == 2){
				var x = e.clientX + 1,
					y = e.clientY + $('body').scrollTop() + 1;
				setTimeout(function(){
					show(x,y,param);
				},40);
			}
		});
		dom.on('contextmenu',function(){
		  return false;
		});
	}
})(panel);



$(function(){
	panel.init($('.testButton'),[
		{'txt':'打开'},
		{'txt':'下载'},
		{'txt':'云冲印'},
		{'txt':'分享'},
		{'txt':'移动到'},
		{'txt':'复制到'},
		{'txt':'重命名'},
		{'txt':'删除'},
		{'txt':'美化'},
		{'txt':'历史版本'}
	]);
	
});
