import { Flex } from "@chakra-ui/react";
import BranChart from "./branchart";
import Cereal from "./cereal";

function App() {
  return (
    <Flex
      w="100%"
      h={"100%"}
      justify={"center"}
      align="center"
      flexDir={"column"}
    >
      <h1>Top 5 Cereals and the amount of protein in each</h1>
      <Cereal />
      <h1>Bran Cereal Nutrition </h1>
      <BranChart />
    </Flex>
  );
}

export default App;
