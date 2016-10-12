/**
 * Created by Shin on 12/10/2016.
 */
var Rwg = require('random-word-generator');

export const getRandomWords = () => {
    var generator = new Rwg();
    return generator.generate();
};