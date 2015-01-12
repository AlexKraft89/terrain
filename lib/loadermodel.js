//window.CACHE = {};
window.Loader = {};

(function(L){	
	// model, position,rotation,scale,name,cubeid /model/city/monument/js/s.js
	L.LoadJsonModel = function(m, x, y, z, r, s, props) 
	{	
		// var m = m, p = p, r =r , s =s , props = props;
		var dfd = $.Deferred();

		var JSONStaticLoader = new THREE.JSONLoader();        
		JSONStaticLoader.load( m , function( geometry, materials )
		{
					
			morph = new THREE.MorphBlendMesh( geometry, new THREE.MeshFaceMaterial( materials ) );	

			if (r.x === undefined){
				morph.rotation.x = -Math.PI / 2;
			} else {			
				morph.rotation.x = r.x;
			}
			
			if (r.y !== undefined){
				morph.rotation.y = r.y;
			}
			
			if (r.z !== undefined){
				morph.rotation.z = r.z;
			}
			
			if (x !== undefined){
				morph.position.x = x;	
			}

			if (y !== undefined){
				morph.position.y = y;	
			}

			if (z !== undefined){
				morph.position.z = z;	
			}
			
			if (s !== undefined){
				if (typeof s === "object"){
					morph.scale.set(parseFloat(s.x),parseFloat(s.y),parseFloat(s.z));
				} else {
					morph.scale.set(parseFloat(s),parseFloat(s),parseFloat(s));
				}
			}

			for(var p in props) {
				
				morph[p] = props[p];	
							
			}			
			
			if (props.label !== undefined){
				var label = Label(props.label);
				label.position.x = 0;
				label.position.y = 10;
				label.position.z = 0;
				morph.add(label);
			}

			//console.log(morph);	
			//Game.scene.add( morph );	
			morph.castShadow = Game.castshadowLoaderObject;
			morph.receiveShadow = Game.refshadowLoaderObject; // Game.shadow;		
			dfd.resolve( morph );						
		});
					
		return dfd.promise();
	}
			
	L._animload = function(m,smooth, props){	
		var m = m, p = p, r =r , s =s , props = props;
		var dfd = $.Deferred();
			// 
		// if (CACHE[m]){

			console.log("[ "+m+" ]-load in cache");

			var morph = CACHE.getCache(m);

			if (props && props.label !== undefined){
				var label = Label(props.label);
				label.position.x = 0;
				label.position.y = 60;
				label.position.z = 0;
				morph.add(label);
			}

		
			morph.castShadow = Game.castshadowLoaderObject;
			morph.receiveShadow = Game.refshadowLoaderObject; // Game.shadow;	
				
			dfd.resolve( morph );	

			//loooo( CACHE[m].g ,mat);

		// }	else {
		// 	var JSONStaticLoader = new THREE.JSONLoader();      
		// 	JSONStaticLoader.load( m , loooo);  
		// }


		// function loooo( geometry, materials )
		// {
		// //	geometry.computeMorphNormals();					
		// //	geometry.computeBoundingBox();
		// // var bb = geometry.boundingBox;	

		// 	// var materia =  new THREE.MeshFaceMaterial( materials );							
		// 	// var morph = new THREE.SkinnedMesh( geometry,materia );	
																
		// 	// for (var k in materials) {
		// 	// 	materials[k].skinning = true;
		// 	// }
				 


		// 	// var i = 0;
		// 	// var animations = {};

		// 	// if (!morph.geometry.animations){
		// 	// 	morph.geometry.animations = [];
		// 	// }

		// 	// if (morph.geometry.animations.length === 0){

		// 	// //	morph.geometry.animations = JSON.parse(JSON.stringify(GlobalAnimations[props.animations]));
		// 	// //	setTimeout(function(){
		// 	// 	morph.geometry.animations = geo.cloner.clone(GlobalAnimations[props.animations]);
		// 	// //},10);


		// 	// }


		// 	// while (i < morph.geometry.animations.length){
		// 	// 	var an = morph.geometry.animations[i];

		// 	// 	if( an.name == 'run' || an.name == 'walk' ){
		// 	// 		$.each( an.hierarchy, function(){
		// 	// 			if( this.parent == -1 ){
		// 	// 				$.each( this.keys, function(){
		// 	// 					this.pos[2] = 0;
		// 	// 				});
		// 	// 			}
		// 	// 		});
		// 	// 	}

		// 	// 	animations[an.name] = new THREE.Animation(morph,an);
		// 	// 	i++;
		// 	// }
		// 	// if (animations.jump){
		// 	// 	animations.jump.loop = false;
		// 	// }
		// 	// morph.animations = animations;	
					

		// 	if (props && props.label !== undefined){
		// 		var label = Label(props.label);
		// 		label.position.x = 0;
		// 		label.position.y = 60;
		// 		label.position.z = 0;
		// 		morph.add(label);
		// 	}
		// 	morph.castShadow = Game.castshadowLoaderObject;
		// 	morph.receiveShadow = Game.refshadowLoaderObject; // Game.shadow;	

		// 	if (!CACHE[m]){
		// 	 	CACHE[m] = new THREE.Object3D().clone(morph,true);	
		// 	 }

		// 	dfd.resolve( morph );						
		// };




					
		return dfd.promise();
	}	


	L._animloadS = function(m, x, y, z, r, s, props){	
		
		var dfd = $.Deferred();
			
		var JSONStaticLoader = new THREE.JSONLoader();        
		JSONStaticLoader.load( m , function( geometry, materials )
		{
			//var bb = geometry.boundingBox;	
			geometry.computeMorphNormals();		
			//materials.shading = THREE.SmoothShading; 						
			morph = new THREE.SkinnedMesh( geometry, new THREE.MeshFaceMaterial( materials ) );									
																
			for (var k in materials) {
				materials[k].skinning = true;
			}
				 

			if (r.x === undefined){
				morph.rotation.x = -Math.PI / 2;
			} else {			
				morph.rotation.x = r.x;
			}
			
			if (r.y !== undefined){
				morph.rotation.y = r.y;
			}
			
			if (r.z !== undefined){
				morph.rotation.z = r.z;
			}
			
			if (x !== undefined){
				morph.position.x = x;	
			}

			if (y !== undefined){
				morph.position.y = y;	
			}

			if (z !== undefined){
				morph.position.z = z;	
			}
			
			if (s !== undefined){
				if (typeof s === "object"){
					morph.scale.set(parseFloat(s.x),parseFloat(s.y),parseFloat(s.z));
				} else {
					morph.scale.set(parseFloat(s),parseFloat(s),parseFloat(s));
				}
			}

			for(var p in props) {				
				morph[p] = props[p];								
			}	

			if (morph.geometry.animations){
				if (morph.geometry.animations.length > 0){
					var i = 0;
					var animations = {};
					while (i < morph.geometry.animations.length){
						var an = morph.geometry.animations[i];
						animations[an.name] = new THREE.Animation(morph,an);
						i++;
					}
					morph.animations = animations;
				}	
			}	

			if (props && props.label !== undefined){
				var label = Label(props.label);
				label.position.x = 0;
				label.position.y = 60;
				label.position.z = 0;
				morph.add(label);
			}

			morph.castShadow = Game.castshadowLoaderObject;
			morph.receiveShadow = Game.refshadowLoaderObject; // Game.shadow;	
			dfd.resolve( morph );						
		});
					
		return dfd.promise();
	}	













L.JNload = function(m, x, y, z, r, s, props){	
		var dfd = $.Deferred();
		var jn = this.getFile(m);
		var lk = jn.indexOf("=");
		var flyobject = JSON.parse(jn.substr(lk+1));

		if (flyobject.type === "sphera"){ 
		    var map = THREE.ImageUtils.loadTexture( flyobject.texture );
	        var geometry = new THREE.SphereGeometry( 16, 16, 16 );
	        var material = new THREE.MeshLambertMaterial( {opacity:0.3,transparent:true, map:map } );
	        var morph = new THREE.Mesh( geometry, material );
	        var spriteMaterial = new THREE.SpriteMaterial( 
	        { 
	            map: new THREE.ImageUtils.loadTexture( flyobject.glow ), 
	            useScreenCoordinates: false, alignment: 'center',
	            color: parseInt(flyobject.color), transparent: false, blending: THREE.AdditiveBlending
	        });
	        var sprite = new THREE.Sprite( spriteMaterial );
	        sprite.scale.set(50,50, 1.0);
	        morph.add(sprite); 
	        y +=20;
	        	if (r.x === undefined){
				morph.rotation.x = -Math.PI / 2;
			} else {			
				morph.rotation.x = r.x;
			}
			
			if (r.y !== undefined){
				morph.rotation.y = r.y;
			}
			
			if (r.z !== undefined){
				morph.rotation.z = r.z;
			}
			
			if (x !== undefined){
				morph.position.x = x;	
			}

			if (y !== undefined){
				morph.position.y = y;	
			}

			if (z !== undefined){
				morph.position.z = z;	
			}
			
			if (s !== undefined){
				if (typeof s === "object"){
					morph.scale.set(parseFloat(s.x),parseFloat(s.y),parseFloat(s.z));
				} else {
					morph.scale.set(parseFloat(s),parseFloat(s),parseFloat(s));
				}
			}

			for(var p in props) {				
				morph[p] = props[p];								
			}	

		 	if (morph.geometry.animations){
				if (morph.geometry.animations.length > 0){
					var i = 0;
		 			var animations = {};
					while (i < morph.geometry.animations.length){
		 				var an = morph.geometry.animations[i];
						animations[an.name] = new THREE.Animation(morph,an);
		 				i++;
					}
		 			morph.animations = animations;
		 		}	
		 	}	

			if (props && props.label !== undefined){
				var label = Label(props.label);
				label.position.x = 0;
				label.position.y = 60;
				label.position.z = 0;
				morph.add(label);
			}

			morph.castShadow = Game.castshadowLoaderObject;
			morph.receiveShadow = Game.refshadowLoaderObject; // Game.shadow;	
			dfd.resolve( morph );	

	    } else {

			var JSONStaticLoader = new THREE.JSONLoader();        
			JSONStaticLoader.load( flyobject.mod , function( geometry, materials )
			{
				//var bb = geometry.boundingBox;	
				//geometry.computeMorphNormals();		
				//materials.shading = THREE.SmoothShading; 						
				morph = new THREE.SkinnedMesh( geometry, new THREE.MeshFaceMaterial( materials ) );									
																	
				// for (var k in materials) {
				// 	materials[k].skinning = true;
				// }
					 

				if (r.x === undefined){
					morph.rotation.x = -Math.PI / 2;
				} else {			
					morph.rotation.x = r.x;
				}
				
				if (r.y !== undefined){
					morph.rotation.y = r.y;
				}
				
				if (r.z !== undefined){
					morph.rotation.z = r.z;
				}
				
				if (x !== undefined){
					morph.position.x = x;	
				}

				if (y !== undefined){
					morph.position.y = y;	
				}

				if (z !== undefined){
					morph.position.z = z;	
				}
				
				if (s !== undefined){
					if (typeof s === "object"){
						morph.scale.set(parseFloat(s.x),parseFloat(s.y),parseFloat(s.z));
					} else {
						morph.scale.set(parseFloat(s),parseFloat(s),parseFloat(s));
					}
				}

				for(var p in props) {				
					morph[p] = props[p];								
				}	

				if (morph.geometry.animations){
					if (morph.geometry.animations.length > 0){
						var i = 0;
						var animations = {};
						while (i < morph.geometry.animations.length){
							var an = morph.geometry.animations[i];
							animations[an.name] = new THREE.Animation(morph,an);
							i++;
						}
						morph.animations = animations;
					}	
				}	

				if (props && props.label !== undefined){
					var label = Label(props.label);
					label.position.x = 0;
					label.position.y = 60;
					label.position.z = 0;
					morph.add(label);
				}

				morph.castShadow = Game.castshadowLoaderObject;
				morph.receiveShadow = Game.refshadowLoaderObject; // Game.shadow;	
				dfd.resolve( morph );						
			});

	    }


				 

							
		// });
					
		return dfd.promise();
	}	










	L.getFile = function(_strUrl){
		    var objTransport = false;
		    if (window.XMLHttpRequest)
		    {
		        // Mozilla, Safari,...
		        objTransport = new XMLHttpRequest();
		        if (objTransport.overrideMimeType)
		        {
		            objTransport.overrideMimeType("text/xml");
		        }
		    }
		    else if (window.ActiveXObject)
		    {
		        // IE
		        try
		        {
		            objTransport = new ActiveXObject("Msxml2.XMLHTTP");
		        }
		        catch (e)
		        {
		            try
		            {
		                objTransport = new ActiveXObject("Microsoft.XMLHTTP");
		            }
		            catch (e)
		            {
		                return false;
		            }
		        }
		    }
		    if (objTransport)
		    {
		        try
		        {
		            objTransport.open("GET", _strUrl, false);
		            objTransport.send(null);
		        }
		        catch (e) {}
		        return objTransport.responseText;
		    }
		    return false;
		}







			
	L.Load = function(m,x,y,z,r,s,props){
		return L.LoadJsonModel(m,x,y,z,r,s,props);
	}
		
	L.animLoad = function(m,s, props){
		return L._animload(m,s, props);
	}
	L.animLoadStat = function(a,m,x,y,z,r,s,props){
		if (m.substr(m.length-2) === 'js'){
			if (a === 1 ){
			//	console.log('-----------------------animation mesh');
				return L._animloadS(m,x,y,z,r,s,props);
			}else {
				return L.LoadJsonModel(m,x,y,z,r,s,props);
			}
		}
		if (m.substr(m.length-2) === 'jn'){
			return L.JNload(m,x,y,z,r,s,props);
		}

	}





})(window.Loader);