// server.js

const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
}).single('file');

app.use(cors()); // Allow cross-origin requests for development purposes
app.use(express.static(path.join(__dirname, 'public')));

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.send({ success: false, message: 'Error uploading file.' });
        } else {
            if (req.file == undefined) {
                res.send({ success: false, message: 'No file selected.' });
            } else {
                res.send({ success: true, imageUrl: `http://localhost:${port}/uploads/${req.file.filename}` });
            }
        }
    });
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
