const router = require('express').Router()
const fs = require('fs')
const crypto = require('crypto')
router.post('/upload', (req, res) => {
   // fs.writeFileSync(req.files.file.data)
   //req.get('host') 
    //fs.WriteStream(req.files.file)
    const uniqueId = crypto.randomBytes(20).toString('hex')
    try {
        const data = req.files.file
        const filePath = "public/images/" + uniqueId + "." + data?.name.toString().split('.')[1];
        const stream = fs.createWriteStream(filePath)
        const fileUrl  = req.protocol + '://' + req.get('host') + "/" + filePath;
        stream.once('open', ()=>{
            stream.write(data.data)
            stream.end()
            res.json({fileUrl})
        })
        
        
    } catch (error) {
        res.json({message : "Write file failed : " + error.message})
    }
})


module.exports = router