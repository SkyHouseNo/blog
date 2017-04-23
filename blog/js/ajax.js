//封装Ajax
function ajax(obj){
	var xhr=new XMLHttpRequest();
	obj.url=obj.url+'?rand='+Math.random();
	obj.data=params(obj.data);
	if(obj.method==='get'){
		obj.url+=obj.url.indexOf('?')==-1?'?'+obj.data:'&'+obj.data;
		//obj.url=obj.url.indexOf('?')==-1?obj.url+'?'+obj.data:obj.url+'&'+obj.data;
	}
	if(obj.async===true){//	异步
		xhr.onreadystatechange=function(){
			if(xhr.readyState==4){
				callback();
			}
		};
	}
	
	xhr.open(obj.method,obj.url,obj.async);
	if(obj.method==='post'){
		xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		xhr.send(obj.data);
	}else{
		xhr.send(null);
	}
	
	if(obj.async===false){//同步
		callback();
	}
	
	function callback(){
		if(xhr.status==200){
			obj.success(xhr.responseText);//回调传递参数
		}else{
			alert('获取数据错误!错误代码:'+xhr.status+',错误信息:'+xhr.statusText);
		}
	}
	
}

//名值对转化成字符串
function params(data){
	var arr=[];
	for(var i in data){
		arr.push(encodeURIComponent(i)+'='+encodeURIComponent(data[i]));
	}
	return arr.join('&');
}