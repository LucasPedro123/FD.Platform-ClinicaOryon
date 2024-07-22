import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../Services/fireConfig';
import { Food, FoodContextType } from '../Interfaces/web.interfaces';

const FoodContext = createContext<FoodContextType | undefined>(undefined);

const FoodProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [allFoodItems, setAllFoodItems] = useState<Food[]>([]);
    const [foodItems, setFoodItems] = useState<Food[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchFoodItems = async () => {
        const foodCollection = collection(db, 'foodItems');
        const querySnapshot = await getDocs(foodCollection);
        const foods = querySnapshot.docs.map(doc => ({ ...doc.data(), firestoreId: doc.id }) as Food);
        setAllFoodItems(foods);
        setFoodItems(foods);
        console.log(`Número de alimentos: ${foods.length}`);
    };

    useEffect(() => {
        fetchFoodItems();
    }, []);

    useEffect(() => {
        if (searchTerm) {
            const filteredFoods = allFoodItems.filter(food =>
                food.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFoodItems(filteredFoods);
        } else {
            setFoodItems(allFoodItems);
        }
    }, [searchTerm, allFoodItems]);

    const addFoodItem = async (newFood: Food) => {
        try {
            const docRef = await addDoc(collection(db, 'foodItems'), newFood);
            const foodWithId = { ...newFood, firestoreId: docRef.id };
            setAllFoodItems(prevFoods => [...prevFoods, foodWithId]);
            setFoodItems(prevFoods => [...prevFoods, foodWithId]);
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    };

    const updateFoodItem = (updatedFood: Food) => {
        setAllFoodItems(prevFoods =>
            prevFoods.map(food => (food.firestoreId === updatedFood.firestoreId ? updatedFood : food))
        );
        setFoodItems(prevFoods =>
            prevFoods.map(food => (food.firestoreId === updatedFood.firestoreId ? updatedFood : food))
        );
    };

    const deleteFoodItem = (foodId: string | undefined) => {
        setAllFoodItems(prevFoods => prevFoods.filter(food => food.firestoreId !== foodId));
        setFoodItems(prevFoods => prevFoods.filter(food => food.firestoreId !== foodId));
    };

    return (
        <FoodContext.Provider value={{ foodItems, searchTerm, setSearchTerm, fetchFoodItems, addFoodItem, updateFoodItem, deleteFoodItem }}>
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
