materialliberu = function(window,undefined){
	this.constructor = materialliberu;
	var self = this;
	this.start = function(){
		$('body').append('<div id="materialliberu"></div>');
		$('#materialliberu').append(MODUL.getForm('materialliberu','main'));

	}
	this.stop = function(){

	}





	
}



