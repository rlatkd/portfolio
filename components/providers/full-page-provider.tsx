'use client'

import React from 'react';
import ReactFullpage from '@fullpage/react-fullpage';

export default function FullPageProvider({ children }) {
  const childrenArray = React.Children.toArray(children);
  
  return (
    <ReactFullpage
      scrollingSpeed={1000}
      navigation={true}
      credits={{ enabled: true, label: 'Made with fullpage.js', position: 'right' }}
      render={({ state, fullpageApi }) => {
        return (
          <ReactFullpage.Wrapper>
            {childrenArray.map((child, index) => (
              <div key={index} className="section">
                {child}
              </div>
            ))}
          </ReactFullpage.Wrapper>
        );
      }}
    />
  );
}
