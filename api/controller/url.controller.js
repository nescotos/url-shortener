const URL = require('../models/url.model');
const config = require('../config');
const base58 = require('base58');

module.exports = {
  getAllUrls : (req, res) => {
    let page;
		if(!req.query.page || req.query.page < 2){
			page = 1;
		}else{
			page = req.query.page;
		}
		let options = {
			select: 'longUrl',
			page: page,
			limit: config.URLPAGINATION
		};
		URL.paginate({}, options).then((result) => {
			res.json({status: true, page: result.page, pages: result.pages, urls: result.docs});
		});
  },
  saveUrl: (req, res) => {
    if(!req.body.url){
      return res.status(400).json({status: false, message: 'No url provided'});
    }
    let httpPrefixed = req.body.url.split('://')[0];
    if(config.SUPPORTED_PROTOCOLS.indexOf(httpPrefixed) == -1){
      req.body.url = `http://${req.body.url}`;
    }
    URL.find({longUrl: req.body.url}, (err, urlFound) => {
      if(err){
        return res.json({status: false, message: 'Something Went Wrong'});
      }
      if(urlFound[0]){
        let shortenUrl = `${config.HOST}${base58.encode(urlFound[0]._id)}`;
        return res.json({status: false, message: 'Duplicated URL', shortenUrl: shortenUrl});
      }else{
        let url = new URL();
        url.longUrl = req.body.url;
        url.save((err) => {
          if(err){
            if(err.errors && err.errors.longUrl){
              return res.status(400).json({status: false, message: err.errors.longUrl.message});
            }
            return res.json({status: false, message: 'Something Went Wrong'});
          }
          let shortenUrl = `${config.HOST}${base58.encode(url._id)}`;
          return res.json({status: true, message: 'Shorten Correctly', shortenUrl: shortenUrl});
        });
      }
    });
  },
  getUrl: (req, res) => {
    let base58Decode = base58.decode(req.params.id);
    URL.findById(base58Decode, (err, url) => {
      if(err){
        return res.json({status: false, message: 'Something Went Wrong'});
      }
      if(!url){
        return res.json({status: false, message: 'URL not found!'});
      }
      return res.json({status: true, message: 'Enjoy you URL', url: url.longUrl});
    });
  }
};
