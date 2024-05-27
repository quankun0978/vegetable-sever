import {
  handleChangePassword,
  handleSendMail,
  handleGetAllUser,
  handleGetUserById,
  handleLoginUser,
  handleRefreshToken,
  handleRegisterUser,
  handleUpdateUserById,
  handleResetPassword,
  handleCallbackPayment,
} from "../services/userService";
import { mailResetTemplate } from "../ultils/helper";
export const getAllUser = async (req, res) => {
  try {
    const dt = await handleGetAllUser();
    return res.status(200).json(dt);
  } catch {
    return res.status(500).json("sever is error");
  }
};
export const getUserById = async (req, res) => {
  try {
    const dt = await handleGetUserById(req.body);

    if (dt && !dt.results) {
      return res.status(400).json(dt);
    }
    return res.status(200).json(dt);
  } catch {
    return res.status(500).json("sever is error");
  }
};

export const updateUserById = async (req, res) => {
  try {
    const dt = await handleUpdateUserById(req.body);

    if (dt && !dt.results) {
      return res.status(400).json(dt);
    }
    return res.status(200).json(dt);
  } catch {
    return res.status(500).json("sever is error");
  }
};

export const changePassword = async (req, res) => {
  try {
    const dt = await handleChangePassword(req.body);

    if (dt && !dt.results) {
      return res.status(400).json(dt);
    }
    return res.status(200).json(dt);
  } catch {
    return res.status(500).json("sever is error");
  }
};

export const resetPassword = async (req, res) => {
  try {
    const dt = await handleResetPassword(req.body);

    if (dt && !dt.results) {
      return res.status(400).json(dt);
    }
    return res.status(200).json(dt);
  } catch {
    return res.status(500).json("sever is error");
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
    return res.status(500).json("sever is error");
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
    return res.status(500).json("sever is error");
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
    return res.status(500).json("sever is error");
  }
};



export const sendMail = async (req, res) => {
  try {
    const email = req.body.email;

    const mailOption = {
      email: email,
      subject: "Forgot Password Link",
      message: mailResetTemplate(
        "We have received a request to reset your password. Please reset your password using the link below.",
        `${process.env.FRONTEND_URL}/lam-moi-mat-khau`,
        "Reset Password"
      ),
    };

    const dt = await handleSendMail(mailOption);
    if (dt && !dt.results) {
      return res.status(400).json(dt);
    }
    return res.status(200).json(dt);
  } catch (err) {
    return res.status(500).json("sever is error");
  }
};
