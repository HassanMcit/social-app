import { DatePicker, Form, Input, Select, SelectItem } from "@heroui/react";
import AppButton from "../../Shared/AppButton/AppButton";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { TokenCreatedContext } from "../../Context/TokenContext/TokenContext";

const schema = zod.object({
  email: zod.email("Email is Required!").nonempty("Email is Required!"),
  password: zod.string().regex(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "Invalid Password",
      )
})

export default function Login() {
    const [loading, setLoading] = useState(false);
    const {setToken} = useContext(TokenCreatedContext);
    const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: {errors}
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
    resolver : zodResolver(schema)
  });

  async function handleUserLogin(data) {
    setLoading(true);
    toast.promise(
    axios.post(`${import.meta.env.VITE_BASE_URL}users/signin`, data)  ,
   {
     loading: 'Please Wait...',
     success: function({data:{message,token}}) {
      localStorage.setItem('token', token)
      setToken(token)
      navigate('/')
       setLoading(false);
       return <h1>{message}</h1>
     },
     error: function({response}) {
            setLoading(false);
            return <h1 className="text-red-500">{response.data.error}</h1>
        },
   }
 )
    // try {
        
    // const response = await axios.post(`${import.meta.env.VITE_BASE_URL}users/signin`, data)
    
    
    // } catch({response}) {
    //   console.log(response.data.error);
    // }
    setLoading(false);
  }
  return (
    <Form
      onSubmit={handleSubmit(handleUserLogin)}
      className="w-full max-w-2xl mx-auto mt-3 bg-white p-8 shadow-2xl  rounded-4xl border-2 border-blue-300 flex flex-col gap-4"
    >
      <h1 className="text-5xl self-center text-blue-400 mb-3">Login</h1>
      

      <Input
        isRequired
        label="Email"
        labelPlacement="outside"
        placeholder="Enter your Email"
        {...register("email")}
        isInvalid={!!errors.email}
        errorMessage={errors.email?.message}
        type="email"
      />

      <Input
        isRequired
        label="Password"
        labelPlacement="outside"
        autoComplete="new-password"
        placeholder="Enter your Password"
        {...register("password")}
        isInvalid={!!errors.password}
        errorMessage={errors.password?.message}
        type="Password"
      />

      

      

      
      
      <p className="font-semibold">Don't Have Account? <Link to="/register" className="hover:text-blue-500 hover:underline">Sign Up</Link></p>

      <div className="flex flex-col w-full gap-2 mt-5">
        <AppButton isLoading={loading} color="primary" type="submit">
          Submit
        </AppButton>
        <AppButton type="reset" color="danger" variant="ghost">
          Reset
        </AppButton>
      </div>
    </Form>
  );
}
