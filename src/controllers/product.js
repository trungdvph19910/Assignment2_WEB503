import Joi from "joi";
import Product from "../models/product";



const productSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    categoryId: Joi.string().required(),
})
export const getAll = async function (req, res) {
    const { _sort = "createAt", _order = "asc", _limit = 10, _page = 1 } = req.query
    const options = {

    }
    try {
        const data = await Product.find()
        if (data.length === 0) {
            return res.status(400).json({ message: "ko co san pham nao" })
        }
        return res.json(data)
    } catch (error) {
        return res.json({
            message: error.message
        })
    }
}

export const create = async (req, res) => {
    try {
        const body = req.body;
        const { error } = productSchema.validate(body);
        if (error) {
            const errors = error.details.map((errorItem) => errorItem.message)
            return res.status(400).json({
                message: errors,
            })
        }
        const data = await Product.create(body)
        if (!data) {
            return res.status(400).json({ message: "Them that bai" })

        }
        return res.json({
            message: error,
            data,
        })
    }
    catch (error) {
        return res.json({
            message: error.message,
        })
    }


}
export const remove = async (req, res) => {
    try {
        const data = await Product.findByIdAndDelete(req.params.id)
        return res.status(200).json({ message: "Xoa thanh cong" })
    } catch (error) {
        return res.json({
            message: error.message
        })
    }
}
export const update = async function (req, res) {
    try {
        const id = req.params.id;
        const body = req.body;
        const data = await Product.findOneAndUpdate({ _id: id }, body, { new: true });
        if (!data) {
            return res.status(400).json({ message: "Cập nhật thất bại" });
        }
        return res.json({
            message: "Cập nhật thành công",
            data,
        });
    } catch (error) {
        return res.json({
            message: error.message,
        });
    }
}
export const get = async function (req, res) {
    try {
        const data = await Product.findOne({ _id: req.params.id })
        if (!data) {
            return res.status(400).json({ message: "Khong co san pham" })
        }
        return res.json(data)
    } catch (error) {
        return res.json({
            message: error.message
        })
    }
}
