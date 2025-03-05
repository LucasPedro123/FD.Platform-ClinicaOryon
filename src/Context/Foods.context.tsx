import React, { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";
import { Food, FoodContextType } from "../Interfaces/web.interfaces";
import { toast } from "react-toastify";

const FoodContext = createContext<FoodContextType | undefined>(undefined);

const apiUrl = "https://food-data-json.vercel.app/api";

const FoodProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [foodItems, setFoodItems] = useState<Food[]>([]);
  const [categories, setCategories] = useState<string[] | undefined>();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${apiUrl}/categories`);
      const data = response.data;
      setCategories(data);
    } catch (err) {
      console.log("Erro ao carregar categorias: ", err);
    }
  };

  const addCategory = async (newCategory: string): Promise<void> => {
    try {
      await axios.post(`${apiUrl}/categories`, {
        category: newCategory,
      });
      toast.success("Categoria adicionada com sucesso!");
    } catch (err) {
      console.error("Erro ao adicionar categoria:", err);
      toast.error("Erro ao adicionar categoria!");
      throw err;
    }
  };

  const updateCategory = async (
    currentCategory: string,
    updatedCategory: string
  ): Promise<void> => {
    try {
      await axios.put(`${apiUrl}/categories/${currentCategory}`, {
        category: updatedCategory,
      });
      setSelectedCategory(updatedCategory);
      toast.success("Categoria atualizada com sucesso!");
    } catch (err) {
      console.error("Erro ao atualizar categoria:", err);
      toast.error("Erro ao atualizar categoria!");
      throw err;
    }
  };

  const deleteCategory = async (category: string): Promise<void> => {
    try {
      await axios.delete(`${apiUrl}/categories/${category}`);
      toast.success("Categoria removida com sucesso!");
    } catch (err) {
      console.error("Erro ao remover categoria:", err);
      toast.error("Erro ao remover categoria!");
      throw err;
    }
  };

  const fetchFoodItems = async (category: string) => {
    try {
      const response = await axios.get(`${apiUrl}/categories/${category}`);
      setFoodItems(response.data);
    } catch (error) {
      console.error("Error fetching food items:", error);
    }
  };

  const addFoodItem = async (category: string, newFood: Food) => {
    try {
      await axios.post(`${apiUrl}/categories/${category}/items`, newFood);
      setFoodItems((prevFoods) => [...prevFoods, newFood]);
      toast.success("Alimento adicionado com sucesso!");
    } catch (error) {
      console.error("Error adding food item:", error);
    }
  };

  const updateFoodItem = async (category: string, updatedFood: Food) => {
    try {
      await axios.put(
        `${apiUrl}/categories/${category}/items/${updatedFood.id}`,
        updatedFood
      );
      setFoodItems((prevFoods) =>
        prevFoods.map((food) =>
          food.id === updatedFood.id ? updatedFood : food
        )
      );
      toast.success("Alimento atualizado com sucesso!");
    } catch (error) {
      console.error("Error updating food item:", error);
    }
  };

  const deleteFoodItem = async (category: string, foodId: number) => {
    try {
      await axios.delete(`${apiUrl}/categories/${category}/items/${foodId}`);
      setFoodItems((prevFoods) =>
        prevFoods.filter((food) => food.id !== foodId)
      );
      toast.success("Alimento removido com sucesso!");
    } catch (error) {
      console.error("Error deleting food item:", error);
    }
  };
  return (
    <FoodContext.Provider
      value={{
        categories,
        foodItems,
        setFoodItems,
        searchTerm,
        setSearchTerm,
        fetchFoodItems,
        fetchCategories,
        addFoodItem,
        updateFoodItem,
        deleteFoodItem,
        updateCategory,
        deleteCategory,
        addCategory,
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </FoodContext.Provider>
  );
};

const useFoodContext = () => {
  const context = useContext(FoodContext);
  if (!context) {
    throw new Error("useFoodContext must be used within a FoodProvider");
  }
  return context;
};

export { FoodProvider, useFoodContext };
