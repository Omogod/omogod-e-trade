"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createError = require('http-errors');
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const method_override_1 = __importDefault(require("method-override"));
const index_1 = __importDefault(require("./routes/index"));
const users_1 = __importDefault(require("./routes/users"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const app = (0, express_1.default)();
mongoose_1.default.connect(process.env.DATABASE_URL, () => {
    console.log("Connected to database");
});
// view engine setup
app.set('views', './views');
app.set('view engine', 'ejs');
app.disable('etag');
app.use(logger('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// app.use(Cors());
app.use(cookieParser());
app.use(express_1.default.static(path.join(__dirname, "..", path.sep, 'public')));
app.use((0, method_override_1.default)('_method'));
app.use('/', index_1.default);
app.use('/users', users_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    const errorStatusCode = err.status ? err.status : 500;
    res.status(errorStatusCode);
    res.status(err.status || 500);
});
exports.default = app;
function cors() {
    throw new Error('Function not implemented.');
}
//# sourceMappingURL=app.js.map