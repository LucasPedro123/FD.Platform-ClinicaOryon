

export interface IUser {
    email: string;
    name: string;
    password: string;
    phone: string;
    photoURL: string;
    userId: string;
    weeklyCalories?: number;
    firestoreId?: string | undefined;
}

export interface Food {
    id: number;
    name: string;
    portion: string;
    calories: number;
    firestoreId?: string; 
}


export interface FoodContextType {
    foodItems: Food[];
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    fetchFoodItems: () => void;
    updateFoodItem: (updatedFood: Food) => void;
    deleteFoodItem: (foodId: string | undefined) => void;
    addFoodItem: (food: Food ) => void;
}

export interface UserContextType {
    users: IUser[];
    userImages: { [key: string]: string };
    fetchUsers: () => void;
    deleteUserAccount: (user: IUser) => Promise<void>;
}

export interface IEmailSend {
    emailSend: IEmailProps[]
}

export interface IEmailProps {
    id: number;
    image: string;
    company: string;
    title: string;
    label: string;
    component: () => JSX.Element; // Sem parâmetros
}