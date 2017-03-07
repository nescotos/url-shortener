const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Counter = require('./counter.model');
let urlSchema = new Schema({
 _id: {type: Number, index: {unique: true}},
 longUrl: {type: String, index: {unique: true}},
 createdAt: {type: Date, required: true, default: Date.now}
});


urlSchema.pre('save', function(next){
  var url = this;
  Counter.findByIdAndUpdate({_id: 'url_count'}, {$inc: {seq: 1}}, (err, counter) => {
    if(err){
      return next(err);
    }
    url._id = counter.seq;
    next();
  });
});

module.exports = mongoose.model('Url', urlSchema);
