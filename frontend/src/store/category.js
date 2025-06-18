import { create } from "zustand";


export const useCategoryStore = create((set) => ({
    categories: [],
    setCategory: (categories) => set({ categories }),
    createCategory: async (newCategory) =>{
      if(!newCategory.name){
        return { success: false, message: "Please provide all required fields" };
      }
      const res = await fetch("/api/categories",{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newCategory)
      })
      const data = await res.json();
      set((state) => ({ categories: [...state.categories, data.data] }));
      return { success: true, message: "Category created successfully" };
    },
    updateCategory: async (updatedCategory) =>{
      if(!updatedCategory.name){
        return { success: false, message: "Please provide all required fields" };
      }
      const res = await fetch(`/api/categories/${updatedCategory.id}`,{
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedCategory)
      })
      const data = await res.json();
      set((state) => ({ categories: state.categories.map((category) => category.id === updatedCategory.id ? data.data : category) }));
      return { success: true, message: "Category updated successfully" };
    },
    deleteCategory: async (categoryId) =>{
      const res = await fetch(`/api/categories/${categoryId}`,{
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      })
      const data = await res.json();
      set((state) => ({ categories: state.categories.filter((category) => category.id !== categoryId) }));
      return { success: true, message: "Category deleted successfully" };
    },
    getCategories: async () =>{
      const res = await fetch("/api/categories",{
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      const data = await res.json();
      set({ categories: data.data });
    },
    getCategoryById: async (categoryId) =>{
      const res = await fetch(`/api/categories/${categoryId}`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      const data = await res.json();
      return data.data;
    },  
    
  }));
