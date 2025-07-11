/**
 * Remove old files, copy front-end ones.
 * 2025-06-23 临时去掉log，往后再解决
 */

import * as fs from 'fs-extra';
import Logger from 'jet-logger';
import * as childProcess from 'child_process';

// Setup logger
const logger = Logger;
// logger.timestamp = false;




(async () => {
    try {
        // Remove current build
        await remove('./dist/');
        // Copy front-end files
        await copy('./src/public', './dist/public');
        await copy('./src/views', './dist/views');
        // Copy production env file
        await copy('./src/pre-start/env/production.env', './dist/pre-start/env/production.env');
        // Copy back-end files
        await exec('tsc --build tsconfig.prod.json', './')
    } catch (err) {
        // logger.err(err);
    }
})();


function remove(loc: string): Promise<void> {
    return new Promise((res, rej) => {
        return fs.remove(loc, (err) => {
            return (!!err ? rej(err) : res());
        });
    });
}


function copy(src: string, dest: string): Promise<void> {
    return new Promise((res, rej) => {
        return fs.copy(src, dest, (err) => {
            return (!!err ? rej(err) : res());
        });
    });
}


function exec(cmd: string, loc: string): Promise<void> {
    return new Promise((res, rej) => {
        return childProcess.exec(cmd, {cwd: loc}, (err, stdout, stderr) => {
            if (!!stdout) {
                // logger.info(stdout);
            }
            if (!!stderr) {
                // logger.warn(stderr);
            }
            return (!!err ? rej(err) : res());
        });
    });
}
