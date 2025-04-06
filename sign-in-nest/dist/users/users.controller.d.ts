import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDTO } from './dto/login-user.dto';
import { RefreshTokenDTO } from './dto/refresh-token.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    findOne(req: any): Promise<import("./entities/user.entity").User>;
    update(req: any, updateUserDto: UpdateUserDto): Promise<import("./entities/user.entity").User>;
    remove(req: any): Promise<string>;
    login(user: LoginUserDTO): Promise<false | {
        access_token: string;
        refresh_token: string;
    }>;
    logout(req: any): Promise<{
        message: string;
    }>;
    refreshToken(refreshTokenDto: RefreshTokenDTO): Promise<{
        access_token: string;
    }>;
}
