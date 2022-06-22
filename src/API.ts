import express from 'express';
import cors from 'cors';
import path from 'path';
import multer from 'multer';

export class API {
    static start() {
        const app = express();
        const upload = multer({ dest: path.join(__dirname, '../uploads/') });
        const port = process.env.PORT || 80; // Specific to Heroku
        app.use(express.json());
        app.use(cors({ optionsSuccessStatus: 200 })); // Specific to freeCodeCamp projects

        app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, '../public/index.html'));
        });

        app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
            console.log(req.file);
            res.json({
                name: req.file?.originalname,
                type: req.file?.mimetype,
                size: req.file?.size,
            });
        });

        app.listen(port, () => {
            console.log(`App listening on port ${port}`);
        });
    }
}
