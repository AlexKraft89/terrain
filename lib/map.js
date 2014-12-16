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
	window.vasa = [];
	var l = 10000;
	while(l--){
		vasa.push(0.1);
	}

	customUniforms = {
		bumpTexture:	{ type: "t", value: bumpTexture  },
		bumpScale:	    { type: "f", value: bumpScale    },
		oceanTexture:	{ type: "t", value: oceanTexture },
		sandyTexture:	{ type: "t", value: sandyTexture },
		grassTexture:	{ type: "t", value: grassTexture },
		rockyTexture:	{ type: "t", value: rockyTexture },
		snowyTexture:	{ type: "t", value: snowyTexture }
	};
	
	// create custom material from the shader code above
	//   that is within specially labelled script tags
	var customMaterial = new THREE.ShaderMaterial( 
	{
	    uniforms: customUniforms,
		vertexShader:   document.getElementById( 'vertexShader'   ).textContent,
		fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
	    side: THREE.DoubleSide
	}   );
		
	var planeGeo = new THREE.PlaneGeometry( 1000, 1000, 255, 255 );	
	planeGeo.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );
	var plane = new THREE.Mesh(	planeGeo, customMaterial );
	plane.types="landscape";
	scene.add( plane );
}

