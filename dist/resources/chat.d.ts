/**
 * Chat Resource
 */
import { HttpClient } from '../client.js';
import type { ChatOptions, ChatResult, QueryOptions, QueryResult } from '../types.js';
export declare class ChatResource {
    private client;
    constructor(client: HttpClient);
    /**
     * Query a knowledge base for relevant chunks
     * Returns raw chunks without LLM processing
     */
    query(options: QueryOptions): Promise<QueryResult>;
    /**
     * Chat with a knowledge base
     * Uses RAG to generate AI responses based on KB content
     */
    complete(options: ChatOptions): Promise<ChatResult>;
}
//# sourceMappingURL=chat.d.ts.map