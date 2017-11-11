/**
 * A simple test class that requires config to be injected. Notice how this class has no fancy decorators or
 * frameworks, which allows it to be tested very cleanly and easily (ie. just pass in the mock config in your tests)!
 */
class TestClass {
    constructor(bar, testFunction) {
        this._bar = bar;
        this._testFunction = testFunction;
    }

    /**
     * @return {string}
     */
    getBar() {
        return this._bar;
    }

    /**
     * @return {Function}
     */
    getFunction() {
        return this._testFunction;
    }

    /**
     * @return {string}
     */
    getData() {
        return `here's some data`;
    }
}

export default TestClass;
