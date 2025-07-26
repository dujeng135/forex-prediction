import { Card } from "@/components/ui/card";

export default function ResizableCard({
  width = "100%",
  height = "100%",
  className = "",
  style = {},
  children,
}) {
  return (
    <Card
      className={`bg-gradient-to-b from-[#000000] to-[#1a1c2c] border border-white/10 shadow-md rounded-xl ${className}`}
      style={{ width, height, ...style }}
    >
      {children}
    </Card>
  );
}
