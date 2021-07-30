"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Routes_1 = __importDefault(require("./routes/Routes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const db_1 = __importDefault(require("./settings/db/db"));
const openApi_1 = require("./settings/docs/openApi");
class Server {
    constructor() {
        this.port = process.env.PORT || '8080';
        this.app = express_1.default();
    }
    /**
     * description: start the server
     */
    start() {
        this.app.listen(this.port, () => {
            console.log('Server on port' + this.port);
        });
        this.middleware();
        this.routes();
        db_1.default();
    }
    middleware() {
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(express_1.default.json());
        const openapiSpecification = swagger_jsdoc_1.default({
            definition: {
                openapi: '3.0.0',
                info: {
                    version: '1.0',
                    title: 'Pacific culsport api',
                },
                host: 'http://localhost:8080'
            },
            apis: openApi_1.apis // files containing annotations as above
        });
        this.app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(openapiSpecification));
    }
    routes() {
        this.app.use('/', Routes_1.default);
    }
}
exports.default = Server;
