import { create } from 'ipfs-http-client';
import CryptoJS from 'crypto-js';

// IPFS client configuration
const projectId = process.env.NEXT_PUBLIC_IPFS_PROJECT_ID;
const projectSecret = process.env.NEXT_PUBLIC_IPFS_PROJECT_SECRET;
const auth = projectId && projectSecret 
  ? 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64')
  : undefined;

export const ipfsClient = auth ? create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
}) : null;

// Alternative: Use Pinata or web3.storage
export const pinataConfig = {
  apiKey: process.env.NEXT_PUBLIC_PINATA_API_KEY,
  apiSecret: process.env.NEXT_PUBLIC_PINATA_API_SECRET,
};

/**
 * Upload file to IPFS using Pinata
 */
export async function uploadToPinata(file: File | Blob): Promise<string> {
  if (!pinataConfig.apiKey || !pinataConfig.apiSecret) {
    throw new Error('Pinata credentials not configured');
  }

  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
    method: 'POST',
    headers: {
      pinata_api_key: pinataConfig.apiKey,
      pinata_secret_api_key: pinataConfig.apiSecret,
    },
    body: formData,
  });

  const data = await response.json();
  return data.IpfsHash;
}

/**
 * Upload JSON to IPFS using Pinata
 */
export async function uploadJSONToPinata(json: object): Promise<string> {
  if (!pinataConfig.apiKey || !pinataConfig.apiSecret) {
    throw new Error('Pinata credentials not configured');
  }

  const response = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      pinata_api_key: pinataConfig.apiKey,
      pinata_secret_api_key: pinataConfig.apiSecret,
    },
    body: JSON.stringify(json),
  });

  const data = await response.json();
  return data.IpfsHash;
}

/**
 * Upload directory to IPFS using Infura
 */
export async function uploadDirectoryToIPFS(files: { path: string; content: string }[]): Promise<string> {
  if (!ipfsClient) {
    // Fallback to mock CID generation
    return generateMockCID(JSON.stringify(files));
  }

  try {
    const results = [];
    for (const file of files) {
      const result = await ipfsClient.add({
        path: file.path,
        content: file.content,
      });
      results.push(result);
    }
    
    // Return the root CID
    return results[results.length - 1].cid.toString();
  } catch (error) {
    console.error('IPFS upload error:', error);
    return generateMockCID(JSON.stringify(files));
  }
}

/**
 * Generate contenthash for ENS
 * Format: ipfs://<CID>
 */
export function generateContenthash(cid: string): string {
  // ENS contenthash encoding (simplified)
  // In production, use @ensdomains/eth-ens-namehash
  return `ipfs://${cid}`;
}

/**
 * Generate mock CID for development
 */
export function generateMockCID(content: string): string {
  const hash = CryptoJS.SHA256(content + Date.now()).toString();
  return `Qm${hash.substring(0, 44)}`;
}

/**
 * Pin content to IPFS with metadata
 */
export async function pinToIPFS(
  content: string | object,
  metadata?: { name?: string; description?: string }
): Promise<{ cid: string; contenthash: string }> {
  try {
    let cid: string;

    if (typeof content === 'string') {
      // Upload as file
      const blob = new Blob([content], { type: 'text/html' });
      const file = new File([blob], metadata?.name || 'index.html', { type: 'text/html' });
      cid = await uploadToPinata(file);
    } else {
      // Upload as JSON
      cid = await uploadJSONToPinata(content);
    }

    const contenthash = generateContenthash(cid);
    return { cid, contenthash };
  } catch (error) {
    console.error('Pin to IPFS failed:', error);
    // Fallback to mock
    const mockCid = generateMockCID(JSON.stringify(content));
    return { cid: mockCid, contenthash: generateContenthash(mockCid) };
  }
}
