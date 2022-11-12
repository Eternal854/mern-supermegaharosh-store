import React from 'react';
import ContentLoader from 'react-content-loader';

function Loader() {
  return (
    <ContentLoader
      speed={2}
      width={600}
      height={275}
      viewBox="0 0 600 275"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb">
      <rect x="13" y="338" rx="0" ry="0" width="100" height="30" />
      <rect x="128" y="330" rx="0" ry="0" width="132" height="39" />
      <circle cx="493" cy="24" r="2" />
      <rect x="7" y="13" rx="0" ry="0" width="238" height="36" />
      <rect x="10" y="64" rx="0" ry="0" width="107" height="28" />
      <rect x="10" y="154" rx="0" ry="0" width="145" height="37" />
      <circle cx="33" cy="122" r="20" />
    </ContentLoader>
  );
}

export default Loader;
