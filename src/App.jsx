import { useState, useRef, useCallback } from 'react'
import './App.css'
import { compress, decompress, compressSync, decompressSync } from 'fflate';

function App() {
  const compressInputRef = useRef();
  const decompressInputRef = useRef();

  const handleCompression = () => {
    const text = compressInputRef.current.value;
    const textBytes = new TextEncoder().encode(text);

    try {
      const compressed = compressSync(textBytes, { level: 11 });
      decompressInputRef.current.value = btoa(String.fromCharCode(...compressed));
    } catch (error) {
      console.error("Compression error:", error);
    }
  };


  const handleDecompression = () => {
    const text = decompressInputRef.current.value;
    const compressedBytes = Uint8Array.from(atob(text), c => c.charCodeAt(0));

    try {
      const decompressed = decompressSync(compressedBytes, { level: 11 });
      compressInputRef.current.value = String.fromCharCode(...decompressed);
    } catch (error) {
      console.error("Compression error:", error);
    }
  };

  return <div className="App">
    <div style={{margin: '0px', padding: '16px 0px', fontSize: '32px'}}>Brotli Compressor & Decompressor</div>
    <div style={{display: 'flex', gap: '16px', height: '100%', paddingBottom: '16px'}}>
      <div style={{flexGrow: 1, display: 'flex', flexDirection: 'column'}}>
        <button style={{marginBottom: '16px', padding: '8px'}} id="compressBtn" onClick={handleCompression}>Compress</button>
        <textarea 
          ref={compressInputRef} 
          placeholder="Enter text here"
          style={{flexGrow: 1}}
        ></textarea>
      </div>
      <div style={{flexGrow: 1, display: 'flex', flexDirection: 'column'}}>
        <button style={{marginBottom: '16px', padding: '8px'}} id="decompressBtn" onClick={handleDecompression}>Decompress</button>
        <textarea 
          ref={decompressInputRef} 
          placeholder="Compressed text"
          style={{flexGrow: 1}}
        ></textarea>
      </div>
    </div>
  </div>
}

export default App
