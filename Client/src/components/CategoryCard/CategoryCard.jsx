import { useContext, useMemo } from "react";
import { Button, Card, Stack } from "react-bootstrap";
import { CategoryContext } from "../../context/CategoryContext";

// eslint-disable-next-line react/prop-types
const CategoryCard = ({
  category,
  onAddExpenseClick,
  onViewExpenseClick,
  hideAddButton,
}) => {


  const {getCategoryExpenses} = useContext(CategoryContext);

  const amount = useMemo(()=>{
    return getCategoryExpenses(category?.id).reduce(
      (total, expense) => total + parseFloat(expense.amount),
      0
    );
  },[category?.id])

  return (
    <Card >
      <Card.Body>
        <Card.Title
          className="d-flex justify-content-between align-items-baseline
    fw-normal mb-3"
        >
          <div className="me-2">{category?.categoryname}</div>
         
        </Card.Title>

        <Stack direction="horizontal" gap="2" className="mt-4">
          {!hideAddButton && (
            <Button variant="outline-primary" onClick={onAddExpenseClick}>
              Add Expense
            </Button>
          )}

          <Button variant="outline-secondary" onClick={onViewExpenseClick}>
            {hideAddButton ? "View all expenses" : "View Expenses"}
          </Button>
        </Stack>
      </Card.Body>
    </Card>
  );
};

export default CategoryCard;
