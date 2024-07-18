import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Services/fireConfig';
import { Food, FoodContextType } from '../Interfaces/web.interfaces';

const FoodContext = createContext<FoodContextType | undefined>(undefined);

const FoodProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [foodItems, setFoodItems] = useState<Food[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchFoodItems = async () => {
        const foodCollection = collection(db, 'foodItems');
        const querySnapshot = await getDocs(foodCollection);
        const foods = querySnapshot.docs.map(doc => doc.data() as Food);

        if (searchTerm) {
            const filteredFoods = foods.filter(food =>
                food.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFoodItems(filteredFoods);
        } else {
            setFoodItems(foods);
        }

        console.log(`Número de alimentos: ${foods.length}`);
    };

    useEffect(() => {
        // Fetch all food items by default
        const fetchAllFoodItems = async () => {
            const foodCollection = collection(db, 'foodItems');
            const querySnapshot = await getDocs(foodCollection);
            const foods = querySnapshot.docs.map(doc => doc.data() as Food);
            setFoodItems(foods);
        };

        fetchAllFoodItems();
    }, []);

    return (
        <FoodContext.Provider value={{ foodItems, searchTerm, setSearchTerm, fetchFoodItems }}>
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
