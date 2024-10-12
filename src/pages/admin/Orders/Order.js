import React from 'react';
import { Box, Flex, Heading, Text, Button, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Order = () => {
  const navigate = useNavigate(); // Initialize navigate

  // Example orders data
  const orders = [
    {
      id: 1,
      user: "User A",
      items: "2x 1L Water Bottles",
      status: "Delivered",
      deliveryDate: "2024-10-12",
    },
    {
      id: 2,
      user: "User B",
      items: "1x 5L Water Bottle",
      status: "Pending",
      deliveryDate: "2024-10-13",
    },
    {
      id: 3,
      user: "User C",
      items: "3x 10L Water Bottles",
      status: "Pending",
      deliveryDate: "2024-10-13",
    },
    {
      id: 4,
      user: "User D",
      items: "1x 2L Water Bottle",
      status: "Delivered",
      deliveryDate: "2024-10-12",
    },
    {
      id: 5,
      user: "User E",
      items: "4x 5L Water Bottles",
      status: "Pending",
      deliveryDate: "2024-10-14",
    },
    // Add more orders as needed
  ];

  return (
    <Box 
      p={8}  // Increased padding for spacing
      bg="white" // Background color
      shadow="md" 
      borderRadius="lg" 
      maxW="90%"  // Increased width to make the table larger
      mx="auto"  // Keep it centered
    >
      <Heading as="h2" size="lg" mb={4}>
        Daily Orders
      </Heading>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Order ID</Th>
            <Th>User</Th>
            <Th>Items</Th>
            <Th>Status</Th>
            <Th>Delivery Date</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders.slice(0, 5).map((order) => ( // Show only 5 orders for now
            <Tr key={order.id}>
              <Td>{order.id}</Td>
              <Td>{order.user}</Td>
              <Td>{order.items}</Td>
              <Td>{order.status}</Td>
              <Td>{order.deliveryDate}</Td>
              <Td>
                <Button colorScheme="teal" size="sm" onClick={() => navigate(`/orders/${order.id}`)}>
                  View Details
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Order;
