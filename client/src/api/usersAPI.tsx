import auth from '../utils/auth.tsx';

const retrieveUsers = async () => {
    try {
        const response = await fetch('/api/users', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth.getToken()}`
            }
        });
        const data = await response.json();

        if(!response.ok) {
            throw new Error('Invalid user API response for grabbing a list of all users, check network tab!');
        }

        return data;
    } catch(err) {
        console.log('Error from data retrieval:', err);
        return [];
    }
}

export { retrieveUsers };