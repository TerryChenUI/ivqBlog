/**
 * Created by tchen on 2015/7/24.
 */
var mongoose = require('mongoose'),
	autoIncrement = require('mongoose-auto-increment'),
    setting = require('./config/setting.js');
//var options = {
//    db: { native_parser: true },
//    server: { poolSize: 5 },
//    replset: { rs_name: 'myReplicaSetName' },
//    user: 'myUserName',
//    pass: 'myPassword'
//}
autoIncrement.initialize(mongoose.connection);
mongoose.connect(setting.dbConnection);
db = mongoose.connection;

db.once('open', function callback () {
    console.log('connect mongodb successfully');
});

db.on('error', function(error) {
    console.log(error);
});