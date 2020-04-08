const { addWork, getWorks } = require(`../db/kotelnikovo/works.model`);
const _ = require(`lodash`);
const fs = require(`fs`);
const path = require(`path`);

const multer = require(`multer`);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fieldNameSize: 255,
    fileSize: 1 * 1024 * 1024, // 1Mb
  },
})
  .fields([{
    name: `photo`,
    maxCount: 1,
  }, {
    name: `work`,
    maxCount: 1,
  }]);

const getFile = (files, name) => _.first(_.get(files, name));

const checkFileLimits = ({ file, maxSize, availableTypes }) => {
  const fileSize = _.get(file, `size`);
  const fileType = _.get(file, `mimetype`);
  const fileName = _.get(file, `originalname`);

  if (!_.includes(availableTypes, fileType)) {
    return `Недопустимое расширение файла ${fileName}`;
  }

  if (fileSize > maxSize) {
    return `Превышен максимальный размер файла ${fileName}`;
  }

  return null;
};

const errorResponse = (res, message) => res.status(400).json({ ok: false, message });

const uploadFile = (file) => {
  const buffer = _.get(file, `buffer`);
  const fileName = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;
  const wstream = fs.createWriteStream(`./public/uploads/${fileName}`);
  wstream.write(buffer);
  return fileName;
};

module.exports = {
  uploadWork: (req, res) => {
    upload(req, res, (err) => {
      if (err) {
        errorResponse(res, `Ошибка загрузки файлов: ${_.get(err, `message`, `неопознанная ошибка`)}`);
        return;
      }

      const { name, about } = req.body;
      if (!name || !about) {
        errorResponse(res, `Не заполнены обязательные поля`);
        return;
      }

      const photoFile = getFile(_.get(req, `files`), `photo`);
      const workFile = getFile(_.get(req, `files`), `work`);

      if (!photoFile || !workFile) {
        errorResponse(res, `Отсутствует один или несколько файлов`);
        return;
      }

      const photoFileErrors = checkFileLimits({
        file: photoFile,
        maxSize: 1 * 1024 * 1024,
        availableTypes: [`image/jpeg`, `image/pjpeg`, `image/png`],
      });

      if (photoFileErrors) {
        errorResponse(res, photoFileErrors);
        return;
      }

      const workFileErrors = checkFileLimits({
        file: workFile,
        maxSize: 1 * 1024 * 1024,
        availableTypes: [`application/pdf`],
      });

      if (workFileErrors) {
        errorResponse(res, workFileErrors);
        return;
      }

      const photoFileName = uploadFile(photoFile);
      const workFileName = uploadFile(workFile);

      addWork({
        name,
        about,
        photo: photoFileName,
        work: workFileName,
      })
        .then(() => {
          res.status(200)
            .json({
              ok: true,
              message: `Upload successful`,
              data: {
                name,
                about,
                files: [
                  {
                    type: `photo`,
                    filename: photoFileName,
                  },
                  {
                    type: `work`,
                    filename: workFileName,
                  },
                ],
              },
            });
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error);
          errorResponse(res, `Ошибка во время сохранения работы`);
        });
    });
  },
  getWorks: (req, res) => {
    getWorks()
      .then((response) => {
        res.status(200)
          .json({
            ok: true,
            message: `Success`,
            data: response,
          });
      })
      .catch((error) => {
        console.log(error);
        res.status(400)
          .json({
            ok: false,
            message: _.get(error, `response`, `Uncaught error`),
            data: [],
          });
      });
  },
};
