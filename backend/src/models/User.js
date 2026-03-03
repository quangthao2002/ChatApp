import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true, // Loại bỏ khoảng trắng ở đầu và cuối chuỗi
      lowercase: true,
    },
    hashedPassword: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    displayName: {
      type: String,
    },
    avatarUrl: {
      type: String,
    },
    avatarId: {
      // Cloundinary public_id để xóa ảnh khi người dùng đổi avatar
      type: String,
    },
    bio: {
      type: String,
      maxlength: 500,
    },
    phone: {
      type: String,
      sparse: true, // Chỉ lưu nếu có giá trị, không bắt buộc
    },
  },
  {
    timestamps: true, // Tự động thêm createdAt và updatedAt vào tài liệu
  },
);
const User = mongoose.model("User", userSchema);
export default User;
