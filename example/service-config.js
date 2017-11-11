const servicesConfig = {
    config: {
        path: `${__dirname}/test-config`,
        dependencies: []
    },
    testClass: {
        path: `${__dirname}/test-class`,
        dependencies: [
            `config`,
            'testFunction'
        ]
    },
    testFunction: {
        path: `${__dirname}/test-function`,
        dependencies: []
    }
};

export default servicesConfig;
