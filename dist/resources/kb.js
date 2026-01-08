/**
 * Knowledge Base Resource
 */
export class KBResource {
    client;
    constructor(client) {
        this.client = client;
    }
    /**
     * List all knowledge bases
     */
    async list() {
        return this.client.get('/v1/kb');
    }
    /**
     * Create a new knowledge base
     */
    async create(options) {
        return this.client.post('/v1/kb', options);
    }
    /**
     * Get a knowledge base by ID
     */
    async get(kbId) {
        return this.client.get(`/v1/kb/${kbId}`);
    }
    /**
     * Delete a knowledge base
     */
    async delete(kbId) {
        await this.client.delete(`/v1/kb/${kbId}`);
    }
    /**
     * List documents in a knowledge base
     */
    async listDocuments(kbId) {
        return this.client.get(`/v1/kb/${kbId}/documents`);
    }
    /**
     * Upload a file to a knowledge base
     */
    async uploadFile(options) {
        const formData = new FormData();
        if (options.file instanceof File) {
            formData.append('file', options.file);
        }
        else {
            formData.append('file', options.file, options.filename || 'upload');
        }
        return this.client.postForm(`/v1/kb/${options.kbId}/documents`, formData);
    }
    /**
     * Upload text content to a knowledge base
     */
    async uploadText(options) {
        const blob = new Blob([options.content], { type: 'text/plain' });
        const formData = new FormData();
        formData.append('file', blob, options.name || 'text.txt');
        return this.client.postForm(`/v1/kb/${options.kbId}/documents`, formData);
    }
}
//# sourceMappingURL=kb.js.map