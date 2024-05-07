import {
  handleChangePassword,
  handleGetAllUser,
  handleGetUserById,
  handleLoginUser,
  handleRefreshToken,
  handleRegisterUser,
  handleUpdateUserById,
} from "../services/userService";
export const getAllUser = async (req, res) => {
  try {
    const dt = await handleGetAllUser();
    // console.log("Cookies: ", req.cookies);
    return res.status(200).json(dt);
  } catch {
    // return res.status(500).json({ message: "sever is error ", errcode: 500 });
  }
};
export const getUserById = async (req, res) => {
  try {
    const dt = await handleGetUserById(req.body);
    // console.log("Cookies: ", req.cookies);

    if (dt && !dt.results) {
      return res.status(400).json(dt);
    }
    return res.status(200).json(dt);
  } catch {
    // return res.status(500).json({ message: "sever is error ", errcode: 500 });
  }
};

export const updateUserById = async (req, res) => {
  try {
    const dt = await handleUpdateUserById(req.body);
    // console.log("Cookies: ", req.cookies);

    if (dt && !dt.results) {
      return res.status(400).json(dt);
    }
    return res.status(200).json(dt);
  } catch {
    // return res.status(500).json({ message: "sever is error ", errcode: 500 });
  }
};

export const changePassword = async (req, res) => {
  try {
    const dt = await handleChangePassword(req.body);
    // console.log("Cookies: ", req.cookies);

    if (dt && !dt.results) {
      return res.status(400).json(dt);
    }
    return res.status(200).json(dt);
  } catch {
    // return res.status(500).json({ message: "sever is error ", errcode: 500 });
  }
};

export const loginUser = async (req, res) => {
  try {
    const dt = await handleLoginUser(req.body);
    if (dt && !dt.results) {
      return res.status(400).json(dt);
    }

    return res.status(200).json(dt);
  } catch {
    // return res.status(500).json({ message: "sever is error ", errcode: 500 });
  }
};

export const registerUser = async (req, res) => {
  try {
    const dt = await handleRegisterUser(req.body);
    if (dt && !dt.results) {
      return res.status(400).json(dt);
    }

    return res.status(200).json(dt);
  } catch {
    // return res.status(500).json({ message: "sever is error ", errcode: 500 });
  }
};

export const refreshTokenUser = async (req, res) => {
  try {
    const dt = await handleRefreshToken(req.body);
    if (dt && !dt.results) {
      return res.status(400).json(dt);
    }
    return res.status(200).json(dt);
  } catch {
    // return res.status(500).json({ message: "sever is error ", errcode: 500 });
  }
};
