import {create} from "zustand";



export const useUserStore = create((set,get) => ({
    users: [],
    setUser: (users) => set({ users }),
    createUser: async (newUser) =>{
      if(!newUser.name || !newUser.email || !newUser.password || !newUser.role){
        return { success: false, message: "Please provide all required fields" };
      }
      const res = await fetch("/api/users",{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
      })
      const data = await res.json();
      set((state) => ({ users: [...state.users, data.data] }));
      return { success: true, message: "User created successfully" };
    },
    loginUser: async (user) =>{
      if(!user.email || !user.password){
        return { success: false, message: "Please provide all required fields" };
      }
      const res = await fetch("/api/users/:id",{
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      })
      const data = await res.json();
      if(data.success){
        set(data.data);        
        return { success: true, message: "User logged in successfully" };
      }else{
        return { success: false, message: data.message };
      }
    }

  }));
  