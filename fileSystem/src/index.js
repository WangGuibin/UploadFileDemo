var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require('fs');
const { saveFile, getFile } = require('./file-opt');
const { cors } = require('./cors');
var app = new express();
const port = 3000
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: 'temp/' }).array('file'));
app.use(cors)
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.post('/uploadfile', (req, res) => {
    req.files.forEach((file) => {
        const { filename } = file;
        /*
        {
          fieldname: 'file',
          originalname: '1',
          encoding: '7bit',
          mimetype: 'application/pdf',
          destination: 'temp/',
          filename: 'a0f6cb13a94f144b30dd71335c99c3c7',
          path: 'temp/a0f6cb13a94f144b30dd71335c99c3c7',
          size: 261844
        }
        */
        console.log(file);
        saveFile(file).then((ress) => {
            res.send({ path: ress });
        }).catch((error) => {
            res.send(error);
        });
    });
});
app.use(express.static('public'));

app.get('/getFiles', (req, res) => {
    if (req.query.path) {
        getFile(req.query.path).then(({ data, type }) => {
            res.type(type);
            res.end(data);
        }, (err) => {
            res.send({ msg: '图片获取失败', code: '400' });
        });
    } else {
        res.send({});
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})