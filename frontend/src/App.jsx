import { useEffect, useState } from 'react'
import 'prismjs/themes/prism-tomorrow.css'
import Prism from 'prismjs'
import 'prismjs/components/prism-javascript'
import './App.css'
import Editor from 'react-simple-code-editor'
import axios from 'axios'
import Markdown from 'react-markdown'
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

function App() {
  const [code, setCode] = useState(`function App() { return 1+1 }`)

  const [response, setResponse] = useState('')
  useEffect(() => {
    Prism.highlightAll()
  }, [])

  async function reviewCode() {
    const response = await axios.post('http://localhost:3000/ai/getReview', { code })

    console.log(response.data);
    setResponse(response.data)

  }


  return (
    <>
      <main>
        <div className="left">
          <div className="code">
          <Editor
  value={code}
  onValueChange={setCode}
  highlight={(code) => Prism.highlight(code, Prism.languages.javascript, 'javascript')}
  padding={10}
  style={{
    fontFamily: '"Fira Code", "Fira Mono", monospace',
    fontSize: 16,
    height: '100%', // Keep inside fixed height
    width: '100%',
    overflow: 'auto', // Allow scrolling inside the editor
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
  }}
/>


          </div>
          <div
            onClick={reviewCode}
            className="review">Review</div>
        </div>
        <div className="right">
          <Markdown
            rehypePlugins={[rehypeHighlight]}
          >{response}</Markdown>
        </div>
      </main>
    </>
  )
}

export default App
