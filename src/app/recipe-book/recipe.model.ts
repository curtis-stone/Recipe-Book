import { IngredientModel } from '../shared/ingredient.model';
import { ShoppinglistService } from '../shopping-list/shoppinglist.service'

export class RecipeModel {

    public name: string;
    public description: string;
    public imagePath: string
    public ingredients: IngredientModel[]

    constructor(name: string, des: string, imagePath:string, ingredients: IngredientModel[]) {
        this.name = name
        this.description = des
        this.imagePath = imagePath
        this.ingredients = ingredients
    }
}
