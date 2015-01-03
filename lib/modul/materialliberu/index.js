materialliberu = function(window,undefined){
	this.constructor = materialliberu;
	var self = this;
	this.select = '';
	this.start = function(){
		$('body').append('<div id="materialliberu"></div>');
		$('#materialliberu').append(MODUL.getForm('materialliberu','main'));


		$.get('/lib/modul/materialliberu/php/',{'action':'getmaterial'},function(response){
			var material =  JSON.parse(response);
			var ml = material.length;
			while(ml--){
				var mat = material[ml];
				$('.materiallibery > .body > .rightrow').append('<div class="mainmaterial">'+
							'<div class="img"><img width="50px" src="'+mat.IMG+'"></div>'+
							'<div class="namebody">'+mat.IMG+'</div>'+
							'</div>');
			}	

			console.log('getmaterial',material);
		});


		document.getElementById('creatnewmaterial').addEventListener("click",this.creatmaterilshowform,false );
		

	}
	this.stop = function(){
		$('#materialliberu').remove();
	}
	this.creatmaterilshowform = function(){
		//var self = this;
		$('body').append('<div id="creatmaterials"></div>');
		$('#creatmaterials').append(MODUL.getForm('materialliberu','creatmaterial'));
		document.getElementById('closecreatmaterial').addEventListener("click",self.creatmaterilhideform,false );
	
		$.get('/lib/modul/materialliberu/php/',{'action':'gettexture'},function(response){
			var res = JSON.parse(response);
			var rl = res.length;
			while(rl--){
				$('.maincreatmaterial > .body > .texturebody').append('<div class="item textureitems">'+
								'<div class="img">'+
									'<img src="'+res[rl].FILE+'" height="50px">'+
								'</div>'+
								'<span>'+res[rl].FILE+'</span>		'+
							'</div>');
			}
			


			document.getElementById('texturebodye').addEventListener("click",self.cangeTecture,false );
			document.getElementById('savematerials').addEventListener("click",self.savematerial,false );

			//bod.addEventListener("click",self.cangeTecture,false );
		});



	}	
	this.savematerial = function(){
		var name = $('#mateialname').val();
		var tip  = $('#tipmaterial').val();
		var select = self.select;
		console.log(select);
		if (name == '' || tip == '' || select == ''){
			alert('Заполните все поля и выберите текстуру');
			return;
		} else {
			$.get('/lib/modul/materialliberu/php/',{'action':'savetexture','img':select, 't':tip,'n':name},function(response){
				if (response !== 'ERROR'){
					self.creatmaterilhideform();
				}
			});
		}

	}
	this.cangeTecture = function(e){
		self.select = e.target.textContent;
		//console.log(this.select);
		$('.textureitems').removeClass('textselect');
		$('.textureitems > span').removeClass('textselect');
		$(e.target).addClass('textselect');
	}
	this.creatmaterilhideform = function(){
		$('#creatmaterials').remove();
	}





	
}



