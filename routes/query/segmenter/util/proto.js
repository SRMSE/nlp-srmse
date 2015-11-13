function init(){
	String.prototype.ltrim = function() {
		return this.replace(/^\s+/,"");
	}
	String.prototype.rtrim = function() {
		return this.replace(/\s+$/,"");
	}
	String.prototype.repeat = function(num) {
	    return new Array(isNaN(num)? 1 : ++num).join(this);
	}

	
}

exports.init=init;