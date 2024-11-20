class AuthService {

    // Check if a user is logged in by retrieving the token from localStorage
    loggedIn() {
        const token = this.getToken();
        return token;
    }

    // Retrieve the JWT token from locatlStorage
    getToken(): string {
        const loggedUser = localStorage.getItem('id_token') || '';
        return loggedUser;
    }

    // Store the JWT token in localStorage and return to the home page after a successful login
    // note that after the token is set it rerenders the page to display it as though the user is logged in
    login(idToken: string) {
        localStorage.setItem('id_token', idToken);
        window.location.assign('/');
    }

    // Remove the JWT token from localStorage and redirect to the home page
    logout() {
        localStorage.removeItem('id_token');
        window.location.assign('/');
    }

    // Add a method to get the logged in username
    getUsername(): string | null {
        const token = this.getToken();
        if (!token) {
            return null;
        }

        try {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            return decodedToken.username || null;
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    }
    

}

// Export an instance of the AuthService class
export default new AuthService();