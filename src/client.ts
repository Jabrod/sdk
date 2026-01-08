/**
 * HTTP Client for Jabrod API
 */

import { ApiResponse, JabrodError } from './types.js';

export interface ClientConfig {
    apiKey: string;
    baseUrl: string;
}

export class HttpClient {
    private apiKey: string;
    private baseUrl: string;

    constructor(config: ClientConfig) {
        this.apiKey = config.apiKey;
        this.baseUrl = config.baseUrl.replace(/\/$/, ''); // Remove trailing slash
    }

    /**
     * Make an authenticated request to the API
     */
    async request<T>(
        method: string,
        path: string,
        options: {
            body?: unknown;
            headers?: Record<string, string>;
            formData?: FormData;
        } = {}
    ): Promise<T> {
        const url = `${this.baseUrl}${path}`;

        const headers: Record<string, string> = {
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

        const data: ApiResponse<T> = await response.json();

        if (!response.ok || !data.success) {
            throw new JabrodError(
                data.error?.code || 'UNKNOWN_ERROR',
                data.error?.message || 'An unknown error occurred',
                response.status,
                data.error?.details
            );
        }

        return data.data as T;
    }

    /**
     * GET request
     */
    async get<T>(path: string): Promise<T> {
        return this.request<T>('GET', path);
    }

    /**
     * POST request with JSON body
     */
    async post<T>(path: string, body?: unknown): Promise<T> {
        return this.request<T>('POST', path, { body });
    }

    /**
     * POST request with FormData
     */
    async postForm<T>(path: string, formData: FormData): Promise<T> {
        return this.request<T>('POST', path, { formData });
    }

    /**
     * DELETE request
     */
    async delete<T>(path: string): Promise<T> {
        return this.request<T>('DELETE', path);
    }

    /**
     * PATCH request
     */
    async patch<T>(path: string, body?: unknown): Promise<T> {
        return this.request<T>('PATCH', path, { body });
    }
}
