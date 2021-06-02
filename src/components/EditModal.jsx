import React, { useRef, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/modal";
import { FormControl } from "@chakra-ui/form-control";
import { FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { ModalFooter } from "@chakra-ui/modal";
import { Textarea } from "@chakra-ui/textarea";
import { Button } from "@chakra-ui/button";

const EditModal = ({ isOpen, onClose, todo, onTodoEdit }) => {
  const [titleInput, setTitleInput] = useState(todo.task);
  const [descriptionInput, setDescriptionInput] = useState(
    todo?.description ?? ""
  );
  const initialRef = useRef();
  const finalRef = useRef();

  const handleEdit = (e) => {
    e.preventDefault();
    if (!titleInput || titleInput === todo.title) {
      onClose();
      return;
    }

    const newTodo = {
      ...todo,
      task: titleInput,
      description: descriptionInput ? descriptionInput : null,
      createdAt: new Date().toISOString(),
    };

    onTodoEdit(newTodo);
    onClose();
  };

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Enter Task</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Enter Task"
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Enter Description</FormLabel>
              <Textarea
                placeholder="Enter Description"
                value={descriptionInput}
                onChange={(e) => setDescriptionInput(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleEdit}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditModal;
