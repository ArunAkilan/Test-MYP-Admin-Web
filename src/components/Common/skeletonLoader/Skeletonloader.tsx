import React, { useState, useEffect } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type SkeletonData = {
  title: string;
  description: string;
};

const SkeletonCard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<SkeletonData | null>(null);

  useEffect(() => {
    // Simulate API fetch
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setData({
        title: "Loaded Title",
        description: "This is some loaded content.",
      });
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="card">
      {loading ? (
        <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
          <h2><Skeleton width={200} /></h2>
          <p><Skeleton count={3} /></p>
        </SkeletonTheme>
      ) : (
        <>
          <h2>{data?.title}</h2>
          <p>{data?.description}</p>
        </>
      )}
    </div>
  );
};

export default SkeletonCard;