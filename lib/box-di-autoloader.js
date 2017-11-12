import {Box} from 'box-di';
import winston from 'winston';

class BoxDiAutoLoader {
    /**
     * @param {object} serviceConfig
     * @param {object=} box
     * @param {object=} logger
     */
    constructor(serviceConfig, box = Box, logger = winston) {
        this._serviceConfig = serviceConfig;
        this._box = box;
        this._logger = logger;
        this._box.setLogger(this._logger);
    }

    /**
     * Loads all the services
     */
    load() {
        for (const [name, config] of Object.entries(this._serviceConfig)) {
            try {
                this._logger.debug(`Auto loading ${name}`);
                let service = require(config.path);
                service = service.default || service;

                if (service instanceof Function) {
                    // check for a class
                    if (!!service.name) {
                        this._box.registerInvokable(name, service, config.dependencies);
                    } else {
                        // otherwise it is just a function, so ensure it loads in
                        this._box.register(name, service, config.dependencies);
                    }
                } else {
                    // this is just a plain object/dependency that should be loaded
                    this._box.register(name, () => service, config.dependencies);
                }
            } catch (error) {
                this._logger.error(`Failed to load ${name}`);
            }
        }
    }

    /**
     * @param {String} name
     * @returns {Object}
     * @public
     */
    get(name) {
        return this._box.get(name);
    }
}

export default BoxDiAutoLoader;
