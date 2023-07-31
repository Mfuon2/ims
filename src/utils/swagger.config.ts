import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

const config = new DocumentBuilder()
  .setTitle('ims*')
  .setDescription('The aims API description')
  .setVersion('1.0')
  .build();

export const initSwagger = async (app: any) => {
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
};
