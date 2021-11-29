import { ITEM_CATEGORIES_ACTIONS } from "../constants/itemActions";

export const fetchItemCategoriesAction = () => ({
    type: ITEM_CATEGORIES_ACTIONS.FETCH_ITEM_CATEGORIES_ACTION
});

export const showItemCategoriesAction = (categories) => ({
    type: ITEM_CATEGORIES_ACTIONS.SHOW_ITEM_CATEGORIES_ACTION,
    categories
});

export const showItemCategoriesErrorAction = (error) => ({
    type: ITEM_CATEGORIES_ACTIONS.SHOW_ITEM_CATEGORIES_ERROR_ACTION,
    error
});

export const saveCategoryAction = (category) => ({
    type: ITEM_CATEGORIES_ACTIONS.SAVE_ITEM_CATEGORY_ACTION,
    category
});

export const saveCategoryErrorAction = (error) => ({
    type: ITEM_CATEGORIES_ACTIONS.SAVE_ITEM_CATEGORY_ERROR_ACTION,
    error
});

export const addCategoryAction = (category) => ({
    type: ITEM_CATEGORIES_ACTIONS.ADD_ITEM_CATEGORY_ACTION,
    category
});

export const deleteCategoryAction = (category) => ({
    type: ITEM_CATEGORIES_ACTIONS.DELETE_ITEM_CATEGORY_ACTION,
    category
});

export const removeCategoryAction = (category) => ({
    type: ITEM_CATEGORIES_ACTIONS.REMOVE_ITEM_CATEGORY_ACTION,
    category
});
