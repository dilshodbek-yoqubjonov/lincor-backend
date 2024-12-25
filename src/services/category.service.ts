import {prisma} from "@config";
import {Category} from "@validations";

export const categoryService = {
    async getAllCategories(): Promise<Category[]> {
        return prisma.category.findMany({include: {videos: true}})
    },

    async findCategoryById(id: number): Promise<Category> {
        const category = await prisma.category.findUnique({where: {id}, include: {videos: true}})

        if (!category) {
            throw new Error("Category not found")
        }

        return category
    }
}