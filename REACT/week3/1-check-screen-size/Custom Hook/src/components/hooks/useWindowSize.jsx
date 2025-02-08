import { useState, useEffect, useDebugValue } from "react";

// Custom hook to get window dimensions
function useWindowSize(id) {
  const getSize = () => ({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [windowSize, setWindowSize] = useState(getSize);

  useDebugValue(
    windowSize,
    (size) => `Instance ${id} - Width: ${size.width}, Height: ${size.height}`
  );

  useEffect(() => {
    const handleResize = () => setWindowSize(getSize());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

function ScreenSizeComponent() {
  const size1 = useWindowSize(1);
  const size2 = useWindowSize(2);
  const size3 = useWindowSize(3);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Screen Size Tracker</h2>
      <p>First Hook - Width: {size1.width}, Height: {size1.height}</p>
      <p>Second Hook - Width: {size2.width}, Height: {size2.height}</p>
      <p>Third Hook - Width: {size3.width}, Height: {size3.height}</p>
      <CheckAllFeatures size1={size1} size2={size2} size3={size3} />
    </div>
  );
}

// Check all features function
function CheckAllFeatures({ size1, size2, size3 }) {
  const allSizesMatch =
    size1.width === size2.width &&
    size2.width === size3.width &&
    size1.height === size2.height &&
    size2.height === size3.height;

  return (
    <div className="mt-4 p-2 border rounded-md bg-gray-100">
      <h3 className="text-lg font-semibold">Feature Check</h3>
      <p>{allSizesMatch ? "All hooks return the same size." : "Mismatch detected!"}</p>
      <p>React Custom Hook.</p>
    </div>
  );
}

export default ScreenSizeComponent;
