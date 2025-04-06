"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoService = void 0;
const bcrypt = require("bcrypt");
class CryptoService {
    static saltRounds = 16;
    static async encrypt(password) {
        const salt = await bcrypt.genSalt(this.saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }
    static async compare(plainPassword, hashedPassword) {
        const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
        return isMatch;
    }
}
exports.CryptoService = CryptoService;
//# sourceMappingURL=CryptoService.js.map