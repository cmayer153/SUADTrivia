import Image from "next/image";
import Link from "next/link";
import { Button } from "@mantine/core";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button component={Link} href="/trivia" color="blue">
        TriviaHelper2000
      </Button>
   

    </main>
  );
}
