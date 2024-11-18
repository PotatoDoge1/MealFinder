import { useState, useEffect, useLayoutEffect } from 'react';
import type { UserData } from '../interfaces/UserData.tsx';
import auth from '../utils/auth.tsx';
import ErrorPage from './Error.tsx';
import UserList from '../components/UserList.tsx';
import { retrieveUsers } from '../api/usersAPI.tsx';

const Home = () => {
    
    const [users, setUsers] = useState<UserData[]>([]);
    const [error, setError] = useState(false);
    const [loginCheck, setLoginCheck] = useState(false);

    useEffect(() => {
        if (loginCheck) {
            fetchUsers();
        }
    }, [loginCheck]);

    useLayoutEffect(() => {
        checkLogin();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await retrieveUsers();
            setUsers(data);
        } catch (err) {
            console.error('Failed to retrieve users:', err);
            setError(true);
        }
    }

    const checkLogin = () => {
        if (auth.loggedIn()) {
            setLoginCheck(true);
        }
    };

    if (error) {
        return <ErrorPage />;
    }

    return (
        <>
            {
                !loginCheck ? (
                    <div className='login-notice'>
                        <h1>
                            Login to view all the users!
                        </h1>
                    </div>
                ) : (
                    <UserList users={users} />
                )
            }
        </>
    )

}

export default Home;