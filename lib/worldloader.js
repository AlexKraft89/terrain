WLoader = {};
WLoader.loadResponce = function(data){
	console.log(data);
		for (c in data){
			var cub = data[c];
			this.loadterrian(cub.T);
			this.loadModel(cub.M);

		}
	}
WLoader.loadModel = function(models){
	var ml = models.length;
	while(ml--){
		var model = models[ml];
		var modelurl = '/resource/model'+ model.model + 's.js';
		var imgurl = '/resource/model'+ model.model + 'j.png';
		//console.log(modelurl);

        Loader.animLoadStat(model.anim,
        					modelurl,
        					model.position.x,
        					model.position.y,
        					model.position.z,
        					model.rotation,
        					model.scale,
	                        {name:model.name,
	                         'tags':{'Name':model.name},
	                         'Move':false,
	                         'take':false,
	                         'click':false,
	                         'img':imgurl,
	                         'label':model.name,
	                         'Type':'object'
	                        }).done(function( morph ){
	                        	morph.types="object";
	                            Game.scene.add( morph );
	                            if (morph.animations){
	                                morph.animations.idle.play();
	                            }
	                        });




	}
	console.log(models);
}

WLoader.loadMaterial = function(material){
	var materialoption = material.matrialoptions;
	if (material.IMG !== undefined){
		THREE.ImageUtils.crossOrigin = "anonymous";
		var texture = THREE.ImageUtils.loadTexture( material.IMG );
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		if (material.TEXTURE_REPAIRX !== undefined){
			texture.repeat.set( material.TEXTURE_REPAIRX, material.TEXTURE_REPAIRY );
		} else {
			texture.repeat.set( 10, 10 );
		}
		materialoption.map = texture;
	}
	var material =  new THREE[  material.TYPE ]( materialoption );
	return material;
}
WLoader.loadGeometru = function(data){
	
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
WLoader.loadterrian = function(data){
var l = data.length;
while(l--){
	var terra = data[l];
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


	var CUBSTEP = 2000;
	var _x=_z=CUBSTEP/2;
	if(mesh.position.x < 0){
		_x = -_x;
	}
	if(mesh.position.z < 0){
		_z = -_z;
	}


	var x = ~~(((_x+mesh.position.x) / CUBSTEP));
	var z = ~~(((_z+mesh.position.z) / CUBSTEP));
	mesh.cubIDs = x + '=' + z;		



	Game.scene.add(mesh);

}
}