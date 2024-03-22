export default function getToken(): string | null{
    const tokenFromSession = sessionStorage.getItem('token')
    const tokenFromStorage = localStorage.getItem('token')
    if(tokenFromSession || tokenFromStorage){
        return tokenFromStorage? tokenFromStorage : tokenFromSession
    }
    return null
}
