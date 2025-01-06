
import React, { useEffect, useState } from 'react';
import { LogicEngine } from 'json-logic-engine'

const engine = new LogicEngine()
import BrowserOnly from '@docusaurus/BrowserOnly';
import Editor from "@monaco-editor/react"
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';


import { Formatter } from 'fracturedjsonjs';


const formatter = new Formatter();
if (ExecutionEnvironment.canUseDOM) {
  // Save a reference to the original ResizeObserver
  const OriginalResizeObserver = window.ResizeObserver;

  // Create a new ResizeObserver constructor
  window.ResizeObserver = function (callback) {
    const wrappedCallback = (entries, observer) => {
      window.requestAnimationFrame(() => {
        callback(entries, observer);
      });
    };

    // Create an instance of the original ResizeObserver
    // with the wrapped callback
    return new OriginalResizeObserver(wrappedCallback);
  };

  // Copy over static methods, if any
  for (let staticMethod in OriginalResizeObserver) {
    if (OriginalResizeObserver.hasOwnProperty(staticMethod)) {
      window.ResizeObserver[staticMethod] = OriginalResizeObserver[staticMethod];
    }
  }
}


export default function LogicRunner({ defaultLogic = '', defaultData = '' }) {
    const [code, setCode] = useState(defaultLogic)
    const [data, setData] = useState(defaultData)
    const [out, setOut] = useState('')
  

    const editorRef = React.useRef(null);

    const [func, setFunc] = useState({ built: () => {} })
  
    function executeLogic() {
      setOut(func.built(data))
    }
  
    useEffect(() => {
      try {
        setFunc({ built: engine.build(code) })
      } catch(err) {
        
      }
    }, [code])
  
  
    useEffect(() => {
      if (!(out ?? '').toString())
      executeLogic()
    }, [func])
  
    if (typeof window !== 'undefined') {

    
    return <>
        <BrowserOnly>
         {   () => (
          <>
          <b>Logic:</b>
            <Editor 
            
            // turn off minimap
            options={{ minimap: { enabled: false } }}

            height='180px'
            className='editor'
            defaultLanguage={'json'} defaultValue={formatter.Serialize(code)}  onChange={data => {
              try { 
                setCode(JSON.parse(data)) 
              } 
              catch (err) {}
            }} />
            <br />
            <b>Data:</b>
            <Editor 
            options={{ minimap: { enabled: false } }}
            
            className='editor' height='140px' defaultLanguage={'json'} defaultValue={JSON.stringify(data, undefined, 4)} onChange={data => {
              try { 
                setData(JSON.parse(data))
              }
              catch(ex) {
    
              }
            }} />
            <br />
            <button className='btn btn-secondary' onClick={executeLogic}>Execute</button> <br/>
    
            Output: <br/>
            <code>{JSON.stringify(out)}</code>
            </>
    )}
          </BrowserOnly>
    </>
    
    }
    return null
  }