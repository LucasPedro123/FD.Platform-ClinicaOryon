import React, { createContext, useContext, useState, useEffect, ReactNode,  useMemo } from 'react';
import axios from 'axios';
import { Food, FoodContextType } from '../Interfaces/web.interfaces';
import { toast } from 'react-toastify';

const FoodContext = createContext<FoodContextType | undefined>(undefined);

const FoodProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [allFoodItems, setAllFoodItems] = useState<Food[]>([]);
    const [foodItems, setFoodItems] = useState<Food[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchFoodItems = async () => {
        try {
            const response = await axios.get('https://fooddatajson.onrender.com/api/foods');
            setAllFoodItems(response.data);
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
            // Adiciona o alimento no banco de dados do servidor
            const response = await axios.post('https://fooddatajson.onrender.com/api/foods', newFood);
            const foodWithId = { ...newFood, id: response.data._id };
    
            // Atualiza o estado local com o novo alimento
            setAllFoodItems(prevFoods => [...prevFoods, foodWithId]);
            setFoodItems(prevFoods => [...prevFoods, foodWithId]);
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    };
    

    const updateFoodItem = async (updatedFood: Food) => {
        try {
            // Atualiza o alimento no banco de dados do servidor
            await axios.put(`https://fooddatajson.onrender.com/api/foods/${updatedFood.id}`, updatedFood);
            
            console.log(updatedFood)
            // Atualiza o estado local com o alimento atualizado
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
    

    const deleteFoodItem = async (foodId:number ) => {
        try {
            // Remove o alimento do banco de dados do servidor
            await axios.delete(`https://fooddatajson.onrender.com/api/foods/${foodId}`);
    
            // Atualiza o estado local removendo o alimento
            setAllFoodItems(prevFoods => prevFoods.filter(food => food._id !== foodId));
            setFoodItems(prevFoods => prevFoods.filter(food => food._id !== foodId));
        } catch (error) {
            console.error('Error deleting document: ', error);
        }
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
