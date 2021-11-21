import React, { Component } from "react";
import axios from "axios";
import { Button } from "@chakra-ui/button";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FiAlertCircle } from "react-icons/fi";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Heading,
} from "@chakra-ui/react";
import { GoogleLogin } from "react-google-login";

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setShow = this.setShow.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      show: false,
      isEmailValid: true,
      isPasswordValid: true,
    };
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  setShow(e) {
    this.setState({
      show: !this.state.show,
    });
  }
  handleClick() {
    this.setShow(this.state.show);
  }

  emailValidation() {
    const emailRegex = /\S+@\S+\.\S+/;
    const valid = !(
      !this.state.email || emailRegex.test(this.state.email) === false
    );
    this.setState({
      isEmailValid: valid,
    });
    return valid;
  }
  passwordValidation() {
    const passwordRegex =
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm;
    if (this.state.confirmPassword === this.state.password) {
      const valid = !(
        !this.state.password ||
        passwordRegex.test(this.state.password) === false
      );
      this.setState({
        isPasswordValid: valid,
      });
      return valid;
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const user = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    };
    if (this.passwordValidation() && this.emailValidation()) {
      console.log(user);
      axios
        .post("http://localhost:5000/users/add", user)
        .then((res) => console.log(res.data));

      this.setState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  }

  googleSuccess(e) {
    console.log(e);
    axios({
      method: "POST",
      url: "http://localhost:5000/users/googlelogin",
      data: { tokenId: e.tokenId },
    }).then((e) => console.log(e));
  }

  googleFailure(e) {
    console.log("Google sign up was unsuccessful");
  }

  render() {
    return (
      <div>
          
        <Flex minH={"100vh"} align={"center"} justify={"center"}>
          <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>

            <Stack align={"center"}>
              <Heading fontSize={"4xl"}>Create User</Heading>
            </Stack>
            <Box rounded={"lg"} boxShadow={"lg"} p={8}>
              <Stack spacing={4}>
                <FormControl id="username">
                  <FormLabel>Username</FormLabel>

                  <Input
                    type="text"
                    name="username"
                    required
                    value={this.state.username}
                    onChange={this.handleChange}
                  />
                </FormControl>

                <FormControl id="email">
                  <Popover
                    placement="right"
                    trigger={this.state.isEmailValid ? null : "hover"}
                  >
                    <FormLabel>Email address</FormLabel>

                    <InputGroup size="md">
                      <Input
                        type="email"
                        name="email"
                        required
                        borderColor={this.state.isEmailValid ? null : "red.500"}
                        value={this.state.email}
                        onChange={this.handleChange}
                      />
                      <InputRightElement width="4.5rem">
                        <PopoverTrigger>
                          <Button
                            h="1.75rem"
                            size="sm"
                            color="red"
                            variant="ghost"
                            visibility={
                              this.state.isEmailValid ? "hidden" : null
                            }
                          >
                            <FiAlertCircle />
                          </Button>
                        </PopoverTrigger>
                      </InputRightElement>
                    </InputGroup>

                    <PopoverContent borderColor="grey.200">
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverHeader>Email Not Valid</PopoverHeader>
                      <PopoverBody>Please enter a valid E-mail.</PopoverBody>
                    </PopoverContent>
                  </Popover>
                </FormControl>

                <FormControl id="password">
                  <Popover
                    placement="right"
                    trigger={this.state.isPasswordValid ? null : "hover"}
                  >
                    <FormLabel>Password</FormLabel>
                    <InputGroup size="md">
                      <Input
                        type={this.state.show ? "text" : "password"}
                        name="password"
                        required
                        borderColor={
                          this.state.isPasswordValid ? null : "red.500"
                        }
                        value={this.state.password}
                        onChange={this.handleChange}
                      />
                      <InputRightElement width="4.5rem">
                        
                        <PopoverTrigger>
                        <Button
                          h="1rem"
                          w="2.5rem"
                          size="sm"
                          variant="ghost"
                          onClick={this.handleClick}
                        >
                          {this.state.show === true? (
                            <AiOutlineEyeInvisible />
                          ) : this.state.isPasswordValid === false ? (
                            <FiAlertCircle color="red"/>)
                           : (
                            <AiOutlineEye />)
                          }
                        </Button>
                        </PopoverTrigger>
                      </InputRightElement>
                    </InputGroup>
                    <PopoverContent borderColor="grey.200">
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverHeader>Password is Not Valid</PopoverHeader>
                      <PopoverBody>
                        Please enter a valid Password.Must contain at least one
                        number, one uppercase and lowercase letter, one special
                        character,and at least 8 or more characters
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormControl id="confirmPassword">
                  {/* Changed id from password to confirmPassword */}
                  <FormLabel>Confirm Password</FormLabel>
                  <Input
                    type={this.state.show ? "text" : "password"}
                    name="confirmPassword"
                    required
                    borderColor={this.state.isPasswordValid ? null : "red.500"}
                    value={this.state.confirmPassword}
                    onChange={this.handleChange}
                  />
                </FormControl>
                <Stack spacing={10}>
                  <Button
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    onClick={this.onSubmit}
                  >
                    Create
                  </Button>
                  <GoogleLogin
                    clientId="1076710447745-t2ul5fmtppd91ofiah29235n4vlugobv.apps.googleusercontent.com"
                    render={(renderProps) => (
                      <Button
                        bg={"blue.400"}
                        color={"white"}
                        _hover={{
                          bg: "blue.500",
                        }}
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                      >
                        Google
                      </Button>
                    )}
                    onSuccess={this.googleSuccess}
                    onFailure={this.googleFailure}
                    cookiePolicy="single_host_origin"
                  />
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </div>
    );
  }
}
