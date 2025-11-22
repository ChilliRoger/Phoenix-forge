import axios from 'axios';
import * as cheerio from 'cheerio';

/**
 * Fetch archived page from Wayback Machine
 */
export async function fetchWaybackSnapshot(url: string, timestamp?: string): Promise<string | null> {
  try {
    // If no timestamp, get the latest snapshot
    const availabilityUrl = `https://archive.org/wayback/available?url=${encodeURIComponent(url)}`;
    const availabilityResponse = await axios.get(availabilityUrl);
    
    const snapshots = availabilityResponse.data?.archived_snapshots;
    if (!snapshots || !snapshots.closest) {
      console.error('No snapshots found for URL:', url);
      return null;
    }

    const snapshotUrl = snapshots.closest.url;
    const htmlResponse = await axios.get(snapshotUrl);
    
    return htmlResponse.data;
  } catch (error) {
    console.error('Wayback Machine fetch failed:', error);
    return null;
  }
}

/**
 * Extract assets and metadata from HTML
 */
export function parseHTML(html: string, baseUrl: string) {
  const $ = cheerio.load(html);
  
  const metadata = {
    title: $('title').text() || 'Untitled',
    description: $('meta[name="description"]').attr('content') || '',
    favicon: $('link[rel="icon"]').attr('href') || '',
    scripts: [] as string[],
    styles: [] as string[],
    images: [] as string[],
  };

  // Extract scripts
  $('script[src]').each((_, el) => {
    const src = $(el).attr('src');
    if (src) {
      metadata.scripts.push(resolveUrl(src, baseUrl));
    }
  });

  // Extract stylesheets
  $('link[rel="stylesheet"]').each((_, el) => {
    const href = $(el).attr('href');
    if (href) {
      metadata.styles.push(resolveUrl(href, baseUrl));
    }
  });

  // Extract images
  $('img[src]').each((_, el) => {
    const src = $(el).attr('src');
    if (src) {
      metadata.images.push(resolveUrl(src, baseUrl));
    }
  });

  return {
    html,
    metadata,
    $,
  };
}

/**
 * Resolve relative URLs
 */
function resolveUrl(url: string, base: string): string {
  try {
    return new URL(url, base).href;
  } catch {
    return url;
  }
}

/**
 * Fetch from GitHub repository
 */
export async function fetchGitHubRepo(owner: string, repo: string, path: string = ''): Promise<any> {
  try {
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
    const response = await axios.get(apiUrl, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        ...(process.env.NEXT_PUBLIC_GITHUB_TOKEN && {
          Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        }),
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('GitHub fetch failed:', error);
    return null;
  }
}

/**
 * Download and decode file from GitHub
 */
export async function fetchGitHubFile(downloadUrl: string): Promise<string> {
  try {
    const response = await axios.get(downloadUrl);
    return response.data;
  } catch (error) {
    console.error('GitHub file download failed:', error);
    return '';
  }
}

/**
 * Search Wayback Machine for snapshots
 */
export async function searchWaybackSnapshots(url: string): Promise<any[]> {
  try {
    const cdxUrl = `https://web.archive.org/cdx/search/cdx?url=${encodeURIComponent(url)}&output=json&limit=10`;
    const response = await axios.get(cdxUrl);
    
    // CDX returns array where first item is headers
    const [headers, ...snapshots] = response.data;
    
    return snapshots.map((snapshot: any[]) => ({
      timestamp: snapshot[1],
      original: snapshot[2],
      mimetype: snapshot[3],
      statuscode: snapshot[4],
      digest: snapshot[5],
      length: snapshot[6],
    }));
  } catch (error) {
    console.error('Wayback search failed:', error);
    return [];
  }
}

/**
 * Inject Web3 connectors into HTML
 */
export function injectWeb3Connectors(html: string): string {
  const $ = cheerio.load(html);
  
  // Inject wagmi/viem script before closing body tag
  const web3Script = `
    <script type="module">
      // Modern Web3 connector injection
      console.log('PhoenixForge: Web3 connectors initialized');
      
      // Add wallet connection UI if not present
      if (!document.querySelector('[data-phoenixforge-wallet]')) {
        const walletButton = document.createElement('button');
        walletButton.setAttribute('data-phoenixforge-wallet', 'true');
        walletButton.style.cssText = 'position:fixed;top:20px;right:20px;z-index:9999;padding:10px 20px;background:#ef4444;color:white;border:none;cursor:pointer;font-family:monospace;';
        walletButton.textContent = 'Connect Wallet';
        document.body.appendChild(walletButton);
      }
    </script>
  `;
  
  $('body').append(web3Script);
  
  return $.html();
}

/**
 * Clean and optimize archived HTML
 */
export function cleanHTML(html: string): string {
  const $ = cheerio.load(html);
  
  // Remove Wayback Machine toolbar
  $('#wm-ipp-base').remove();
  $('.wb-autocomplete-suggestions').remove();
  
  // Remove analytics scripts
  $('script[src*="analytics"]').remove();
  $('script[src*="google-analytics"]').remove();
  $('script[src*="gtag"]').remove();
  
  // Fix Wayback URLs (remove /web/timestamp/ prefix)
  $('[src]').each((_, el) => {
    const src = $(el).attr('src');
    if (src && src.includes('web.archive.org/web/')) {
      const cleaned = src.replace(/https?:\/\/web\.archive\.org\/web\/\d+\//, '');
      $(el).attr('src', cleaned);
    }
  });
  
  $('[href]').each((_, el) => {
    const href = $(el).attr('href');
    if (href && href.includes('web.archive.org/web/')) {
      const cleaned = href.replace(/https?:\/\/web\.archive\.org\/web\/\d+\//, '');
      $(el).attr('href', cleaned);
    }
  });
  
  return $.html();
}
