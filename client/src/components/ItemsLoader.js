import React from 'react';
import ContentLoader from 'react-content-loader';

export function ItemsLoader() {
  return (
    <ContentLoader
      speed={2}
      width={200}
      height={275}
      viewBox="0 0 200 275"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb">
      <rect x="7" y="6" rx="6" ry="6" width="182" height="186" />
      <rect x="13" y="338" rx="0" ry="0" width="100" height="30" />
      <rect x="128" y="330" rx="0" ry="0" width="132" height="39" />
      <circle cx="493" cy="24" r="2" />
      <rect x="8" y="200" rx="0" ry="0" width="180" height="27" />
      <rect x="10" y="236" rx="0" ry="0" width="63" height="25" />
      <circle cx="171" cy="247" r="16" />
    </ContentLoader>
  );
}
