import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { userLogin } from "@/services/userLogin";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().min(2, {
    message: "email must be at least 2 characters.",
  }),

  password: z.string().min(2, {
    message: "email must be at least 2 characters.",
  }),
});

const LoginComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "fo54@gmail.com",
      password: "12134567890",
    },
  });

  const setAccessTokenCookie = (token: string): void => {
    document.cookie = `accessToken=${token}; path=/; secure; SameSite=Strict`;
  };

  const onSubmit = async (
    values: z.infer<typeof formSchema>
  ): Promise<void> => {
    setIsLoading(true);
    const toastId = toast.loading("login...");

    try {
      const { userInfo } = await userLogin(values);

      if (userInfo && userInfo.data && userInfo.data.accessToken) {
        const token = userInfo.data.accessToken;

        setAccessTokenCookie(token);

        localStorage.setItem("accessToken", token);

        if (userInfo?.success) {
          toast.success("login successfully!", { id: toastId });
          router.push("/");
          setIsLoading(false);
        } else {
          toast.error(userInfo?.errorDetails?.error, { id: toastId });
          setIsLoading(false);
        }
      } else {
        toast.error("Token not found in response data", { id: toastId });
        setIsLoading(false);
      }
    } catch (err: any) {
      toast.error(err?.message, { id: toastId });
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <Input
                  type="text"
                  autoComplete="off"
                  placeholder="Enter your email"
                  {...field}
                />
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
          <div className="mt-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    autoComplete="off"
                    placeholder="Password"
                    {...field}
                  />
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
          </div>
          <div className="border-[3px] border-black mt-6 mx-20 rounded-full" />
          <Button
            className="w-full text-white my-6 font-semibold border border-[#e44d36] hover:border-black py-5 text-lg"
            variant={"outline"}
            type="submit"
          >
            {isLoading ? "Loading..." : "Sign In"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
export default LoginComponent;
