
import React, { useEffect, useState } from 'react';
import { LogicEngine } from 'json-logic-engine'

const engine = new LogicEngine()

export default function LogicRunner({ defaultLogic = '', defaultData = '' }) {
    const [code, setCode] = useState(defaultLogic)
    const [data, setData] = useState(defaultData)
    const [out, setOut] = useState('')
  
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

    const AceEditor = require("react-ace").default;
    
    return <>
          <b>Logic:</b>
          <AceEditor style={{height: '120px' }} mode={'javascript'} value={JSON.stringify(code, undefined, 4)} onChange={data => {
            setCode(JSON.parse(data))
          }} />
          <br />
          <b>Data:</b>
          <AceEditor style={{height: '100px' }} mode={'javascript'} value={JSON.stringify(data, undefined, 4)} onChange={data => {
            try { 
              setData(JSON.parse(data))
            }
            catch(ex) {
  
            }
          }} />
          <br />
          <button class='btn btn-secondary' onClick={executeLogic}>Execute</button> <br/>
  
          Output: <br/>
          <code>{JSON.stringify(out)}</code>
  
    </>
    }
    return null
  }