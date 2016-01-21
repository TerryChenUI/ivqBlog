var mongoose = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment');

var settingSchema = new mongoose.Schema({
    key: String,
    value: {type: mongoose.Schema.Types.Mixed}
}, {versionKey: false});

settingSchema.plugin(autoIncrement.plugin, {model: 'Setting', startAt: 1});

settingSchema.methods = {};

settingSchema.statics = {

    list: function (cb) {
        this.find()
            .exec(cb);
    },

    getAllByFilters: function (options, cb) {
        var filter = options.filter || {};

        this.find(filter)
            .exec(cb);
    },

    update2: function (query, update, cb) {
        this.update(query, update)
            .exec(cb);
    }
};

module.exports = mongoose.model('Setting', settingSchema);