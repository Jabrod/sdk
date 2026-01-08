/**
 * Usage Resource
 */
import { HttpClient } from '../client.js';
import type { UsageStats } from '../types.js';
export declare class UsageResource {
    private client;
    constructor(client: HttpClient);
    /**
     * Get usage statistics for the current billing period
     */
    get(): Promise<UsageStats>;
}
//# sourceMappingURL=usage.d.ts.map