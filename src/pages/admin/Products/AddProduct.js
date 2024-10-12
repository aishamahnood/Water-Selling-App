import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductRating from '../../../Components/ProductRating';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Heading,
  useToast,
  Icon, 
  Text,
  Image
} from "@chakra-ui/react"; // Import Chakra UI components
import apiSauce from "../../../utils/apiSauce";
import { FiUpload } from 'react-icons/fi';

function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // State for image preview
  const [stock, setStock] = useState(0); // Stock quantity
  const [isPending, setIsPending] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const toast = useToast(); // Initialize toast for notifications

  // Image file change with preview
  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);

    // Create image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(uploadedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
    setDragActive(false);
    
    // Image preview on drop
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(droppedFile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("file", file);
    formData.append("stock", stock); // Add stock to form data

    // Use apiSauce to make the POST request
    apiSauce.post("/product/addProduct", formData)
      .then(() => {
        toast.success("Product Added Successfully");
      })
      .catch((err) => {
        toast.error("Something went wrong");
        setIsPending(false);
      });
  };

  return (
    <Box p={4}>
      <Heading as="h1" size="lg" mb={4} textAlign={"left"}>
        Add Product
      </Heading>
      <VStack
        spacing={4}
        align="stretch"
        bgColor={"white"}
        borderRadius={10}
        p={10}
      >
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          method="POST"
        >
          <FormControl isRequired my={5}>
            <FormLabel htmlFor="name">Name:</FormLabel>
            <Input
              type="text"
              name="name"
              id="name"
              autoComplete="off"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired my={5}>
            <FormLabel htmlFor="price">Price:</FormLabel>
            <Input
              type="text"
              name="price"
              id="price"
              autoComplete="off"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired my={5}>
            <FormLabel htmlFor="description">Description:</FormLabel>
            <Textarea
              name="description"
              id="description"
              autoComplete="off"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>

          {/* Stock Quantity */}
          <FormControl isRequired my={5}>
            <FormLabel htmlFor="stock">Stock Quantity:</FormLabel>
            <Input
              type="number"
              name="stock"
              id="stock"
              autoComplete="off"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </FormControl>

          {/* Image Upload */}
          <FormControl isRequired my={5}>
            <FormLabel htmlFor="image">Image:</FormLabel>
            <Box
              border="2px dashed"
              borderColor={dragActive ? "teal.500" : "gray.300"}
              borderRadius="md"
              p={6}
              textAlign="center"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              position="relative"
              bg={dragActive ? "teal.50" : "white"}
              transition="all 0.3s ease"
            >
              <Icon as={FiUpload} boxSize={10} color="gray.400" mb={2} />
              <Text color="gray.500">
                {file
                  ? file?.name
                  : "Drag and drop an image or click to upload"}
              </Text>
              <Input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                position="absolute"
                top={0}
                left={0}
                width="100%"
                height="100%"
                opacity={0}
                cursor="pointer"
              />
            </Box>

            {/* Image Preview */}
            {imagePreview && (
              <Box mt={4}>
                <Image src={imagePreview} alt="Preview" maxH="200px" />
              </Box>
            )}
          </FormControl>
          
          <Button
            mt={4}
            colorScheme="blue"
            type="submit"
            isLoading={isPending}
            loadingText="Adding Product..."
          >
            Add Product
          </Button>
        </form>
      </VStack>
    </Box>
  );
}

export default AddProduct;
