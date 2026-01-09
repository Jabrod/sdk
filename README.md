# Jabrod SDK

Official TypeScript SDK for [Jabrod Cloud API](https://cloud.jabrod.com) - RAG as a Service.

Build AI-powered applications with knowledge bases in minutes.

## Installation

```bash
npm install jabrod
```

## Quick Start

```typescript
import { JabrodClient } from 'jabrod';

// Initialize the client
const jabrod = new JabrodClient({
  apiKey: process.env.JABROD_API_KEY
});

// Create a knowledge base
const kb = await jabrod.kb.create({
  name: 'My Documents',
  description: 'Product documentation'
});

// Upload a document
await jabrod.kb.upload({
  kbId: kb.id,
  file: myFile
});

// Query with RAG (fluent API)
const result = await jabrod.rag
  .queryBuilder()
  .withQuery('What is the refund policy?')
  .withKnowledgeBase(kb.id)
  .withTopK(5)
  .execute();

// Chat with RAG (fluent API)
const response = await jabrod.rag
  .chatBuilder()
  .withMessage('Summarize the key points')
  .withKnowledgeBase(kb.id)
  .withModel('gpt-4o-mini')
  .execute();

console.log(response.message);
```

## API Reference

### Client

```typescript
const jabrod = new JabrodClient({
  apiKey: 'jb_xxx',           // Required
  baseUrl: 'https://...'      // Optional
});
```

### Knowledge Bases

```typescript
// List all
const kbs = await jabrod.kb.list();

// Create
const kb = await jabrod.kb.create({ name: 'My KB' });

// Get
const kb = await jabrod.kb.get('kb_id');

// Delete
await jabrod.kb.delete('kb_id');

// Upload file
await jabrod.kb.upload({ kbId: 'kb_id', file: file });

// Upload text
await jabrod.kb.uploadText({ kbId: 'kb_id', content: 'text', name: 'file.txt' });

// List documents
const docs = await jabrod.kb.listDocuments('kb_id');
```

### RAG - Query (Semantic Search)

```typescript
// Quick method
const result = await jabrod.rag.query({
  kbId: 'kb_id',
  query: 'What is the refund policy?',
  topK: 5
});

// Builder pattern (recommended)
const result = await jabrod.rag
  .queryBuilder()
  .withQuery('What is the refund policy?')
  .withKnowledgeBase('kb_id')
  .withTopK(5)
  .execute();
```

### RAG - Chat

```typescript
// Quick method
const result = await jabrod.rag.chat({
  kbId: 'kb_id',
  message: 'Summarize the key points',
  model: 'gpt-4o-mini'
});

// Builder pattern (recommended)
const result = await jabrod.rag
  .chatBuilder()
  .withMessage('Summarize the key points')
  .withKnowledgeBase('kb_id')
  .withModel('gpt-4o-mini')
  .withSystemPrompt('You are a helpful assistant.')
  .withTopK(5)
  .execute();
```

### Usage

```typescript
const usage = await jabrod.usage.get();
```

## Error Handling

```typescript
import { JabrodClient, JabrodError } from 'jabrod';

try {
  const result = await jabrod.rag.query({ ... });
} catch (error) {
  if (error instanceof JabrodError) {
    console.log(error.code);    // 'INVALID_API_KEY', etc.
    console.log(error.message);
    console.log(error.status);
  }
}
```

## TypeScript

```typescript
import type {
  KnowledgeBase,
  Document,
  ChatResult,
  QueryResult,
  UsageStats
} from 'jabrod';
```

## License

MIT
