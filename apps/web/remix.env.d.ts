/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/node/globals" />

import type { Response } from 'express';
import type { Payload, User } from '@org/cms';

export interface RemixRequestContext {
    payload: Payload;
    user: {
        user?: User;
        token?: string;
        exp?: number;
    };
    res: Response;
}

declare module '@remix-run/node' {
    interface AppLoadContext extends RemixRequestContext {}
}
