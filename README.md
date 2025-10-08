# jabrod-sdk

A comprehensive SDK for developers to interact with Jabrod services.

## Installation

```bash
npm install jabrod-sdk
```

## Quick Start

```typescript
import { JabrodClient } from 'jabrod-sdk';

// Create a new client instance
const client = new JabrodClient({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.jabrod.com',
  timeout: 30000
});

// Use the client
const result = await client.echo('Hello, Jabrod!');
console.log(result); // Output: Echo: Hello, Jabrod!
```

## Configuration

The `JabrodClient` accepts the following configuration options:

- `apiKey` (optional): Your Jabrod API key
- `baseUrl` (optional): The base URL for API requests (default: `https://api.jabrod.com`)
- `timeout` (optional): Request timeout in milliseconds (default: `30000`)

## API Reference

### `JabrodClient`

The main client class for interacting with Jabrod services.

#### Methods

##### `getConfig()`

Returns the current client configuration.

```typescript
const config = client.getConfig();
console.log(config.baseUrl); // https://api.jabrod.com
```

##### `echo(message: string): Promise<string>`

Example method that echoes a message back.

```typescript
const result = await client.echo('Test message');
console.log(result); // Echo: Test message
```

##### `getVersion(): string`

Returns the SDK version.

```typescript
const version = client.getVersion();
console.log(version); // 1.0.0
```

## Development

### Setup

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test

# Lint code
npm run lint
```

### Project Structure

```
jabrod-sdk/
├── src/              # Source files
│   ├── index.ts      # Main entry point
│   ├── JabrodClient.ts   # Client implementation
│   └── JabrodClient.test.ts  # Tests
├── dist/             # Compiled output
├── package.json
├── tsconfig.json
└── README.md
```

## License

MIT License - see [LICENSE](LICENSE) for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
