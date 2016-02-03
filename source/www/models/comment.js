var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
    userName: String,
    email: String,
    content: String,
    ipAddress: String,
    createTime: {type: Date, default: Date.now()},
    article: {type: mongoose.Schema.Types.ObjectId, ref: 'Article'},
    reply: {type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}
}, {versionKey: false});

commentSchema.methods = {};

commentSchema.statics = {

    list: function (options, cb) {
        var filter = options.filter || {};

        this.find(filter)
            .populate('article')
            .limit(options.count)
            .skip(options.page * options.count)
            .sort(options.sortBy)
            .exec(cb);
    },

    getById: function (id, cb) {
        this.findOne({_id: id})
            .exec(cb);
    },

    update: function (id, comment, cb) {
        this.update({_id: id}, {$set: comment})
            .exec(cb);
    },

    delete: function (id, cb) {
        this.remove({_id: id})
            .exec(cb);
    }
};

module.exports = mongoose.model('Comment', commentSchema);