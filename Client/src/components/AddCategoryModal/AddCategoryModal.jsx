import { useContext, useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useCategories } from "../../context/CategoryContext";
import refetch from "../../refetch";
import { SERVER_URL } from "../../helper/constants";
const AddCategoryModal = ({ show, handleClose }) => {
  const nameRef = useRef();
  const { addCategory } = useCategories();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        `${SERVER_URL}/expense/category/v1/post-category`,
        {
          method: "POST",
          headers: {
            authorization: user,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ categoryname: nameRef.current.value }),
        }
      );

      if (response.status === 201) {
        const result = await response.json();
        handleClose();
        refetch()
        addCategory({
          name: result[0].categoryname,
          amount: 0,
          id: result[0].id
        });

       
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  }
  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control ref={nameRef} type="text" required />
          </Form.Group>

          <div>
            <Button variant="primary" type="submit">
              Add
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
};

export default AddCategoryModal;
