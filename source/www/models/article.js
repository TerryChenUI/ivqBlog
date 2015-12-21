/**
 * Created by tchen on 2015/7/24.
 */
var mongoose = require('mongoose');
var ArticleSchema = new mongoose.Schema({
    Title: {type: String, default: ''},
    Description: {type: String, default: ''},
    Author: {type: String, default: ''},
    Views: {type: Number, default: 0},
    Content: {type: String, default: ''},
    Publish: {type: Boolean, default: false},
    CreateTime: {type: Date, default: Date.now()},
    UpdateTime: {type: Date, default: Date.now()},
    PublishTime: {type: Date, default: ''},
    PictureId: {type: Number},
    CategoryId: {type: Number}
});

ArticleSchema.methods = {

};

ArticleSchema.statics = {

    list: function(options, cb){
        var filter = options.filter || {};
        console.log(filter);
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

module.exports = mongoose.model('Article', ArticleSchema);