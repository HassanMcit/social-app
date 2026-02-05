import { DatePicker, Form, Input, Select, SelectItem } from "@heroui/react";
import AppButton from "../../Shared/AppButton/AppButton";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

const schema = zod
  .object({
    name: zod.string().nonempty("Name is Required").min(3),
    email: zod.email().nonempty("Email is Required"),
    password: zod
      .string()
      .nonempty("Password is Required")
      .regex(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "Invalid Password",
      ),
    rePassword: zod
      .string()
      .nonempty("Confirm Password is Required")
      .regex(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "Invalid Password",
      ),
    dateOfBirth: zod.coerce.date().refine(function (value) {
      const today = new Date();
      let age = today.getFullYear() - value.getFullYear();
      const month = today.getMonth() - value.getMonth();
      if (month < 0 || (month === 0 && today.getDate() < value.getDate()))
        age--;
      return age >= 18;
    }, "User Age Must Be Above 18 Years Old"),
    gender: zod.enum(["male", "female"]),
  })
  .refine(
    function (value) {
      return value.password === value.rePassword;
    },
    {
      error: "Password and Repassword not Same",
      path: ["rePassword"],
    },
  );

export default function Register() {
    const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    register,
    control,
    setError,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    mode: "all",
    resolver: zodResolver(schema),
  });

  async function handleUserRegister(data) {
      setLoading(true);
    toast.promise(
      axios.post(`${import.meta.env.VITE_BASE_URL}users/signup`, data),
      {
        loading: "Saving...",
        success: function ({data}) {
            setLoading(false);
            navigate('/login')
            return <h1 className="text-green-500">{data.message}</h1>
        },
        error: function({response:{data: {error}}}) {
            setLoading(false);
            return <h1 className="text-red-500">{error}</h1>
        },
      },
    );

    
  }
  return (
    <Form
      onSubmit={handleSubmit(handleUserRegister)}
      className="w-full max-w-2xl mx-auto mt-3 bg-white p-8 shadow-2xl  rounded-4xl border-2 border-blue-300 flex flex-col gap-4"
    >
      <h1 className="text-5xl self-center text-blue-400 mb-3">Register</h1>
      <Input
        isRequired
        label="Name"
        labelPlacement="outside"
        placeholder="Enter your Name"
        {...register("name")}
        // {...register("name", {
        //   required: { value: true, message: "Name is Required" },
        //   pattern: {
        //     value: /^[a-zA-Z][a-zA-Z ]{3,20}$/,
        //     message: "Please enter a valid Name",
        //   },
        // })}
        isInvalid={!!errors.name}
        errorMessage={errors.name?.message}
        type="text"
      />

      <Input
        isRequired
        label="Email"
        labelPlacement="outside"
        placeholder="Enter your Email"
        {...register("email")}
        // {...register("email", {
        //   required: { value: true, message: "Email is Required" },
        //   pattern: {
        //     value: /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
        //     message: "Please enter a valid Email",
        //   },
        // })}
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
        // {...register("password", {
        //   required: { value: true, message: "Password is Required" },
        //   pattern: {
        //     value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        //     message: "Please enter a valid Password",
        //   },
        // })}
        isInvalid={!!errors.password}
        errorMessage={errors.password?.message}
        type="Password"
      />

      <Input
        isRequired
        label="Confirm Password"
        labelPlacement="outside"
        autoComplete="new-password"
        placeholder="Enter your Confirm Password"
        {...register("rePassword")}
        // {...register("rePassword", {
        //     validate: function(value) {
        //         if(watch("password") === value) {
        //             return true;
        //         }
        //         return "Password and Confirm Password Should Be Same"
        //     }
        // })}
        isInvalid={!!errors.rePassword}
        errorMessage={errors.rePassword?.message}
        type="Password"
      />

      <Input
        isRequired
        label="Date Of Birth"
        labelPlacement="outside"
        placeholder="Enter your Date Of Birth"
        {...register("dateOfBirth")}
        // {...register("dateOfBirth", {
        //   required: { value: true, message: "Date is Required" },
        //   valueAsDate: true,
        //   validate: function (value) {
        //     const today = new Date();
        //     let age = today.getFullYear() - value.getFullYear();
        //     const month = today.getMonth() - value.getMonth();
        //     if (
        //       month < 0 ||
        //       (month === 0 && today.getDate() < value.getDate())
        //     ) {
        //       age--;
        //     }
        //     if (age > 18) {
        //       return true;
        //     }
        //     return "User Age Must Be Above 18 Years Old";
        //   },
        // })}
        isInvalid={!!errors.dateOfBirth}
        errorMessage={errors.dateOfBirth?.message}
        type="date"
      />
      
      <Controller control={control} name="gender" render={function({field}) {
        return <Select
        className="max-w-2xl"
        label="Gender"
        placeholder="Select Your Gender"
        labelPlacement="outside"
        {...field}
        // selectedKeys={field.value ? [field.value] : []}
      >
        <SelectItem key="male">Male</SelectItem>
        <SelectItem key="female">Female</SelectItem>
      </Select> 
      }}/>

      <p className="font-semibold">
        Already Have Account?{" "}
        <Link to="/login" className="hover:text-blue-500 hover:underline">
          Login
        </Link>
      </p>

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
