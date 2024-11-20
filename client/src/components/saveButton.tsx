import React from 'react';
import type { Meal } from '../interfaces/MealInterface.tsx';

interface SaveButtonProps {
    data: Meal
}

const SaveButton: React.FC<SaveButtonProps> = ({ data }) => {
    const saveData = async () => {
        try {
            const response = await fetch('/api/meals', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${auth.getToken()}`
                }
                body: {
                    data,
                    //get the userId
                userId: auth.getUserId()
                userId: auth.getUserId()
                }
            }
        }
    }
}