import { UserLogin } from '../interfaces/UserLogin.tsx';

const login = async (userInfo: UserLogin) => {
    try {
        // Send a POST request to localhost:3001/auth/login with the user inputted credentials in JSON format
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        });

        // Thwo and error if response status is not OK (200-299)
        if (!response.ok) {
            const errorData = await response.json(); // Parse error response as JSON
            throw new Error(`Error: ${errorData.message}`); // Throw a detailed error message    
          }
      
          // Parse the response body as JSON
          const data = await response.json();

          return data; // Return the data received from the server
    } catch (_err) {
        return Promise.reject('Could not fetch user info');
    }

}



const signup = async (userInfo: UserLogin) => {
    try {
        // Send a POST request to localhost:3001/auth/signup with the user inputted credentials in JSON format
        const response = await fetch('/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        });

        // Thwo and error if response status is not OK (200-299)
        if (!response.ok) {
            const errorData = await response.json(); // Parse error response as JSON
            throw new Error(`Error: ${errorData.message}`); // Throw a detailed error message    
          }
      
          // Parse the response body as JSON
          const data = await response.json();

          return data; // Return the data received from the server
    } catch (_err) {
        return Promise.reject('Could not fetch user info');
    }

}

export { login, signup };