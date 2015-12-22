var mongoose = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment');

var tagSchema = new mongoose.Schema({
    key: String,
    value: String
});

tagSchema.plugin(autoIncrement.plugin, 'Tag');

tagSchema.methods = {};

tagSchema.statics = {

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

    update: function(id, tag, cb){
        this.update({ _id : id }, {$set: tag})
            .exec(cb);
    },

    delete: function(id, cb){
        this.remove({ _id : id })
            .exec(cb);
    }
};

module.exports = mongoose.model('Tag', tagSchema);