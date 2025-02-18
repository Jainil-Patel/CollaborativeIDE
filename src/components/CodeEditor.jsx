import React from 'react'
import Editor from "@monaco-editor/react"

const CodeEditor = () => {
  return (
    <div>
        <div className='h-10 w-60vw border-r border-b border-[#3C3C3C]'></div>
        <Editor className="border-r border-[#3C3C3C]"height="89vh" width="60vw" defaultLanguage="javascript" defaultValue="// some comment"  theme='vs-dark'/>
    </div>
  )
}

export default CodeEditor
