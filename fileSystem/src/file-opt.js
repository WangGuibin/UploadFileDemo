var fs = require('fs');
var baseFile = './UploadFiles/';
exports.saveFile = function (file) {
    if (!fs.existsSync(baseFile)) {
        fs.mkdirSync(baseFile);
    }

    const fileName = encodeURIComponent(new Date().getTime() + '__' + file.originalname);
    return new Promise((resolve, reject) => {
        fs.readFile(file.path, function (err, data) {
            try {
                fs.writeFile(baseFile + fileName, data, function (error) {
                    if (error) {
                        reject(error)
                    } else {
                        resolve(fileName);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    });
}

exports.getFile = (path) => {
    const type = path.split('.').pop();
    const fileName = encodeURIComponent(path);
    return new Promise((resolve, reject) => {
        fs.readFile(baseFile + fileName, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve({ type, data });
            }
        })
    });
}