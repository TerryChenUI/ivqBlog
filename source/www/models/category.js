/**
 * Created by tchen on 2015/7/24.
 */
var mongoose = require('mongoose');
var CategorySchema = new mongoose.Schema({
    Name: {type: String, default: ''},
    Description: {type: String, default: ''},
    DisplayOrder: {type: Number, default: ''},
    Enabled: {type: Boolean, default: false},
    ParentId: {type: Number, default: 0}
});

CategorySchema.methods = {
    //create: function(cb){
    //    console.log(this);
    //    this.save()
    //        .exec(cb);
    //}
};

CategorySchema.statics = {

    list: function(options, cb){
        var filter = options.filter || {};

        this.find(filter)
            .limit(options.pageSize)
            .skip(options.pageSize * options.pageIndex)
            .exec(cb);
    },

    get: function (id, cb) {
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

module.exports = mongoose.model('Category', CategorySchema);