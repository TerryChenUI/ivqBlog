var mongoose = require('mongoose');

var articleSchema = new mongoose.Schema({
    title: String,
    description: String,
    meta: {
        title: String,
        description: String,
        keyword: String
    },
    author: String,
    views: {type: Number, default: 0},
    coverImgPath: String,
    content: String,
    publish: Boolean,
    time: {
        create: {type: Date, default: Date.now()},
        update: {type: Date, default: Date.now()},
        publish: Date
    },
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
    tags: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tag'}],
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
}, {versionKey: false});

articleSchema.pre('save', function (next) {
    if (this.isNew) {
        this.time.create = this.time.update = Date.now();
        if (this.publish) {
            this.time.publish = Date.now();
        }
    }
    next();
});

articleSchema.methods = {};

articleSchema.statics = {

    list: function (options, cb) {
        var filter = options.filter || {};
        var fields = options.fields || {};

        this.find(filter)
            .select(fields)
            .populate('category', '_id name route')
            .populate('comments', '_id')
            .sort(options.sortBy)
            .limit(options.count)
            .skip(options.page * options.count)
            .exec(cb);
    },

    getAllByFilters: function (options, cb) {
        var filter = options.filter || {};
        var sortBy = options.sortBy || {};

        this.find(filter)
            .sort(sortBy)
            .exec(cb);
    },

    getById: function (id, cb) {
        return this.findOne({_id: id})
            .populate('category', '_id name route')
            .populate('tags', '_id name route')
            .populate({
                path: 'comments',
                model: 'Comment',
                populate: {
                    path: 'reply',
                    model: 'Comment'
                }
            })
            .exec(cb);
    },

    update2: function (id, modify, cb) {
        this.update({_id: id}, {$set: modify})
            .exec(cb);
    },

    delete: function (id, cb) {
        this.remove({_id: id})
            .exec(cb);
    }
};

module.exports = mongoose.model('Article', articleSchema);