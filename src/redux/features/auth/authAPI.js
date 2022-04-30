export const authAPI = {
    login: userData => {
        localStorage.setItem('auth', JSON.stringify(userData));

        return userData;
    },

    register: async (userData) => {
        localStorage.setItem('auth', JSON.stringify(userData));

        return userData;
    },

    logout: () => localStorage.removeItem('auth')
};