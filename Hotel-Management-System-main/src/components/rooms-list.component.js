import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button } from "@chakra-ui/button";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import {
  Flex,
  Box,
  Stack,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
const Room = (props) => (
  <Tr>
    <Td>{props.room.username}</Td>
    <Td>{props.room.description}</Td>
    <Td>{props.room.duration}</Td>
    <Td>{props.room.date.substring(0, 10)}</Td>
    <Td>
      <Button>
        {" "}
        <Link to={"/edit/" + props.room._id}>
          <FaEdit />
        </Link>
      </Button>
      <Button
        variant={"ghost"}
        onClick={() => {
          props.deleteRoom(props.room._id);
        }}
      >
        <MdDelete />
      </Button>
    </Td>
  </Tr>
);

export default class RoomsList extends Component {
  constructor(props) {
    super(props);
    this.deleteRoom = this.deleteRoom.bind(this);
    this.state = { rooms: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/rooms/")
      .then((response) => {
        this.setState({ rooms: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteRoom(id) {
    axios
      .delete("http://localhost:5000/rooms/" + id)
      .then((res) => console.log(res.data));

    this.setState({
      rooms: this.state.rooms.filter((el) => el._id !== id),
    });
  }

  roomsList() {
    return this.state.rooms.map((currentroom) => {
      return (
        <Room
          room={currentroom}
          deleteRoom={this.deleteRoom}
          key={currentroom._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <Flex minH={"100vh"} align={"center"} justify={"center"}>
          <Stack spacing={8} mx={"auto"} maxW={"max"} py={12} px={6}>
            <Stack align={"center"}>
              <Heading fontSize={"4xl"}>Logged Rooms</Heading>
            </Stack>
            <Box rounded={"lg"} boxShadow={"lg"} p={8}>
              <Stack spacing={4}></Stack>
              <Table className="table" variant={"simple"}>
                <Thead className="thead-light">
                  <Tr>
                    <Th>Username</Th>
                    <Th>Description</Th>
                    <Th>Duration</Th>
                    <Th>Date</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>{this.roomsList()}</Tbody>
              </Table>
            </Box>
          </Stack>
        </Flex>
      </div>
    );
  }
}
