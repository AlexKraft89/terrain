loader = function(window,undefined){
	this.constructor = loader;
	var self = this;
	this.start = function(par){
		if (par.action === 'loadmaterial'){
			return this.loadmaterial(par.url);
		}
		if (par.action === 'loadResponce'){
			this.loadResponce(par.data);
		}
		
	}

	this.loadmaterial = function(url){
		var material = JSON.parse(MODUL._getFifle(url));

		return this.loadMaterial(material);

	}
	this.loadMaterial = function(material){
		var materialoption = material.matrialoptions;
		if (material.IMG !== undefined){
			var texture = THREE.ImageUtils.loadTexture( material.IMG );
			texture.wrapS = THREE.RepeatWrapping;
			texture.wrapT = THREE.RepeatWrapping;
			if (material.TEXTURE_REPAIR !== undefined){
				texture.repeat.set( material.TEXTURE_REPAIRX, material.TEXTURE_REPAIRY );
			} else {
				texture.repeat.set( 10, 10 );
			}
			materialoption.map = texture;
		}
		var material =  new THREE[  material.TYPE ]( materialoption );
		return material;
	}
	this.loadGeometru = function(data){
		console.log('geometry',data);

		
		var geometry = new THREE.PlaneGeometry(data.option.width,data.option.height,data.option.wsegment,data.option.hsegment);
		geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );


		 var gl = data.geometry.vertices.length;
		 while(gl--){
		 	geometry.vertices[gl].x =  data.geometry.vertices[gl].x;
		 	geometry.vertices[gl].y =  data.geometry.vertices[gl].y;
		 	geometry.vertices[gl].z =  data.geometry.vertices[gl].z;
		 }
		return geometry;
	}
	this.loaderTerrianGeometry = function(file){
		var planedata = MODUL._getFifle(file);
	}
	this.loadterrian = function(data){
		console.log('data',data);
		var l = data.length;
		while(l--){
			var terra = data[l];
			console.log(terra)
			var material = this.loadMaterial(terra.M);
			var geometry = this.loadGeometru(terra.G);
			var mesh = new THREE.Mesh( geometry, material );
			mesh.position.x = terra.G.position.x;
			mesh.position.y = terra.G.position.y;
			mesh.position.z = terra.G.position.z

			mesh.rotation.x = terra.G.rotation._x;
			mesh.rotation.y = terra.G.rotation._y;
			mesh.rotation.z = terra.G.rotation._z;

			mesh.scale.x = terra.G.scale.x;
			mesh.scale.y = terra.G.scale.y;
			mesh.scale.z = terra.G.scale.z;
			for (d in terra.G.option){
				mesh[d] = terra.G.option[d];
			}
			console.log(mesh);
			scene.add(mesh);

		}
		GUI.sceneObjectPanel.refresh(scene);
	}
	this.loadCube = function(cube){

	}
	this.loadResponce = function(data){
		//var data = JSON.parse(resp);
		for (c in data){
			var cub = data[c];
			this.loadterrian(cub.T);
		}
	}

	this.stop = function(){

	}


}