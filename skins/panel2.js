/**
 * @author 作者:剧中人
 * @blog http://bh-lay.com/
 *  
 */
var panel = {};
var console = console||{'log':function(a){alert(a)}};

(function(exports){
	var tpl = ['<div class="zlk_panel">',
		'<ul class="zlk_pa_list">{-content-}</ul>',
	'</div>'];
	
	//try to close panel
	$(function(){
		var bingo = false;
		$('body').on('mousedown','.zlk_panel',function(){
			bingo = true ;
		}).on('mousedown',function(){
			setTimeout(function(){
				if(!bingo){
					$('.zlk_panel').remove();
				}else{
					bingo = false;
				}
			},20);
		}).on('mousedown','div,a,span',function(e){
			if(e.button == 2){
				var x = e.clientX + 1,
					y = e.clientY + $('body').scrollTop() + 1;
				var that = $(this);
				
				that.trigger('panel',function(param,callback){
					var param = param || ['参数有误'];
					that.on('contextmenu',function(){
					  return false;
					});
					setTimeout(function(){
						show(x,y,param,callback);
					},40);
				});
			}
		});
	});
	
	function show(x,y,param,callback){
		var panel_html = tpl.join('');
		var list_html = '';
		for(var i=0,total=param.length;i<total;i++){
			if(param[i]['disable']){
				list_html += '<li><span btn_name="' + (param[i]['name']||'') + '" href="javascript:;">' + (param[i]['txt']||'') + '</span></li>';
			}else{
				list_html += '<li><a btn_name="' + (param[i]['name']||'') + '" href="javascript:;">' + (param[i]['txt']||'') + '</a></li>';
			}
		}
		panel_html = panel_html.replace(/{-content-}/,list_html);
		var panel = $(panel_html);
		panel.css({left:x,top:y}).on('click','a',function(){
			panel.remove();
			callback($(this).attr('btn_name')||'');
		});
		$('body').append(panel);
	}
	
})(panel);



$(function(){
	$('.pageInner').on('panel','.testButton',function(e,show){
		show([
			{'txt':'打开','name':'open'},
			{'txt':'下载','name':'download'},
			{'txt':'云冲印','name':'print'},
			{'txt':'分享','name':'share','disable':true},
			{'txt':'移动到','name':'move'},
			{'txt':'复制到','name':'copy'},
			{'txt':'重命名','name':'rename','disable':true},
			{'txt':'删除','name':'delete'},
			{'txt':'美化','name':'beautify'},
			{'txt':'历史版本','name':'history'}
		],function(name){
			console.log(name);
		});

	});

});
