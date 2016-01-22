var mongoose = require('mongoose');

var settingSchema = new mongoose.Schema({
    key: String,
    value: {type: mongoose.Schema.Types.Mixed}
}, {versionKey: false});

settingSchema.methods = {};

settingSchema.statics = {

    list: function (options, cb) {
        var filter = options.filter || {};

        this.find(filter)
            .exec(cb);
    },

    getAllByFilters: function (options, cb) {
        var filter = options.filter || {};

        this.find(filter)
            .exec(cb);
    },

    getByKey: function (key, cb) {
        this.findOne({key: key})
            .exec(cb);
    },

    update2: function (query, update, cb) {
        this.update(query, update)
            .exec(cb);
    }
};

module.exports = mongoose.model('Setting', settingSchema);