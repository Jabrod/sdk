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
import { HttpClient } from './client.js';
import { KBResource } from './resources/kb.js';
import { ChatResource } from './resources/chat.js';
import { UsageResource } from './resources/usage.js';
// Re-export types
export * from './types.js';
// Default API base URL
const DEFAULT_BASE_URL = 'https://cloud.jabrod.com';
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
export function Jabrod(config) {
    if (!config.apiKey) {
        throw new Error('API key is required. Get one at https://agent.jabrod.com/dashboard');
    }
    if (!config.apiKey.startsWith('jb_')) {
        throw new Error('Invalid API key format. Keys should start with "jb_"');
    }
    const httpClient = new HttpClient({
        apiKey: config.apiKey,
        baseUrl: config.baseUrl || DEFAULT_BASE_URL,
    });
    return {
        kb: new KBResource(httpClient),
        chat: new ChatResource(httpClient),
        usage: new UsageResource(httpClient),
    };
}
// Default export
export default Jabrod;
//# sourceMappingURL=index.js.map