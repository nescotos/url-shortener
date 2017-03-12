const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Counter = require('./counter.model');
const mongoosePaginate = require('mongoose-paginate');
const validator = require('node-mongoose-validator');

let urlSchema = new Schema({
 _id: {type: Number, index: {unique: true}},
 longUrl: {type: String, required:true, index: {unique: true}, validate: validator.$isURL({msg: 'Please provide a valid URL'})},
 createdAt: {type: Date, required: true, default: Date.now}
});


urlSchema.pre('save', function(next){
  var url = this;
  Counter.findByIdAndUpdate({_id: 'url_counter'}, {$inc: {seq: 1}}, (err, counter) => {
    if(err){
      return next(err);
    }
    url._id = counter.seq;
    next();
  });
});

urlSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Url', urlSchema);
