/**
 * Basic usage example for the Jabrod SDK
 */

import { JabrodClient } from '../src';

async function main() {
  // Create a new client with default configuration
  const client = new JabrodClient();
  
  console.log('Jabrod SDK Version:', client.getVersion());
  console.log('Configuration:', client.getConfig());
  
  // Use the echo method
  const echoResult = await client.echo('Hello from Jabrod SDK!');
  console.log(echoResult);
  
  // Create a client with custom configuration
  const customClient = new JabrodClient({
    apiKey: 'your-api-key-here',
    baseUrl: 'https://custom-api.jabrod.com',
    timeout: 60000,
  });
  
  console.log('\nCustom Client Configuration:', customClient.getConfig());
  const customEcho = await customClient.echo('Custom client example');
  console.log(customEcho);
}

main().catch(console.error);
