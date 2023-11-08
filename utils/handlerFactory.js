const AppError = require("./appError");

const catchAsync = require("./catchAsync");
const sendResponse = require("./sendResponse");
const StatusCode = require("./statusCode");
const queryToPrisma = require("./queryToPrisma");

exports.createOne = (Model) =>
  catchAsync(async (request, response, next) => {
    const document = await Model.create({
      data: {
        ...request.body,
      },
    });
    sendResponse(document, response);
  });

exports.getAll = (Model, include) =>
  catchAsync(async (request, response, next) => {
    const { skip, limit, sort, filter } = queryToPrisma(request.query);
    const [total, result] = await Promise.all([
      Model.count({
        where: filter,
      }),
      Model.findMany({
        include,
        skip,
        take: limit,
        where: filter,
        orderBy: sort,
      }),
    ]);

    return sendResponse({ total, returned: result.length, result }, response);
  });

exports.getOne = (Model, include) =>
  catchAsync(async (request, response, next) => {
    const document = await Model.findUnique({
      where: {
        id: parseInt(request.params.id, 10),
      },
      include,
    });

    if (!document) throw new AppError(StatusCode.Code.NOT_FOUND_DOCUMENT.code);

    return sendResponse(document, response);
  });

exports.updateOne = (Model) =>
  catchAsync(async (request, response, next) => {
    const document = await Model.update({
      where: {
        id: parseInt(request.params.id, 10),
      },
      data: {
        ...request.body,
      },
    });

    if (!document) throw new AppError(StatusCode.Code.NOT_FOUND_DOCUMENT.code);

    return sendResponse(document, response);
  });

exports.deleteOne = (Model) =>
  catchAsync(async (request, response, next) => {
    const document = await Model.delete({
      where: {
        id: parseInt(request.params.id, 10),
      },
    });
    if (!document) throw new AppError(StatusCode.Code.NOT_FOUND_DOCUMENT.code);

    // in RESTful API, common practice is not send anything back to client when deleted
    return sendResponse(undefined, response);
  });

exports.sendArray = (value) => (request, response, next) => {
  sendResponse(value, response);
};
