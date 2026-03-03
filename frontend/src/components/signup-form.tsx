import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { FieldDescription } from "@/components/ui/field";
import logo from "@/assets/logo.png";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              {/* header- logo */}
              <div className="flex flex-col items-center text-center gap-2">
                <a href="/" className="">
                  <img src={logo} alt="Logo" className="h-25 w-auto" />
                </a>
                <h1 className="text-xl font-bold">Đăng ký tài khoản</h1>
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
                    name="first-name"
                    type="text"
                    autoComplete="given-name"
                    required
                    className="w-full rounded-md border border-input "
                  />
                </div>
                <div className="space-y-2"></div>
              </div>
              {/* user name */}

              {/* email */}

              {/* password */}

              {/* Nút đăng ký */}
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src={logo}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        Bằng cách nhấp vào tiếp tục, bạn đồng ý với{" "}
        <a href="#">Điều khoản dịch vụ</a> và <a href="#">Chính sách bảo mật</a>{" "}
        của tôi.
      </FieldDescription>
    </div>
  );
}
