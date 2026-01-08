/**
 * Chat Resource
 */

import { HttpClient } from '../client.js';
import type { ChatOptions, ChatResult, QueryOptions, QueryResult } from '../types.js';

export class ChatResource {
    private client: HttpClient;

    constructor(client: HttpClient) {
        this.client = client;
    }

    /**
     * Query a knowledge base for relevant chunks
     * Returns raw chunks without LLM processing
     */
    async query(options: QueryOptions): Promise<QueryResult> {
        return this.client.post<QueryResult>('/v1/query', {
            kbId: options.kbId,
            query: options.query,
            topK: options.topK ?? 5,
        });
    }

    /**
     * Chat with a knowledge base
     * Uses RAG to generate AI responses based on KB content
     */
    async complete(options: ChatOptions): Promise<ChatResult> {
        return this.client.post<ChatResult>('/v1/chat', {
            kbId: options.kbId,
            message: options.message,
            model: options.model,
            systemPrompt: options.systemPrompt,
            topK: options.topK ?? 5,
        });
    }
}
