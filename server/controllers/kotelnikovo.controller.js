

module.exports = {
    uploadPdf: function (req, res, next) {

        try {
            console.log(req.file);
            res.status(200).json({
                ok: true,
                message: `Upload successful`,
                filename: req.file.filename,
                path: req.file.path,
            })
        } catch (e) {
            res.status(400).json({
                ok: false,
                message: `Error while upload`,
                filename: req.file.filename,
                path: req.file.path,
            })
        }

    }
};