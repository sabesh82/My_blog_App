import { Suspense } from "react";
import BlogPage from "./Blogpage";

export default function Blog() {
  return (
    <Suspense fallback={<div>Loading blog page...</div>}>
      <BlogPage />
    </Suspense>
  );
}
