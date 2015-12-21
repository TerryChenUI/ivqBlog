/**
 * Created by tchen on 2015/7/24.
 */
var mongoose = require('mongoose');
//var options = {
//    db: { native_parser: true },
//    server: { poolSize: 5 },
//    replset: { rs_name: 'myReplicaSetName' },
//    user: 'myUserName',
//    pass: 'myPassword'
//}

mongoose.connect('mongodb://localhost:27017/NextBlog');
db = mongoose.connection;

db.once('open', function callback () {
    console.log('connect mongodb successfully');
});

db.on('error', function(error) {
    console.log(error);
});