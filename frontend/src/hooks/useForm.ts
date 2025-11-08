"use client";
import { useState } from "react";

export function useForm<T extends object>(initialState: T) {
  const [form, setForm] = useState<T>(initialState);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {

    if (!(e.target.name in form)) {
      console.warn(`Campo "${e.target.name}" não existe no form`);
      return;
    }

    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return { form, setForm, handleChange };
}
