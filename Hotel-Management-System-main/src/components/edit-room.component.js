import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Flex,
  Box,
  Stack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button
} from "@chakra-ui/react";

export default class EditRoom extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      description: "",
      duration: 0,
      date: new Date(),
      users: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/rooms/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          username: response.data.username,
          description: response.data.description,
          duration: response.data.duration,
          date: new Date(response.data.date),
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get("http://localhost:5000/users/")
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map((user) => user.username),
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value,
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const room = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    };

    console.log(room);

    axios
      .post(
        "http://localhost:5000/rooms/update/" + this.props.match.params.id,
        room
      )
      .then((res) => console.log(res.data));

    window.location = "/";
  }

  render() {
    return (
      <div>
        <Flex minH={"100vh"} align={"center"} justify={"center"}>
          <Stack spacing={8} mx={"auto"} maxW={"max"} py={12} px={6}>
            <Stack align={"center"}>
              <Heading fontSize={"4xl"}>Edit Room Log</Heading>
            </Stack>
            <Box rounded={"lg"} boxShadow={"lg"} p={8}>
              <Stack spacing={4}>
              
                <FormControl id="username">
                  <FormLabel>Username: </FormLabel>
                  
                  <Select
                    ref="userInput"
                    required
                    className="form-control"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                  >
                    {this.state.users.map(function (user) {
                      return (
                        <option key={user} value={user}>
                          {user}
                        </option>
                      );
                    })}
                  </Select>
                  </FormControl>
                
                  <FormControl id="decription">
                  <FormLabel>Description: </FormLabel>
                  <Input
                    type="text"
                    required
                    className="form-control"
                    value={this.state.description}
                    onChange={this.onChangeDescription}
                  />
                  </FormControl>
                
                  <FormControl id="duration">
                  <FormLabel>Duration (in minutes): </FormLabel>
                  <Input
                    type="text"
                    className="form-control"
                    value={this.state.duration}
                    onChange={this.onChangeDuration}
                  />
                </FormControl>
                <FormControl id="Date">
                  <FormLabel>Date: </FormLabel>
                
                    <DatePicker
                      selected={this.state.date}
                      onChange={this.onChangeDate}
                    />
                  
                  </FormControl>

                  <FormControl id="Submit">
                  <Stack spacing={10}>
                  <Button
                  type="submit"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    onClick={this.onSubmit}
                  >
                    Edit Room Log
                  </Button>
                  </Stack>
                </FormControl>
                </Stack>
            </Box>
          </Stack>
        </Flex>
      </div>
    );
  }
}
