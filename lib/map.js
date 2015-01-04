World = function(){
	"use strict";
	this.constructor = World;

	this.planes = [];

	


 	    var cube = new THREE.Mesh(new THREE.CubeGeometry(20, 20, 20), new THREE.MeshLambertMaterial({
        color: 'blue' 
      }));
      cube.overdraw = true;
      cube.rotation.x = Math.PI * 0.1;
      scene.add(cube);
      
      var directionalLight = new THREE.DirectionalLight(0xffffff);
      directionalLight.position.set(1, 1, 1);
      scene.add(directionalLight);

	 directionalLight.types="свет";




	 this.save = {};
	 this.save.saveterrian = function(object){
	 	var terrian = {};
	 	terrian.geometry = {};
	 	terrian.geometry.vertices = object.geometry.vertices;
	 	terrian.position = object.position;
	 	terrian.rotation = object.rotation;
	 	terrian.scale = object.scale;
 		for( i in object){	
				if (typeof object[i] === 'boolean' || typeof object[i] === 'string' || typeof object[i] === 'number'){
					terrian[i] = object[i];
				} 
			
		}
		console.log(JSON.stringify(terrian));
	 	//terrian.types = object.types;
	 	//terrian.materialURL = object.materialURL;

	 }




/*
	 var bumpTexture = new THREE.ImageUtils.loadTexture( 'images/heightmap.png' );
	bumpTexture.wrapS = bumpTexture.wrapT = THREE.RepeatWrapping; 
	// magnitude of normal displacement
	var bumpScale   = 200.0;
	
	var oceanTexture = new THREE.ImageUtils.loadTexture( 'images/dirt-512.jpg' );
	oceanTexture.wrapS = oceanTexture.wrapT = THREE.RepeatWrapping; 
	
	var sandyTexture = new THREE.ImageUtils.loadTexture( 'images/sand-512.jpg' );
	sandyTexture.wrapS = sandyTexture.wrapT = THREE.RepeatWrapping; 
	
	var grassTexture = new THREE.ImageUtils.loadTexture( 'images/grass-512.jpg' );
	grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping; 
	
	var rockyTexture = new THREE.ImageUtils.loadTexture( 'images/rock-512.jpg' );
	rockyTexture.wrapS = rockyTexture.wrapT = THREE.RepeatWrapping; 
	
	var snowyTexture = new THREE.ImageUtils.loadTexture( 'images/snow-512.jpg' );
	snowyTexture.wrapS = snowyTexture.wrapT = THREE.RepeatWrapping; 

	
	// use "this." to create global object


		
	window.masvert = [];

	var planeGeo = new THREE.PlaneGeometry( 1000, 1000, 20, 20 );	
	var vlen = planeGeo.vertices.length;
	vlen = vlen -1;
	while(vlen--){
		masvert.push(0.2);
	} 
		masvert.push(0.4);
//masvert[2] = 0.3;


	// customUniforms = {texture:[
	// 	t1:	{ type: "t", value: oceanTexture },
	// 	t2:	{ type: "t", value: sandyTexture },
	// 	t3:	{ type: "t", value: grassTexture },
	// 	t4:	{ type: "t", value: rockyTexture },
	// 	t5:	{ type: "t", value: snowyTexture }
	// };


	customUniforms = {
		textures : { type: "tv", value: [ oceanTexture, sandyTexture, grassTexture , rockyTexture , snowyTexture] },
		mouse : { type: "v3", value: new THREE.Vector3( 0, 1, 2 ) }
	}
	
	var customMaterial = new THREE.ShaderMaterial( 
	{
		attributes: { vert:  { type: 'f', value: masvert} },
	    uniforms: customUniforms,
		vertexShader:   document.getElementById( 'vertexShader'   ).textContent,
		fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
	    side: THREE.DoubleSide
	}   );



	planeGeo.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );
	var plane = new THREE.Mesh(	planeGeo, customMaterial );
	plane.types="landscape";
	scene.add( plane );


	*/


		
		



}


drewcude = function(object){
	var x = ~~((object.position.x / CUBSTEP));
	var z = ~~((object.position.z / CUBSTEP));
	if (object.cubID === x + '-' + z){ return }
	var sclen = scene.children.length;
	while(sclen--){
		if (scene.children[sclen].cubID !== undefined){
			scene.remove(scene.children[sclen]);
		}
	}
	object.cubID = x + '-' + z;
	var startX = x -2;
	var startZ = z -2;
	var X = +startX;
	var Z = +startZ;
	var i = 0;
	while( i< 3){
		var j= 0;
		X++;
		while( j < 3){
			Z++;
			var p = planes.clone();
			p.position.x = 1000 * X;
			p.position.z = 1000 * Z;
			p.cubID = p.position.x + '-' + p.position.z;
			scene.add(p);
			j++;
		}
		i++;
		Z = startZ;
	}


		
}