import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import logo from "@/assets/logo.png";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const signInSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

type SignInFormData = z.infer<typeof signInSchema>;

export function SigninForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onsubmit = (data: SignInFormData) => {
    console.log(data);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onsubmit)}>
            <div className="flex flex-col gap-4">
              {/* header- logo */}
              <div className="flex flex-col items-center text-center gap-2">
                <a href="/" className="">
                  <img src={logo} alt="Logo" className="h-25 w-auto" />
                </a>
                <h2 className="text-2xl font-bold">Đăng nhập</h2>
                <p className="text-muted-foreground text-balance">
                  Chào mừng bạn trở lại!
                </p>
              </div>
              {/* email */}
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium leading-6"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  className="w-full rounded-md border border-input "
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-destructive ">
                    {errors.email.message}
                  </p>
                )}
              </div>
              {/* password */}
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium leading-6"
                >
                  Mật khẩu
                </Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  className="w-full rounded-md border border-input "
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-sm text-destructive ">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full mt-4"
                disabled={isSubmitting}
              >
                Đăng nhập
              </Button>
            </div>
          </form>
          <div className=" relative hidden md:block bg-gray-500">
            <img
              src={logo}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
