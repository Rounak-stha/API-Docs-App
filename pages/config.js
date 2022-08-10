import { useContext, useEffect, useState } from "react"
import { DocsContext } from "@/components/DocsContext"
import { checkCtxAndReturnProps } from "@/lib/session"
import ColoredButton from "@/components/ColoredButton"
import Editor from "@/components/Editor"
import BigInfo from "@/components/BigInfo"
import axios from "axios"

const APP_URL = process.env.NEXT_PUBLIC_APP_URL

const placeholder = `{ 
  "User" : [
    {
      "method":"POST",
      "path":"abc/xyz",
      "details":  {
        "Request" :{
            "headers":  {
              "authorization":"Bearer gkjdahsgdkjahsgdkajhd"
            }
          },
        "Documentation":"This Route gets a user by verifying the authorization token sent in the header"
      }
    },
    {
      "method":"POST",
      "path":"abc/xyz",
      "details": {
        "Request": {
          "headers": {"authorization":"Bearer <Token>"},
          "params": { "sendOtp": 1,"verifyOtp": 1},
          "body": {"abc":"908070","email":"newmail@email.com"}
        },
      "Documentation":"This route is called to change the user's email"}
    }
  ],
  "Booking": [
    { 
      "method": "GET",
      "path": "book/getRoom",
      "details": {
        "Request": {},
        "Documentation":"This route is called to change the user's email"
      }
    }
  ]
}
`

const FORMAT = {
  method: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  path: 'string',
  details: {
    request: 'object',
    documentation: 'string' 
  }
}

const FORMAT_KEYS = Object.keys(FORMAT)


export default function({ newSession, configData, apiUrl, guest }) {
  const { docConfig, setApi, setDocConfig } = useContext(DocsContext)

  const [value, setValue] = useState(guest ? '' : JSON.stringify(docConfig))
  const [format, setFormat] = useState(true)
  const [url, setUrl] = useState('')
  const [dialogueBox, setdDialogueBox] = useState({})
  
  useEffect(() => {
    console.log('UseEffect in Config Page')
      if (newSession) {
        localStorage.setItem('configData', configData)
        configData = JSON.parse(configData)
        setValue(configData)
        setFormat(true)
        setApi(apiUrl)
        setDocConfig(configData)
        return
      }
      setValue(localStorage.getItem('configData'))
      setFormat(true)
  }, [])

  return (
    <>
      { dialogueBox.show && <BigInfo type={dialogueBox.type} data={dialogueBox.data} nextRoute={dialogueBox.nextRoute} /> }
      <div className="flex gap-4">
        { !guest && <ColoredButton handleClick={() => {
          let save = true
          let tempConfig
          try {
             tempConfig = JSON.parse(value)
          } catch(err) {
            alert('You have an error in your JSON. Please check your config thoroughly')
            return
          }
          let keys = Object.keys(tempConfig)
          let breakAll = false
          for (let j = 0; j < keys.length; j++) {
            let key = keys[j]
            if (!Array.isArray(tempConfig[key])) return alert('Please follow the correct syntax for the config. Each Topic should be an array.')
            for (let k = 0; k < tempConfig[key].length; k++) {
              console.log('obj is: ', tempConfig[key][k])
              let obj = tempConfig[key][k]
              let finalObj = {}
              for (let i = 0; i < FORMAT_KEYS.length; i++) {
                let formatKey = FORMAT_KEYS[i]
                if (!obj[formatKey]) {
                  alert('You are missing ' + '"' + formatKey + '"' + ' in ' + key + '\n' + 'The correct format is: \n' + JSON.stringify(FORMAT, null, 8))
                  breakAll = true
                  break
                }
                if (formatKey === 'method' && typeof obj.method === 'string' && !FORMAT.method.includes(obj.method.toUpperCase())) {
                  alert('Your method type is not valid in one of your ' + key + ' routes')
                  breakAll = true
                  break
                } 
                if (formatKey === 'path' && typeof obj.path !== 'string') {
                  alert('Path must be a string. Error in one of your ' + key + ' routes')
                  breakAll = true
                  break
                }
                if (formatKey === 'details' && typeof obj.details !== 'object' || typeof obj.details.Request !== 'object' || typeof obj.details.Documentation !== 'string') {
                    alert('Details in ' + key + ' is not in correct format. ' + '\n' + 'The correct format is: \n' + JSON.stringify(FORMAT.details, null, 8))
                    breakAll = true
                    break

                }
                finalObj[formatKey] = obj[formatKey]
              }
              if (breakAll) break
              obj = finalObj
            }
            if (breakAll) {
              save = false
              break
            }
          }
          if (save) {
            localStorage.setItem('configData', JSON.stringify(tempConfig)) // localstorage should store non formatted string
            setDocConfig(tempConfig)
          }
        }} text='Save' /> }
        <ColoredButton
          text='Publish' 
          handleClick={() => {
            if (!value) return
            if (guest) {
              if (!url) return
              axios.post(APP_URL + '/api/saveGuestData', { data: JSON.stringify(JSON.parse(value)), apiUrl: url }).then(res => {
                if (res.status === 200 && res.data.code) {
                  setdDialogueBox({ show: true, type: 'configCode', data: { code: res.data.code }, nextRoute: '/' })
                }
              }).catch(err => {
                setdDialogueBox({ show: true, text: `An Unknown Error Occoured`, nextRoute: '' })
              }) 
            }
            else {
              axios.post(APP_URL + '/api/updateConfigData', { data: JSON.stringify(JSON.parse(value)) })
                .then(res => {
                  if (res.status === 200) alert('Config Updated')
                })
                .catch(error => alert('An Unknown Error Occoured'))
            }
          }}
        />
      </div>
      { guest && (
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="bg-callout px-4 pt-[6px] w-full md:w-[350px] pb-2 mt-4 rounded-md"
            placeholder="Your API's URL (https://apiurl.com)"
          />
        )}
      <div className="mt-4">
        <Editor value={value} setValue={setValue} format={format} setFormat={setFormat} placeholder={placeholder} />
      </div>
    </>
  )
  }
export async function getServerSideProps(ctx) {
  const props = await checkCtxAndReturnProps(ctx)
  console.log(props)
  return props
}