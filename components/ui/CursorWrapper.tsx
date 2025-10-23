"use client";

import { useEffect, useState } from "react";
import { SimpleTechCursor } from "@/components/ui/SimpleTechCursor";

export const CursorWrapper = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return <SimpleTechCursor />;
};
