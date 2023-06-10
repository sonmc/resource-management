"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const perm_schema_1 = require("service/schemas/perm.schema");
class PermService {
    updateFromRouter(routers) {
        return __awaiter(this, void 0, void 0, function* () {
            const permRepo = (0, typeorm_1.getRepository)(perm_schema_1.PermSchema);
            const lastId = yield this.getLastId();
            let index = 0;
            routers.forEach((r) => __awaiter(this, void 0, void 0, function* () {
                const perm = yield this.isPermExist(r.path);
                index += 1;
                if (perm != null) {
                    const p = new perm_schema_1.PermSchema();
                    p.id = lastId + index;
                    p.label = r.path;
                    permRepo.save(p);
                }
            }));
            return { status: 'success', result: null };
        });
    }
    isPermExist(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const permRepo = (0, typeorm_1.getRepository)(perm_schema_1.PermSchema);
            const perm = (yield permRepo.findOne({
                where: {
                    name: name,
                },
            }));
            return perm;
        });
    }
    getLastId() {
        return __awaiter(this, void 0, void 0, function* () {
            const permRepo = (0, typeorm_1.getRepository)(perm_schema_1.PermSchema);
            const perm = (yield permRepo.findOne({
                order: {
                    id: 'DESC',
                },
            }));
            return perm ? perm.id : 0;
        });
    }
    update(perm) {
        return __awaiter(this, void 0, void 0, function* () {
            const permRepo = (0, typeorm_1.getRepository)(perm_schema_1.PermSchema);
            permRepo.save(perm);
            return { status: 'success', result: perm };
        });
    }
}
exports.default = new PermService();
