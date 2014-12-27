elementcreator = function(window,undefined){
	this.constructor = elementcreator;
	var self = this;
	this.ymojatel = 1;
	this.start = function(){
		WINDOW.creat("elementcreator",{"header":"Создать"});
		WINDOW.addItem("elementcreator","Ландшафт",function(){
			self.creatlandscape();
		});


	}
	this.stop = function(){
		WINDOW.remove("elementcreator");
	}

	this.creatlandscape = function(){
		//this.creatPlane(10000,10000,50,50,"yhfgj");
		//alert('Создан');
		var self = this;
		new ModalWindow('Создать ландшафт',['width','height','wsegment','hsegment','name'],function(par){
			self.CreatPlane(par.width,par.height,par.wsegment,par.hsegment,par.name);
		});

	}

	this.CreatPlane = function(width,height,wsegment,hsegment,name){
		var geometry = new THREE.PlaneGeometry(width,height,wsegment,hsegment);
	//	geometry.verticesNeedUpdate= true;
		geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );
		
		var material =  new THREE.MeshBasicMaterial( { color: 0xCAAAAA } );
		
		var plane = new THREE.Mesh( geometry, material );



		plane.name = name;
		plane.castShadow = true;
		plane.receiveShadow = true;
		plane.types = "landscape";

		//set height of vertices
		scene.add(plane);
		plane.material.needsUpdate = true;
		//World.planes.push(plane);
		GUI.sceneObjectPanel.refresh(scene);
	}

	
}



