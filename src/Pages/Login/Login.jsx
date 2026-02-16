import { Form, Input, Toast } from "@heroui/react";
import AppButton from "../../Shared/AppButton/AppButton";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { TokenCreatedContext } from "../../Context/TokenContext/TokenContext";
import { useMutation } from "@tanstack/react-query";

const schema = zod.object({
  email: zod.string().email("Email is Required!").nonempty("Email is Required!"),
  password: zod
    .string()
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      "Invalid Password",
    ),
});

export default function Login() {
  const [loading, setLoading] = useState(false);

  const { setUserData } = useContext(TokenCreatedContext);

  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: handleUserLogin,
    onSuccess: function ({ data }) {
      
      setUserData(data.data.user)
      toast.success(data.message);
      localStorage.setItem("token", data.data.token);
      // getUserData(data.token);
      navigate("/");
    },
    onError: function (error) {
      toast.error(error.response?.data?.errors);
    },
  });

  // console.log("Mutate", mutate);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
    resolver: zodResolver(schema),
  });

  async function handleUserLogin(data) {
    return axios.post(`${import.meta.env.VITE_BASE_URL}users/signin`, data);
    //   setLoading(true);
    //   toast.promise(
    //   axios.post(`${import.meta.env.VITE_BASE_URL}users/signin`, data)  ,
    //  {
    //    loading: 'Please Wait...',
    //    success: function({data:{message,token}}) {
    //     localStorage.setItem('token', token)
    //     getUserData(token)
    //     navigate('/')
    //      setLoading(false);
    //      return <h1>{message}</h1>
    //    },
    //    error: function({response}) {
    //           setLoading(false);
    //           return <h1 className="text-red-500">{response.data.error}</h1>
    //       },
    //  }
    //  )
    // try {

    // const response = await axios.post(`${import.meta.env.VITE_BASE_URL}users/signin`, data)

    // } catch({response}) {
    //   console.log(response.data.error);
    // }
    // setLoading(false);
  }
  return (
    <>
      <title>Login</title>
      <Form
        onSubmit={handleSubmit(mutate)}
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

        <p className="font-semibold">
          Don't Have Account?{" "}
          <Link to="/register" className="hover:text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>

        <div className="flex flex-col w-full gap-2 mt-5">
          <AppButton isLoading={isPending} color="primary" type="submit">
            Submit
          </AppButton>
          <AppButton type="reset" color="danger" variant="ghost">
            Reset
          </AppButton>
        </div>
      </Form>
    </>
  );
}
