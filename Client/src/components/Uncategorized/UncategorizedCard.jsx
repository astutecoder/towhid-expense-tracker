import { UNCATEGORIZED_ID,useCategories } from '../../context/CategoryContext';
import CategoryCard from '../CategoryCard/CategoryCard'

const UncategorizedCard = (props) => {
    const {getCategoryExpenses} = useCategories()
    const amount  = getCategoryExpenses(UNCATEGORIZED_ID).reduce(
        (total, expense)=> total + parseFloat(expense.amount), 0 
      );

      if(amount === 0)return null;
  return (

    <CategoryCard amount={amount} name="Uncategorized" {...props}/>
  )
}

export default UncategorizedCard