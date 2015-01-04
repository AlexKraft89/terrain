elementcreator = function(window,undefined){
	this.constructor = elementcreator;
	var self = this;
	this.ymojatel = 1;
	this.start = function(){
		WINDOW.creat("elementcreator",{"header":"Создать"});
		WINDOW.addItem("elementcreator","Ландшафт",function(){
			self.creatlandscape();
		});


	}
	this.stop = function(){
		WINDOW.remove("elementcreator");
		$('#creatterrain').remove();
	}

	this.creatlandscape = function(){
		//this.creatPlane(10000,10000,50,50,"yhfgj");
		//alert('Создан');
		var self = this;
		// new ModalWindow('Создать ландшафт',['width','height','wsegment','hsegment','name'],function(par){
		// 	self.CreatPlane(par.width,par.height,par.wsegment,par.hsegment,par.name);
		// });
		
		$('body').append('<div id="creatterrain"></div>');
		$('#creatterrain').append(MODUL.getForm('elementcreator','createlement'));

		document.getElementById('modulclicktoselmaterial').addEventListener("click",this.selectmaterialtolandscape,false );
		document.getElementById('savenewlandscape').addEventListener("click",this.savenewlandscape,false );		

	}
	this.savenewlandscape = function(){
		var name = $('#landscpe_name').val();
		var width    = parseInt($('#landscpe_width').val());
		var height   = parseInt($('#landscpe_heigth').val());
		var hsegment = parseInt($('#landscpe_Hsegment').val());
		var wsegment = parseInt($('#landscpe_Wsegment').val());
		var material = $('#modulclicktoselmaterial_val').val();
		if (name !== undefined && width !== undefined){
			self.CreatPlane(width,height,wsegment,hsegment,name,material);
		}
	}
	this.selectmaterialtolandscape = function(){
		MODUL.start('materialliberu',{"click":true,"callback":function(e){
			if (e.target.textContent === "Выбрать"){
				var sel = $(e.target);
				var img = sel.data('img');
				var file = sel.data('file');
				$('#modulclicktoselmaterial').css('background-image',"url('"+img+"')");
				$('#modulclicktoselmaterial_val').val(file);
				MODUL.stop('materialliberu');
			}
		}});
	}

	this.CreatPlane = function(width,height,wsegment,hsegment,name,materials){

		//cosole.log('qwe');
		var material = MODUL.start('loader',{'action':'loadmaterial','url':materials});



		var geometry = new THREE.PlaneGeometry(width,height,wsegment,hsegment);
		geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );
		
		
		var plane = new THREE.Mesh( geometry, material );
		plane.materialURL = materials;
		plane.height = height;
		plane.width = width;
		plane.wsegment = wsegment;
		plane.hsegment = hsegment;


		plane.name = name;
		plane.castShadow = true;
		plane.receiveShadow = true;
		plane.types = "landscape";

		//set height of vertices
		scene.add(plane);
		plane.material.needsUpdate = true;
		//World.planes.push(plane);
		GUI.sceneObjectPanel.refresh(scene);
		MODUL.stop('elementcreator');
	}

	
}



