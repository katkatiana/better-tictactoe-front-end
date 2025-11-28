import { useState } from "react";
import { Input } from "../components/Input";
import { FormValues } from "../interfaces/form";
import { BaseResponse } from "../interfaces";


export function CheckForm() {
    const [formData, setFormData] = useState<FormValues>({
        username: "",
        age: 0,
        dateOfBirth: ""
    });

     async function validateForm(formValues: FormValues): Promise<BaseResponse> {
      const res = await fetch("http://localhost:3001/info/validate-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });
      const data: BaseResponse = await res.json();
      return data;
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try{
          await validateForm(formData)
        } catch {

        }
    };

  return (
    <div>
      <h2>Valida dati</h2>
      <form onSubmit={handleSubmit}>
        <Input 
          label="Nome"
          name="username"
          placeholder="John"
          value={formData.username}
          onChangeFunc={(e) => setFormData({...formData, username: e.target.value})} />

        <Input 
          label="Età"
          name="age"
          placeholder="99"
          type="number"
          value={formData.age}
          min="0"
          onChangeFunc={(e) => setFormData({...formData, age: Number(e.target.value)})} />

      <span> Sposat*
        <div>
        <Input 
          label="Sì"
          type="radio"
          name="married"
          value="true"
          checked={formData.married === true}
          onChangeFunc={(e) =>
            setFormData({ ...formData, married: e.target.value === "true" })} /> 


        <Input 
          label="No"
          type="radio"
          name="married"
          value="true"
          checked={formData.married === false}
          onChangeFunc={(e) =>
          setFormData({ ...formData, married: e.target.value === false })} /> 
        </div>
      </span>


        <Input 
          label="Data di nascita"
          name="dateOfBirth"
          type="date"
          value={formData.dateOfBirth}
          onChangeFunc={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
          min="1900-01-01"
          max="2025-10-30"
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}