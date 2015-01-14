transform = function(window,undefined){
	this.constructor = transform;
	var self = this;
	this.controlOb = new THREE.TransformControls( camera , renderer.domElement );		
	this.controlOb.e = false;
	this.object = undefined;  
	this.start = function(){
		//console.log(par,'asdasdasd');
		if (GUI.sceneObjectPanel.changeObject === undefined){
			this.stop();
			return;
		}

		this.object = GUI.sceneObjectPanel.selectobject;
		this.controlOb.e  = true;
		this.controlOb.attach( this.object );
		Game.scene.add( this.controlOb );



		WINDOW.creat("transform",{"header":"Модифицировать обьект"});
		WINDOW.addItem("transform","Перетащить",function(){
			//self.creatlandscape();
			 self.controlOb.setMode( "translate" );
		});

		WINDOW.addItem("transform","Вращать",function(){
			//self.creatlandscape();
			self.controlOb.setMode( "rotate" );
		});

		WINDOW.addItem("transform","Размер",function(){
			//self.creatlandscape();
			self.controlOb.setMode( "scale" );
		});


	}
	this.stop = function(){

		WINDOW.remove("transform");
		this.controlOb.detach(this.object);
		this.controlOb.e  = false;
		this.object = undefined;	
	}

}



