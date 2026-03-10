import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { FieldDescription } from "@/components/ui/field";
import logo from "@/assets/logo.png";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { useAuthStore } from "@/stores/useAuthStore";

const signUpSchema = z.object({
  firstname: z.string().min(1, "Họ không được để trống"),
  lastname: z.string().min(1, "Tên không được để trống"),
  username: z.string().min(1, "Tên người dùng không được để trống"),
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

type SignUpFormData = z.infer<typeof signUpSchema>; //lấy kiểu dử liệu trong schema để sử dụng trong form

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { signUp } = useAuthStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    //
    resolver: zodResolver(signUpSchema), // để kết nối useForm với zod schema để validate dữ liệu khi submit form
  });

  const onsubmit = async (data: SignUpFormData) => {
    const { username, password, email, firstname, lastname } = data;
    await signUp(username, password, email, firstname, lastname);
    navigate("/signin");
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
                <h2 className="text-2xl font-bold">Đăng ký tài khoản</h2>
                <p className="text-muted-foreground text-balance">
                  Chào mừng bạn đã đăng ký tài khoản!
                </p>
              </div>
              {/* Họ và tên */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label
                    htmlFor="first-name"
                    className="text-sm font-medium leading-6"
                  >
                    Họ
                  </Label>
                  <Input
                    id="first-name"
                    type="text"
                    autoComplete="given-name"
                    className="w-full rounded-md border border-input "
                    {...register("firstname")} //đăng ký trường firstname vào react-hook-form
                  />
                  {errors.firstname && (
                    <p className="text-sm text-destructive ">
                      {errors.firstname.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="last-name"
                    className="text-sm font-medium leading-6"
                  >
                    Tên
                  </Label>
                  <Input
                    id="last-name"
                    type="text"
                    autoComplete="family-name"
                    className="w-full rounded-md border border-input "
                    {...register("lastname")} //đăng ký trường lastname vào react-hook-form
                  />
                  {errors.lastname && (
                    <p className="text-sm text-destructive ">
                      {errors.lastname.message}
                    </p>
                  )}
                </div>
              </div>
              {/* user name */}
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="username"
                  className="text-sm font-medium leading-6"
                >
                  Tên người dùng
                </Label>
                <Input
                  id="username"
                  type="text"
                  autoComplete="username"
                  className="w-full rounded-md border border-input "
                  {...register("username")} //đăng ký trường username vào react-hook-form
                />
                {errors.username && (
                  <p className="text-sm text-destructive ">
                    {errors.username.message}
                  </p>
                )}
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
                  {...register("email")} //đăng ký trường email vào react-hook-form
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
                  autoComplete="new-password"
                  className="w-full rounded-md border border-input "
                  {...register("password")} //đăng ký trường password vào react-hook-form
                />
                {errors.password && (
                  <p className="text-sm text-destructive ">
                    {errors.password.message}
                  </p>
                )}
              </div>
              {/* Nút đăng ký */}
              <div className="mt-4">
                <Button
                  type="submit"
                  className="w-full rounded-md bg-primary text-white hover:bg-primary/90"
                  disabled={isSubmitting} //vô hiệu hóa nút khi đang submit form
                >
                  Đăng ký tài khoản
                </Button>
                <div className="text-center text-sm mt-2  ">
                  Bạn đã có tài khoản?{" "}
                  <a
                    href="/signin"
                    className="text-primary  font-medium underline underline-offset-4"
                  >
                    Đăng nhập
                  </a>
                </div>
              </div>
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
      <FieldDescription className="px-6 text-center *:[a]:hover:text-primary text-muted-foreground text-balance">
        Bằng cách nhấp vào tiếp tục, bạn đồng ý với{" "}
        <a href="#">Điều khoản dịch vụ</a> và <a href="#">Chính sách bảo mật</a>{" "}
        của tôi.
      </FieldDescription>
    </div>
  );
}
