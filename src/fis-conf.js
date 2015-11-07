
//启用插件 
fis.hook('relative'); 


//让所有文件，都使用相对路径。 
fis.match('**', {
  relative: true
});

fis.match('panel.css', {
  release: false
});
fis.match('style.css', {
  release: false
});
fis.match('script.js', {
  release: false
});