import { useState } from "react";

export default function useForm(initValue: any) {
  const [initial, setInitial] = useState<any>(initValue);

  const setValues = (e: any) => {
    setInitial((old: any) => ({
      ...old,
      [e.target.name]: e.target.value,
    }));
  };

  return [initial, setValues];
}
