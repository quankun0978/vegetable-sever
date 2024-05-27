import {
  handleAddMyVoucher,
  handleDeleteMyVoucher,
  handleGetListMyVoucher,
  handleGetListVoucher,
} from "../services/voucherService";

export const getListMyVoucher = async (req, res) => {
  try {
    const dt = await handleGetListMyVoucher(req.body.user_id);
    if (dt && !dt.results) {
      return res.status(400).json(dt);
    }
    return res.status(200).json(dt);
  } catch {
    return res.status(500).json("sever is error");
  }
};
export const getListVoucher = async (req, res) => {
  try {
    const dt = await handleGetListVoucher();
    if (dt && !dt.results) {
      return res.status(400).json(dt);
    }
    return res.status(200).json(dt);
  } catch {
    return res.status(500).json("sever is error");
  }
};
export const addMyVoucher = async (req, res) => {
  try {
    const dt = await handleAddMyVoucher(req.body);
    if (dt && !dt.results) {
      return res.status(400).json(dt);
    }
    return res.status(200).json(dt);
  } catch {
    return res.status(500).json("sever is error");
  }
};

export const deleteMyVoucher = async (req, res) => {
  try {
    const dt = await handleDeleteMyVoucher(req.body.code_id);

    if (dt && !dt.results) {
      return res.status(400).json(dt);
    }
    return res.status(200).json(dt);
  } catch {
    return res.status(500).json("sever is error");
  }
};
