var mongoose = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment');

var commentSchema = new mongoose.Schema({
    userName: String,
    email: String,
    content: Boolean,
    createTime: {type: Date, default: Date.now()},
    articleId: type: Date
});

commentSchema.plugin(autoIncrement.plugin, 'Comment');

commentSchema.methods = {};

commentSchema.statics = {

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

    update: function(id, comment, cb){
        this.update({ _id : id }, {$set: comment})
            .exec(cb);
    },

    delete: function(id, cb){
        this.remove({ _id : id })
            .exec(cb);
    }
};

module.exports = mongoose.model('Comment', commentSchema);