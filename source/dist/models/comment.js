var mongoose = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment');

var commentSchema = new mongoose.Schema({
    name: String,
    email: String,
    content: String,
    createTime: {type: Date, default: Date.now()},
    article: {type: Number, ref: 'Article'},
    reply: {type: Number, ref: 'Comment'}
}, {versionKey: false});

commentSchema.plugin(autoIncrement.plugin, {model: 'Comment', startAt: 1});

commentSchema.methods = {};

commentSchema.statics = {

    list: function (options, cb) {
        var filter = options.filter || {};

        this.find(filter)
            .limit(options.count)
            .skip(options.page * options.count)
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