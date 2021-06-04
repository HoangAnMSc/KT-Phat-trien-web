const UploadModel = require('../model/schema')
const fs = require('fs')
const  encode  = require('querystring')


exports.home = async (req,res) => {
    const all_images = await UploadModel.find()
    res.render('main', { images : all_images});
}

exports.uploads = (req , res , next) => {
    const files = req.files;

    if(!files){
        const error = new Error('Please choose files');
        error.httpStatusCode = 400;
        return next(error)
    }

    //convert images into base64 encoding
    let imgArray = files.map((file) => {
        let img = fs.readFileSync(file.path)

        return encode_image = img.toString('base64')
    })

    let result = imgArray.map((src, index) => {

        //creat object to store data in the collection
        let finalimg = {
            filename : req.files[index].originalname,
            contentType: files[index].mimetype,
            imageBase64 : src
        }


        let newUpload = new UploadModel(finalimg);

        return newUpload
           .save()
           .then(()=> {
               return {msg :`${(files[index].originalname)} Uploaded Successfully...!`}
           })
           .catch(error =>{
               if(error){
                   if(error.name === 'MongoError' && error.code === 11000)
                   return Promise.reject({error :`Duplicate ${files[index].originalname}. File Already exists!`});
               }
               return Promise.reject({ error : error.message || `Cannot Upload ${file[index].originalname}. Something Missing`})
           })
        
    });

    Promise.all(result)
      .then(msg => {
          res.josn(msg)
          //res.redirect('/')
      })
      .catch(err => {
          res.json(err)
      })
}