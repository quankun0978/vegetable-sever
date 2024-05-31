import { handleGetDataAllCode } from "../services/allcodeService";

export const getDataAllCode = async (req, res) => {
  try {
    const dt = await handleGetDataAllCode();
    if (dt && !dt.results) {
      return res.status(400).json(dt);
    }
    return res.status(200).json(dt);
  } catch {
    return res.status(500).json("sever is error");
  }
};
