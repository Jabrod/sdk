/**
 * RAG Resource - Query and Chat operations
 */

import { HttpClient } from '../client.js';
import type { QueryOptions, QueryResult, ChatOptions, ChatResult } from '../types.js';

/**
 * Query Builder - Fluent API for building RAG queries
 */
export class QueryBuilder {
    private client: HttpClient;
    private options: Partial<QueryOptions> = {};

    constructor(client: HttpClient) {
        this.client = client;
    }

    /**
     * Set the search query
     */
    withQuery(query: string): QueryBuilder {
        this.options.query = query;
        return this;
    }

    /**
     * Set the knowledge base ID
     */
    withKnowledgeBase(kbId: string): QueryBuilder {
        this.options.kbId = kbId;
        return this;
    }

    /**
     * Set number of results to return
     */
    withTopK(topK: number): QueryBuilder {
        this.options.topK = topK;
        return this;
    }

    /**
     * Execute the query
     */
    async execute(): Promise<QueryResult> {
        if (!this.options.query) {
            throw new Error('Query is required. Use .withQuery()');
        }
        if (!this.options.kbId) {
            throw new Error('Knowledge base ID is required. Use .withKnowledgeBase()');
        }

        return this.client.post<QueryResult>('/v1/query', {
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
    private client: HttpClient;
    private options: Partial<ChatOptions> = {};

    constructor(client: HttpClient) {
        this.client = client;
    }

    /**
     * Set the user message
     */
    withMessage(message: string): ChatBuilder {
        this.options.message = message;
        return this;
    }

    /**
     * Set the knowledge base ID
     */
    withKnowledgeBase(kbId: string): ChatBuilder {
        this.options.kbId = kbId;
        return this;
    }

    /**
     * Set the LLM model
     */
    withModel(model: string): ChatBuilder {
        this.options.model = model;
        return this;
    }

    /**
     * Set custom system prompt
     */
    withSystemPrompt(prompt: string): ChatBuilder {
        this.options.systemPrompt = prompt;
        return this;
    }

    /**
     * Set number of context chunks
     */
    withTopK(topK: number): ChatBuilder {
        this.options.topK = topK;
        return this;
    }

    /**
     * Execute the chat
     */
    async execute(): Promise<ChatResult> {
        if (!this.options.message) {
            throw new Error('Message is required. Use .withMessage()');
        }
        if (!this.options.kbId) {
            throw new Error('Knowledge base ID is required. Use .withKnowledgeBase()');
        }

        return this.client.post<ChatResult>('/v1/chat', {
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
    private client: HttpClient;

    constructor(client: HttpClient) {
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
    queryBuilder(): QueryBuilder {
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
    chatBuilder(): ChatBuilder {
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
    async query(options: QueryOptions): Promise<QueryResult> {
        return this.client.post<QueryResult>('/v1/query', options);
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
    async chat(options: ChatOptions): Promise<ChatResult> {
        return this.client.post<ChatResult>('/v1/chat', options);
    }
}
