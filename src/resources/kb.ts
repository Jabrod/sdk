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
     */
    async list(): Promise<KnowledgeBase[]> {
        return this.client.get<KnowledgeBase[]>('/v1/kb');
    }

    /**
     * Create a new knowledge base
     */
    async create(options: CreateKBOptions): Promise<KnowledgeBase> {
        return this.client.post<KnowledgeBase>('/v1/kb', options);
    }

    /**
     * Get a knowledge base by ID
     */
    async get(kbId: string): Promise<KnowledgeBase> {
        return this.client.get<KnowledgeBase>(`/v1/kb/${kbId}`);
    }

    /**
     * Delete a knowledge base
     */
    async delete(kbId: string): Promise<void> {
        await this.client.delete(`/v1/kb/${kbId}`);
    }

    /**
     * List documents in a knowledge base
     */
    async listDocuments(kbId: string): Promise<Document[]> {
        return this.client.get<Document[]>(`/v1/kb/${kbId}/documents`);
    }

    /**
     * Upload a file to a knowledge base
     */
    async uploadFile(options: UploadFileOptions): Promise<Document> {
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
     */
    async uploadText(options: UploadTextOptions): Promise<Document> {
        const blob = new Blob([options.content], { type: 'text/plain' });
        const formData = new FormData();
        formData.append('file', blob, options.name || 'text.txt');

        return this.client.postForm<Document>(`/v1/kb/${options.kbId}/documents`, formData);
    }
}
