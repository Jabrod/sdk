/**
 * RAG Resource - Query and Chat operations
 */
import { HttpClient } from '../client.js';
import type { QueryOptions, QueryResult, ChatOptions, ChatResult } from '../types.js';
/**
 * Query Builder - Fluent API for building RAG queries
 */
export declare class QueryBuilder {
    private client;
    private options;
    constructor(client: HttpClient);
    /**
     * Set the search query
     */
    withQuery(query: string): QueryBuilder;
    /**
     * Set the knowledge base ID
     */
    withKnowledgeBase(kbId: string): QueryBuilder;
    /**
     * Set number of results to return
     */
    withTopK(topK: number): QueryBuilder;
    /**
     * Execute the query
     */
    execute(): Promise<QueryResult>;
}
/**
 * Chat Builder - Fluent API for RAG chat
 */
export declare class ChatBuilder {
    private client;
    private options;
    constructor(client: HttpClient);
    /**
     * Set the user message
     */
    withMessage(message: string): ChatBuilder;
    /**
     * Set the knowledge base ID
     */
    withKnowledgeBase(kbId: string): ChatBuilder;
    /**
     * Set the LLM model
     */
    withModel(model: string): ChatBuilder;
    /**
     * Set custom system prompt
     */
    withSystemPrompt(prompt: string): ChatBuilder;
    /**
     * Set number of context chunks
     */
    withTopK(topK: number): ChatBuilder;
    /**
     * Execute the chat
     */
    execute(): Promise<ChatResult>;
}
/**
 * RAG Resource
 */
export declare class RAGResource {
    private client;
    constructor(client: HttpClient);
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
    queryBuilder(): QueryBuilder;
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
    chatBuilder(): ChatBuilder;
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
    query(options: QueryOptions): Promise<QueryResult>;
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
    chat(options: ChatOptions): Promise<ChatResult>;
}
//# sourceMappingURL=rag.d.ts.map