import { JabrodClient } from './JabrodClient';

describe('JabrodClient', () => {
  describe('constructor', () => {
    it('should create an instance with default config', () => {
      const client = new JabrodClient();
      const config = client.getConfig();
      
      expect(config.baseUrl).toBe('https://api.jabrod.com');
      expect(config.timeout).toBe(30000);
      expect(config.apiKey).toBe('');
    });

    it('should create an instance with custom config', () => {
      const client = new JabrodClient({
        apiKey: 'test-key',
        baseUrl: 'https://custom.api.com',
        timeout: 60000,
      });
      const config = client.getConfig();
      
      expect(config.apiKey).toBe('test-key');
      expect(config.baseUrl).toBe('https://custom.api.com');
      expect(config.timeout).toBe(60000);
    });

    it('should merge partial config with defaults', () => {
      const client = new JabrodClient({ apiKey: 'my-key' });
      const config = client.getConfig();
      
      expect(config.apiKey).toBe('my-key');
      expect(config.baseUrl).toBe('https://api.jabrod.com');
      expect(config.timeout).toBe(30000);
    });
  });

  describe('echo', () => {
    it('should echo the provided message', async () => {
      const client = new JabrodClient();
      const result = await client.echo('Hello, World!');
      
      expect(result).toBe('Echo: Hello, World!');
    });
  });

  describe('getVersion', () => {
    it('should return the SDK version', () => {
      const client = new JabrodClient();
      const version = client.getVersion();
      
      expect(version).toBe('1.0.0');
    });
  });
});
