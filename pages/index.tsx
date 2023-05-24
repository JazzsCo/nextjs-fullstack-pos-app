import Layout from "@/components/Layout";
import Button from "@mui/material/Button";
import Link from "next/link";

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        maxWidth: 300,
        margin: "0 auto",
        marginTop: 50,
      }}
    >
      <Link href={"/adman"}>
        <Button variant="outlined">Adman</Button>
      </Link>

      <Link href={"/user"}>
        <Button variant="outlined">User</Button>
      </Link>
    </div>
  );
}
