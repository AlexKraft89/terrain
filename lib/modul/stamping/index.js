stamping = function(window,undefined){
	this.constructor = stamping;
	var self = this;
	this.ymojatel = 1;
	this.start = function(){
		window.addEventListener( 'mousemove', this.onMouseMove, false );
		window.addEventListener( 'click', this.clickccccc, false );
		window.addEventListener( 'mousewheel', this.onMouseWheel, false );

		var geometry = new THREE.CylinderGeometry( 0, 10, 10, 12 );
		//geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 15, 0 ) );
		geometry.applyMatrix( new THREE.Matrix4().makeRotationX( Math.PI / 2 ) );

		this.helper = new THREE.Mesh( geometry, new THREE.MeshNormalMaterial() );
		this.helper.size = 10;
		this.helper.power = 30 / 3;
		scene.add( this.helper );

		WINDOW.creat("stamping",{"header":"Vertexpanel"});

		WINDOW.addItem("stamping","Выдавить",function(){
			self.ymojatel = 1;
		});
		WINDOW.addItem("stamping","Вдавить",function(){
			self.ymojatel = -1;
		});

	}
	this.stop = function(){
		window.removeEventListener( 'mousemove', this.onMouseMove, false );
		window.removeEventListener( 'click', this.clickccccc, false );
		scene.remove( this.helper );
		WINDOW.remove("stamping");
	}

	this.onMouseWheel = function( event ) {

		if (!window.movecamera){ return }; 

		event.preventDefault();
		event.stopPropagation();
		var delta = 0;

		if ( event.wheelDelta !== undefined ) { // WebKit / Opera / Explorer 9

			delta = event.wheelDelta;

		} else if ( event.detail !== undefined ) { // Firefox

			delta = - event.detail;

		}
		console.log(delta);
		if (self.helper.scale.x >= 0.5){
			self.helper.scale.x = self.helper.scale.y = self.helper.scale.z += delta/1200;
		}


	}

	this.onMouseMove = function( event ) {

				var mouseX = ( event.clientX / window.innerWidth ) * 2 - 1;
				var mouseY = -( event.clientY / window.innerHeight ) * 2 + 1;

				var vector = new THREE.Vector3( mouseX, mouseY, camera.near );
				// Convert the [-1, 1] screen coordinate into a world coordinate on the near plane
				vector.unproject( camera );

				var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );

				// See if the ray from the camera into the world hits one of our meshes
				var intersects = raycaster.intersectObjects( [GUI.sceneObjectPanel.selectobject] );

				// Toggle rotation bool for meshes that we clicked
				if ( intersects.length > 0 ) {

					self.helper.position.set( 0, 0, 0 );
					self.helper.lookAt( intersects[ 0 ].face.normal );
					self.helper.to = intersects[ 0 ];

					self.helper.position.copy( intersects[ 0 ].point );
					self.helper.position.y +=30;

				}

			}
	this.clickccccc = function(e){
			if (!window.movecamera){ return }; 
			var point = self.helper.to.point;
			var ver = self.helper.to.object.geometry.vertices;
			var len = ver.length;
			var v = [];
			var size = self.helper.scale.x*10;
			while(len--){

				if (point.x <=  ver[len].x + size && 
					point.x >=  ver[len].x - size && 
					point.z <=  ver[len].z + size &&
					point.z >=  ver[len].z - size ){

					v.push( ver[len] );

					ver[len].y += self.helper.scale.x*10*self.ymojatel;
				}	
			}

			console.log(v);

			self.helper.to.object.geometry.verticesNeedUpdate = true;
		}
}