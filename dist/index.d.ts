/**
 * Jabrod SDK - Official SDK for Jabrod Cloud API
 *
 * @example
 * ```typescript
 * import { Jabrod } from '@jabrod/sdk';
 *
 * const jclient = Jabrod({ apiKey: 'jb_xxx' });
 *
 * // Create a knowledge base
 * const kb = await jclient.kb.create({ name: 'My KB' });
 *
 * // Upload a document
 * await jclient.kb.uploadFile({ kbId: kb.id, file: myFile });
 *
 * // Chat with the KB
 * const response = await jclient.chat.complete({
 *   kbId: kb.id,
 *   message: 'What is in my documents?'
 * });
 * ```
 */
import { KBResource } from './resources/kb.js';
import { ChatResource } from './resources/chat.js';
import { UsageResource } from './resources/usage.js';
import type { JabrodConfig } from './types.js';
export * from './types.js';
/**
 * Jabrod SDK Client
 */
export interface JabrodClient {
    /** Knowledge Base operations */
    kb: KBResource;
    /** Chat and Query operations */
    chat: ChatResource;
    /** Usage statistics */
    usage: UsageResource;
}
/**
 * Create a new Jabrod SDK client
 *
 * @param config - Configuration options
 * @returns Jabrod client instance
 *
 * @example
 * ```typescript
 * const jclient = Jabrod({ apiKey: 'jb_xxx' });
 * ```
 */
export declare function Jabrod(config: JabrodConfig): JabrodClient;
export default Jabrod;
//# sourceMappingURL=index.d.ts.map