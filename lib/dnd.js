function dnd(e,id,fn){
if(e.preventDefault)e.preventDefault();
if(id==undefined)id=e.target?e.target.attributes["id"].value:e.srcElement.attributes["id"].value;
var d=document.getElementById(id);
var p=d.parentElement;
var ml=d.currentStyle?d.currentStyle["marginLeft"]:window.getComputedStyle(d,"").getPropertyValue("margin-left");
var mt=d.currentStyle?d.currentStyle["marginTop"]:window.getComputedStyle(d,"").getPropertyValue("margin-top");
mt=isNaN(parseInt(mt))?0:parseInt(mt);
ml=isNaN(parseInt(ml))?0:parseInt(ml);
var dx=e.clientX-p.getBoundingClientRect().left-ml;
var dy=e.clientY-p.getBoundingClientRect().top-mt;
var b=document.body;
var de=document.documentElement;
var dd=document.createElement("div");
dd.setAttribute("id","dnd_"+id);
b.appendChild(dd);
var dnd=document.getElementById("dnd_"+id);
var s=dnd.style;
s.position="absolute";
s.zIndex=1000;
s.width="100%";
s.height="100%";
s.left=de.scrollLeft>b.scrollLeft?de.scrollLeft+"px":b.scrollLeft+"px";
s.top=de.scrollTop>b.scrollTop?de.scrollTop+"px":b.scrollTop+"px";
s.backgroundColor="#ffffff";
s.opacity=0;
s.filter="alpha(opacity=0)";
if(dnd.addEventListener){
  dnd.addEventListener('mousemove',function(e){d_move(id,e,dx,dy)},true);
  dnd.addEventListener('mouseup',function(e){d_up(id,fn)},true);
  }
else{
  dnd.attachEvent('onmousemove',function(e){d_move(id,e,dx,dy)});
  dnd.attachEvent('onmouseup',function(e){d_up(id,fn)});
  }
}
function d_up(id,fn){
document.body.removeChild(document.getElementById("dnd_"+id));
if(fn!=undefined&&fn!=0)fn();
	if (id === 'playerInvertar'){
		GUI.invertar.savepos();
	}
	if (id ==='MobInvertar'){
		GUI.sale.savepos();
	}
}
function d_move(id,e,x,y){
var d=document.getElementById(id);
var s=document.getElementById("dnd_"+id).style;
var p=d.parentElement;
var b=document.body;
var de=document.documentElement;
s.left=de.scrollLeft>b.scrollLeft?de.scrollLeft+"px":b.scrollLeft+"px";
s.top=de.scrollTop>b.scrollTop?de.scrollTop+"px":b.scrollTop+"px";
d.style.marginLeft=e.clientX-x-p.getBoundingClientRect().left+"px";
d.style.marginTop=e.clientY-y-p.getBoundingClientRect().top+"px";
}

WINDOW = {
	"array":{},
	"count":-1,
	'func':{},
	"creat":function(name,par){
		this.count++;
		par.id = this.count;
		par.name = name;
		var win = new WIND(par,false);
		this.array[name] = win;
	},
	"addItem":function(win,name,func){
		this.array[win].addItem(name,func);
	},
	"db":function(name){
		this.array[name].dbclcick();
	},
	"remove":function(name){
		if (!this.array[name]){ return ;}
		this.array[name].destroy();
		this.count--;
	},
	"Functon":function(name,n,elm){
		$('.'+name + '_item').css({"color":"#fff", "background-color": "initial"});
		$(elm).css({"color":"#000", "background-color": "#FFF"});
		WINDOW.func[name][n]();
	}

}

WIND = function(par,close){
	"use strict";
	if (close === undefined || close === false){
		this.close = true;
	} else {
		this.close = false;
	}
	this.constructor = WIND;
	this.id = par.id;
	this.name = par.name;
	this.func = {};
	this.domid = "win" +this.id;
	var mart = 0;
	var marl = this.id * 210;
	if (marl > window.innerWidth -200){
		marl = marl - window.innerWidth + 200;
		mart = 50;
	}
	$('.widowdialog').append('<div  class="window" id="'+this.domid+'">'+
			'<div class="wheader">'+par.header+ 
			'<span title="Переместить" class="widowmove" onmousedown="dnd(event, \'win'+this.id+'\')" ></span>'+
			'<span title="Закрыть" class="widowclose" onclick="MODUL.stop(\''+ this.name +'\');" ></span>'+
			'</div>'+
			'<div class="windowlist" id="list'+ this.id +'">'+
			'</div>'+
		'</div>');
}
WIND.prototype.addItem = function(name,func){
	var n = name + ~~((Math.random() * 100)+0.5);
	if (WINDOW.func[this.name] === undefined){
		WINDOW.func[this.name] = {};
	}

	WINDOW.func[this.name][n] = func;
	$('#list' + this.id).append('<div onclick="WINDOW.Functon(\''+this.name+'\',\''+n+'\',this)" class="windowslistitem '+this.name +'_item">'+ name +'</div>');
}

WIND.prototype.dbclcick = function(){
	if (this.close){
		$('#win' + this.id).animate({"min-height":"300px"},1000);
		this.close = false;
	} else {
		$('#win' + this.id).animate({"min-height":"20px"},1000);
		this.close = true;
	}
}
WIND.prototype.destroy = function(){
	delete WINDOW.func[this.name];
	$("#"+this.domid).remove();
}

ModalWindow = function(name,array,callbeck){
	var self = this;
	this.constructor = ModalWindow;
	this.prefix = "ModW"+ ~~((Math.random() * 100 )+0.5);
	this.callbeck = callbeck;
	this.array = array;
	var body ='<div class="ModalWindow" id="WMMAIn_'+this.prefix+'">'+
					'<div class="mwheader">'+ name +'</div>'+
					'<div class="mwbody" id="'+this.prefix+'_body">'+
					'</div>'+
					'<div class="mwbutton">'+
						'<button id="'+this.prefix+'_ok">ok</button>'+
						'<button id="'+this.prefix+'_cancel">cancel</button>'+
					'</div>'+
				'</div>';

	var inputs = '';
	var len = array.length;
	var i = 0;
	while(i < len){
		var p = array[i];
			inputs += ' <div> ' + p+' <input type="text" id="'+ this.prefix +'_'+p+'"></div>';
		i++;
	}
	// for(p in par){
	// 	inputs += ' <input type="text" id="'+ this.prefix +'_'+p+'"> ';
	// }

	$('body').append(body);
	$('#' + this.prefix+'_body').append(inputs);
	document.getElementById(this.prefix+ '_ok').addEventListener("click", function(){self.Apply(); } );
	document.getElementById(this.prefix+ '_cancel').addEventListener("click", function(){self.destroy(); } );



}

ModalWindow.prototype.destroy = function(){
	$('#WMMAIn_'+this.prefix).remove();
	delete this;
}

ModalWindow.prototype.Apply = function(){
	var res = {};
	var len = this.array.length;
	var i = 0;
	while(i < len){
		var arit = this.array[i];
		res[arit] = $('#'+ this.prefix +'_'+arit).val();
		i++;

	}
	this.callbeck(res);
	this.destroy();
}
