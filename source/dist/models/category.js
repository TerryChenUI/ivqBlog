var mongoose = require('mongoose')
    autoIncrement = require('mongoose-auto-increment');

var categorySchema = new mongoose.Schema({
    name: String,
    description: String,
    displayOrder: String,
    enabled: Boolean,
    parentId: {type: Number, default: 0}
});

categorySchema.plugin(autoIncrement.plugin, 'Category');

categorySchema.methods = {};

categorySchema.statics = {

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

module.exports = mongoose.model('Category', categorySchema);