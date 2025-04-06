"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const users_controller_1 = require("./users.controller");
const user_entity_1 = require("./entities/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const JwtStrategy_1 = require("./JwtStrategy");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
            jwt_1.JwtModule.register({
                secret: 'gd4b6rb7478bc1fgcn4031478tcb4ydhr47t947gf47tg437fcgc7464rvc1864bcgfy03fev',
                signOptions: { expiresIn: '24h' },
            }),
        ],
        controllers: [users_controller_1.UsersController],
        providers: [users_service_1.UsersService, JwtStrategy_1.JwtStrategy],
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map