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
import { KBResource } from './resources/kb.js';
import { RAGResource } from './resources/rag.js';
import { UsageResource } from './resources/usage.js';
import type { JabrodConfig } from './types.js';
export * from './types.js';
export { JabrodError } from './types.js';
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
export declare class JabrodClient {
    /** Knowledge Base operations */
    readonly kb: KBResource;
    /** RAG operations (query & chat) */
    readonly rag: RAGResource;
    /** Usage statistics */
    readonly usage: UsageResource;
    private readonly httpClient;
    constructor(config: JabrodConfig);
}
export default JabrodClient;
//# sourceMappingURL=index.d.ts.map