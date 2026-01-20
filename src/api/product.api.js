import ApiClient from "@/utils/apiClient";
import { ENDPOINTS } from "@/endpoints";

const getAllProducts = () => {
    return ApiClient.get(ENDPOINTS.GET_ALL_PRODUCTS);
}

const getProductById = (id) => {
    return ApiClient.get(ENDPOINTS.GET_PRODUCT(id));
}

const createProduct = (payload) => {
    return ApiClient.post(ENDPOINTS.CREATE_PRODUCT, payload);
}

const updateProduct = ({ id, payload }) => {
    return ApiClient.put(ENDPOINTS.UPDATE_PRODUCT(id), payload);
};

const deleteProduct = (id) => {
    return ApiClient.delete(ENDPOINTS.DELETE_PRODUCT(id));
}

export {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}