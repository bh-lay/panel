var console = window.console || {'log':function(){}};
	//创建一个右键绑定
var o = util.panel({
	elem: $('.pageInner'),
	targets: '.testButton',
	list: {
		'open' : {'txt' : '打开'},
		'rename' : {'txt' : '重命名','display' : 'disable'},
		'delete' : {'txt' : '删除'},
		'share' : {'txt' : '共享'}
	},
	callback: function(name) {
		console.log('you have chioce "' , name , '" from the [ ' , this , ']');
	},
	callbefore: function(){
		console.log('you have panel [ ' , this , ']');
	}
});

//选项置灰
o.display('share','disable');
//选项恢复
// o.display('share','show');
//增删菜单条目
o.add('test',{'txt':'测试'},function(){
	alert(12)
});
o.remove('copy');


	//创建一个右键绑定
var p = util.panel({
	elem: $('.pageInner'),
	'targets' : '.testButton2',
	'list' : {
		'open' : {'txt' : '打开'},
		'rename' : {'txt' : '重命名','display' : 'disable'},
		'delete' : {'txt' : '删除'},
		'share' : {'txt' : '共享'}
	},
	'callback':function(name) {
		console.log('you have chioce "' , name , '" from the [ ' , this , ']');
	},
	'callbefore' : function(){
		console.log('you have panel [ ' , this , ']');
	}
});

