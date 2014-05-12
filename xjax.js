// 
// xjax ver 0.1 **beta**
// jQuery/php plugin
// laconic.io
//
(function($){
	//
	// main Function
	$.xjax = function(njx){
		// take url object
		if(typeof(njx) == 'string')
			njx = {'url':njx};
		// must be JSON type return
		njx.dataType = 'JSON';
		// rewrite ajax.succes to alternate
		if(typeof(njx.success) == 'function'){
			njx.success = [njx.success];	
		}else{
			njx.success = [];	
		}
		// on success loop
		njx.success.push(function(data, status, jqXHR){
			//
			// jquerey xjax loop loop
			if(data._xjax){
				var xj = data._xjax;
				for(var f=0; f < xj.length ; f++){
					//
					// define start point for chain
					if(xj[f][0] === '*'){ // window focus
						var sel = window;
					}else if(xj[f][0] === '#'){ // context
						var sel = this;
					}else if(xj[f][0] === '$'){ // jquery
						var sel = window;
					}else if(xj[f][0] === '@'){ // jquery this context
						var sel = $(this);
					}else{
						var sel = window;
					}
					//
					// loop data
					for(var a = 1 ; a < xj[f].length ; a++){
						// object passed = function
						var func = xj[f][a][0];
						var args = xj[f][a].slice(1);
						// get chained objects
						if(func.indexOf('.') > -1){
							var objs = func.split('.');
							for(var b = 0 ; b < (objs.length-1) ; b++){
								sel = sel[objs[b]];
							}
							func = objs[objs.length -1];
						}
						// set value
						if(xj[f][0] === '='){
							sel = sel[func] = args[0];
						}else{ // apply function
							sel = sel[func].apply(sel, args );
						}
					}
				}
			}
			
		});
		return $.ajax(njx);
	};
	
	//
	// disable and enable
	$.fn.disable = function(){
		this.attr('disabled', 'disabled');
	}
	$.fn.enable = function(){
		this.removeAttr('disabled');	
	}
	
	$(document).on('submit','form[data-xjax],form[xjax]',function(){
		e.preventDefault();
	});
	
}(jQuery));

