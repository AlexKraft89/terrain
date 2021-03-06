MODUL = {
	'path':'/lib/modul/',
	'array':{},
	"stopAll":function(){
		for(m in this.array){
			this.stop(m);
		}
	},
	"load":function(modulname){
		var url = this.path + modulname + "/index.js";
		var file = this._getFifle(url);
		var m = eval(file);
		this.array[modulname] = new m(window);
		this.array[modulname].started = false;
	},
	"getForm":function(modulname,formname){
		var url = this.path + modulname + "/form/"+formname+".html";
		return this._getFifle(url);
	},
	"_getFifle":function(_strUrl){
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
		},
	"init":function(){

	},
	"get":function(name){
		return this.array[name];
	},
	"start":function(name,par){
		if(this.array[name].started === false){
			this.array[name].started = true;
			return this.array[name].start(par);
		} 
	},
	"stop":function(name){
		this.array[name].started = false;
		this.array[name].stop();
	}
}