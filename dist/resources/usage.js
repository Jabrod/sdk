/**
 * Usage Resource
 */
export class UsageResource {
    client;
    constructor(client) {
        this.client = client;
    }
    /**
     * Get usage statistics for the current billing period
     */
    async get() {
        return this.client.get('/v1/usage');
    }
}
//# sourceMappingURL=usage.js.map