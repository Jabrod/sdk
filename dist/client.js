/**
 * HTTP Client for Jabrod API
 */
import { JabrodError } from './types.js';
export class HttpClient {
    apiKey;
    baseUrl;
    constructor(config) {
        this.apiKey = config.apiKey;
        this.baseUrl = config.baseUrl.replace(/\/$/, ''); // Remove trailing slash
    }
    /**
     * Make an authenticated request to the API
     */
    async request(method, path, options = {}) {
        const url = `${this.baseUrl}${path}`;
        const headers = {
            'Authorization': `Bearer ${this.apiKey}`,
            ...options.headers,
        };
        // Only set Content-Type for JSON body (not FormData)
        if (options.body && !options.formData) {
            headers['Content-Type'] = 'application/json';
        }
        const response = await fetch(url, {
            method,
            headers,
            body: options.formData || (options.body ? JSON.stringify(options.body) : undefined),
        });
        const data = await response.json();
        if (!response.ok || !data.success) {
            throw new JabrodError(data.error?.code || 'UNKNOWN_ERROR', data.error?.message || 'An unknown error occurred', response.status, data.error?.details);
        }
        return data.data;
    }
    /**
     * GET request
     */
    async get(path) {
        return this.request('GET', path);
    }
    /**
     * POST request with JSON body
     */
    async post(path, body) {
        return this.request('POST', path, { body });
    }
    /**
     * POST request with FormData
     */
    async postForm(path, formData) {
        return this.request('POST', path, { formData });
    }
    /**
     * DELETE request
     */
    async delete(path) {
        return this.request('DELETE', path);
    }
    /**
     * PATCH request
     */
    async patch(path, body) {
        return this.request('PATCH', path, { body });
    }
}
//# sourceMappingURL=client.js.map