import { Stack } from "@mui/material";
import Link from "next/link";

const NewArrivals = () => {
  return (
    <Stack className="new-arrivals">
      <div className="new-arrival">
        <Link href="/products" className="text">
          <h1>NEW ARRIVALS</h1>
        </Link>
      </div>
    </Stack>
  );
};
export default NewArrivals;
