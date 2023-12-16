
import React, { useContext, useState } from "react";
import { v4 as uuidV4 } from 'uuid';
export const CategoryContext = React.createContext();

export const UNCATEGORIZED_ID="Uncategorized"
export function useCategories(){

    return useContext(CategoryContext);
}

// eslint-disable-next-line react/prop-types
export const CategoriesProvider = ({children})=> {
    const [categories, setCategory] =useState([])
    const [expenses, setExpense] = useState([])

    function getCategoryExpenses(categoryId){
        console.log("context get",expenses, typeof categoryId)
        return expenses.filter(expense=> String(expense.categoryId) === String(categoryId))
    }

    function addExpense({name, amount, categoryId}){
    
        setExpense(prevExpense=>{
            const newExpense = { id: uuidV4(), name, categoryId, amount };
            console.log([...prevExpense, newExpense]);
            return[...prevExpense, newExpense]
        })

   
    }
    
    function addCategory({name, amount, id}){
        console.log('add category', name, amount)
        setCategory(prevCategory=>{
            if(prevCategory.find(category => category.categoryname === name)){
                return prevCategory
            }
            return[...prevCategory, {id: id, categoryname:name, amount}]
        })
    }
    function deleteCategory({id}){
        setCategory(prevCategory=>{
            return prevCategory.filter(category=>category.id !== id)
        })
    }
    function deleteExpense({id}){
        setExpense(prevExpense=>{
            return prevExpense.filter(expense=>expense.id !== id)
        })

      
    }
    

    return <CategoryContext.Provider value={{
        updateCategory: setCategory,
        updateExpense: setExpense,
        categories,
        expenses,
        getCategoryExpenses,
        addExpense,
        addCategory,
        deleteCategory,
        deleteExpense


    }}>
        {children}
    </CategoryContext.Provider>;
}