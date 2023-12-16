import { useCategories } from '../../context/CategoryContext';
import CategoryCard from '../CategoryCard/CategoryCard'

const UncategorizedCard = () => {
    const {expenses} = useCategories()
    const amount  = expenses.reduce(
        (total, expense)=> total + parseFloat(expense.amount), 0 
      );

      if(amount === 0)return null;
  return (

    <CategoryCard amount={amount} name="Total" hideAddButton/>
  )
}

export default UncategorizedCard