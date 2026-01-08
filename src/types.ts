/**
 * Type definitions for Jabrod SDK
 */

// API Configuration
export interface JabrodConfig {
    apiKey: string;
    baseUrl?: string;
}

// Knowledge Base
export interface KnowledgeBase {
    id: string;
    name: string;
    description: string | null;
    status: 'active' | 'processing' | 'error' | 'archived';
    documentCount: number;
    totalSize: number;
    vectorCount: number;
    createdAt: string;
    updatedAt: string;
}

export interface CreateKBOptions {
    name: string;
    description?: string;
}

// Document
export interface Document {
    id: string;
    knowledgeBaseId: string;
    name: string;
    type: 'file' | 'link' | 'text';
    mimeType: string | null;
    size: number;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    chunkCount: number;
    errorMessage: string | null;
    createdAt: string;
    processedAt: string | null;
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

// Query
export interface QueryOptions {
    kbId: string;
    query: string;
    topK?: number;
}

export interface QueryResult {
    chunks: {
        content: string;
        score: number;
        documentId: string;
        metadata?: Record<string, unknown>;
    }[];
    query: string;
    latencyMs: number;
}

// Chat
export interface ChatOptions {
    kbId: string;
    message: string;
    model?: string;
    systemPrompt?: string;
    topK?: number;
}

export interface ChatResult {
    message: string;
    sources: {
        documentId: string;
        content: string;
        score: number;
    }[];
    model: string;
    latencyMs: number;
    usage?: {
        promptTokens: number;
        completionTokens: number;
        totalTokens: number;
    };
}

// Usage
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

// API Response
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: {
        code: string;
        message: string;
        details?: unknown;
    };
}

// Error
export class JabrodError extends Error {
    code: string;
    status: number;
    details?: unknown;

    constructor(code: string, message: string, status: number = 400, details?: unknown) {
        super(message);
        this.name = 'JabrodError';
        this.code = code;
        this.status = status;
        this.details = details;
    }
}
