import React from 'react';
import { Box, Heading, Text, Button, Flex, Stack, Icon } from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'; // For back icon

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

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
  ];

  const order = orders.find(o => o.id === parseInt(orderId));

  if (!order) {
    return <Box textAlign="center" fontSize="xl" p={6}>Order not found!</Box>;
  }

  return (
    <Box p={8} bg="gray.100" shadow="xl" borderRadius="xl" maxW="900px" mx="auto" mt={8}>
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Heading as="h2" size="xl" color="teal.500">
          Order Details
        </Heading>
        <Button leftIcon={<FaArrowLeft />} colorScheme="teal" onClick={() => navigate('/orders')}>
          Back to Orders
        </Button>
      </Flex>
      <Box bg="white" p={6} borderRadius="lg" shadow="md">
        <Stack spacing={4}>
          <Text fontSize="xl" fontWeight="bold">
            Order ID: <Text as="span" color="teal.600">{order.id}</Text>
          </Text>
          <Text fontSize="lg">
            <Text as="span" fontWeight="bold">User:</Text> {order.user}
          </Text>
          <Text fontSize="lg">
            <Text as="span" fontWeight="bold">Items:</Text> {order.items}
          </Text>
          <Text fontSize="lg">
            <Text as="span" fontWeight="bold">Status:</Text> {order.status}
          </Text>
          <Text fontSize="lg">
            <Text as="span" fontWeight="bold">Delivery Date:</Text> {order.deliveryDate}
          </Text>
        </Stack>
      </Box>
    </Box>
  );
};

export default OrderDetails;
