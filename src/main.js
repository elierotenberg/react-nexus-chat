import { fork } from 'child_process';
import { join } from 'path';

function spawn(child) {
  (function start() {
    console.log('Starting', child);
    fork(join(__dirname, child), {
      env: {
        MILLENIUM_MODE: process.env.MILLENIUM_MODE || 'local',
        NODE_ENV: process.env.NODE_ENV || 'development',
      },
    })
    .on('exit', (code) => {
      console.warn(child, 'exited with code', code);
      start();
    });
  })();
}

spawn('render-server');
spawn('flux-server');
