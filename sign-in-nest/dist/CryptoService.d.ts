export declare class CryptoService {
    private static saltRounds;
    static encrypt(password: string): Promise<string>;
    static compare(plainPassword: string, hashedPassword: string): Promise<boolean>;
}
