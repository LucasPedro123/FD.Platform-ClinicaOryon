

export interface IUser {
    email: string;
    name: string;
    password: string;
    phone: string;
    photoURL: string;
    userId: string;
    weeklyCalories?: number;
}

export interface Food {
    id: number;
    name: string;
    portion: string;
    calories: number;
}

export interface FoodContextType {
    foodItems: Food[];
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    fetchFoodItems: () => void;
}

export interface UserContextType {
    users: IUser[];
    userImages: { [key: string]: string };
    fetchUsers: () => void;
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