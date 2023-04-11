import Category from "../models/category";
import Joi from "joi";
import Product from "../models/product";

const categorySchema = Joi.object({
    name: Joi.string().required()
})
export const get = async function (req, res) {
    try {
        const data = await Category.findById(req.params.id)
        if (!data) {
            return res.status(400).json({ message: "Khong co danh muc nao" })
        }
        return res.json(data)
    } catch (error) {
        return res.json({
            message: error
        })
    }
}

export const create = async (req, res) => {
    try {
        const body = req.body;
        const { error } = categorySchema.validate(body);
        if (error) {
            const errors = error.details.map((errorItem) => errorItem.message)
            return res.status(400).json({
                message: errors,
            })
        }
        const data = await Category.create(body)
        if (!data) {
            return res.status(400).json({ message: "Them danh muc that bai" })

        }
        return res.json({
            message: "Them danh muc thanh cong",
            data,
        })
    }
    catch (error) {
        return res.json({
            message: error,
        })
    }


}
export const getAll = async function (req, res) {
    try {
        const data = await Product.find()
        if (data.length === 0) {
            return res.status(400).json({ message: "ko co san pham nao" })
        }
        return res.json(data)
    } catch (error) {
        return res.json({
            message: error
        })
    }
}
export const remove = async (req, res) => {
    try {
        const data = await Product.findByIdAndDelete(req.params.id)
        return res.status(200).json({ message: "Xoa thanh cong" })
    } catch (error) {
        return res.json({
            message: error
        })
    }
}
export const update = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const category = await Category.findOneAndUpdate({ _id: id }, body, { new: true });
        if (!category) {
            return res.status(400).json({ message: "Cập nhật thất bại" });
        }
        return res.json({
            message: "Cập nhật thành công",
            category,
        });
    } catch (error) {
        return res.json({
            message: error.message,
        });
    }
};
