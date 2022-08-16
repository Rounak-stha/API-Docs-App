import CodeMirror, { EditorView, basicSetup } from "codemirror"
import { EditorState,  } from '@codemirror/state'
import { HighlightStyle, syntaxHighlighting, indentUnit } from '@codemirror/language'
import { tags as t } from '@lezer/highlight'
import { keymap, placeholder } from '@codemirror/view'
import { json } from "@codemirror/lang-json"
import { linter, lintGutter } from "@codemirror/lint"
import { insertTab, indentLess } from '@codemirror/commands'

import { useState, useEffect, useRef } from "react"

const doc = { 
    method: "POST",
    path: '/abc/xyz',
    details: {
      request: {
        headers: {
          Authorization: "Bearer <Token>"
        }
      },
      documentation: "This is a sample of the documentation"
    },
    "a": 1,
    b: true,
    c: [1,2,3]
  }
  
  const theme = EditorView.theme({
    "&": {
      color: "white",
      backgroundColor: "#222325",
      'font-size': '14px',
      height: '85vh',
      'scrollbar-width': 'thin'
    },
    
    ".cm-content": {
      caretColor: "#0e9"
    },

    "&.cm-focused .cm-cursor": {
      borderLeftColor: "#0e9"
    },

    "&.cm-focused .cm-selectionBackground, .cm-selectionMatch, ::selection": {
      backgroundColor: "#4a4a4a"
    },
    ".cm-gutters": {
      backgroundColor: "#262a2d",
      color: "#ddd",
      boder: ''
    }
  }, {dark: true})
  
  const syntaxHighlight = HighlightStyle.define([
    {
      tag: t.string,
      color: '#6a9955'
    },
    {
      tag: t.number,
      color: '#d3869b'
    },
    {
      tag: t.propertyName,
      color: '#569CD6'
    },
    {
      tag: t.bool,
      color: '#569CD6'
    },
    {
      tag: t.null,
      color: '#fb4934'
    },
    {
      tag: t.separator,
      color: '#001dff'
    },
    {
      tag: t.brace,
      color: '#fabd2f'
    },
    {
      tag: t.squareBracket,
      color: '#107f0f'
    }
])

const jsonParseLinter = () => (view) => {
  try {
      let editorText = view.state.doc.toString() 
      if (!editorText) {}
      else JSON.parse(editorText);
  }
  catch (e) {
      if (!(e instanceof SyntaxError))
          throw e;
      const pos = getErrorPosition(e, view.state.doc);
      return [{
              from: pos,
              message: e.message.replace('JSON.parse: ', ''),
              severity: 'error',
              to: pos
          }];
  }
  return [];
};

function getErrorPosition(error, doc) {
  let m;
  if (m = error.message.match(/at position (\d+)/))
      return Math.min(+m[1], doc.length);
  if (m = error.message.match(/at line (\d+) column (\d+)/))
      return Math.min(doc.line(+m[1]).from + (+m[2]) - 1, doc.length);
  return 0;
}


const extensions = [
    lintGutter(),
    basicSetup,
    keymap.of([{ key: 'Tab', run: insertTab }, { key: 'Shift-Tab', run: indentLess }]),
    indentUnit.of('\t'), 
    theme, 
    syntaxHighlighting(syntaxHighlight),
    json(),
    linter(jsonParseLinter())
]

export function useCodeMirror(doc, placeholderText) {
    const [Editor, setEditor] = useState(null)
    const refContainer = useRef(null)

    useEffect(() => {
        if (!refContainer.current) return

        let editor = new EditorView({
            state: EditorState.create({
                doc,
                extensions: [...extensions, placeholder(placeholderText)],
            }),
            parent: refContainer.current
        }) 

        setEditor(editor)

        return () => editor.destroy()
    }, [refContainer])

    return [refContainer, Editor]
}




