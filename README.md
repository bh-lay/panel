panel.js
=====
#panel.js是什么
panel.js是一个基于JQUERY的右键菜单插件，用于用户交互较为复杂的项目。

#demo

```javascript
	var console = window.console || {'log':function(){}};
		//创建一个右键绑定
	var o = util.panel({
		'targets' : '.testButton',
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

	//指定类型
	o.type = 'menu';//@param:'menu','dock'
	//选项置灰
	o.display('share','disable');
	//选项恢复
//	o.disable('share',false);
	//增删菜单条目
	o.add('test',{'txt':'测试'},function(){
		alert(12)
	});
	o.remove('copy');
```
