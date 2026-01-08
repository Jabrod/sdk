/**
 * HTTP Client for Jabrod API
 */
export interface ClientConfig {
    apiKey: string;
    baseUrl: string;
}
export declare class HttpClient {
    private apiKey;
    private baseUrl;
    constructor(config: ClientConfig);
    /**
     * Make an authenticated request to the API
     */
    request<T>(method: string, path: string, options?: {
        body?: unknown;
        headers?: Record<string, string>;
        formData?: FormData;
    }): Promise<T>;
    /**
     * GET request
     */
    get<T>(path: string): Promise<T>;
    /**
     * POST request with JSON body
     */
    post<T>(path: string, body?: unknown): Promise<T>;
    /**
     * POST request with FormData
     */
    postForm<T>(path: string, formData: FormData): Promise<T>;
    /**
     * DELETE request
     */
    delete<T>(path: string): Promise<T>;
    /**
     * PATCH request
     */
    patch<T>(path: string, body?: unknown): Promise<T>;
}
//# sourceMappingURL=client.d.ts.map