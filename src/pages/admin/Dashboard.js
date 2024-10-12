import React from "react";
import { useEffect, useState } from "react";
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Button, Text, Spinner } from "@chakra-ui/react"; // Import Chakra UI components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const dummyOrders = [
  { _id: "1", user: { fullName: "User 1", email: "user1@example.com", address: "Address 1", city: "City 1" }, product: { name: "Product 1" } },
  { _id: "2", user: { fullName: "User 2", email: "user2@example.com", address: "Address 2", city: "City 2" }, product: { name: "Product 2" } },
  // ... add more orders as needed
];

const dummyProducts = [
  { _id: "1", name: "Product 1", description: "Description 1", price: 100, category: { name: "Category 1" } },
  { _id: "2", name: "Product 2", description: "Description 2", price: 200, category: { name: "Category 2" } },
  // ... add more products as needed
];

export default function Dashboard() {
  const [product, setProduct] = useState(dummyProducts);
  const [order, setOrder] = useState(dummyOrders);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch products
    fetch("http://localhost:3000/api/product/getProducts")
      .then((response) => response.json())
      .then((data) => {
        // setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Fetch orders
    fetch("http://localhost:3000/api/order/getOrders")
      .then((response) => response.json())
      .then((data) => {
        // setOrder(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const deleteProduct = (id) => {
    fetch(`http://localhost:3000/api/product/deleteProduct/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        toast.success("Product Deleted Successfully");
        const remaining = product.filter((spot) => spot._id !== id);
        setProduct(remaining);
      });
  };

  return (
    <Box p={5}>
      <Heading textAlign="left" mb={5}>Dashboard</Heading>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Text color="red.500">Error loading data</Text>
      ) : (
        <>
          <Box mb={10}>
            <Heading textAlign="left" size="md" mb={3}>Top Products</Heading>
            {product.length === 0 ? (
              <Text>No products available</Text>
            ) : (
              <Box overflowX="auto"> 
                <Table variant="simple" bgColor={"white"} borderRadius={10} shadow={"xl"}>
                  <Thead>
                    <Tr>
                      <Th>Name</Th>
                      <Th>Description</Th>
                      <Th>Price</Th>
                      <Th>Category</Th>
                      <Th>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {product.map((prod) => (
                      <Tr key={prod._id}>
                        <Td>{prod.name}</Td>
                        <Td>{prod.description}</Td>
                        <Td>{prod.price}</Td>
                        <Td>{prod.category?.name}</Td>
                        <Td>
                          <Button
                            colorScheme="blue"
                            // onClick={() => deleteProduct(prod._id)}
                            mx={1}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </Button>
                          <Button
                            colorScheme="red"
                            onClick={() => deleteProduct(prod._id)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>  // End of Box for responsiveness
            )}
          </Box>

          <Box>
            <Heading textAlign="left" size="md" mb={3}>Latest Orders</Heading>
            {order.length === 0 ? (
              <Text>No orders available</Text>
            ) : (
              <Box overflowX="auto"> 
                <Table variant="simple" bgColor={"white"} borderRadius={10} shadow={"xl"}>
                  <Thead>
                    <Tr>
                      <Th>Name</Th>
                      <Th>Email</Th>
                      <Th>Address</Th>
                      <Th>City</Th>
                      <Th>Product</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {order.map((ord) => (
                      <Tr key={ord._id}>
                        <Td>{ord.user?.fullName}</Td>
                        <Td>{ord.user?.email}</Td>
                        <Td>{ord.user?.address}</Td>
                        <Td>{ord.user?.city}</Td>
                        <Td>{ord.product?.name}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>  // End of Box for responsiveness
            )}
          </Box>
        </>
      )}
    </Box>
  );
}