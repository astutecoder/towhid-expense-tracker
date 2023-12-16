import { useContext, useEffect, useState } from "react";
import { Button, Modal, Stack } from "react-bootstrap";
import { UNCATEGORIZED_ID, useCategories } from "../../context/CategoryContext";
import { AuthContext } from "../../context/AuthContext";
import { SERVER_URL } from "../../helper/constants";

const ViewExpensesModal = ({ categoryId, handleClose }) => {
  const { getCategoryExpenses, categories,  deleteCategory, deleteExpense } =
    useCategories();

  // const expenses = getCategoryExpenses(categoryId);

  const [catExpense, setCatExpense] = useState([]);
  const { user } = useContext(AuthContext);
  // console.log(categoryId, expenses);
  const category =
    UNCATEGORIZED_ID === categoryId
      ? { name: "Uncategorized", id: UNCATEGORIZED_ID }
      : categories.find((c) => c.id === categoryId);

      useEffect(() => {
        (async function () {
          try {
            const response = await fetch(
              `${SERVER_URL}/expense/category/v1/get-expense/${categoryId}`,
              {
                method: "GET",
                headers: {
                  authorization: user,
                  "Content-Type": "application/json",
                },
              }
            );
    
            if (response.status === 200) {
              const result = await response.json();
    
              setCatExpense(result)
           
            } else {
              console.log(response);
            }
          } catch (e) {
            console.log(e);
          }
        })();
      }, [categoryId]);

  return (
    <Modal show={categoryId != null} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap="2">
            <div>Expenses - {category?.categoryname}</div>
            {categoryId !== UNCATEGORIZED_ID && (
              <Button
                onClick={() => {
                  deleteCategory(category);
                  handleClose();
                }}
                variant="outline-danger"
              >
                Delete
              </Button>
            )}
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
    {/* {console.log("Expenses", expenses)} */}
        <Stack direction="verticle" gap="3">
          {catExpense.map((expense) => (
          
            <Stack direction="horizontal" gap="2" key={expense.id}>
           
              <div className="me-auto fs-4">{expense.expensename}</div>
              <div className="fs-5">{expense.amount}</div>
              <Button
                size="sm"
                variant="outline-danger"
                onClick={() => deleteExpense(expense)}
              >
                &times;
              </Button>
            </Stack>
          ))}
        </Stack>
      </Modal.Body>
    </Modal>
  );
};

export default ViewExpensesModal;
