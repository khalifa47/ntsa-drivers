export const authAPI = {
    login: async (userData) => {
        localStorage.setItem('auth', JSON.stringify(userData));

        return userData;
    },

    logout: () => localStorage.removeItem('auth')
};