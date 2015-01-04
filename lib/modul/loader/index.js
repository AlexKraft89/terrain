loader = function(window,undefined){
	this.constructor = loader;
	var self = this;
	this.start = function(par){
		if (par.action === 'loadmaterial'){
			return this.loadmaterial(par.url);
		}
		
	}

	this.loadmaterial = function(url){
		var material = JSON.parse(MODUL._getFifle(url));
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
		console.log(material);
		return material;

	}

	this.stop = function(){

	}


}