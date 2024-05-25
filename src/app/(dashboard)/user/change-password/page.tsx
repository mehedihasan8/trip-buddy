"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { userRegister } from "@/services/userRegister";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    oldPassword: z.string().min(2, {
      message: "Old Password is required",
    }),
    password: z.string().min(2, {
      message: "Password must be at least 2 characters.",
    }),
    confirmPassword: z.string().min(2, {
      message: "Provide Confirm Password.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

const ChangePassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = form.watch("password");
  const confirmPassword = form.watch("confirmPassword");

  useEffect(() => {
    if (confirmPassword && password !== confirmPassword) {
      form.setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match.",
      });
    } else {
      form.clearErrors("confirmPassword");
    }
  }, [password, confirmPassword, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const toastId = toast.loading("Creating account...");

    try {
      const data = await userRegister(values);

      if (data?.success) {
        toast.success("Create account successfully!", { id: toastId });

        router.push("/login");

        setIsLoading(false);
      } else {
        toast.error(data?.errorDetails?.error, { id: toastId });
        setIsLoading(false);
      }
    } catch (error: any) {
      toast.error(error, { id: toastId });
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mt-4">
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem className="md:w-[600px]">
                  <FormLabel>Old Password</FormLabel>
                  <input
                    type="password"
                    autoComplete="off"
                    placeholder="Enter your old password"
                    {...field}
                    className="mt-1 block w-full rounded-xl border-2 border-gray-400 bg-gray-100 p-3 shadow-sm placeholder:font-semibold placeholder:text-black/60 focus:border-[#e44d36] focus:outline-none focus:!text-primaryColor focus:font-semibold focus:ring-1 focus:ring-[#e44d36] sm:text-sm"
                    style={{ color: "black" }}
                  />
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
          </div>
          <div className="mt-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="md:w-[600px]">
                  <FormLabel>New Password</FormLabel>
                  <input
                    type="password"
                    autoComplete="off"
                    placeholder="Enter new password"
                    {...field}
                    className="mt-1 block w-full rounded-xl border-2 border-gray-400 bg-gray-100 p-3 shadow-sm placeholder:font-semibold placeholder:text-black/60 focus:border-[#e44d36] focus:outline-none focus:!text-primaryColor focus:font-semibold focus:ring-1 focus:ring-[#e44d36] sm:text-sm"
                    style={{ color: "black" }}
                  />
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
          </div>
          <div className="mt-4">
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="md:w-[600px]">
                  <FormLabel>Confirm New Password</FormLabel>
                  <input
                    type="password"
                    autoComplete="off"
                    placeholder="Enter Confirm password"
                    {...field}
                    className="mt-1 block w-full rounded-xl border-2 border-gray-400 bg-gray-100 p-3 shadow-sm placeholder:font-semibold placeholder:text-black/60 focus:border-[#e44d36] focus:outline-none focus:!text-primaryColor focus:font-semibold focus:ring-1 focus:ring-[#e44d36] sm:text-sm"
                    style={{ color: "black" }}
                  />
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
          </div>
          <div className="border-[3px] border-black mt-6 mx-20 rounded-full" />
          <Button
            className="w-full text-white font-semibold my-6 border border-[#e44d36] hover:border-black py-5 text-lg"
            variant={"outline"}
            type="submit"
          >
            {isLoading ? "Loading..." : "Sign Up"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
export default ChangePassword;
