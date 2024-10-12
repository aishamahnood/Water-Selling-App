import { useNavigate } from "react-router-dom";
import { Box, Button, Input, Text } from "@chakra-ui/react";
import { useState } from "react";

const EditVendorProfile = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [shopName, setShopName] = useState("");
  const [shopAddress, setShopAddress] = useState("");
  const [shopContact, setShopContact] = useState("");
  const [shopImage, setShopImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save changes logic here...
    navigate("/vendor-profile"); // Redirect to Vendor Profile after saving changes
  };

  return (
    <Box p={5}>
      <Text fontSize="2xl" mb={4}>Edit Vendor Profile</Text>
      <form onSubmit={handleSubmit}>
        <Input placeholder="Shop Name" value={shopName} onChange={(e) => setShopName(e.target.value)} required mb={3} />
        <Input placeholder="Shop Address" value={shopAddress} onChange={(e) => setShopAddress(e.target.value)} required mb={3} />
        <Input placeholder="Shop Contact" value={shopContact} onChange={(e) => setShopContact(e.target.value)} required mb={3} />
        <Input type="file" onChange={(e) => setShopImage(e.target.files[0])} required mb={3} />
        <Button type="submit" colorScheme="blue">Save Changes</Button>
      </form>
    </Box>
  );
};

export default EditVendorProfile;
