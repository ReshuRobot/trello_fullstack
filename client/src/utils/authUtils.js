import authApi from "../api/authApi"

const authUtils = {
  isAuthenticated: async () => {
    const token = localStorage.getItem('token')
    if (!token) return false
    try {
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
      const res = await authApi.verifyToken()
      return res.user
    } catch {
      return false
    }
  }
}

export default authUtils