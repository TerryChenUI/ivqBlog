var mongoose = require('mongoose'),
    setting = require('./config/setting.js');
//var options = {
//    db: { native_parser: true },
//    server: { poolSize: 5 },
//    replset: { rs_name: 'myReplicaSetName' },
//    user: 'myUserName',
//    pass: 'myPassword'
//}
mongoose.connect(setting.dbConnection);
db = mongoose.connection;

db.once('open', function callback () {
    console.log('connect mongodb successfully');
});

db.on('error', function(error) {
    console.log(error);
});