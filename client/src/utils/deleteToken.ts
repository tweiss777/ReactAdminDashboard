export default function deleteToken() {
    const tokenFromSession = sessionStorage.getItem('token')
    const tokenFromStorage = localStorage.getItem('token')
    if(tokenFromStorage){
        localStorage.removeItem('token')
    }
    else if(tokenFromSession){
        sessionStorage.removeItem('token')
    }
}
