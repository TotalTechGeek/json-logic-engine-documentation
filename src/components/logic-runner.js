
import React, { useEffect, useMemo, useState } from 'react';
import { LogicEngine } from 'json-logic-engine'
import AceEditor from "react-ace";

const noOp = () => {}
const engine = new LogicEngine()


export default function LogicRunner({ defaultLogic, defaultData }) {
    const [code, setCode] = useState(defaultLogic)
    const [data, setData] = useState(defaultData)
    const [out, setOut] = useState('')
  
    const [func, setFunc] = useState({ built: noOp })
  
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