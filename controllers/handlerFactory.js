const ApiFeature = require('../utils/apiFeature');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const generateSearchObject = require('../utils/generateSearchObject');

exports.getAll = (Model, isTrashRows, ...fields) =>
  catchAsync(async (req, res, next) => {
    const others = {};

    const search = generateSearchObject(req.query.q, fields);
    let features = new ApiFeature(Model.find(search), req.query)
      .filters()
      .sort()
      .limitFields();

    if (isTrashRows) {
      others.trashRows = await Model.countDocumentsDeleted();
    }
    if (req.query.page && req.query.limit) {
      const totalRows = await features.query.clone().countDocuments();
      features = features.paginate();

      others.pagination = {
        page: req.query.page * 1 || 1,
        limit: req.query.limit * 1 || 10,
        totalRows,
      };
    }

    const docs = await features.query;

    res.status(200).json({
      status: 'success',
      docs,

      ...others,
    });
  });

exports.getAllDelete = (Model, ...fields) =>
  catchAsync(async (req, res, next) => {
    const search = generateSearchObject(req.query.q, fields);

    const features = new ApiFeature(Model.findDeleted(search), req.query)
      .filters()
      .sort()
      .limitFields();

    const totalRows = await features.query.clone().countDocuments();
    const docs = await features.paginate().query;

    await res.status(200).json({
      status: 'success',
      docs,
      pagination: {
        page: req.query.page * 1 || 1,
        limit: req.query.limit * 1 || 10,
        totalRows,
      },
    });
  });

exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id).select('-deleted -__v');

    if (!doc) return next(new AppError('No document found with that ID', 400));

    res.status(200).json({
      status: 'success',
      doc,
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    if (req.file || req.files) {
      req.doc = doc;
      return next();
    }

    res.status(200).json({
      status: 'success',
      doc,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).select('-deleted -__v');

    if (!doc) return next(new AppError('No document found with that ID', 404));

    if (req.file || (req.files && Boolean(Object.keys(req.files).length))) {
      req.doc = doc;
      return next();
    }

    res.status(200).json({
      status: 'success',
      doc,
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findOneWithDeleted({ _id: req.params.id });

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    if (doc.deleted) {
      return next(new AppError('The document was in the trash!', 400));
    }

    await Model.deleteById(req.params.id);

    res.status(200).json({
      status: 'success',
      message: 'Document moved to trash!',
      doc,
    });
  });

exports.restoreOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findOneWithDeleted({ _id: req.params.id });

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    if (!doc.deleted) {
      return next(
        new AppError('This document could not be found in the trash!', 400)
      );
    }

    await Model.restore({ _id: req.params.id });

    res.status(200).json({
      status: 'success',
      message: 'Restore this document successfully!',
      doc,
    });
  });

exports.forceDeleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) return next(new AppError('No document found with that ID!', 404));

    res.status(200).json({
      status: 'success',
      message: 'Delete this document successfully!',
    });
  });
