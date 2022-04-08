import './bootstrap';

import { Application } from '@core/application';
import '@core/di/container';

async function bootstrap() {
    const app = new Application();
    await app.init();
    app.start();
}

bootstrap();
