class ExampleService {
    public async load(): Promise<void> {
        console.log('load');
    }
}

export const exampleService = new ExampleService();
