import BoxDiAutoLoader from '../lib/box-di-autoloader';
import TestClass from './mocks/test-class';

describe('BoxDI autoloader', () => {
    let mockLogger;

    beforeEach(() => {
        mockLogger = {
            log: jest.fn(),
            info: jest.fn(),
            debug: jest.fn(),
            error: jest.fn(),
            warn: jest.fn(),
        };
    });

    it('successfully loads a simple object', () => {
        const servicesConfig = {
            config: {
                path: `${__dirname}/mocks/test-config`,
                dependencies: []
            }
        };

        const boxDiAutoLoader = new BoxDiAutoLoader(servicesConfig, undefined, mockLogger);
        boxDiAutoLoader.load();

        const config = boxDiAutoLoader.get('config');
        expect(config.foo.bar).toBe('test something');

        const bar = boxDiAutoLoader.get('config.foo.bar');
        expect(bar).toBe('test something');
    });

    it('successfully loads a simple function', () => {
        const servicesConfig = {
            testFunction: {
                path: `${__dirname}/mocks/test-function`,
                dependencies: []
            }
        };

        const boxDiAutoLoader = new BoxDiAutoLoader(servicesConfig, undefined, mockLogger);
        boxDiAutoLoader.load();

        const testFunction = boxDiAutoLoader.get('testFunction');

        expect(testFunction).toBeInstanceOf(Function);
        expect(testFunction()).toBe('This is a function');
    });

    it('successfully loads a class that has dependencies', () => {
        const servicesConfig = {
            config: {
                path: `${__dirname}/mocks/test-config`,
                dependencies: []
            },
            testClass: {
                path: `${__dirname}/mocks/test-class`,
                dependencies: [
                    `config.foo.bar`,
                    'testFunction'
                ]
            },
            testFunction: {
                path: `${__dirname}/mocks/test-function`,
                dependencies: []
            }
        };

        const boxDiAutoLoader = new BoxDiAutoLoader(servicesConfig, undefined, mockLogger);
        boxDiAutoLoader.load();

        const testClass = boxDiAutoLoader.get('testClass');

        expect(testClass).toBeInstanceOf(TestClass);
        expect(testClass.getData()).toBe(`here's some data`);
        expect(testClass.getBar()).toBe('test something');
        expect(testClass.getFunction()).toBeInstanceOf(Function);
        expect(testClass.getFunction()()).toBe('This is a function');
    });

    it('instantiates autoloader with a custom logger', () => {
        const servicesConfig = {
            config: {
                path: `${__dirname}/mocks/test-config`,
                dependencies: []
            }
        };

        const boxDiAutoLoader = new BoxDiAutoLoader(servicesConfig, undefined, mockLogger);
        boxDiAutoLoader.load();
        expect(mockLogger.debug.mock.calls.length).toBe(1);
    });

    xit('instantiates the autoloader with an existing boxdi', () => {

    });

    it('fails to load a dependency that does not exist', () => {
        const servicesConfig = {
            missingDependency: {
                path: `${__dirname}/mocks/test-does-not-exist`,
                dependencies: []
            }
        };

        const boxDiAutoLoader = new BoxDiAutoLoader(servicesConfig, undefined, mockLogger);
        boxDiAutoLoader.load();

        expect(() => {
            boxDiAutoLoader.get('missingDependency');
        }).
        toThrow();
    });
});