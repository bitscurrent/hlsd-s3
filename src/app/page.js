import Image from "next/image";
import styles from "./page.module.css";
import Room from "@/client/pages/reactplayer";
import UploadPage from "@/client/pages/uploads";


export default function Home() {
  return (
    
    <>
    <Room />
    <UploadPage />
    </>
  );
}
