import AuthCheckerPerPage from "../components/AuthCheckerPerPage";
import { Box } from "native-base";
import PostForm from "../components/PostForm";
import { UserContainer } from "../store/UserContainer";
import Header from "../components/elements/Header";

function CreatePostScreen() {
  const { signInUser } = UserContainer.useContainer();

  return (
    <>
      <AuthCheckerPerPage>
        <Header />
        {/* // TODO:このptってPostForm側で設定するべきでは？ */}

        {/* AuthCheckerPerPageがsignInUser !== undefinedを担保 */}
        <PostForm userId={signInUser!._id} postType="create" />
      </AuthCheckerPerPage>
    </>
  );
}

export default CreatePostScreen;
