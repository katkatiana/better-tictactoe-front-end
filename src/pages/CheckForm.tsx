import { useEffect, useState } from "react";
import { FormErrors, FormValues } from "../interfaces/form";
import { BaseResponse } from "../interfaces";
import "../style/CheckForm.css";

export function CheckForm() {
  const [formData, setFormData] = useState<FormValues>({
    username: "",
    age: "",
    dateOfBirth: ""
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isValidationMade, setIsValidationMade] = useState<boolean>(false);
  const endpoint: string = `${process.env.REACT_APP_ENDPOINT_URL}info/validate-form`;
  async function validateForm(formValues: FormValues): Promise<BaseResponse> {
    if (Number(formData.age) < 18) setFormData({ ...formData, married: false });
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
    setErrors({});
    setIsValidationMade(false);
    try {
      const res = await validateForm(formData);
      setIsValidationMade(true);
      if (!res.success) {
        let fieldErrors: FormErrors = {};
        if (res.errors && res.errors.length > 0) {
          res.errors.forEach((error: { [key: string]: any }) => {
            fieldErrors[error.property] = Object.values(error.constraints);
          });
          setErrors(fieldErrors);
        }
      }
    }
    catch (err) {
      console.error(err)
    }
  };

  const splitErrors = (errorsMsg: string[]) => {
    return errorsMsg.map((msg, index) => <div className="errors" key={msg + index}><small className="validation-error">{msg}</small></div>);
  }

  const resetForm = () => {
    setFormData({
      username: "",
      age: "",
      married: null,
      dateOfBirth: ""
    })
    setErrors({});
    setIsValidationMade(false);
  }

  const isFormDirty = () => {
    return Object.values(formData).some(fd => fd !== '');
  }

  const isFormEmpty = () => {
    return Object.values(formData).some(fd => fd === '' || fd === 0);
  }

  const hasError = Object.keys(errors).length > 0;

  useEffect(() => {
    if (Number(formData.age) < 18) setFormData(prev => ({ ...prev, married: null }));
  }, [formData.age])

  return (
    <div className="check-form">
      <h2 className="validation-form-title">Valida dati</h2>
      <form onSubmit={handleSubmit}>
        <label className="lighter-text-color input-block">Nome
          <input
            name="username"
            type="text"
            placeholder="Inserisci il tuo nome"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
        </label>
        {errors && errors.username && errors.username.length > 0 && splitErrors(errors.username)}

        <label className="lighter-text-color input-block">Età
          <input
            name="age"
            type="text"
            placeholder="Inserisci l'età"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value === "" ? "" : Number(e.target.value) })}
          />
        </label>
        {errors && errors.age && errors.age.length > 0 && splitErrors(errors.age)}

        <span className="lighter-text-color married-label">Sposat*</span>
        <div className={`radio-section ${Number(formData.age) < 18 ? "disabled" : ""}`}>
          <label className="input-inline">Sì
            <input
              name="married"
              type="radio"
              value="true"
              disabled={Number(formData.age) < 18}
              checked={formData.married === true}
              onChange={(e) => setFormData({ ...formData, married: e.target.value === "true" })}
            />
          </label>

          <label className="input-inline">No
            <input
              name="married"
              type="radio"
              value="false"
              disabled={Number(formData.age) < 18}
              checked={formData.married === false}
              onChange={(e) => setFormData({ ...formData, married: e.target.value === "true" })}
            />
          </label>
        </div>
        {errors && errors.married && errors.married.length > 0 && splitErrors(errors.married)}

        <label className="lighter-text-color input-block">Data di nascita
          <input
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
            min="1900-01-01"
            max="2025-10-30"
          />
        </label>
        {errors && errors.dateOfBirth && errors.dateOfBirth.length > 0 && splitErrors(errors.dateOfBirth)}
        <div className="btn-section">
          <button type="submit" title="invia" id="submit-form-btn" className={`${isFormEmpty() ? "disabled" : ""}`}>Invia</button>
          <button type="button" title="reset" id="reset-form-btn" onClick={resetForm} className={`${isFormDirty() ? "" : "disabled"}`}>Reset</button>
        </div>
        {isValidationMade && !hasError && <p className="success-msg">Completato con successo!</p>}
      </form>
    </div>
  );
}