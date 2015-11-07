
//启用插件 
fis.hook('relative'); 


//让所有文件，都使用相对路径。 
fis.match('**', {
  relative: true
});