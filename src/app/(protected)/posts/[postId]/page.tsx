import { getStudentPost } from "@/src/app/data/studentPost";
import { auth } from "@/src/auth";
import StudentPostView from "@/src/components/StudentPostView";

interface PostPageProps {
  params: { postId: string };
}

const StudentPost = async ({params}: PostPageProps) => {
  const session = await auth();
  const companyId = session?.user?.id;
  const studentPost = await getStudentPost(params.postId);

  if (!studentPost || !companyId) {
    return (
      <div>
        <h1>Post not found</h1>
      </div>
    );
  }

  return (
    <StudentPostView 
      post={studentPost}
      companyId={companyId} 
    />
  )
}

export default StudentPost;