// pages/brand/index.tsx
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function BrandIndex() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/"); // Bosh sahifaga yo'naltiradi
  }, []);

  return null;
}
