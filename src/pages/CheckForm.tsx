import { useState } from "react";
import { Input } from "../components/Input";
import { FormErrors, FormValues } from "../interfaces/form";
import { BaseResponse } from "../interfaces";
import "../style/CheckForm.css";


export function CheckForm() {
    const [formData, setFormData] = useState<FormValues>({
        username: "",
        age: 0,
        dateOfBirth: ""
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const endpoint: string = "http://localhost:3001/info/validate-form";

    async function validateForm(formValues: FormValues): Promise<BaseResponse> {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
     });
     return await res.json();
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
          const res = await validateForm(formData);
          if(!res.success) {
          let fieldErrors: FormErrors = {};
          res.errors.forEach((error: {[key: string]: any}) => {
            fieldErrors[error.property] = Object.values(error.constraints);
          });
          setErrors(fieldErrors);
          }
        } 
        catch (err) { 
          console.error(err)
        }
    };

    const splitErrors = (errorsMsg: string[]) =>  {
      return errorsMsg.map((msg, index) => <div className="errors" key={msg + index}><small className="validation-error">{msg}</small></div>);
    }

  return (
    <div className="check-form">
      <h2 className="validation-form-title">Valida dati</h2>
      <form onSubmit={handleSubmit}>
        <Input 
          label="Nome"
          name="username"
          type="textarea"
          placeholder="Johnny"
          value={formData.username}
          onChangeFunc={(e) => setFormData({...formData, username: e.target.value})} />
          {errors && errors.username && errors.username.length > 0 && splitErrors(errors.username)}

        <Input 
          label="Età"
          name="age"
          placeholder="99"
          type="number"
          value={formData.age}
          min="0"
          onChangeFunc={(e) => setFormData({...formData, age: Number(e.target.value)})} />
          {errors && errors.age && errors.age.length > 0 && splitErrors(errors.age)}

        <span className="lighter-text-color">Sposat*</span>
          <div className={`radio-section ${formData.age < 18 ? "disabled" : ""}`}>
            <Input 
              label="Sì"
              type="radio"
              name="married"
              value="true"
              inline={true}
              onChangeFunc={(e) =>
              setFormData({ ...formData, married: e.target.value === "true" })} /> 

            <Input 
              label="No"
              type="radio"
              name="married"
              value="false"
              inline={true}
              onChangeFunc={(e) =>
              setFormData({ ...formData, married: e.target.value === "true" })} /> 
          </div>
          {errors && errors.married && errors.married.length > 0 && splitErrors(errors.married)}
      
        <Input 
          label="Data di nascita"
          name="dateOfBirth"
          type="date"
          value={formData.dateOfBirth}
          onChangeFunc={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
          min="1900-01-01"
          max="2025-10-30"
        />
        {errors && errors.dateOfBirth && errors.dateOfBirth.length > 0 && splitErrors(errors.dateOfBirth)}
        <button type="submit" title="submit" className="submit-form-btn">Submit</button>
      </form>
    </div>
  );
}