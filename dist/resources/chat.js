/**
 * Chat Resource
 */
export class ChatResource {
    client;
    constructor(client) {
        this.client = client;
    }
    /**
     * Query a knowledge base for relevant chunks
     * Returns raw chunks without LLM processing
     */
    async query(options) {
        return this.client.post('/v1/query', {
            kbId: options.kbId,
            query: options.query,
            topK: options.topK ?? 5,
        });
    }
    /**
     * Chat with a knowledge base
     * Uses RAG to generate AI responses based on KB content
     */
    async complete(options) {
        return this.client.post('/v1/chat', {
            kbId: options.kbId,
            message: options.message,
            model: options.model,
            systemPrompt: options.systemPrompt,
            topK: options.topK ?? 5,
        });
    }
}
//# sourceMappingURL=chat.js.map