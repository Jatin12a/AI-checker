import { useEffect, useState } from 'react'
import 'prismjs/themes/prism-tomorrow.css'
import Prism from 'prismjs'
import 'prismjs/components/prism-javascript'
import './App.css'
import Editor from '@monaco-editor/react'
import axios from 'axios'
import Markdown from 'react-markdown'
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

import aetherRunning from '../src/assets/Jrpg GIF.gif' // Import the running Aether GIF

function App() {
  const [code, setCode] = useState(`function App() { return 1+1 }`)
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    Prism.highlightAll()
  }, [])

  async function reviewCode() {
    setLoading(true)
    try {
      const res = await axios.post('http://localhost:3000/ai/getReview', { code })
      setResponse(res.data)
    } catch (error) {
      setResponse("Error fetching response.")
    }
    setLoading(false)
  }

  return (
    <>
      <main>
        <h3 className='heading'>AI Checker</h3>

        <div className="left">
          <div className="code">
            <Editor
              height="100%" 
              width="100%"
              language="javascript"
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value)}
              options={{
                fontSize: 16,
                minimap: { enabled: false }, 
                wordWrap: "on",
                scrollBeyondLastLine: false,
                automaticLayout: true,
              }}
            />
          </div>
          <div onClick={reviewCode} className="review">Review</div>
        </div>
        <div className="right">
          {loading ? <img src={aetherRunning} alt="Loading..." className="aether-loading" /> : <Markdown rehypePlugins={[rehypeHighlight]}>{response}</Markdown>}
        </div>
      </main>
    </>
  )
}

export default App
