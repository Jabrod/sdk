/**
 * Usage Resource
 */

import { HttpClient } from '../client.js';
import type { UsageStats } from '../types.js';

export class UsageResource {
    private client: HttpClient;

    constructor(client: HttpClient) {
        this.client = client;
    }

    /**
     * Get usage statistics for the current billing period
     */
    async get(): Promise<UsageStats> {
        return this.client.get<UsageStats>('/v1/usage');
    }
}
