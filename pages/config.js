import { useContext, useEffect, useState } from "react"
import { DocsContext } from "context/DocsContext"
import { checkCtxAndReturnProps } from "@/lib/session"
import ColoredButton from "@/components/ColoredButton"
import BigInfo from "@/components/BigInfo"
import axios from "axios"
import { useCodeMirror } from "@/lib/Editor"
import Input from "@/components/Input"

const APP_URL = process.env.NEXT_PUBLIC_APP_URL

const placeholder = JSON.stringify({
  Auth: [
    {
      method: 'string',
      path: 'string',
      details: {
        Request: {
          headers: 'object',
          body: 'object',
          params: 'object (query Params)'
        },
        documentation: 'string'
      }
    },
    {
      method: 'string',
      path: 'string',
      details: {
        Request: {
          headers: 'object',
          body: 'object',
          params: 'object (query Params)'
        },
        documentation: 'string'
      }
    }
  ],
  User: [
    {
      method: 'string',
      path: 'string',
      details: {
        Request: {
          headers: 'object',
          body: 'object',
          params: 'object (query Params)'
        },
        documentation: 'string'
      }
    },
    {
      method: 'string',
      path: 'string',
      details: {
        Request: {
          headers: 'object',
          body: 'object',
          params: 'object (query Params)'
        },
        documentation: 'string'
      }
    }
  ]
}, null, 4)

export default function Config({ newSession, configData, apiUrl, guest }) {
  const { docConfig, api, setApi, setDocConfig } = useContext(DocsContext)

  const [dialogueBox, setdDialogueBox] = useState({})
  const [apiUrlChanged, setApiUrlChanged] = useState(false)
  const [apiUrlObj, setApiUrlObj] = useState({ text: newSession ? apiUrl : '' })

  const [refContainer, Editor] = useCodeMirror('', placeholder)
  
  useEffect(() => {
    if (Editor) {
      if (guest) return
      Editor.dispatch({
        changes: { from: 0, to: Editor.state.doc.length, insert: JSON.stringify(docConfig, null, 4) }
      });
    }
  }, [Editor])

  useEffect(() => {
    if (guest) return

    const apiEndPoint = newSession ? apiUrl : localStorage.getItem('api')

    if (newSession) {
      localStorage.setItem('configData', configData)
      localStorage.setItem('api', apiUrl)
      setApi(apiUrl)
    }

    setApiUrlObj({ text: apiEndPoint })
    if (!api) setApi(apiEndPoint)
    if (Object.keys(docConfig).length === 0) setDocConfig(JSON.parse(newSession ? configData : localStorage.getItem('configData')))

  }, [])

  return (
    <>
      { dialogueBox.show && <BigInfo type={dialogueBox.type} data={dialogueBox.data} nextRoute={dialogueBox.nextRoute} /> }
      <div className="flex flex-wrap items-center gap-4">
        { !guest && 
          <ColoredButton 
            text='Save'
            handleClick={() => {
              // editor data is formatted string, so first convert to Javascript Object
              const editorData = JSON.parse(Editor.state.toJSON().doc)
              localStorage.setItem('configData', JSON.stringify(editorData)) // saved as non formatted plain string
              setDocConfig(editorData) 
            }}  
          /> }
        <ColoredButton
          text='Publish' 
          handleClick={() => {
            if (!Editor.state.doc.length) return alert('Nothing to publish')
            if (guest) {
              if (!apiUrlObj.text) return alert('No APi Endpoint Provided')
              axios.post(APP_URL + '/api/saveGuestData', { data: JSON.stringify(JSON.parse(Editor.state.toJSON().doc)), apiUrl: apiUrlObj.text }).then(res => {
                if (res.status === 200 && res.data.code) {
                  setdDialogueBox({ show: true, type: 'configCode', data: { code: res.data.code }, nextRoute: '/' })
                }
              }).catch(() => {
                setdDialogueBox({ show: true, text: `An Unknown Error Occoured`, nextRoute: '' })
              }) 
            }
            else {
              const data = JSON.stringify(JSON.parse(Editor.state.toJSON().doc))
              axios.post(APP_URL + '/api/updateConfigData', { data })
                .then(res => {
                  if (res.status === 200) {
                    localStorage.setItem('configData', data)
                    alert('Config Updated')
                  }
                })
                .catch(() => alert('An Unknown Error Occoured'))
            }
          }}
        />
        { guest ? (
          <Input context={apiUrlObj} fitContent={true} border={false} outline={false} placeholder="Your API's URL (https://apiurl.com)" />
        ) : (
          <>
            <Input 
              context={apiUrlObj} 
              fitContent={true} 
              border={false} 
              outline={false} 
              customOnChange={() => {
                if (apiUrlChanged) return
                else setApiUrlChanged(true)
              }} 
              placeholder='Your API URL' />
            <ColoredButton 
              disabled={!apiUrlChanged}
              text='Update API URL'
              handleClick={() => {
                const apiUrl = apiUrlObj.text
                if (apiUrl === api) return alert('The API endpoint is already updated')
                axios.post(APP_URL + '/api/updateApiUrl', { apiUrl })
                  .then(res => {
                    if (res.status === 200) {
                      setApi(apiUrl)
                      setApiUrlChanged(false)
                      localStorage.setItem('api', apiUrl)
                      alert('API URL Updated')
                    }
                  })
                  .catch(() => alert('An Unknown Error Occoured'))
              }}
            />
          </>
        )
      }
      </div>
      <div className="mt-4">
        <div ref={refContainer}></div>
      </div>
    </>
  )
  }
export async function getServerSideProps(ctx) {
  const props = await checkCtxAndReturnProps(ctx)
  return props
}