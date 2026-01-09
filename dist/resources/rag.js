/**
 * RAG Resource - Query and Chat operations
 */
/**
 * Query Builder - Fluent API for building RAG queries
 */
export class QueryBuilder {
    client;
    options = {};
    constructor(client) {
        this.client = client;
    }
    /**
     * Set the search query
     */
    withQuery(query) {
        this.options.query = query;
        return this;
    }
    /**
     * Set the knowledge base ID
     */
    withKnowledgeBase(kbId) {
        this.options.kbId = kbId;
        return this;
    }
    /**
     * Set number of results to return
     */
    withTopK(topK) {
        this.options.topK = topK;
        return this;
    }
    /**
     * Execute the query
     */
    async execute() {
        if (!this.options.query) {
            throw new Error('Query is required. Use .withQuery()');
        }
        if (!this.options.kbId) {
            throw new Error('Knowledge base ID is required. Use .withKnowledgeBase()');
        }
        return this.client.post('/v1/query', {
            query: this.options.query,
            kbId: this.options.kbId,
            topK: this.options.topK || 5,
        });
    }
}
/**
 * Chat Builder - Fluent API for RAG chat
 */
export class ChatBuilder {
    client;
    options = {};
    constructor(client) {
        this.client = client;
    }
    /**
     * Set the user message
     */
    withMessage(message) {
        this.options.message = message;
        return this;
    }
    /**
     * Set the knowledge base ID
     */
    withKnowledgeBase(kbId) {
        this.options.kbId = kbId;
        return this;
    }
    /**
     * Set the LLM model
     */
    withModel(model) {
        this.options.model = model;
        return this;
    }
    /**
     * Set custom system prompt
     */
    withSystemPrompt(prompt) {
        this.options.systemPrompt = prompt;
        return this;
    }
    /**
     * Set number of context chunks
     */
    withTopK(topK) {
        this.options.topK = topK;
        return this;
    }
    /**
     * Execute the chat
     */
    async execute() {
        if (!this.options.message) {
            throw new Error('Message is required. Use .withMessage()');
        }
        if (!this.options.kbId) {
            throw new Error('Knowledge base ID is required. Use .withKnowledgeBase()');
        }
        return this.client.post('/v1/chat', {
            message: this.options.message,
            kbId: this.options.kbId,
            model: this.options.model,
            systemPrompt: this.options.systemPrompt,
            topK: this.options.topK,
        });
    }
}
/**
 * RAG Resource
 */
export class RAGResource {
    client;
    constructor(client) {
        this.client = client;
    }
    /**
     * Create a query builder for fluent API
     *
     * @example
     * ```typescript
     * const result = await jabrod.rag
     *   .queryBuilder()
     *   .withQuery('What is the refund policy?')
     *   .withKnowledgeBase('kb_123')
     *   .withTopK(5)
     *   .execute();
     * ```
     */
    queryBuilder() {
        return new QueryBuilder(this.client);
    }
    /**
     * Create a chat builder for fluent API
     *
     * @example
     * ```typescript
     * const result = await jabrod.rag
     *   .chatBuilder()
     *   .withMessage('Summarize the key points')
     *   .withKnowledgeBase('kb_123')
     *   .withModel('gpt-4o-mini')
     *   .execute();
     * ```
     */
    chatBuilder() {
        return new ChatBuilder(this.client);
    }
    /**
     * Quick query - semantic search without LLM
     *
     * @example
     * ```typescript
     * const result = await jabrod.rag.query({
     *   kbId: 'kb_123',
     *   query: 'What is the refund policy?',
     *   topK: 5
     * });
     * ```
     */
    async query(options) {
        return this.client.post('/v1/query', options);
    }
    /**
     * Quick chat - RAG with LLM response
     *
     * @example
     * ```typescript
     * const result = await jabrod.rag.chat({
     *   kbId: 'kb_123',
     *   message: 'Summarize the refund policy'
     * });
     * ```
     */
    async chat(options) {
        return this.client.post('/v1/chat', options);
    }
}
//# sourceMappingURL=rag.js.map