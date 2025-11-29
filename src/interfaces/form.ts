export interface InputProps {
    label: string;
    name: string;
    type?: string;
    placeholder?: string;
    value: any;
    onChangeFunc: (e: any) => void;
    min?: string;
    max?: string;
    checked?: boolean,
    inline?: boolean;
}

export interface FormValues {
    username: string,
    age: number,
    married?: boolean,
    dateOfBirth: string
}

export interface FormErrors {
    [key: string]: string[];
}