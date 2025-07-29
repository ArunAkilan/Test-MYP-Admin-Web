import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// Polyfill globals if needed
if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder;
}
if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = TextDecoder;
}
