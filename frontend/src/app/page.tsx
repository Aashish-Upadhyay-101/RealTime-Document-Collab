import { Button } from "../../components/ui/button";
import "./globals.css";

export default function Home() {
  return (
    <div className="text-3xl">
      <Button className="w-72 bg-blue-600 hover:bg-blue-700 duration-200 text-base">
        Hello Aashish!
      </Button>
    </div>
  );
}
