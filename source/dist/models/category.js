var mongoose = require('mongoose'),
autoIncrement = require('mongoose-auto-increment');

var categorySchema = new mongoose.Schema({
    name: String,
    description: String,
    displayOrder: String,
    enabled: Boolean,
    parentId: {type: Number, default: 0}
});

categorySchema.plugin(autoIncrement.plugin, {model: 'Category', startAt: 1});

categorySchema.methods = {};

categorySchema.statics = {

    list: function (options, cb) {
        var filter = options.filter || {};

        this.find(filter)
            .limit(options.page)
            .skip(options.page * options.count)
            .exec(cb);
    },

    getAllByFilters: function (filter, cb){
        this.find(filter).exec(cb);
    },

    getById: function (id, cb) {
        this.findOne({_id: id})
            .exec(cb);
    },

    update: function (id, model, cb) {
        this.update({_id: id}, {$set: model})
            .exec(cb);
    },

    delete: function (id, cb) {
        this.remove({_id: id})
            .exec(cb);
    }
};

module.exports = mongoose.model('Category', categorySchema);