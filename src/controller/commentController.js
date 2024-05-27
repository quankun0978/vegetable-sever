import {
  handleGetCommentByProductId,
  handlePostComment,
} from "../services/commentService";

export const getCommentByProductId = async (req, res) => {
  try {
    const dt = await handleGetCommentByProductId(req.body.product_id);
    if (dt && !dt.results) {
      return res.status(400).json(dt);
    }
    return res.status(200).json(dt);
  } catch {
    return res.status(500).json("sever is error");
  }
};

export const postComment = async (req, res) => {
  try {
    const dt = await handlePostComment(req.body);
    // console.log("Cookies: ", req.cookies);
    if (dt && !dt.results) {
      return res.status(400).json(dt);
    }
    return res.status(200).json(dt);
  } catch {
    return res.status(500).json("sever is error");
  }
};
