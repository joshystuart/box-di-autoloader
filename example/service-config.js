const servicesConfig = {
    config: {
        path: `${__dirname}/../test/mocks/test-config`,
        dependencies: []
    },
    testClass: {
        path: `${__dirname}/../test/mocks/test-class`,
        dependencies: [
            `config.foo`,
            `config.foo.bar`,
            'testFunction'
        ]
    },
    testFunction: {
        path: `${__dirname}/../test/mocks/test-function`,
        dependencies: []
    }
};

export default servicesConfig;
