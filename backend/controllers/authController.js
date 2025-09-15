// auth controller.js

export const signup = async (req, res) => {
    try {
        await res.send("This is a signup page")
    }
    catch (error) {
        console.log(error.message)
    }

}

export const login = async (req, res) => {
    try {
        await res.send("This ia a login page")
    }
    catch (error) {
        console.log(error.message)
    }
}