import React, { forwardRef } from "react";
import { Button } from "@chakra-ui/button";
import {
  AlertDialogContent,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/modal";

const RemoveDialog = forwardRef(
  ({ isOpen, setIsOpen, onClose, onTodoRemove, id }, ref) => {
    return (
      <AlertDialog isOpen={isOpen} leastDestructiveRef={ref} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Customer
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={ref} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={(e) => {
                  onTodoRemove(id);
                  onClose();
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    );
  }
);

export default RemoveDialog;
