const getUserBySub = async (token) =>{

    try {
        const request = await fetch(`${process.env.REACT_APP_API_URL}/users/sub`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const response =await request.json()
        console.log(response);
        return response
    } catch (error) {
        return {msg: error.message}
    }
}

export default getUserBySub