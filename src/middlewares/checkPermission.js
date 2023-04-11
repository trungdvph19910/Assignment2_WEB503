import jwt from "jsonwebtoken";
import User from "../models/user";

export const checkPermission = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            throw new Error("Bạn chưa đăng nhập");
        }
        const decoded = jwt.verify(token, "banThayDat");
        const user = await User.findById(decoded._id);
        if (!user || user.role !== "admin") {
            throw new Error("Bạn không có quyền truy cập tài nguyên này");
        }
        next();
    } catch (error) {
        return res.status(401).json({
            message: error.message || "Token không hợp lệ",
        });
    }
};