/*
 WallabyJS React Native Config
 Works well with Jest + Enzyme
 */

/* eslint-disable */
module.exports = function (wallaby) {
    return {
        files: [
            'tsconfig.json',
            'package.json',
            'src/**/*.ts*',
            '!src/**/*spec.ts*'
        ],

        tests: [
            'src/**/*spec.ts*'],

        env: {
            type: 'node',
            runner: 'node',
        },

        testFramework: 'jest',

        preprocessors: {
            '**/*.js': file => require('babel-core').transform(file.content, {
                sourceMap: true, filename: file.path,
                presets: [
                    'react-native'
                ],
                plugins: [
                    'transform-es2015-modules-commonjs',
                ],
            }),
        },

        setup: (wallaby) => {
            wallaby.testFramework.configure(require('./package.json').jest);
        },

    };
};
