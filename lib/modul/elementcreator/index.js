elementcreator = function(window,undefined){
	this.constructor = elementcreator;
	var self = this;
	this.ymojatel = 1;
	this.start = function(){
		WINDOW.creat("elementcreator",{"header":"Создать"});
		WINDOW.addItem("elementcreator","Ландшафт",function(){
			self.creatlandscape();
		});

		WINDOW.addItem("elementcreator","Модель",function(){
			self.creatmodel();
		});
		 WINDOW.addItem("elementcreator","Коллизию",function(){
			self.creatcollision();
		 });


	}
	this.stop = function(){
		WINDOW.remove("elementcreator");
		$('#creatterrain').remove();
	}
	this.creatcollision = function(){
		var cub = controls.getObject().cubID;
		var _cube = cub.split('=');	
		var coll = {};
		var names = THREE.Math.generateUUID().substr(0,8);

		coll.name = names;


		coll.position = {"x":controls.getObject().position.x -  parseFloat(_cube[0]*2000) ,
		 					"y":controls.getObject().position.y,
		 					"z":controls.getObject().position.z  - parseFloat(_cube[1]*2000)};
		 	///object.position;
	 	coll.rotation = {"x":0,"y":0,"z":0};
	 	coll.scale =    {"x":1,"y":1,"z":1}



	 	coll.height =100;
	 	coll.width = 100;
	 	coll.depth =100;
	 	coll.heightSegments = 1;
	 	coll.widthSegments  = 1;
	 	coll.depthSegments  = 1;
	 	coll.file = "/world/"+cub+"/c/"+names;
	 	console.log(coll);

		WLoader.loadCollision([coll],cub);
	}

	this.creatmodel = function(){
		var self = this;
		$('body').append('<div id="creatmodel"></div>');
		$('#creatmodel').append(MODUL.getForm('elementcreator','creatmodel'));
		$.getJSON('/lib/modul/elementcreator/php/',function(responce){
			var len = responce.length;
			while(len--){
				var model = responce[len];

				$(".creatmodels > .body").append('<div class="modelitem">'+
				'<img data-model="'+model+'" src="'+model+'j.png">'+
				'<div>'+model+'</div>'+
				'</div>');
			}
			document.getElementById('modelbodys').addEventListener("click",self.addnewmodel,false );	
		});


	}

	this.addnewmodel = function(e){
		if (e.target.tagName === "IMG"){

			var cub = controls.getObject().cubID;
			var _cube = cub.split('=');	
			var model = $(e.target).data('model');
			var mod = {};
			var name = 'sdaf';
	 		mod.name = name;
		 	mod.label = name;
		 	mod.model = model.substr(15);
		 	mod.anim = 0;
		 	mod.file = "/world/"+cub+"/m/"+THREE.Math.generateUUID().substr(0,8);
		 	mod.position = {"x":controls.getObject().position.x -  parseFloat(_cube[0]*2000) ,
		 					"y":controls.getObject().position.y,
		 					"z":controls.getObject().position.z  - parseFloat(_cube[1]*2000)};
		 	///object.position;
		 	mod.rotation = {"x":0,"y":0,"z":0};
		 	mod.scale =    {"x":1,"y":1,"z":1}

			WLoader.loadModel([mod],cub);
			$('#creatmodel').remove();
		}	
	}

	this.creatlandscape = function(){
		var self = this;		
		$('body').append('<div id="creatterrain"></div>');
		$('#creatterrain').append(MODUL.getForm('elementcreator','createlement'));
		document.getElementById('modulclicktoselmaterial').addEventListener("click",this.selectmaterialtolandscape,false );
		document.getElementById('savenewlandscape').addEventListener("click",this.savenewlandscape,false );		
	}
	this.savenewlandscape = function(){
		var name = $('#landscpe_name').val();
		var width    = parseInt($('#landscpe_width').val());
		var height   = parseInt($('#landscpe_heigth').val());
		var hsegment = parseInt($('#landscpe_Hsegment').val());
		var wsegment = parseInt($('#landscpe_Wsegment').val());
		var material = $('#modulclicktoselmaterial_val').val();
		if (name !== undefined && width !== undefined){
			self.CreatPlane(width,height,wsegment,hsegment,name,material);
		}
	}
	this.selectmaterialtolandscape = function(){
		MODUL.start('materialliberu',{"click":true,"callback":function(e){
			if (e.target.textContent === "Выбрать"){
				var sel = $(e.target);
				var img = sel.data('img');
				var file = sel.data('file');
				$('#modulclicktoselmaterial').css('background-image',"url('"+img+"')");
				$('#modulclicktoselmaterial_val').val(file);
				MODUL.stop('materialliberu');
			}
		}});
	}

	this.CreatPlane = function(width,height,wsegment,hsegment,name,materials){
		var material = MODUL.start('loader',{'action':'loadmaterial','url':materials});
		var geometry = new THREE.PlaneGeometry(width,height,wsegment,hsegment);
		geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );
			
		var plane = new THREE.Mesh( geometry, material );
		plane.materialURL = materials;
		plane.height = height;
		plane.width = width;
		plane.wsegment = wsegment;
		plane.hsegment = hsegment;
		var cubIDs = controls.getObject().cubID;
		plane.cubIDs = cubIDs;
		plane.position.x = cubIDs.split('=')[0] * 2000;
		plane.position.z = cubIDs.split('=')[1] * 2000;
		plane.name = name;
		plane.castShadow = true;
		plane.receiveShadow = true;
		plane.types = "landscape";

		//set height of vertices
		scene.add(plane);
		plane.material.needsUpdate = true;
		//World.planes.push(plane);
		GUI.sceneObjectPanel.refresh(scene);
		MODUL.stop('elementcreator');
	}

	
}



