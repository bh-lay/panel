/**
 * @author 作者:剧中人
 * @blog http://bh-lay.com/
 *  
 */
var panel = {};
var console = console||{'log':function(a){alert(a)}};

(function(exports){
	function show_dock(x,y,param,callback){
		var dock_html = dock_tpl.join('');
		var list_html = '';
		for(var i=0,total = param.length;i<total;i++){
			if(param[i]['disable']){
				list_html += '<span btn_name="' + (param[i]['name']||'') + '" href="javascript:;">' + (param[i]['txt']||'') + '</span>';
			}else{
				list_html += '<a btn_name="' + (param[i]['name']||'') + '" href="javascript:;">' + (param[i]['txt']||'') + '</a>';
			}
		}
		dock_html = dock_html.replace(/{-content-}/,list_html);
		var panel = $(dock_html);
		panel.css({left:x,top:y}).on('click','a',function(){
			panel.remove();
			callback($(this).attr('btn_name')||'');
		});
		$('body').append(panel);
	}
	
})(panel);


(function(){
	
	var menu_tpl = ['<div class="panel_menu">',
		'<ul class="pa_me_list">{-content-}</ul>',
	'</div>'];
	var dock_tpl = ['<div class="panel_dock">',
		'<div class="pa_do_body">{-content-}</div>',
	'</div>'];
	
	var panel = {};
	
	$(function(){
		//try to close panel
		var bingo_menu = false,
			bingo_dock = false;
		$('body').on('mousedown','.panel_menu',function(){
			bingo_menu = true ;
		}).on('mousedown','.panel_dock',function(){
			bingo_dock = true ;
		}).on('mousedown',function(){
			setTimeout(function(){
				if(!bingo_menu){
					$('.panel_menu').remove();
				}else{
					bingo_menu = false;
				}
				if(!bingo_dock){
					$('.panel_dock').remove();
				}else{
					bingo_dock = false;
				}
			},20);
		});
	});
	
	
	function show_menu(x,y,param,callback){
		var menu_html = menu_tpl.join('');
		var list_html = '';
		for(var i=0 in param){
			if(param[i]['disable']){
				list_html += '<li><span btn_name="' + ( i ||'') + '" href="javascript:;">' + (param[i]['txt']||'') + '</span></li>';
			}else{
				list_html += '<li><a btn_name="' + ( i ||'') + '" href="javascript:;">' + (param[i]['txt']||'') + '</a></li>';
			}
		}
		menu_html = menu_html.replace(/{-content-}/,list_html);
		var panel = $(menu_html);
		panel.css({left:x,top:y}).on('click','a',function(){
			panel.remove();
			callback($(this).attr('btn_name')||'');
		});
		$('body').append(panel);
	}
	
	function menu(param,callback){
		var param = param || ['参数有误'];
		show_menu(x,y,param,callback);
	}
	
	function dock(param,callback){
		var param = param || ['参数有误'];
		show_dock(x,y,param,callback);
	}
	$.fn.panel = function(args,callback){
		doms = $(this);
		doms.each(function(){
			var this_dom = $(this);
			
			this_dom.on('contextmenu',function(){
				return false;
			}).on('mousedown',function(e){
				if(e.button == 2){
				//if(e.button > 0){
					var x = e.clientX + 1,
						y = e.clientY + $('body').scrollTop() + 1;
					
					var this_panel = {
						'type' : 'menu',
						'list' : args,
					};
					setTimeout(function(){
						callback(this_panel,events);
					},30);
					
					function events(end_call){
						switch(this_panel.type){
							case 'menu':
								console.log(12)
								show_menu(x,y,this_panel.list,end_call);
							break
						}
					}
				}
			});
			
			console.dir(this);
		});
		return doms;
	}

})();




$(function(){
	var list = {
		'open' : {'txt':'打开'},
		'download' : {'txt':'下载'},
		'print' : {'txt':'云冲印'},
		'share' : {'txt':'分享','disable':true},
		'move' : {'txt':'移动到'},
		'copy' : {'txt':'复制到'},
		'rename' : {'txt':'重命名','disable':true},
		'delete' : {'txt':'删除'},
		'beautify' : {'txt':'美化'},
		'history' : {'txt':'历史版本'}
	};

	$('.pageInner div').panel(list,function(panel,events){
		panel.list.print['disable'] = true;
		events(function(name){
			console.log(name);
		});
		
	});
/*	$('.pageInner').on('panel','.testButton',function(e,panel){
		panel.menu(,function(name){
			console.log(name);
		});
	}).on('panel','.testButton2',function(e,panel){
		panel.dock([
			{'txt':'打开','name':'open'},
			{'txt':'复制到','name':'copy'},
			{'txt':'重命名','name':'rename','disable':true},
			{'txt':'删除','name':'delete'},
			{'txt':'美化','name':'beautify'}
		],function(name){
			console.log(name);
		});
	});
*/
});
