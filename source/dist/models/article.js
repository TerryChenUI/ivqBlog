var mongoose = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment');

var articleSchema = new mongoose.Schema({
    title: String,
    description: String,
    author: String,
    views: {type: Number, default: 0},
    publishTime: Date,
    coverImgPath: String,
    content: String,
    publish: Boolean,
    createTime: {type: Date, default: Date.now()},
    updateTime: {type: Date, default: Date.now()},
    categoryId: Number
});

articleSchema.plugin(autoIncrement.plugin, {model: 'Article', startAt: 1});

articleSchema.methods = {};

articleSchema.statics = {

    list: function (options, cb) {
        var filter = options.filter || {};
        console.log(filter);
        this.find(filter)
            .limit(options.pageSize)
            .skip(options.pageSize * options.pageIndex)
            .exec(cb);
    },

    get: function (id, cb) {
        this.findOne({_id: id})
            .exec(cb);
    },

    update: function (id, article, cb) {
        this.update({_id: id}, {$set: article})
            .exec(cb);
    },

    delete: function (id, cb) {
        this.remove({_id: id})
            .exec(cb);
    }
};

module.exports = mongoose.model('Article', articleSchema);