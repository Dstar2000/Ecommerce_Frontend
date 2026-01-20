"use client";

import React, { useState, useRef } from "react";
import Modal from "react-modal";
import {
  useGetProducts,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
} from "@/queries/useProductQuery";

// Fix for Next.js App Router
if (typeof document !== "undefined") {
  Modal.setAppElement(document.body);
}

export default function ShopProductsContent() {
  const { data: response, isLoading, refetch } = useGetProducts();
  const products = response?.data?.products || [];

  const createProductMutation = useCreateProduct();
  const updateProductMutation = useUpdateProduct();
  const deleteProductMutation = useDeleteProduct();

  // Form states
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    stock: "",
    images: ["https://via.placeholder.com/150"], // Default placeholder image
  });

  // Edit states
  const [editingProductId, setEditingProductId] = useState(null);
  const [editingProductData, setEditingProductData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    stock: "",
    images: ["https://via.placeholder.com/150"],
  });

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Image URL management
  const [imageUrls, setImageUrls] = useState([""]);
  const [editingImageUrls, setEditingImageUrls] = useState([""]);

  // Add image URL input
  const addImageUrl = () => {
    setImageUrls([...imageUrls, ""]);
  };

  const addEditingImageUrl = () => {
    setEditingImageUrls([...editingImageUrls, ""]);
  };

  // Handle image URL change
  const handleImageUrlChange = (index, value) => {
    const newUrls = [...imageUrls];
    newUrls[index] = value;
    setImageUrls(newUrls);
  };

  const handleEditingImageUrlChange = (index, value) => {
    const newUrls = [...editingImageUrls];
    newUrls[index] = value;
    setEditingImageUrls(newUrls);
  };

  // Remove image URL
  const removeImageUrl = (index) => {
    const newUrls = imageUrls.filter((_, i) => i !== index);
    setImageUrls(newUrls);
  };

  const removeEditingImageUrl = (index) => {
    const newUrls = editingImageUrls.filter((_, i) => i !== index);
    setEditingImageUrls(newUrls);
  };

  // CREATE PRODUCT
  const handleCreate = async () => {
    if (!newProduct.name || !newProduct.price) {
      alert("Name and price are required");
      return;
    }

    try {
      // Filter out empty image URLs and use default if none provided
      const validImageUrls = imageUrls.filter((url) => url.trim() !== "");
      const productData = {
        ...newProduct,
        images:
          validImageUrls.length > 0
            ? validImageUrls
            : ["https://via.placeholder.com/150"],
        price: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock) || 0,
      };

      await createProductMutation.mutateAsync(productData);

      // Reset form
      setNewProduct({
        name: "",
        price: "",
        description: "",
        category: "",
        stock: "",
        images: ["https://via.placeholder.com/150"],
      });
      setImageUrls([""]);
      setModalOpen(false);

      refetch();
    } catch (error) {
      console.error("Create product error:", error);
      alert("Failed to create product");
    }
  };

  // UPDATE PRODUCT
  const handleUpdate = async (id) => {
    if (!id) {
      alert("Product ID is missing");
      return;
    }

    try {
      // Filter out empty image URLs
      const validImageUrls = editingImageUrls.filter(
        (url) => url.trim() !== "",
      );
      const productData = {
        name: editingProductData.name,
        price: parseFloat(editingProductData.price),
        description: editingProductData.description,
        category: editingProductData.category,
        stock: parseInt(editingProductData.stock) || 0,
        images:
          validImageUrls.length > 0
            ? validImageUrls
            : ["https://via.placeholder.com/150"],
      };

      await updateProductMutation.mutateAsync({ id, payload: productData });

      // Reset edit state
      setEditingProductId(null);
      setEditingProductData({
        name: "",
        price: "",
        description: "",
        category: "",
        stock: "",
        images: ["https://via.placeholder.com/150"],
      });
      setEditingImageUrls([""]);
      setModalOpen(false);

      refetch();
    } catch (error) {
      console.error("Update product error:", error);
      alert("Failed to update product");
    }
  };

  // DELETE PRODUCT
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      await deleteProductMutation.mutateAsync(id);
      refetch();
    } catch (error) {
      console.error("Delete product error:", error);
      alert("Failed to delete product");
    }
  };

  // Open modal for edit
  const openEditModal = (product) => {
    setIsEditing(true);
    setModalOpen(true);
    setEditingProductId(product._id);
    setEditingProductData({
      name: product.name || "",
      price: product.price || "",
      description: product.description || "",
      category: product.category || "",
      stock: product.stock || "",
      images: product.images || ["https://via.placeholder.com/150"],
    });

    // Set image URLs for editing
    if (product.images && product.images.length > 0) {
      setEditingImageUrls([...product.images]);
    } else {
      setEditingImageUrls([""]);
    }
  };

  // Open modal for create
  const openCreateModal = () => {
    setIsEditing(false);
    setModalOpen(true);
    setNewProduct({
      name: "",
      price: "",
      description: "",
      category: "",
      stock: "",
      images: ["https://via.placeholder.com/150"],
    });
    setImageUrls([""]);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Shop Products</h1>
        <button
          onClick={openCreateModal}
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors font-medium"
        >
          + Add New Product
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No products found. Click "Add New Product" to create one.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {product.images?.[0] && (
                          <div className="flex-shrink-0 h-12 w-12 mr-3">
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="h-12 w-12 rounded-lg object-cover"
                              onError={(e) => {
                                e.target.src =
                                  "https://via.placeholder.com/150";
                              }}
                            />
                          </div>
                        )}
                        <div>
                          <div className="font-medium text-gray-900">
                            {product.name}
                          </div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">
                            {product.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold">₹{product.price}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {product.category || "Uncategorized"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${product.stock > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                      >
                        {product.stock || 0} in stock
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${product.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                      >
                        {product.status || "active"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => openEditModal(product)}
                          className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        closeTimeoutMS={300}
        contentLabel={isEditing ? "Edit Product" : "Add Product"}
        className={{
          base: "bg-white p-8 rounded-xl shadow-2xl max-w-2xl w-full mx-auto mt-20 transform transition-all duration-300 ease-out outline-none max-h-[90vh] overflow-y-auto",
          afterOpen: "opacity-100 scale-100 translate-y-0",
          beforeClose: "opacity-0 scale-95 -translate-y-4",
        }}
        overlayClassName={{
          base: "fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-start z-50 transition-opacity duration-300 ease-out",
          afterOpen: "opacity-100",
          beforeClose: "opacity-0",
        }}
      >
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {isEditing ? "Edit Product" : "Add New Product"}
          </h2>
          <p className="text-gray-500 mt-1">
            {isEditing
              ? "Update product details"
              : "Fill in the product details"}
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name *
            </label>
            <input
              type="text"
              placeholder="Enter product name"
              value={isEditing ? editingProductData.name : newProduct.name}
              onChange={(e) =>
                isEditing
                  ? setEditingProductData({
                      ...editingProductData,
                      name: e.target.value,
                    })
                  : setNewProduct({ ...newProduct, name: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price (₹) *
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={isEditing ? editingProductData.price : newProduct.price}
                onChange={(e) =>
                  isEditing
                    ? setEditingProductData({
                        ...editingProductData,
                        price: e.target.value,
                      })
                    : setNewProduct({ ...newProduct, price: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stock Quantity
              </label>
              <input
                type="number"
                placeholder="0"
                value={isEditing ? editingProductData.stock : newProduct.stock}
                onChange={(e) =>
                  isEditing
                    ? setEditingProductData({
                        ...editingProductData,
                        stock: e.target.value,
                      })
                    : setNewProduct({ ...newProduct, stock: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <input
              type="text"
              placeholder="e.g., Electronics, Clothing, Furniture"
              value={
                isEditing ? editingProductData.category : newProduct.category
              }
              onChange={(e) =>
                isEditing
                  ? setEditingProductData({
                      ...editingProductData,
                      category: e.target.value,
                    })
                  : setNewProduct({ ...newProduct, category: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              placeholder="Describe your product..."
              rows="3"
              value={
                isEditing
                  ? editingProductData.description
                  : newProduct.description
              }
              onChange={(e) =>
                isEditing
                  ? setEditingProductData({
                      ...editingProductData,
                      description: e.target.value,
                    })
                  : setNewProduct({
                      ...newProduct,
                      description: e.target.value,
                    })
              }
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition resize-none"
            />
          </div>

          {/* Image URLs Section */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Product Images
              </label>
              <button
                type="button"
                onClick={isEditing ? addEditingImageUrl : addImageUrl}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                + Add Image URL
              </button>
            </div>

            <div className="space-y-2">
              {(isEditing ? editingImageUrls : imageUrls).map((url, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={url}
                    onChange={(e) =>
                      isEditing
                        ? handleEditingImageUrlChange(index, e.target.value)
                        : handleImageUrlChange(index, e.target.value)
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      isEditing
                        ? removeEditingImageUrl(index)
                        : removeImageUrl(index)
                    }
                    className="px-3 py-2 text-red-600 hover:text-red-800 font-medium"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <p className="text-xs text-gray-500 mt-2">
              Enter image URLs. Leave empty for default placeholder image.
            </p>
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={() => setModalOpen(false)}
            className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={
              isEditing ? () => handleUpdate(editingProductId) : handleCreate
            }
            disabled={
              createProductMutation.isLoading || updateProductMutation.isLoading
            }
            className="px-6 py-2.5 bg-black text-white rounded-lg hover:bg-gray-900 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isEditing
              ? updateProductMutation.isLoading
                ? "Saving..."
                : "Save Changes"
              : createProductMutation.isLoading
                ? "Creating..."
                : "Add Product"}
          </button>
        </div>
      </Modal>

      {/* Loading States */}
      {(createProductMutation.isLoading ||
        updateProductMutation.isLoading ||
        deleteProductMutation.isLoading) && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto"></div>
            <p className="mt-3 text-gray-600">Processing...</p>
          </div>
        </div>
      )}
    </div>
  );
}
