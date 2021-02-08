"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AzureBlobAdsQueryRepo = void 0;
var storage_blob_1 = require("@azure/storage-blob");
var utils_1 = require("../../utils");
var lodash_1 = require("lodash");
var AzureBlobAdsQueryRepo = /** @class */ (function () {
    function AzureBlobAdsQueryRepo() {
        if (process.env.AZURE_STORAGE_CONNECTION_STRING) {
            this.blobClient = storage_blob_1.BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
        }
        else {
            throw new Error("Cannot get Connection to Azure Blobs");
        }
    }
    AzureBlobAdsQueryRepo.getInstance = function () {
        if (!this.azureConnection) {
            this.azureConnection = new AzureBlobAdsQueryRepo();
        }
        return this.azureConnection;
    };
    AzureBlobAdsQueryRepo.prototype.save = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var idGenerator, containerName, containerClient, blockBlobClient, data, blobData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Save the Query in Azure Blob Storage");
                        idGenerator = new utils_1.IdGenerator();
                        containerName = "" + idGenerator.generate("sourav");
                        console.log(containerName);
                        containerClient = this.blobClient.getContainerClient('sourav');
                        return [4 /*yield*/, containerClient.createIfNotExists()];
                    case 1:
                        _a.sent();
                        blockBlobClient = containerClient.getBlockBlobClient(query.id + ".json");
                        data = __assign({ id: query.id, location: query.location, queryString: query.query }, query.filters);
                        data = lodash_1.pickBy(data, lodash_1.identity);
                        blobData = JSON.stringify(data);
                        return [4 /*yield*/, blockBlobClient.upload(blobData, blobData.length)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    AzureBlobAdsQueryRepo.prototype.getQueriesByUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, []];
            });
        });
    };
    AzureBlobAdsQueryRepo.prototype.delete = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, true];
            });
        });
    };
    return AzureBlobAdsQueryRepo;
}());
exports.AzureBlobAdsQueryRepo = AzureBlobAdsQueryRepo;
//# sourceMappingURL=AzureBlobAdsQuery.js.map