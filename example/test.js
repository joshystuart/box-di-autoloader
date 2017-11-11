import BoxDiAutoLoader from '../lib/box-di-autoloader';
import serviceConfig from './service-config';

const boxDiAutoLoader = new BoxDiAutoLoader(serviceConfig);

boxDiAutoLoader.load();

const config = boxDiAutoLoader.get('config');
const testClass = boxDiAutoLoader.get('testClass');
const testFunction = boxDiAutoLoader.get('testFunction');

console.log('This is the config: ', config);
console.log('This is the test class calling a method: ', testClass.getBar());
console.log('This is a test function being called: ', testFunction());
