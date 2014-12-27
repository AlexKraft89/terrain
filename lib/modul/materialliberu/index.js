materialliberu = function(window,undefined){
	this.constructor = materialliberu;
	var self = this;
	this.select = '';
	this.start = function(){
		$('body').append('<div id="materialliberu"></div>');
		$('#materialliberu').append(MODUL.getForm('materialliberu','main'));

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
			


			document.getElementById('texturebodye').addEventListener("click",
				self.cangeTecture	
			,false );

			//bod.addEventListener("click",self.cangeTecture,false );
		});



	}	
	this.cangeTecture = function(e){
		this.select = e.target.textContent;
		$('.textureitems').removeClass('textselect');
		$('.textureitems > span').removeClass('textselect');
		$(e.target).addClass('textselect');
	}
	this.creatmaterilhideform = function(){
		$('#creatmaterials').remove();
	}





	
}



