import React from 'react';

interface AffiliatePostProps {
  data: any;
}

export default function AffiliatePost({ data }: AffiliatePostProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">
        {data?.title || 'Affiliate Post'}
      </h1>
      <div className="prose max-w-none">
        {data?.content || 'Content loading...'}
      </div>
    </div>
  );
}