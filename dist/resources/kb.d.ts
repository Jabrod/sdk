/**
 * Knowledge Base Resource
 */
import { HttpClient } from '../client.js';
import type { KnowledgeBase, CreateKBOptions, Document, UploadFileOptions, UploadTextOptions } from '../types.js';
export declare class KBResource {
    private client;
    constructor(client: HttpClient);
    /**
     * List all knowledge bases
     *
     * @example
     * ```typescript
     * const kbs = await jabrod.kb.list();
     * ```
     */
    list(): Promise<KnowledgeBase[]>;
    /**
     * Create a new knowledge base
     *
     * @example
     * ```typescript
     * const kb = await jabrod.kb.create({
     *   name: 'Product Docs',
     *   description: 'Product documentation'
     * });
     * ```
     */
    create(options: CreateKBOptions): Promise<KnowledgeBase>;
    /**
     * Get a knowledge base by ID
     *
     * @example
     * ```typescript
     * const kb = await jabrod.kb.get('kb_123');
     * ```
     */
    get(kbId: string): Promise<KnowledgeBase>;
    /**
     * Delete a knowledge base
     *
     * @example
     * ```typescript
     * await jabrod.kb.delete('kb_123');
     * ```
     */
    delete(kbId: string): Promise<void>;
    /**
     * List documents in a knowledge base
     *
     * @example
     * ```typescript
     * const docs = await jabrod.kb.listDocuments('kb_123');
     * ```
     */
    listDocuments(kbId: string): Promise<Document[]>;
    /**
     * Upload a file to a knowledge base
     *
     * @example
     * ```typescript
     * await jabrod.kb.upload({
     *   kbId: 'kb_123',
     *   file: fileInput.files[0]
     * });
     * ```
     */
    upload(options: UploadFileOptions): Promise<Document>;
    /**
     * Upload text content to a knowledge base
     *
     * @example
     * ```typescript
     * await jabrod.kb.uploadText({
     *   kbId: 'kb_123',
     *   content: 'Your text content...',
     *   name: 'notes.txt'
     * });
     * ```
     */
    uploadText(options: UploadTextOptions): Promise<Document>;
}
//# sourceMappingURL=kb.d.ts.map