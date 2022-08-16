import { useEffect, useRef, useState } from "react";
import Prism from 'prismjs'

function update(elem, text) {
    let result_element = elem;
    // Handle final newlines (see article)
    if(text[text.length-1] == "\n") { // If the last character is a newline character
        text += " "; // Add a placeholder space character to the final line 
    }
    // Update code
    result_element.innerHTML = text.replace(new RegExp("&", "g"), "&").replace(new RegExp("<", "g"), "<"); /* Global RegExp */
    // Syntax Highlight
    Prism.highlightElement(result_element);
    
}

function sync_scroll(element, code_element) {
    /* Scroll result to scroll coords of event - sync with textarea */
    let result_element = code_element.parentElement
    // Get and set x and y
    result_element.scrollTop = element.scrollTop;
    result_element.scrollLeft = element.scrollLeft;
}

function check_tab(element, codeElem, event) {
    let code = element.value;
    if(event.key == "Tab") {
      /* Tab key pressed */
      event.preventDefault(); // stop normal
      let before_tab = code.slice(0, element.selectionStart); // text before tab
      let after_tab = code.slice(element.selectionEnd, element.value.length); // text after tab
      let cursor_pos = element.selectionEnd + 1; // where cursor moves after tab - moving forward by 1 char to after tab
      element.value = before_tab + "\t" + after_tab; // add tab char
      // move cursor
      element.selectionStart = cursor_pos;
      element.selectionEnd = cursor_pos;
      update(codeElem, element.value); // Update text to include indent
    }
}

export default function HighlightedTextarea({ content }) {
    const [value, setValue] = useState(content ? content.text : '')
    const [height, setHeight] = useState(0)
    const editorRef = useRef(null)
    const codeBlockRef = useRef(null)

    useEffect(() => {
        update(codeBlockRef.current, content.text)
        setHeight(editorRef.current.scrollHeight)
        Prism.highlightAll()
    }, [])

    return (
        <div style={{height}}>
            <div className={`bg-callout w-full h-full rounded-md relative`}>
                <textarea 
                    ref={editorRef}
                    style={{height}}
                    spellCheck="false"
                    className="rounded-md"
                    data-id="editing" 
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value)
                        update(codeBlockRef.current, e.target.value)
                        sync_scroll(editorRef.current, codeBlockRef.current)
                        if (content) content.text = e.target.value
                    }}
                    onScroll={() => {
                        sync_scroll(editorRef.current, codeBlockRef.current)
                    }}
                    onKeyDown={(e) => check_tab(editorRef.current, codeBlockRef.current, e)}
                />

                <pre style={{height}} data-id="highlighting" className="language-js" tabIndex='0' aria-hidden="true">
                    <code ref={codeBlockRef} className="language-js" ></code>
                </pre>
            </div>
        </div>
    )
}