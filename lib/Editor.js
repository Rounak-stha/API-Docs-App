import { EditorView, basicSetup } from "codemirror"
import { EditorState } from '@codemirror/state'
import { HighlightStyle, syntaxHighlighting, indentUnit } from '@codemirror/language'
import { tags as t } from '@lezer/highlight'
import { keymap } from '@codemirror/view'
import { json, jsonParseLinter } from "@codemirror/lang-json"
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
      backgroundColor: "#034"
    },
    ".cm-content": {
      caretColor: "#0e9"
    },
    "&.cm-focused .cm-cursor": {
      borderLeftColor: "#0e9"
    },
    "&.cm-focused .cm-selectionBackground, ::selection": {
      backgroundColor: "#074"
    },
    ".cm-gutters": {
      backgroundColor: "#045",
      color: "#ddd",
      border: "none"
    }
  }, {dark: true})
  
  const syntaxHighlight = HighlightStyle.define([
    {
      tag: t.string,
      color: '#00ffff'
    },
    {
      tag: t.number,
      color: '#ff00ff'
    },
    {
      tag: t.propertyName,
      color: '#ffff00'
    },
    {
      tag: t.bool,
      color: '#001dff'
    },
    {
      tag: t.null,
      color: '#001dff'
    },
    {
      tag: t.separator,
      color: '#001dff'
    },
    {
      tag: t.brace,
      color: '#ffadff'
    },
    {
      tag: t.squareBracket,
      color: '#107f0f'
    }
])

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

export function useCodeMirror(doc) {
    const [Editor, setEditor] = useState({})
    const refContainer = useRef(null)

    useEffect(() => {
        if (!refContainer.current) return

        let editor = new EditorView({
            state: EditorState.create({
                doc,
                extensions,
            }),
            parent: refContainer.current
        }) 

        setEditor(editor)

        return () => editor.destroy()
    }, [refContainer])

    return [refContainer, Editor]
}




