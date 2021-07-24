const CommonService = () => {
    /* DoAxiosCall(callback){
        axios.get(`/https://exampleService.com/${e.target.value}`).then(function (response) {
            callback(response.data['name']);
        }).catch(function (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    callback(`\u2014`)
                }
            }
        })
    } */
    console.log("common service call");
}

const checkLogin = () => {  
    if (localStorage.getItem("userInfo") === null) {
        return false; 
    }else{
        return true;
    }
}
export default CommonService;
export {checkLogin};