// #!/usr/bin/env node
// import '../bootstrap';
//
// import { writeFileSync } from 'fs';
// import path from 'path';
//
// import { TypesGenerator } from '';
//
// import { AppModule } from 'AppModule';
//
// const rootDir = path.resolve(__dirname, '../');
// const projectRootDir = path.resolve(rootDir, '../../');
// const relativePath = process.argv[2] || 'types/backend/types.ts';
// const filePath = path.resolve(projectRootDir, relativePath);
//
// async function main() {
//     const generator = new TypesGenerator({ applicationModule: AppModule });
//     await generator.init();
//     const types = await generator.generate();
//     writeFileSync(filePath, types);
// }
//
// main();
