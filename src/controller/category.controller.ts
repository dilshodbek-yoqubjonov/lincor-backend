import {Request, Response} from "express";
import {categoryService} from "@services";
import {categorySchema} from "@validations";
import {prisma} from "@config";
import {sendError} from "@utils";


export const categoryController = {

    // get category by category ID
    getCategorById: async (req: Request, res: Response) => {
        const id = parseInt(req.params.id)
        console.log(id)
        try {
            const category = await categoryService.findCategoryById(id)
            res.status(200).send(category)
        } catch (error: unknown) {
            const err = error as sendError
            console.log("#ERROR getCategoryById - ", err)
            res.status(err.statusCode || 500).send({success: false, error: err.message})
        }

    },

    // get all categories
    getAllCategories: async (req: Request, res: Response) => {
        try {
            const data = await categoryService.getAllCategories()
            res.status(200).send(data)
        } catch (error: unknown) {
            const err = error as Error
            console.log("#ERROR getAllCategory - ", err)
            res.status(500).send({success: false, error: err.message})
        }
    },

    // create category
    createCategory: async (req: Request, res: Response) => {
        try {
            const result = await categoryService.createCategoryService(req.body)

            res.status(200).send({
                success: true,
                result: result
            })

        } catch (error: unknown) {
            const err = error as sendError
            console.log("#ERROR createCategory - ", err)
            res.status(err.statusCode || 500).send({success: false, error: err.message})
        }


    },

    updateCategory: async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id)

            const result = await categoryService.updateCategoryService(id, req.body)
            res.status(200).send({success: true, result: result})
        } catch (error: unknown) {
            const err = error as sendError
            console.log("#ERROR updateCategory - ", err)
            res.status(err.statusCode || 500).send({success: false, error: err.message})
        }
    },

    deleteCategory: async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id)
            await categoryService.deleteCategoryService(id)

            res.status(200).send({success: true, message: 'Category deleted successfully'})
        } catch (error: unknown) {
            const err = error as sendError
            console.log("#ERROR deleteCategory - ", err)
            res.status(err.statusCode || 500).send({success: false, error: err.message})
        }
    }


}

