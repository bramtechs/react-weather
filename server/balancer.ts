import { Request } from 'express-serve-static-core';

let requests: Map<string, number>;

export function gatekeepUserRequest(req: Request<{}, any, any, qs.ParsedQs, Record<string, any>>): boolean {
    const ip = req.socket.remoteAddress;
    if (!ip) {
        console.log('User has no IP address!');
        return false;
    }

    if (requests.has(ip)) {
        const count = requests.get(ip)!;
        if (count >= 5) {
            console.warn(`User ${ip} has been blocked for sending too many requests!`);
            return false;
        }
        requests.set(ip, count + 1);
    } else {
        requests.set(ip, 1);
    }
    return true;
}
