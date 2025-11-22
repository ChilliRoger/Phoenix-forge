import { normalize } from 'viem/ens';
import { publicClient } from './publicClient';

/**
 * Resolve ENS name to address
 */
export async function resolveENS(ensName: string): Promise<string | null> {
  try {
    const address = await publicClient.getEnsAddress({
      name: normalize(ensName),
    });
    return address;
  } catch (error) {
    console.error('ENS resolution failed:', error);
    return null;
  }
}

/**
 * Get ENS name from address
 */
export async function getENSName(address: string): Promise<string | null> {
  try {
    const ensName = await publicClient.getEnsName({
      address: address as `0x${string}`,
    });
    return ensName;
  } catch (error) {
    console.error('ENS name lookup failed:', error);
    return null;
  }
}

/**
 * Get ENS avatar
 */
export async function getENSAvatar(ensName: string): Promise<string | null> {
  try {
    const avatar = await publicClient.getEnsAvatar({
      name: normalize(ensName),
    });
    return avatar;
  } catch (error) {
    console.error('ENS avatar lookup failed:', error);
    return null;
  }
}

/**
 * Generate ENS subdomain for resurrected project
 */
export function generateENSSubdomain(projectName: string): string {
  const sanitized = projectName
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 32);
  
  return `${sanitized}.phoenixforge.eth`;
}

/**
 * Get contenthash from ENS name
 */
export async function getENSContenthash(ensName: string): Promise<string | null> {
  try {
    const contenthash = await publicClient.getEnsText({
      name: normalize(ensName),
      key: 'contenthash',
    });
    return contenthash;
  } catch (error) {
    console.error('ENS contenthash lookup failed:', error);
    return null;
  }
}

/**
 * Mock: Set ENS contenthash (requires ownership)
 * In production, this would use a write contract call
 */
export async function setENSContenthash(
  ensName: string,
  contenthash: string
): Promise<{ success: boolean; txHash?: string }> {
  // This is a mock implementation
  // Real implementation would require:
  // 1. ENS ownership verification
  // 2. Write contract interaction with ENS resolver
  // 3. Transaction signing
  
  console.log(`Mock: Setting contenthash for ${ensName} to ${contenthash}`);
  
  return {
    success: true,
    txHash: `0x${Math.random().toString(16).substring(2, 66)}`,
  };
}
