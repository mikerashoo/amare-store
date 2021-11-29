import { message } from 'antd';
import { put, call, all, takeLatest } from 'redux-saga/effects';
import { showItemCategoriesAction, showItemCategoriesErrorAction, addCategoryAction, removeCategoryAction, saveCategoryErrorAction } from "../actions/categoryActions";
import { deleteItemCategoryApi, fetchItemCategoriesApi, saveItemCategoryApi } from '../apis/categoryApi';
import { ITEM_CATEGORIES_ACTIONS } from '../constants/itemActions';

function* fetchItemCategoriesSaga() {
    try {
        const categoriesData = yield call(fetchItemCategoriesApi);
        yield put(showItemCategoriesAction(categoriesData))
    }
    catch (error) {
        yield put(showItemCategoriesErrorAction('Problem with fetching employees please try again!'))
    }
}

function* saveItemCategorySaga(action) {
    try {
        const categoryData = yield call(saveItemCategoryApi, action.category);
        if (categoryData == -1) {
            message.error("Category with same code already exist! Please try with unique code");
            yield (put(saveCategoryErrorAction("code error")));
        }
        else {
            message.success("Category saved successfully!");
            yield put(addCategoryAction(categoryData));
        }
    }
    catch (error) {
        yield put(showItemCategoriesErrorAction('Problem with fetching employees please try again!'))
    }
}
function* deleteItemCategorySaga(action) {
    try {
        const categoryData = yield call(deleteItemCategoryApi, action.category);
        yield put(removeCategoryAction(action.category))
    }
    catch (error) {
        yield put(showItemCategoriesErrorAction('Problem with fetching employees please try again!'))
    }
}

function* categorySaga() {
    yield all([
        yield takeLatest(ITEM_CATEGORIES_ACTIONS.FETCH_ITEM_CATEGORIES_ACTION, fetchItemCategoriesSaga),
        yield takeLatest(ITEM_CATEGORIES_ACTIONS.SAVE_ITEM_CATEGORY_ACTION, saveItemCategorySaga),
        yield takeLatest(ITEM_CATEGORIES_ACTIONS.DELETE_ITEM_CATEGORY_ACTION, deleteItemCategorySaga),
    ])
}
export default categorySaga;
