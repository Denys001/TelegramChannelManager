const request = async (url, method = "GET", data = null) => {
    try{
        const headers = {}
        let body
        if(data){
            headers['Content-Type'] = 'application/json'
            body = JSON.stringify(data)
        }
        const res = await fetch(url, {
            method,
            headers,
            body
        })
        return await res.json()
    }catch(e){
        console.log("Errors: " , e.message )
    }
}
export default request