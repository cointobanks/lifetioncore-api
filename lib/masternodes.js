'use strict';

var Common = require('./common');

function MasternodeController(node) {
	this.node = node;
	this.common = new Common({log: this.node.log});
}

MasternodeController.prototype.list = function(req, res) {
	var self = this;
	this.getMNList(function(err, result) {
		if (err) {
			return self.common.handleErrors(err, res);
		}
		res.jsonp(result);
	});
};
MasternodeController.prototype.getMNList = function(callback) {
	this.node.services.bitcoind.getMNList(function(err, result) {
		if (err) {
			return callback(err);
		}
		var MNlist = [];
		var keys = Object.keys(result);
		for (var i=0;i<keys.length; i++) {
			var key = keys[i];
	        var MNdetails = result[key].split(/[ ]+/); //split by whitespace
			MNlist.push({
			    vin: key,
			    status: MNdetails[0],
			    protocol: MNdetails[1],
			    payee: MNdetails[2],
			    lastseen: MNdetails[3],
			    activeseconds: MNdetails[4],
			    lastpaidtime: MNdetails[5],
			    lastpaidblock: MNdetails[6],
			    ip:  MNdetails[7]
		    });
		}
		callback(null,MNlist);
	});
};
module.exports = MasternodeController;
