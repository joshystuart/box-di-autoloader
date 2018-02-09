const servicesConfig = {
    config: {
        path: `${__dirname}/fixtures/test-config`,
        dependencies: []
    },
    testClass: {
        path: `${__dirname}/fixtures/test-class`,
        dependencies: [
            `config.foo`,
            `config.foo.bar`,
            'testFunction'
        ]
    },
    testFunction: {
        path: `${__dirname}/fixtures/test-function`,
        dependencies: []
    }
};

export default servicesConfig;
