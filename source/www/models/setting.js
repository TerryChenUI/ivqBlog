var mongoose = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment');

var settingSchema = new mongoose.Schema({
    key: String,
    value: String
}, {versionKey: false});

settingSchema.plugin(autoIncrement.plugin, {model: 'Setting', startAt: 1});

settingSchema.methods = {};

settingSchema.statics = {

    list: function (cb) {
        this.find()
            .exec(cb);
    },

    getById: function (id, cb) {
        this.findOne({_id: id})
            .exec(cb);
    },

    update2: function (id, setting, cb) {
        this.update({_id: id}, {$set: setting})
            .exec(cb);
    },

    delete: function (id, cb) {
        this.remove({_id: id})
            .exec(cb);
    }
};

module.exports = mongoose.model('Setting', settingSchema);