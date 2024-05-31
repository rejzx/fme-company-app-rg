import Navbar from "@/src/components/Navbar";

interface ProtectedLayerProps {
  children: React.ReactNode;
};

const ProtectedLayer = async ({children}: ProtectedLayerProps) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}

export default ProtectedLayer;