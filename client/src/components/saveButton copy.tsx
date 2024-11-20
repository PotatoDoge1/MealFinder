/* import React from 'react';
import type { Meal } from '../interfaces/MealInterface.tsx';
import Auth from '../utils/auth';

interface SaveButtonProps {
    data: Meal
}

const SaveButton: React.FC<SaveButtonProps> = ({ data }) => {

    const saveData = async () => {
        try {
            await fetch('/api/meals', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${Auth.getToken()}`
                },
                body: JSON.stringify('')
                //{
                 //   data: data,
                    //get the userId
                    // userId: Auth.getUserId(),
                    // userId: Auth.getUserId()
                //}
            })
        } catch (error) {
            console.error(error);
        }
    }
}

export default SaveButton; */