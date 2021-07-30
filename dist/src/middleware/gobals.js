"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressValidatorErrors = void 0;
const express_validator_1 = require("express-validator");
const helper_1 = require("../helpers/helper");
const expressValidatorErrors = (req, res, next) => {
    const errors = express_validator_1.validationResult(req);
    if (errors.isEmpty())
        return next();
    return helper_1.unSuccesfulResponse(res, errors);
};
exports.expressValidatorErrors = expressValidatorErrors;
