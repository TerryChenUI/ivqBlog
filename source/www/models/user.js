/**
 * Created by tchen on 2015/7/24.
 */
var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    UserName: {type: String, default: ''},
    Password: {type: String, default: ''}
});

UserSchema.methods = {
    //create: function(cb){
    //    console.log(this);
    //    this.save()
    //        .exec(cb);
    //}
};

UserSchema.statics = {

    list: function(options, cb){
        var filter = options.filter || {};

        this.find(filter)
            .limit(options.pageSize)
            .skip(options.pageSize * options.pageIndex)
            .exec(cb);
    },

    getById: function (id, cb) {
        this.findOne({ _id : id })
            .exec(cb);
    },

    update: function(id, category, cb){
        this.update({ _id : id }, {$set: category})
            .exec(cb);
    },

    delete: function(id, cb){
        this.remove({ _id : id })
            .exec(cb);
    }
};

module.exports = mongoose.model('User', UserSchema);