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
     */
    list(): Promise<KnowledgeBase[]>;
    /**
     * Create a new knowledge base
     */
    create(options: CreateKBOptions): Promise<KnowledgeBase>;
    /**
     * Get a knowledge base by ID
     */
    get(kbId: string): Promise<KnowledgeBase>;
    /**
     * Delete a knowledge base
     */
    delete(kbId: string): Promise<void>;
    /**
     * List documents in a knowledge base
     */
    listDocuments(kbId: string): Promise<Document[]>;
    /**
     * Upload a file to a knowledge base
     */
    uploadFile(options: UploadFileOptions): Promise<Document>;
    /**
     * Upload text content to a knowledge base
     */
    uploadText(options: UploadTextOptions): Promise<Document>;
}
//# sourceMappingURL=kb.d.ts.map