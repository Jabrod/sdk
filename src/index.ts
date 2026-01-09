/**
 * Jabrod SDK - Official SDK for Jabrod Cloud API
 *
 * @example
 * ```typescript
 * import { JabrodClient } from 'jabrod';
 *
 * const jabrod = new JabrodClient({
 *   apiKey: process.env.JABROD_API_KEY
 * });
 *
 * // Create a knowledge base
 * const kb = await jabrod.kb.create({ name: 'My KB' });
 *
 * // Upload a document
 * await jabrod.kb.upload({ kbId: kb.id, file: myFile });
 *
 * // Query with RAG
 * const response = await jabrod.rag
 *   .queryBuilder()
 *   .withQuery('What is in my documents?')
 *   .withKnowledgeBase(kb.id)
 *   .withTopK(5)
 *   .execute();
 * ```
 */

import { HttpClient } from './client.js';
import { KBResource } from './resources/kb.js';
import { RAGResource } from './resources/rag.js';
import { UsageResource } from './resources/usage.js';
import type { JabrodConfig } from './types.js';

// Re-export types
export * from './types.js';

// Re-export error class
export { JabrodError } from './types.js';

// Default API base URL
const DEFAULT_BASE_URL = 'https://cloud.jabrod.com';

/**
 * JabrodClient - Main SDK Entry Point
 *
 * @example
 * ```typescript
 * const jabrod = new JabrodClient({
 *   apiKey: process.env.JABROD_API_KEY
 * });
 * ```
 */
export class JabrodClient {
    /** Knowledge Base operations */
    public readonly kb: KBResource;
    /** RAG operations (query & chat) */
    public readonly rag: RAGResource;
    /** Usage statistics */
    public readonly usage: UsageResource;

    private readonly httpClient: HttpClient;

    constructor(config: JabrodConfig) {
        if (!config.apiKey) {
            throw new Error('API key is required. Get one at https://agent.jabrod.com/dashboard');
        }

        if (!config.apiKey.startsWith('jb_')) {
            throw new Error('Invalid API key format. Keys should start with "jb_"');
        }

        this.httpClient = new HttpClient({
            apiKey: config.apiKey,
            baseUrl: config.baseUrl || DEFAULT_BASE_URL,
        });

        this.kb = new KBResource(this.httpClient);
        this.rag = new RAGResource(this.httpClient);
        this.usage = new UsageResource(this.httpClient);
    }
}

// Default export
export default JabrodClient;
