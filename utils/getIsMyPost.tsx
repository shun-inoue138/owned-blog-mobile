import { Post } from "../api/PostAPI";
import { User } from "../api/UserAPI";

export const getIsMyPost = (user: User | undefined, post: Post | undefined) => {
  //user ===true && !user._idおよびpost === true && !post.user._idのケースはDBの構造上起こり得ない。
  if (!user || !post) return false;
  return user._id === post.user._id;
};
