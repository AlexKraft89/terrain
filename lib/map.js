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
	 	terrian.option = {};
 		for( i in object){	
				if (typeof object[i] === 'boolean' || typeof object[i] === 'string' || typeof object[i] === 'number'){
					terrian.option[i] = object[i];
				} 
			
		}
		var string = JSON.stringify(terrian);
		$.post('/php/script/save.php',{'action':'SaveTerrain','name':object.name,'string':string,'x':object.position.x,'z':object.position.z},function(response){});
	 	//terrian.types = object.types;
	 	//terrian.materialURL = object.materialURL;

	 }

	 this.loadworld = {};
	 this.loadworld.load = function(res){
	 	console.log('landscape',res);
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
	if (object.cubID === x + '=' + z){ return }		
	
	var map = [ parseInt(x-1)+'='+parseInt(z+1) , x+'='+parseInt(z+1) , parseInt(x+1)+'='+parseInt(z+1) , 
			    parseInt(x-1)+'='+parseInt(z)   , x+'='+z   		  , parseInt(x+1)+'='+parseInt(z)   ,  
			    parseInt(x-1)+'='+parseInt(z-1) , x+'='+parseInt(z-1) , parseInt(x+1)+'='+parseInt(z-1) ];
			    

	var sclen = scene.children.length;
    while(sclen--){
		if (scene.children[sclen].cubID !== undefined){
			var mind = map.indexOf(scene.children[sclen].cubID);
			if (mind !== -1){
				map.splice(mind,1);
			}else {
				scene.remove(scene.children[sclen]);
			}
		}
	}
	var l = map.length;
	var i =0;
	while(i < l){
		var _coord = map[i].split('=');
		var p = planes.clone();
		p.position.x = 1000 * _coord[0];
		p.position.z = 1000 * _coord[1];
		p.cubID = _coord[0] + '=' + _coord[1];
		scene.add(p);
		i++;
	}

	$.post('/php/script/load.php',{'action':'getmap','array':JSON.stringify(map)},function(responce){
		MODUL.start('loader',{'action':'loadResponce','data':responce});
	});

	object.cubID = x + '=' + z;
	console.log(map);
}

