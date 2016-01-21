var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
    name: String,
    route: String,
    description: String,
    displayOrder: Number,
    enabled: Boolean
}, {versionKey: false});

categorySchema.methods = {};

categorySchema.statics = {

    list: function (options, cb) {
        var filter = options.filter || {};

        this.find(filter)
            .sort(options.sortBy)
            .limit(options.count)
            .skip(options.page * options.count)
            .exec(cb);
    },

    getAllByFilters: function (options, cb) {
        var filter = options.filter || {};
        var fields = options.fields || {};
        var sortBy = options.sortBy || {};

        this.find(filter)
            .select(fields)
            .sort(sortBy)
            .exec(cb);
    },

    getById: function (id, cb) {
        this.findOne({_id: id})
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

module.exports = mongoose.model('Category', categorySchema);