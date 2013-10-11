/**
 * @author 作者:剧中人
 * panel
 * the right key of mouse
 *
 */
///////////////////////////////////////////////////////////
/** DEMO
	//创建一个右键菜单绑定
	var o = panel($('.testButton'), {
		'open' : {'txt' : '打开'},
		'rename' : {'txt' : '重命名','disable' : true},
		'delete' : {'txt' : '删除'},
	},function(name) {
		console.log('you have chioce "' , name , '" from the [ ' , this , ']');
	});
	
	//指定类型
	o.type = 'menu';//@param:'menu','dock'
	//选项置灰
	o.disable('share');
	//选项恢复
	o.disable('share',false);
	//增删菜单条目
	o.addList('test',{'txt':'测试'},function(){
		alert(12)
	});
	o.removeList('copy');
	
*/////////////////////////////////////////////////////////


var panel = panel||function(doms,args,callback){
	return new panel.init(doms,args,callback);
};

(function(exports) {

	var menu_tpl = ['<div class="panel_menu"><ul class="pa_me_list">{-content-}</ul></div>'];
	var dock_tpl = ['<div class="panel_dock"><div class="pa_do_body">{-content-}</div></div>'];
	var style_tpl = ['<style type="text/css">',
		'.panel_menu{position: absolute;z-index :10000;width:140px;background:#fff;border:1px solid #444;border-radius:4px;box-shadow:1px 1px 40px #000;}',
		'.pa_me_list{padding:4px 0px;}',
		'.pa_me_list {line-height:20px;}',
		'.pa_me_list span,',
		'.pa_me_list a{line-height:20px;display:block;font-size:12px;color:#aaa;text-indent:2em;padding: 2px 5px;}',
		'.pa_me_list span{cursor: default;}',
		'.pa_me_list a{color:#444;}',
		'.pa_me_list a:hover{color:#000;background:#eee;}',
		'.panel_dock{position: absolute;z-index :10000;background:#444;border-radius:4px;box-shadow:1px 1px 40px #000;_border:1px solid #666;}',
		'.pa_do_body{padding:0px 10px;}',
		'.panel_dock span,',
		'.panel_dock a{line-height:32px;display:inline-block;font-size:12px;color:#888;padding: 0px 10px;}',
		'.panel_dock span{cursor: default;}',
		'.panel_dock a{color:#f4f4f4;}',
		'.panel_dock a:hover{color:#222;background:#eee;}',
	'</style>']

	var panel = {};
	$(function(){
		$('head').append(style_tpl.join(''));
		//try to close panel
		var bingo_menu = false, bingo_dock = false;
		$('body').on('mousedown', '.panel_menu', function() {
			bingo_menu = true;
		}).on('mousedown', '.panel_dock', function() {
			bingo_dock = true;
		}).on('mousedown', function() {
			setTimeout(function() {
				if (!bingo_menu) {
					$('.panel_menu').remove();
				} else {
					bingo_menu = false;
				}
				if (!bingo_dock) {
					$('.panel_dock').remove();
				} else {
					bingo_dock = false;
				}
			}, 20);
		});
	});
	//////////////////////////////////
	function show_panel(x, y,type, param,this_dom, callback) {
		if(type == 'menu'){
			var panel_tpl = menu_tpl.join('');
		}else if(type == 'dock'){
			var panel_tpl = dock_tpl.join('');
		}else{
			console.log('error');
			return
		}
		
		var list_html = '';
		for (var i = 0 in param) {
			if (param[i]['disable']) {
				list_html += '<span data-name="' + (i || '') + '" href="javascript:;">' + (param[i]['txt'] || '') + '</span>';
			} else if(param[i]['callback']){
				list_html += '<a data-callback="true" data-name="' + (i || '') + '" href="javascript:;">' + (param[i]['txt'] || '') + '</a>';
			} else {
				list_html += '<a data-name="' + (i || '') + '" href="javascript:;">' + (param[i]['txt'] || '') + '</a>';
			}
		}
		panel_tpl = panel_tpl.replace(/{-content-}/, list_html);
		var panel = $(panel_tpl);
		panel.css({
			left : x,
			top : y
		}).on('click', 'a', function() {
			panel.remove();
			var this_name = $(this).attr('data-name') || '';
			
			if($(this).attr('data-callback')){
				var this_name = $(this).attr('data-name');
				if(param[this_name]['callback']){
					param[this_name]['callback'].call(this_dom,this_name);
				}
			}else{
				callback.call(this_dom,this_name);
			}
		});
		$('body').append(panel);
	}
	///////////////////////////////////////////

	function filter_clone(args){
		var obj = {};
		for(var i = 0 in args){
			obj[i] = {};
			obj[i]['txt'] = args[i]['txt'];
			obj[i]['disable'] = args[i]['disable'] || false;
			obj[i]['callback'] = args[i]['callback'] || null;
		}
		return obj;
	}

	// exports start /////////////////////////////////////////
	function construction(doms,args,callback){
		var this_panel = this;
		this.type = 'menu';
		this.list = filter_clone(args);
		
		doms.on('contextmenu', function() {
			return false;
		}).on('mousedown', function(e) {
			var this_dom = this;
			if (e.button == 2) {
				//if(e.button > 0){
				var x = e.clientX + 1, y = e.clientY + $('body').scrollTop() + 1;
				
				setTimeout(function() {
					show_panel(x, y,this_panel.type, this_panel.list,this_dom, callback);
				}, 30);
			}
		});
	};
	construction.prototype = {
		'disable' : function(name,check){
			if(typeof(this['list'][name]) == "object"){
				this['list'][name]['disable'] = typeof(check) == "boolean" ? check : true;
			}
		},
		'addList' : function(name,arg,callback){
			this['list'][name] = {
				'txt' : arg['txt'],
				'disable' : arg['disable'] || false,
				'callback' : callback || null
			}
		},
		'removeList' : function(name){
			if(typeof(this['list'][name]) == "object"){
				delete this['list'][name];
			}
		}
	}
	exports.init = construction;
})(panel);