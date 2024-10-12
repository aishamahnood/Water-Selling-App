import React from 'react'; // Add this line
import { useNavigate } from "react-router-dom";
import { Box, Button, Text, Flex, Heading, Link, Image, FormControl, FormLabel, Input, Icon } from "@chakra-ui/react";
import { FiMapPin, FiPhone, FiMail, FiUpload } from "react-icons/fi";

const VendorProfile = () => {
  const navigate = useNavigate(); // useNavigate hook for navigation
  const vendor = {
    name: "WaterWorks Store",
    image: "https://via.placeholder.com/150", // Vendor image
    address: "123 Vendor St, City, Country",
    phone: "123-456-7890",
    email: "vendor@example.com",
    website: "https://vendorwebsite.com",
    description: "We provide the best quality water to keep you hydrated!",
    rating: 4.5,
  };

  // States for image upload
  const [file, setFile] = React.useState(null);
  const [imagePreview, setImagePreview] = React.useState(null);
  const [dragActive, setDragActive] = React.useState(false);

  // Handlers for file upload
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setImagePreview(URL.createObjectURL(selectedFile));
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);
    const droppedFile = event.dataTransfer.files[0];
    setFile(droppedFile);
    setImagePreview(URL.createObjectURL(droppedFile));
  };

  return (
    <Box p={6} bg="gray.50" shadow="md" borderRadius="lg" maxW="800px" mx="auto">
      <Flex direction={{ base: "column", md: "row" }} alignItems="center" justify="space-between">
        

        <Box ml={{ md: 8 }} w="full">
          <Heading as="h2" size="lg" mb={4}>
            {vendor.name}
          </Heading>
          <Flex alignItems="center" mb={3}>
            <FiMapPin />
            <Text ml={2}>{vendor.address}</Text>
          </Flex>
          <Flex alignItems="center" mb={3}>
            <FiPhone />
            <Text ml={2}>{vendor.phone}</Text>
          </Flex>
          <Flex alignItems="center" mb={3}>
            <FiMail />
            <Text ml={2}>{vendor.email}</Text>
          </Flex>
        </Box>
        
        <Button colorScheme="teal" mt={5} onClick={() => navigate("/edit-vendor")}>
          Edit Profile
        </Button>
      </Flex>

      {/* Centered Visit Website Link */}
      <Flex justifyContent="center" mt={4}>
        <Link href={vendor.website} isExternal color="teal.500" fontSize="lg" fontWeight="bold">
          Visit Website
        </Link>
      </Flex>

      {/* Image Upload */}
      <FormControl isRequired my={5}>
        <FormLabel htmlFor="image">Shop Image:</FormLabel>
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
            {file ? file?.name : "Drag and drop an image or click to upload"}
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
    </Box>
  );
};

export default VendorProfile;
