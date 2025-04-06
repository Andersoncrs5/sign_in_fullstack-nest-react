"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const CryptoService_1 = require("../CryptoService");
const jwt_1 = require("@nestjs/jwt");
let UsersService = class UsersService {
    repository;
    jwtService;
    constructor(repository, jwtService) {
        this.repository = repository;
        this.jwtService = jwtService;
    }
    async createAsync(createUserDto) {
        const queryRunner = this.repository.manager.connection.createQueryRunner();
        await queryRunner.startTransaction();
        try {
            const checkEmail = await this.repository.exists({ where: { email: createUserDto.email } });
            if (checkEmail == true) {
                throw new common_1.ConflictException('email in use!!');
            }
            createUserDto.password = await CryptoService_1.CryptoService.encrypt(createUserDto.password);
            const user = queryRunner.manager.create(user_entity_1.User, createUserDto);
            await queryRunner.manager.save(user);
            await queryRunner.commitTransaction();
            const foundUser = await queryRunner.manager.findOne(user_entity_1.User, { where: { email: user.email } });
            if (!foundUser) {
                throw new common_1.NotFoundException('Error the create the token');
            }
            const payload = { sub: foundUser.id, email: foundUser.email };
            const accessToken = this.jwtService.sign(payload);
            const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
            foundUser.refreshToken = refreshToken;
            await this.repository.save(foundUser);
            return { access_token: accessToken, refresh_token: refreshToken };
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw new common_1.InternalServerErrorException(error);
        }
        finally {
            await queryRunner.release();
        }
    }
    async findOneAsync(id) {
        if (!id) {
            throw new common_1.BadRequestException('User ID is required');
        }
        const user = await this.repository.findOne({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }
    async updateAsync(id, updateUserDto) {
        if (!Object.keys(updateUserDto).length) {
            throw new common_1.BadRequestException('Update data is required');
        }
        const queryRunner = this.repository.manager.connection.createQueryRunner();
        await queryRunner.startTransaction();
        try {
            if (updateUserDto.password) {
                updateUserDto.password = await CryptoService_1.CryptoService.encrypt(updateUserDto.password);
            }
            await queryRunner.manager.update(user_entity_1.User, id, updateUserDto);
            const user = await this.findOneAsync(id);
            await queryRunner.commitTransaction();
            return user;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw new common_1.InternalServerErrorException(error);
        }
        finally {
            await queryRunner.release();
        }
    }
    async removeAsync(id) {
        const queryRunner = this.repository.manager.connection.createQueryRunner();
        await queryRunner.startTransaction();
        try {
            const user = await this.findOneAsync(id);
            await queryRunner.manager.delete(user_entity_1.User, id);
            await queryRunner.commitTransaction();
            return 'User deleted';
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw new common_1.InternalServerErrorException(error);
        }
        finally {
            await queryRunner.release();
        }
    }
    async LoginAsync(userDto) {
        try {
            const foundUser = await this.repository.findOne({ where: { email: userDto.email } });
            if (!foundUser) {
                return false;
            }
            const isPasswordCorrect = await CryptoService_1.CryptoService.compare(userDto.password, foundUser.password);
            if (!isPasswordCorrect) {
                return false;
            }
            const payload = { sub: foundUser.id, email: foundUser.email };
            const accessToken = this.jwtService.sign(payload);
            const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
            foundUser.refreshToken = refreshToken;
            await this.repository.save(foundUser);
            return { access_token: accessToken, refresh_token: refreshToken };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async logout(userId) {
        const user = await this.repository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.UnauthorizedException('Usuário não encontrado');
        }
        user.refreshToken = null;
        await this.repository.save(user);
        return { message: 'Logout realizado com sucesso' };
    }
    async refreshToken(refreshToken) {
        try {
            const payload = this.jwtService.verify(refreshToken);
            const foundUser = await this.repository.findOne({
                where: { id: payload.sub, refreshToken },
            });
            if (!foundUser) {
                throw new common_1.UnauthorizedException('Refresh token inválido');
            }
            const newAccessToken = this.jwtService.sign({ sub: foundUser.id, email: foundUser.email });
            return { access_token: newAccessToken };
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Refresh token inválido ou expirado');
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], UsersService);
//# sourceMappingURL=users.service.js.map