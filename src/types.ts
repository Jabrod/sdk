/**
 * Jabrod SDK Types
 */

// ============================================
// Configuration
// ============================================

export interface JabrodConfig {
    /** API key (starts with jb_) */
    apiKey: string;
    /** Base URL for API (default: https://cloud.jabrod.com) */
    baseUrl?: string;
}

// ============================================
// Knowledge Base
// ============================================

export interface KnowledgeBase {
    id: string;
    name: string;
    description?: string;
    status: 'active' | 'processing' | 'error' | 'archived';
    documentCount: number;
    vectorCount: number;
    createdAt: string;
    updatedAt: string;
}

export interface CreateKBOptions {
    name: string;
    description?: string;
}

// ============================================
// Documents
// ============================================

export interface Document {
    id: string;
    name: string;
    type: string;
    mimeType?: string;
    size: number;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    chunkCount?: number;
    errorMessage?: string;
    createdAt: string;
    processedAt?: string;
}

export interface UploadFileOptions {
    kbId: string;
    file: File | Blob;
    filename?: string;
}

export interface UploadTextOptions {
    kbId: string;
    content: string;
    name?: string;
}

// ============================================
// RAG - Query
// ============================================

export interface QueryOptions {
    /** Knowledge base ID */
    kbId: string;
    /** Search query */
    query: string;
    /** Number of results (1-20, default: 5) */
    topK?: number;
}

export interface QueryResult {
    chunks: QueryChunk[];
    query: string;
    latencyMs: number;
}

export interface QueryChunk {
    content: string;
    score: number;
    documentId: string;
    metadata?: Record<string, unknown>;
}

// ============================================
// RAG - Chat
// ============================================

export interface ChatOptions {
    /** Knowledge base ID */
    kbId: string;
    /** User message */
    message: string;
    /** LLM model (default: mistralai/mistral-small-3.1-24b-instruct:free) */
    model?: string;
    /** Custom system prompt */
    systemPrompt?: string;
    /** Number of context chunks (1-10, default: 5) */
    topK?: number;
}

export interface ChatResult {
    message: string;
    sources: ChatSource[];
    model: string;
    latencyMs: number;
    usage?: TokenUsage;
}

export interface ChatSource {
    documentId: string;
    content: string;
    score: number;
}

export interface TokenUsage {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
}

// ============================================
// Usage
// ============================================

export interface UsageStats {
    period: {
        start: string;
        end: string;
    };
    queries: number;
    chats: number;
    documentsProcessed: number;
    tokensUsed: number;
    storageUsedBytes: number;
    tier: string;
    limits: {
        queriesPerMonth: number;
        chatsPerMonth: number;
        storageBytes: number;
    };
}

// ============================================
// API Response
// ============================================

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: ApiError;
}

export interface ApiError {
    code: string;
    message: string;
    details?: Record<string, unknown>;
}

// ============================================
// Error Class
// ============================================

/**
 * Custom error class for Jabrod API errors
 */
export class JabrodError extends Error {
    public readonly code: string;
    public readonly status: number;
    public readonly details?: Record<string, unknown>;

    constructor(
        code: string,
        message: string,
        status: number,
        details?: Record<string, unknown>
    ) {
        super(message);
        this.name = 'JabrodError';
        this.code = code;
        this.status = status;
        this.details = details;
    }
}
