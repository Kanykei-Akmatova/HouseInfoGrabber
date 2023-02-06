import app from './app';
import * as http from 'http';
import * as https from 'https';
import * as debug from 'debug';

debug('ts-express:server');

const httpPort = process.env.PORT || 5000

function onError(port: number | string | boolean) {
    return function (error: NodeJS.ErrnoException): void {    
        if (error.syscall !== 'listen') {
            throw error;
        }
        const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;
        switch (error.code) {
            case 'EACCES':
                console.error(`${bind} requires elevated privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(`${bind} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    };
}

function onListening(server: http.Server | https.Server) {
    return function (): void {
        debug('listening or not')
        const addr = server.address();
        const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
        console.log(`Listening on : ${bind}`);
        debug(`Listening on ${bind}`);
    };
}

const httpServer = http.createServer(app);
httpServer.on('error', onError(httpPort));
httpServer.on('listening', onListening(httpServer));
httpServer.listen(httpPort);
