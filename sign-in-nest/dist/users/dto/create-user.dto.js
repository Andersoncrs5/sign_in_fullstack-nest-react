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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateUserDto {
    name;
    email;
    password;
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, class_validator_1.IsString)({ message: "The field name should be a string" }),
    (0, class_validator_1.IsNotEmpty)({ message: "The field name cannot be null" }),
    (0, class_validator_1.Length)(1, 100, { message: "The max length of name is 100 and min is 1" }),
    (0, swagger_1.ApiProperty)({ example: "" }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "The field email should be a string" }),
    (0, class_validator_1.IsNotEmpty)({ message: "The field email cannot be null" }),
    (0, class_validator_1.Length)(1, 150, { message: "The max length of email is 150 and min is 1" }),
    (0, class_validator_1.IsEmail)({}, { message: "The field email must be a valid email address" }),
    (0, swagger_1.ApiProperty)({ example: "" }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "The field password should be a string" }),
    (0, class_validator_1.IsNotEmpty)({ message: "The field password cannot be null" }),
    (0, class_validator_1.Length)(6, 50, { message: "The max length of password is 50 and min is 6" }),
    (0, swagger_1.ApiProperty)({ example: "" }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
//# sourceMappingURL=create-user.dto.js.map