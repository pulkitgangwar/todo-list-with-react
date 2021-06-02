import React from "react";
import { ListItem } from "@chakra-ui/layout";
import { ListIcon } from "@chakra-ui/layout";
import { Spacer } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/layout";
import EditModal from "./EditModal";
import { MdCheckCircle } from "react-icons/md";
import { Draggable } from "react-beautiful-dnd";
import { useDisclosure } from "@chakra-ui/hooks";
import { Box } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";

const TodoElement = ({
  onTodoClick,
  onTodoEdit,
  onTodoRemove,
  todo,
  index,
  currentId,
  setCurrentId,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { id, description, task, createdAt, completed } = todo;
  return (
    <>
      <Draggable key={id} index={index} draggableId={id.toString()}>
        {(provided) => (
          <ListItem
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            id={id}
          >
            <Box>
              <Flex alignItems="center">
                <Box id={id}>
                  <Box
                    display="inline-block"
                    verticalAlign="middle"
                    onDoubleClick={(e) =>
                      onTodoClick({
                        id,
                        completed,
                        task,
                        createdAt,
                        description,
                      })
                    }
                    cursor="pointer"
                  >
                    {completed ? (
                      <ListIcon as={MdCheckCircle} color="green.500" />
                    ) : (
                      <ListIcon as={MdCheckCircle} color="grey" />
                    )}
                  </Box>

                  <Text
                    onDoubleClick={(e) =>
                      onTodoClick({
                        id,
                        completed,
                        task,
                        createdAt,
                        description,
                      })
                    }
                    cursor={"pointer"}
                    display={"inline-block"}
                    verticalAlign="middle"
                  >
                    {task}
                  </Text>
                </Box>
                <Spacer />
                <Box>
                  <Button
                    colorScheme="red"
                    onClick={(e) => {
                      onTodoRemove(id);
                    }}
                  >
                    Remove
                  </Button>
                  <Button
                    id={id}
                    colorScheme="teal"
                    onClick={(e) => {
                      setCurrentId(id);
                      onOpen();
                    }}
                  >
                    Edit
                  </Button>
                  {/* modal */}
                  {currentId === id ? (
                    <EditModal
                      isOpen={isOpen}
                      onClose={onClose}
                      onTodoEdit={onTodoEdit}
                      todo={{
                        id,
                        task,
                        completed,
                        description,
                        createdAt,
                      }}
                    />
                  ) : null}
                </Box>
              </Flex>

              {/* description */}
              <Box>
                <Text>
                  {description ? description : "no description provided!"}
                </Text>
              </Box>
            </Box>
          </ListItem>
        )}
      </Draggable>
    </>
  );
};

export default TodoElement;
