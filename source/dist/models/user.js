var mongoose = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment');

var userSchema = new mongoose.Schema({
    userName: String,
    password: String,
    email: String,
    enabled: Boolean,
    createTime: {type: Date, default: Date.now()},
    lastLoginTime: Date
});

userSchema.plugin(autoIncrement.plugin, {model: 'User', startAt: 1});

userSchema.methods = {};

userSchema.statics = {

    list: function (options, cb) {
        var filter = options.filter || {};

        this.find(filter)
            .limit(options.pageSize)
            .skip(options.pageSize * options.pageIndex)
            .exec(cb);
    },

    getById: function (id, cb) {
        this.findOne({_id: id})
            .exec(cb);
    },

    update: function (id, user, cb) {
        this.update({_id: id}, {$set: user})
            .exec(cb);
    },

    delete: function (id, cb) {
        this.remove({_id: id})
            .exec(cb);
    }
};

module.exports = mongoose.model('User', userSchema);