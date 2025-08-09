import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

interface SEOWrapperProps {
  title?: string;
  description?: string;
  keywords?: string;
  children: React.ReactNode;
}

export const SEOWrapper: React.FC<SEOWrapperProps> = ({
  title = "Build AI Apps by AI Apps - Browse, Clone, and Deploy in One Click",
  description = "Discover, clone, and deploy AI applications instantly. Browse our open-source AI app hub with 5,000+ developers. Connect to Replicate and deploy with one click.",
  keywords = "AI apps, clone AI apps, deploy AI, Replicate, open source AI, AI marketplace, AI development, machine learning apps",
  children
}) => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <link rel="canonical" href={window.location.href} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      {children}
    </HelmetProvider>
  );
};