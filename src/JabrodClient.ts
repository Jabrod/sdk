/**
 * Configuration options for the Jabrod SDK client
 */
export interface JabrodClientConfig {
  apiKey?: string;
  baseUrl?: string;
  timeout?: number;
}

/**
 * Main client for interacting with Jabrod services
 */
export class JabrodClient {
  private config: Required<JabrodClientConfig>;

  constructor(config: JabrodClientConfig = {}) {
    this.config = {
      apiKey: config.apiKey || '',
      baseUrl: config.baseUrl || 'https://api.jabrod.com',
      timeout: config.timeout || 30000,
    };
  }

  /**
   * Get the current configuration
   */
  getConfig(): Readonly<Required<JabrodClientConfig>> {
    return { ...this.config };
  }

  /**
   * Example method to demonstrate SDK functionality
   * @param message - A message to echo
   * @returns The echoed message
   */
  async echo(message: string): Promise<string> {
    return `Echo: ${message}`;
  }

  /**
   * Get the SDK version
   */
  getVersion(): string {
    return '1.0.0';
  }
}
