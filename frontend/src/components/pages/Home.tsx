import { Box } from "@mui/material";
import { useGetUsersQuery } from "../../graphql/generated/graphql";

const Home = () => {
  const { data, error } = useGetUsersQuery();

  if (error) {
    console.error("Error fetching users:", error.message);
    return (
      <Box>
        <h1>Error</h1>
        <div>An error occurred while fetching user data.</div>
      </Box>
    );
  }

  return (
    <Box>
      <h1>Home</h1>
      <div>{JSON.stringify(data)}</div>
    </Box>
  );
};

export default Home;
