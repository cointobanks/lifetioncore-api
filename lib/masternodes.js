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
	this.node.services.bitcoind.getMNList(function(err, result){
		var MNList = result || [];
		if (err) {
			return callback(err);
		}
		callback(null,MNList);
	});
};
module.exports = MasternodeController;
