import React, {Component} from "react";
import { Link } from 'react-router-dom';
import { Button, HStack} from "@chakra-ui/react";

export default class Homepage extends Component{
    render() {
        return(
        <HStack mt={3} mx={550} spacing={7} align="center">
            <Button colorScheme="teal" variant="solid">
                <Link to="/">
                    Rooms 
                </Link>
            </Button> 
            <Button colorScheme="teal" variant="solid">
                <Link to="/create">
                    Create Room
                </Link>  
            </Button> 
            <Button colorScheme="teal" variant="solid">
                <Link to="/user">
                    Create user
                </Link>  
            </Button> 
            <Button colorScheme="teal" variant="solid">
                <Link to="/login">
                    Login
                </Link>  
            </Button> 
        </HStack>
        );
    }
}