import { Button } from "@material-tailwind/react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center mt-36">
      <div className="flex flex-col items-center justify-center space-y-4">
        <Link href={"/admin"}>
          <Button className="w-44" variant="gradient">
            Admin
          </Button>
        </Link>

        <Link href={"/order?locationId=2&tableId=2"}>
          <Button className="w-44" variant="gradient">
            User
          </Button>
        </Link>
      </div>
    </div>
  );
}
