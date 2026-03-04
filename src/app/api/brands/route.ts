import { NextResponse } from 'next/server';

const BRAND_DOMAINS: Record<string, string> = {
  'Hennessy': 'hennessy.com',
  'Score': 'drinkscore.co.za',
  'Niknaks': 'niknaks.co.za',
  'Samsung': 'samsung.com',
  'Puma': 'puma.com',
  'BAL': 'balenciaga.com',
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const brand = searchParams.get('brand');

  if (!brand) {
    return NextResponse.json({ error: 'Brand name required' }, { status: 400 });
  }

  const domain = BRAND_DOMAINS[brand];

  if (!domain) {
    // Fallback to Clearbit logo API (free, no auth required)
    return NextResponse.json({
      brand,
      logoUrl: `https://logo.clearbit.com/${encodeURIComponent(brand.toLowerCase().replace(/\s+/g, ''))}.com`,
      fallback: true,
    });
  }

  // Try Brandfetch search endpoint
  try {
    const response = await fetch(`https://api.brandfetch.io/v2/search?query=${encodeURIComponent(brand)}`, {
      headers: {
        'Authorization': `Bearer ${process.env.BRANDFETCH_API_KEY}`,
      },
      next: { revalidate: 86400 } // Cache for 24 hours
    });

    if (!response.ok) {
      throw new Error(`Brandfetch API error: ${response.status}`);
    }

    const data = await response.json();

    // The Brandfetch search API returns an array of objects which might contain an icon or logo
    if (data && data.length > 0) {
      const bestMatch = data[0];
      const logoUrl = bestMatch.icon || bestMatch.logo;

      if (logoUrl) {
        return NextResponse.json({
          brand,
          logoUrl,
          source: 'brandfetch',
        });
      }
    }

    throw new Error('No logo found in Brandfetch');
  } catch (error) {
    console.error(`Brand API error for ${brand}:`, error);

    // Fallback to Hunter.io (free, simple, and more reliable than the discontinued Clearbit)
    const fallbackDomain = domain || `${brand.toLowerCase().replace(/\s+/g, '')}.com`;
    return NextResponse.json({
      brand,
      logoUrl: `https://logo.hunter.io/${fallbackDomain}`,
      fallback: true,
      source: 'hunter'
    });
  }
}
