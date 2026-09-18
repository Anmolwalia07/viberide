import type { Metadata } from 'next';

import { site } from '@/config/site';

export const siteName = site.name;
export const defaultDescription = site.metaDescription;
export const defaultOpenGraphImage = '/og-image.svg';

export function getCanonicalUrl(path = '/') {
  return new URL(path, site.url).toString();
}

export function buildMetadata({
  title,
  description = defaultDescription,
  path = '/',
  image = defaultOpenGraphImage,
  keywords,
}: {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  keywords?: string[];
}): Metadata {
  const pageTitle = title.includes(site.name) ? title : `${title} | ${site.name}`;
  const canonical = getCanonicalUrl(path);
  const ogImage = image.startsWith('http') ? image : getCanonicalUrl(image);

  return {
    title: pageTitle,
    description,
    keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title: pageTitle,
      description,
      url: canonical,
      siteName,
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description,
      images: [ogImage],
    },
  };
}
