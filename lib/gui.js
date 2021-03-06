GUI = {
	"ignoredoption":function(option){
		var ar = ['uuid','type','eulerOrder','__webglInit','__webglActive','wireframeLinecap','wireframeLinejoin',
				  'hasTangents','verticesNeedUpdate','elementsNeedUpdate','uvsNeedUpdate','normalsNeedUpdate','tangentsNeedUpdate',
				  'colorsNeedUpdate','lineDistancesNeedUpdate','morphTargetsNeedUpdate'];
		var len = ar.length;
		while(len--){
			if (ar[len] === option){
				return false;
			}

		}
		return true;
	},
	"init":function(){
		$('body').append('<div class="widowdialog"></div>');
		this.creatPanel.init();
	},
	"creatPanel":{
		"body":'<div class="addnewelementmain">'+
					'<div class="addnewbody">'+
						'<img src="/images/add.png" onclick="MODUL.start(\'elementcreator\');">'+
					'</div>'+

					'<div class="addnewbody">'+
						'<img width="32px" src="/images/material.png" onclick="MODUL.start(\'materialliberu\');">'+
					'</div>'+

				'</div>',
		"init":function(){
			$('body').append(this.body);
		}
	},
	"saveelement":function(){
			var saveobject = GUI.sceneObjectPanel.selectobject;
			if (saveobject.types === 'landscape'){
				WORLD.save.saveterrian(saveobject);
			} else if(saveobject.types === '3dmodel'){
				WORLD.save.model(saveobject);
			} else if(saveobject.types === 'collisionbox'){
				WORLD.save.collision(saveobject);
			} else {
				alert('Такой тип нельзя сохранить');
			}
		},	
	"sceneObjectPanel":{
		"changeObject":undefined,
		"parent":undefined,
		"body":'<div class="allobjectWindow">'+
					'<div class="wheader">Обекты со сцены</div>'+
					'<div class="allobectbody"></div>'+
					'<div class="allobectbodybutton">'+
						'<div>'+
							'<img src="/images/del.png" height="20">'+
							'<img onclick="GUI.saveelement();" src="/images/save.png" height="20">'+
						'</div>'+
						'<div class="hiddendopelement"></div>'+
					'</div>'+
				'</div>',
		"init":function(){
			$('body').append(this.body);
			
		},
		"hidedopelement":function(){
			$(".hiddendopelement").hide();
		},
		"showdopelement":function(){
			$(".hiddendopelement").show();
		},
		"add":function(object){
			var name = object.name;
			if (name == ""){
				name = "Nan";
			}
			var t = "";
			if (object.types !== undefined){
				t= '('+object.types+')';
			}
			$('.allobectbody').append('<div rel="'+object.id+'" id="obj'+object.id+'" onclick="GUI.sceneObjectPanel.selectObject(\''+ object.id +'\',this)" ondblclick="GUI.sceneObjectPanel.openforId(\''+ object.id +'\');" class="itemObjectScene">'+name+' :'+ object.type +' '+ t +'</div>');
		},
		"openforId":function(id){
			if (this.changeObject === undefined){ return; }
			this.changeObject = this.changeObject.getObjectById(+id);
			this.refresh(this.changeObject);
		},

		"refresh":function(object){

			var ids = parseInt($('.allobectbody > .selected').attr('rel'));

			if (object.parent !== undefined){
				$('.allobectbody').html('<div rel="'+object.id+'" id="obj'+object.id+'" ondblclick="GUI.sceneObjectPanel.openparent()" class="itemObjectScene"> .. </div>');
			} else {
				$('.allobectbody').html('');
			}

			this.changeObject = object;

			var v = this.changeObject.children.length;
			var i = 0;
			while(i < v){
				if (this.changeObject.children[i].types !== undefined){
					this.add(this.changeObject.children[i]);
				}
				i++;
			}
			if (ids!== 0){
				$('#obj'+ids).addClass('selected');
			}
		},
		"openparent":function(){
			this.refresh(this.changeObject.parent);
		},
		"gui":undefined,
		"selectObject":function(id,elm){
			if (this.gui !== undefined){
				this.gui.destroy();
			}
			if(elm === undefined){
				elm = $('#obj'+id);
			}
			$('.itemObjectScene').removeClass('selected');
			$(elm).addClass('selected');
			this.hidedopelement();
			MODUL.stopAll();
			var Obj = this.changeObject.getObjectById(+id);

			this.ObjectEditMenu.creat(Obj.types);
			this.selectobject = Obj;

			this.gui = new dat.GUI();		

			var main = this.gui.addFolder('main');
			for( i in Obj){
				if ( GUI.ignoredoption(i.toString()) === true ){
					if (typeof Obj[i] === 'boolean' || typeof Obj[i] === 'string' || typeof Obj[i] === 'number'){
						main.add(Obj, i).listen();
					} 
				}
			}
			if (Obj.material !== undefined){
				var material = this.gui.addFolder('material');
				for( i in Obj.material){
					if ( GUI.ignoredoption(i.toString()) === true ){
						if (typeof Obj.material[i] === 'boolean' || typeof Obj.material[i] === 'string' || typeof Obj[i] === 'number'){
							material.add(Obj.material, i).listen();
						} 
					}
				}
			}
			if (Obj.geometry !== undefined){
				var geometry = this.gui.addFolder('geometry');
				for( i in Obj.geometry){
					if ( GUI.ignoredoption(i.toString()) === true ){
						if (typeof Obj.geometry[i] === 'boolean' || typeof Obj.geometry[i] === 'string'  || typeof Obj[i] === 'number' ){
							geometry.add(Obj.geometry, i).listen();
						} 
					}
				}
			}

			var f2 = this.gui.addFolder('position');
			f2.add(Obj.position, 'x').step(1).listen();
			f2.add(Obj.position, 'y').step(1).listen();
			f2.add(Obj.position, 'z').step(1).listen();
			var f2 = this.gui.addFolder('rotation');
			f2.add(Obj.rotation, 'x',-Math.PI,Math.PI).listen();
			f2.add(Obj.rotation, 'y',-Math.PI,Math.PI).listen();
			f2.add(Obj.rotation, 'z',-Math.PI,Math.PI).listen();
			var f3 = this.gui.addFolder('scale');
			f3.add(Obj.scale, 'x').step(1).listen();
			f3.add(Obj.scale, 'y').step(1).listen();
			f3.add(Obj.scale, 'z').step(1).listen();

		},
		"ObjectEditMenu":{
			"creat":function(type){
				$('.dopmenufotobject').remove();
				$('body').append("<div class='dopmenufotobject'></div>");
				$('.dopmenufotobject').html('<div>'+ this.ObjectType[type]+this.ObjectType['all']+'</div>');
			},
			"ObjectType":{
				"landscape":'<img onclick="MODUL.start(\'stamping\');" height="30" src="/images/land.png">',
				"all":'<img onclick="MODUL.start(\'transform\')" height="30" src="/images/move.png">',
				"collisionbox":'',
				"3dmodel":''
			}
		}

	}
}	
	//MODUL.start('loader',{'action':'loadResponce','data':responce});

setInterval(function(){
	GUI.sceneObjectPanel.refresh(GUI.sceneObjectPanel.changeObject);
	//console.log("update");
},2000);