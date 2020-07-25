import { Module } from '@nestjs/common';
import { GraphQLModule } from "@nestjs/graphql";
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot({
      definitions: {
        path: join(process.cwd(), '/src/graphql.schema.d.ts'),
        outputAs: 'class',
      },
      typePaths: ['./**/*.graphql'],
      resolverValidationOptions: {
        requireResolversForResolveType: false,
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
