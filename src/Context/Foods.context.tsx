import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { Food, FoodContextType } from '../Interfaces/web.interfaces';
import { toast } from 'react-toastify';

const FoodContext = createContext<FoodContextType | undefined>(undefined);

const FoodProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [allFoodItems, setAllFoodItems] = useState<Food[]>([]);
    const [foodItems, setFoodItems] = useState<Food[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const apiUrl = 'https://food-data-json-bm8g.vercel.app/api/foods';
    console.log('Fetching foods from: ', `${apiUrl}`);

    const fetchFoodItems = async () => {
        try {
            const response = await fetch(`${apiUrl}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch: ${response.status}`);
            }
            const data = await response.json();
            setAllFoodItems(data);
        } catch (error) {
            console.error('Error fetching food items:', error);
        }
    };

    useEffect(() => {
        fetchFoodItems();
    }, []);

    const filteredFoods = useMemo(() => {
        if (searchTerm) {
            return allFoodItems.filter(food =>
                food.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        return allFoodItems;
    }, [searchTerm, allFoodItems]);

    useEffect(() => {
        setFoodItems(filteredFoods);
    }, [filteredFoods]);

    const addFoodItem = async (newFood: Food) => {
        try {
            const response = await fetch(`${apiUrl}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newFood),
            });
            if (!response.ok) {
                throw new Error(`Failed to add food item: ${response.status}`);
            }
            const data = await response.json();
            const foodWithId = { ...newFood, id: data._id };

            setAllFoodItems(prevFoods => [...prevFoods, foodWithId]);
            setFoodItems(prevFoods => [...prevFoods, foodWithId]);
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    };

    const updateFoodItem = async (updatedFood: Food) => {
        try {
            const response = await fetch(`${apiUrl}/${updatedFood.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedFood),
            });
            if (!response.ok) {
                throw new Error(`Failed to update food item: ${response.status}`);
            }

            setAllFoodItems(prevFoods =>
                prevFoods.map(food => (food.id === updatedFood.id ? updatedFood : food))
            );
            setFoodItems(prevFoods =>
                prevFoods.map(food => (food.id === updatedFood.id ? updatedFood : food))
            );

            toast.success('Food item updated successfully!');
        } catch (error) {
            console.error('Error updating document: ', error);
        }
    };

    const deleteFoodItem = async (foodId: number) => {
        try {
            const response = await fetch(`${apiUrl}/${foodId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`Failed to delete food item: ${response.status}`);
            }

            setAllFoodItems(prevFoods => prevFoods.filter(food => food._id !== foodId));
            setFoodItems(prevFoods => prevFoods.filter(food => food._id !== foodId));
        } catch (error) {
            console.error('Error deleting document: ', error);
        }
    };

    return (
        <FoodContext.Provider
            value={{
                foodItems,
                searchTerm,
                setSearchTerm,
                fetchFoodItems,
                addFoodItem,
                updateFoodItem,
                deleteFoodItem,
            }}
        >
            {children}
        </FoodContext.Provider>
    );
};

const useFoodContext = () => {
    const context = useContext(FoodContext);
    if (!context) {
        throw new Error('useFoodContext must be used within a FoodProvider');
    }
    return context;
};

export { FoodProvider, useFoodContext };
