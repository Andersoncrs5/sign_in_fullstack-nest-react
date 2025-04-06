import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { LoginUserDTO } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
export declare class UsersService {
    private readonly repository;
    private readonly jwtService;
    constructor(repository: Repository<User>, jwtService: JwtService);
    createAsync(createUserDto: CreateUserDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    findOneAsync(id: number): Promise<User>;
    updateAsync(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    removeAsync(id: number): Promise<string>;
    LoginAsync(userDto: LoginUserDTO): Promise<false | {
        access_token: string;
        refresh_token: string;
    }>;
    logout(userId: number): Promise<{
        message: string;
    }>;
    refreshToken(refreshToken: string): Promise<{
        access_token: string;
    }>;
}
