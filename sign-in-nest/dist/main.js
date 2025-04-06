"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const path_1 = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter());
    await app.register(require('@fastify/cors'), {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('System og login')
        .setDescription('API in NestJS')
        .setVersion('1.0')
        .addTag('auth')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    app.register(require('@fastify/static'), {
        root: (0, path_1.join)(__dirname, '..', 'public'),
        prefix: '/public/',
    });
    app.useGlobalPipes(new common_1.ValidationPipe());
    await app.listen(3000, '0.0.0.0');
}
bootstrap();
//# sourceMappingURL=main.js.map