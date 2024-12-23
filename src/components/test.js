import React from 'react';
import { createComponent } from '@lit-labs/react';
import { MyLitComponent } from './Quiz';

// Wrap the Lit component for use in React
export const MyLitComponentWrapper = createComponent({
  tagName: 'my-lit-component',  // Tag name of the Lit component
  elementClass: MyLitComponent, // The Lit class
  react: React,                 // React instance
});