const {
  addChildWork,
  addArchitectWork,
  countChildWorks,
  countArchitectWorks,
  getChildWorks,
  getArchitectWorks,
} = require(`../db/kotelnikovo/works.model`);
const _ = require(`lodash`);
const fs = require(`fs`);
const path = require(`path`);

const multer = require(`multer`);

const RESULTS_ON_PAGE = 10;

const uploadChild = multer({
  storage: multer.memoryStorage(),
  limits: {
    fieldNameSize: 255,
    fileSize: 1 * 1024 * 1024, // 1Mb
  },
})
  .fields([{
    name: `work`,
    maxCount: 1,
  }]);

const uploadArchitect = multer({
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

const errorResponse = (res, message) => res.status(400)
  .json({
    ok: false,
    message,
  });

const checkValidCompetition = (competition) => !(competition !== `child` && competition !== `architect`);

const uploadFile = (file) => {
  const buffer = _.get(file, `buffer`);
  const fileName = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;
  const wstream = fs.createWriteStream(`./public/uploads/${fileName}`);
  wstream.write(buffer);
  return fileName;
};

module.exports = {
  uploadChildWork: (req, res) => {
    uploadChild(req, res, (err) => {
      if (err) {
        errorResponse(res, `Ошибка загрузки файлов: ${_.get(err, `message`, `неопознанная ошибка`)}`);
        return;
      }

      const {
        name,
        age,
        studyPlace,
        aboutWork: workAbout,
      } = req.body;
      if (!name || !age || !studyPlace || !workAbout) {
        errorResponse(res, `Не заполнены обязательные поля`);
        return;
      }

      const workFile = getFile(_.get(req, `files`), `work`);

      if (!workFile) {
        errorResponse(res, `Отсутствует один или несколько файлов`);
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

      const workFileName = uploadFile(workFile);

      addChildWork({
        name,
        age,
        studyPlace,
        workAbout,
        work: workFileName,
      })
        .then(() => {
          res.status(200)
            .json({
              ok: true,
              message: `Upload successful`,
              data: {
                name,
                age,
                studyPlace,
                workAbout,
                files: [{ type: `work`, filename: workFileName }],
              },
            });
        })
        .catch((error) => {
          console.log(error);
          errorResponse(res, _.get(error, `response`, `Ошибка во время сохранения работы`));
        });
    });
  },
  uploadArchitectWork: (req, res) => {
    uploadArchitect(req, res, (err) => {
      if (err) {
        errorResponse(res, `Ошибка загрузки файлов: ${_.get(err, `message`, `неопознанная ошибка`)}`);
        return;
      }

      const {
        name,
        age,
        studyPlace,
        aboutWork: workAbout,
      } = req.body;
      if (!name || !age || !studyPlace || !workAbout) {
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

      addArchitectWork({
        name,
        age,
        studyPlace,
        workAbout,
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
                age,
                studyPlace,
                workAbout,
                files: [
                  { type: `photo`, filename: photoFileName },
                  { type: `work`, filename: workFileName },
                ],
              },
            });
        })
        .catch((error) => {
          console.log(error);
          errorResponse(res, _.get(error, `response`, `Ошибка во время сохранения работы`));
        });
    });
  },
  getWorksCount: async (req, res) => {
    const { competition } = req.query;
    try {
      if (!checkValidCompetition(competition)) throw new Error(`Запрашиваемого конкурса не существует`);
      const getCount = competition === `child` ? countChildWorks : countArchitectWorks;
      const resultsAmount = await getCount();
      const pagesAmount = resultsAmount ? _.ceil(resultsAmount / RESULTS_ON_PAGE) : 1;
      res.status(200)
        .json({
          ok: true,
          message: `Success`,
          data: {
            resultsAmount,
            pagesAmount,
          },
        });
    } catch (e) {
      errorResponse(res, _.get(e, `response`, `Uncaught error`));
    }
  },
  getWorksPage: async (req, res) => {
    const { competition, page: currentPage } = req.query;

    const from = RESULTS_ON_PAGE * (currentPage - 1);
    try {
      if (!checkValidCompetition(competition)) throw new Error(`Запрашиваемого конкурса не существует`);
      const getWorks = competition === `child` ? getChildWorks : getArchitectWorks;
      const response = await getWorks({ from, limit: RESULTS_ON_PAGE });
      res.status(200)
        .json({
          ok: true,
          message: `Success`,
          data: response,
        });
    } catch (e) {
      errorResponse(res, _.get(e, `response`, `Uncaught error`));
    }
  },
};
