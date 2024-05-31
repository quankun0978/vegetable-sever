import {
  handleAddNews,
  handleGetListNews,
  handleGetNewsByNewsId,
} from "../services/newsService";

export const getListNews = async (req, res) => {
  try {
    const dt = await handleGetListNews();
    if (dt && !dt.results) {
      return res.status(400).json(dt);
    }
    return res.status(200).json(dt);
  } catch {
    return res.status(500).json("sever is error");
  }
};

export const getListNewsById = async (req, res) => {
  try {
    const dt = await handleGetNewsByNewsId(req.body.news_id);
    if (dt && !dt.results) {
      return res.status(400).json(dt);
    }
    return res.status(200).json(dt);
  } catch {
    return res.status(500).json("sever is error");
  }
};

export const addNews = async (req, res) => {
  try {
    const dt = await handleAddNews();
    if (dt && !dt.results) {
      return res.status(400).json(dt);
    }
    return res.status(200).json(dt);
  } catch {
    return res.status(500).json("sever is error");
  }
};
