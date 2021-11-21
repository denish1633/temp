import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    useColorModeValue,
    useToast,
  } from '@chakra-ui/react';
  
  import { Link } from 'react-router-dom';

  export default function SimpleCard() {
    const toast = useToast();

    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Reset ur password</Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="password">
                <FormLabel>Current Password</FormLabel>
                <Input type="password" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>New Password</FormLabel>
                <Input type="password" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Confirm Password Password</FormLabel>
                <Input type="password" />
              </FormControl>
              <Stack spacing={10}>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500'
                  }}
                  onClick={() =>
                    toast({
                      title: "Reset Password",
                      description: "Password successfully Changed!!",
                      status: "success",
                      duration: 9000,
                      isClosable: true,
                    })
                  }
                  >
                  <Link to="/login">Reset Password</Link>
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }
