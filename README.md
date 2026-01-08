# @jabrod/sdk

Official TypeScript SDK for [Jabrod Cloud API](https://cloud.jabrod.com) - RAG as a Service.

Build AI-powered applications with knowledge bases in minutes. Upload documents, query them with semantic search, and get AI-generated responses.

## Installation

```bash
npm install @jabrod/sdk
# or
yarn add @jabrod/sdk
# or
pnpm add @jabrod/sdk
```

## Quick Start

```typescript
import { Jabrod } from '@jabrod/sdk';

// Initialize the client
const jclient = Jabrod({
  apiKey: 'jb_your_api_key_here'
});

// Create a knowledge base
const kb = await jclient.kb.create({
  name: 'My Documents',
  description: 'Product documentation'
});

// Upload a document (browser)
const file = document.querySelector('input[type="file"]').files[0];
await jclient.kb.uploadFile({
  kbId: kb.id,
  file: file
});

// Or upload text content
await jclient.kb.uploadText({
  kbId: kb.id,
  content: 'Your text content here...',
  name: 'notes.txt'
});

// Chat with the knowledge base
const response = await jclient.chat.complete({
  kbId: kb.id,
  message: 'What is mentioned in my documents?'
});

console.log(response.message);
console.log('Sources:', response.sources);
```

## API Reference

### Initialization

```typescript
import { Jabrod } from '@jabrod/sdk';

const jclient = Jabrod({
  apiKey: 'jb_xxx',           // Required: Your API key
  baseUrl: 'https://...'      // Optional: Custom API URL
});
```

### Knowledge Bases

```typescript
// List all knowledge bases
const kbs = await jclient.kb.list();

// Create a knowledge base
const kb = await jclient.kb.create({
  name: 'My KB',
  description: 'Optional description'
});

// Get a specific knowledge base
const kb = await jclient.kb.get('kb-id');

// Delete a knowledge base
await jclient.kb.delete('kb-id');

// List documents in a knowledge base
const docs = await jclient.kb.listDocuments('kb-id');

// Upload a file
await jclient.kb.uploadFile({
  kbId: 'kb-id',
  file: fileOrBlob,
  filename: 'document.pdf'
});

// Upload text content
await jclient.kb.uploadText({
  kbId: 'kb-id',
  content: 'Your text here',
  name: 'notes.txt'
});
```

### Query (Semantic Search)

```typescript
// Query for relevant chunks without LLM processing
const results = await jclient.chat.query({
  kbId: 'kb-id',
  query: 'What is the return policy?',
  topK: 5  // Optional: Number of results (default: 5)
});

console.log(results.chunks);
// [{ content: '...', score: 0.95, documentId: '...' }, ...]
```

### Chat (RAG)

```typescript
// Get AI-generated response based on KB content
const response = await jclient.chat.complete({
  kbId: 'kb-id',
  message: 'Summarize the key points',
  model: 'mistralai/mistral-small-3.1-24b-instruct:free',  // Optional
  systemPrompt: 'You are a helpful assistant.',  // Optional
  topK: 5  // Optional: Number of context chunks
});

console.log(response.message);
console.log(response.sources);  // Relevant document chunks
console.log(response.usage);    // Token usage
```

### Usage Statistics

```typescript
// Get usage for current billing period
const usage = await jclient.usage.get();

console.log(usage.queries);
console.log(usage.tokensUsed);
console.log(usage.limits);
```

## Error Handling

```typescript
import { Jabrod, JabrodError } from '@jabrod/sdk';

try {
  const response = await jclient.chat.complete({ ... });
} catch (error) {
  if (error instanceof JabrodError) {
    console.log(error.code);    // 'INVALID_API_KEY', 'NOT_FOUND', etc.
    console.log(error.message); // Human-readable message
    console.log(error.status);  // HTTP status code
  }
}
```

## TypeScript Support

Full TypeScript support with exported types:

```typescript
import type {
  KnowledgeBase,
  Document,
  ChatResult,
  QueryResult,
  UsageStats
} from '@jabrod/sdk';
```

## Get Your API Key

1. Sign up at [agent.jabrod.com](https://agent.jabrod.com)
2. Go to Dashboard > API Keys
3. Click "Create Key"
4. Copy your key (starts with `jb_`)

## Support

- Documentation: [docs.jabrod.com](https://docs.jabrod.com)
- Issues: [GitHub Issues](https://github.com/jabrod/sdk/issues)

## License

MIT
