WLoader = {};
WLoader.loadResponce = function(data){
	console.log(data);
		for (c in data){
			var cub = data[c];
			this.loadterrian(cub.T,c);
			this.loadModel(cub.M,c);
			this.loadCollision(cub.C,c);

		}
	}
WLoader.loadCollision = function(coll,c){
//bill = true;
	var cubes = c;
	var _cube = c.split('=');
	var cl = coll.length;
	while(cl--){
		var col = coll[cl];
		var geometry = new THREE.BoxGeometry( col.width, col.height , col.depth, 
											  col.widthSegments, col.heightSegments, col.depthSegments );

		var material = new THREE.MeshBasicMaterial( {color: 0x00ff00, wireframe:true} );
		var cube = new THREE.Mesh( geometry, material );

		cube.position.x = col.position.x + parseFloat(_cube[0])*2000;
		cube.position.y = col.position.y;
		cube.position.z = col.position.z + parseFloat(_cube[1])*2000;
		
		cube.rotation.x = col.rotation.x;
		cube.rotation.y = col.rotation.y;
		cube.rotation.z = col.rotation.z;

		cube.height =col.height;
	 	cube.width =col.width;
	 	cube.depth =col.depth;
	 	cube.heightSegments =col.heightSegments;
	 	cube.widthSegments =col.widthSegments;
	 	cube.depthSegments =col.depthSegments;


		cube.cubIDs = cubes;
		cube.file = col.file;
		cube.scale.x = col.scale.x;
		cube.scale.y = col.scale.y;
		cube.scale.z = col.scale.z;
		cube.types= "collisionbox";
		cube.bill = true;
		cube.visible = Game.col;

		col.name = col.name;

		Game.scene.add( cube );	


	}

}




WLoader.loadModel = function(models,c){
	console.log(models);
	var cube = c;
	var _cube = c.split('=');
	var ml = models.length;
	while(ml--){
		var model = models[ml];
		var modelurl ='/resource/model'+ model.model + 's.js';
		var imgurl = '/resource/model'+ model.model + 'j.png';

        Loader.animLoadStat(model.anim,
        					modelurl,
        					model.position.x + parseFloat(_cube[0])*2000,
        					model.position.y ,
        					model.position.z + parseFloat(_cube[1])*2000,
        					model.rotation,
        					model.scale,
	                        {name:model.name,
	                         'tags':{'Name':model.name},
	                         'cubIDs':cube,
	                         'Move':false,
	                         'take':false,
	                         'click':false,
	                         'img':imgurl,
	                         'Type':'object',
	                         'model':model.model,
	                         'file':model.file,
	                         'anim':model.anim,
	                         'types':'3dmodel'
	                        }).done(function( morph ){
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
WLoader.loadterrian = function(data,c){
var l = data.length;
var cub = c;
var _cube = cub.split('=');
while(l--){
	var terra = data[l];
	var material = this.loadMaterial(terra.M);
	var geometry = this.loadGeometru(terra.G);
	var mesh = new THREE.Mesh( geometry, material );
	mesh.position.x = terra.G.position.x + parseFloat(_cube[0])*2000;
	mesh.position.y = terra.G.position.y;
	mesh.position.z = terra.G.position.z +  parseFloat(_cube[1])*2000;

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


	mesh.cubIDs =cub;		



	Game.scene.add(mesh);

}
}