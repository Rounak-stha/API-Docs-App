import axios from "axios"


async function callApi(api, method, path, request) {
    try {
        const { headers, body, params } = request
        return await axios({
            method,
            url: `${api}/${path}`,
            headers,
            params,
            body
        }).then(res => res.data)
    } catch(err) {
        console.log(err)
        return err
    }
}

export { callApi }