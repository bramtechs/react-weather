import { Request } from 'express-serve-static-core';

const MAX_REQUESTS = 30;
const REQUEST_TIME = 1000 * 60; // 1 minute

interface User {
    requests: number;
    lastRequest: number;
}

const requests: Map<string, User> = new Map();

function getIdentifier(req: Request<{}, any, any, qs.ParsedQs, Record<string, any>>): string {
    const ip = req.socket.remoteAddress;
    if (!ip) {
        throw new Error('No identifier found!');
    }
    return ip;
}

export function gatekeepUserRequest(req: Request<{}, any, any, qs.ParsedQs, Record<string, any>>): void {
    const ip = getIdentifier(req);

    if (requests.has(ip)) {
        const user = requests.get(ip)!;

        // remove user if they haven't sent a request in a while
        if (user.lastRequest + REQUEST_TIME < Date.now()) {
            requests.delete(ip);
            return;
        }

        user.lastRequest = Date.now();
        user.requests++;

        if (user.requests >= MAX_REQUESTS) {
            throw new Error('Too many requests!');
        }
    } else {
        requests.set(ip, { requests: 0, lastRequest: Date.now() });
    }
}

export function printRequests() {
    console.log(requests);
}
