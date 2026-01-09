/**
 * Knowledge Base Resource
 */

import { HttpClient } from '../client.js';
import type {
    KnowledgeBase,
    CreateKBOptions,
    Document,
    UploadFileOptions,
    UploadTextOptions,
} from '../types.js';

export class KBResource {
    private client: HttpClient;

    constructor(client: HttpClient) {
        this.client = client;
    }

    /**
     * List all knowledge bases
     *
     * @example
     * ```typescript
     * const kbs = await jabrod.kb.list();
     * ```
     */
    async list(): Promise<KnowledgeBase[]> {
        return this.client.get<KnowledgeBase[]>('/v1/kb');
    }

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
    async create(options: CreateKBOptions): Promise<KnowledgeBase> {
        return this.client.post<KnowledgeBase>('/v1/kb', options);
    }

    /**
     * Get a knowledge base by ID
     *
     * @example
     * ```typescript
     * const kb = await jabrod.kb.get('kb_123');
     * ```
     */
    async get(kbId: string): Promise<KnowledgeBase> {
        return this.client.get<KnowledgeBase>(`/v1/kb/${kbId}`);
    }

    /**
     * Delete a knowledge base
     *
     * @example
     * ```typescript
     * await jabrod.kb.delete('kb_123');
     * ```
     */
    async delete(kbId: string): Promise<void> {
        await this.client.delete(`/v1/kb/${kbId}`);
    }

    /**
     * List documents in a knowledge base
     *
     * @example
     * ```typescript
     * const docs = await jabrod.kb.listDocuments('kb_123');
     * ```
     */
    async listDocuments(kbId: string): Promise<Document[]> {
        return this.client.get<Document[]>(`/v1/kb/${kbId}/documents`);
    }

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
    async upload(options: UploadFileOptions): Promise<Document> {
        const formData = new FormData();

        if (options.file instanceof File) {
            formData.append('file', options.file);
        } else {
            formData.append('file', options.file, options.filename || 'upload');
        }

        return this.client.postForm<Document>(`/v1/kb/${options.kbId}/documents`, formData);
    }

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
    async uploadText(options: UploadTextOptions): Promise<Document> {
        const blob = new Blob([options.content], { type: 'text/plain' });
        const formData = new FormData();
        formData.append('file', blob, options.name || 'text.txt');

        return this.client.postForm<Document>(`/v1/kb/${options.kbId}/documents`, formData);
    }
}
