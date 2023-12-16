import { useContext, useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { UNCATEGORIZED_ID, useCategories } from "../../context/CategoryContext";
import { AuthContext } from "../../context/AuthContext";
import { SERVER_URL } from "../../helper/constants";

const AddExpenseModal = ({ show, handleClose, defaultCategoryId }) => {

    const nameRef = useRef()
    const amountRef = useRef()
    const categoryIdRef = useRef()

    const {addExpense, categories}= useCategories()
    const { user } = useContext(AuthContext);
    async function handleSubmit(e){
        e.preventDefault()
        console.log(nameRef.current.value,amountRef.current.value,categoryIdRef.current.value)


        try {

          const response = await fetch(
            `${SERVER_URL}/expense/category/v1/post-expense`,
            {
              method: "POST",
              headers: {
                "authorization": user,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ expensename: nameRef.current.value, amount: amountRef.current.value, categoryId:categoryIdRef.current.value }),
            }
          );
        
     
          if (response.status === 201) {
           
            const result = await response.json();
            console.log(result);
          
            addExpense({
              name: nameRef.current.value,
              amount: amountRef.current.value,
              categoryId: categoryIdRef.current.value
          })
          
          handleClose()
           
          } else {
            console.log(response);
       
          }
        } catch (error) {
         
          console.error("Error inserting data:", error);
        }
       
    }
  return (
    <Modal show={show} onHide={handleClose} onRequestClose={true}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control ref={nameRef} type="text" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control ref={amountRef} type="number" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="amount">
            <Form.Label>Category</Form.Label>
         <Form.Select defaultValue={defaultCategoryId} ref={categoryIdRef}>
         <option id={UNCATEGORIZED_ID}>Uncategorized</option>
          {categories.map(category=>(
            <option key={category.id} value={category.id}>
              {category.categoryname}
            </option>
          ))}
         </Form.Select>
          </Form.Group>

          <div>
            <Button variant="primary" type="submit">
              Add Expense
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
};

export default AddExpenseModal;
