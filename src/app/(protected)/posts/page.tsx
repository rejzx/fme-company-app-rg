import { auth } from "@/src/auth"
import { getAllPosts } from "@/src/app/data/posts";
import ActiveStudentPosts from "@/src/components/ActiveStudentPosts";

const Posts = async () => {
  const session = await auth();

  const allActivePosts = await getAllPosts({ isActive: true });
  
  return (
    <div>
      <ActiveStudentPosts posts={allActivePosts} />
    </div>
  )
}

export default Posts;