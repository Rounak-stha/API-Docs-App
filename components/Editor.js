import { useEffect, useRef, useState } from "react";

export default function Editor({ value, setValue, placeholder }) {
    const [refContainer, Editor] = useCodeMirror('')
    
    useEffect(() => {
        if (Editor) {
          if (guest) return
          Editor.dispatch({
            changes: { from: 0, to: Editor.state.doc.length, insert: JSON.stringify(docConfig, null, 4) }
          });
        }
      }, [Editor])

      return <div ref={refContainer}></div>
}