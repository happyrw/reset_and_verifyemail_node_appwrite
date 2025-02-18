import express from "express";
import cors from "cors";
import {
  updateNewPassword,
  updateVerification,
} from "./controllers/auth_controllers.js";
import { SendGridEmail } from "./controllers/email_mesaging.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

// send email notification
app.post("/send_email_notification", async (req, res) => {
  const { to, emailTemplate } = req.body;
  try {
    await SendGridEmail(to, emailTemplate);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    res.status(404).json({ message: "Error sending email" + error });
  }
});

// server home
app.get("/", (req, res) => {
  res.render("index");
});

// email verification endpoint
app.get("/verify", async (req, res) => {
  const { userId, secret } = req.query;

  try {
    await updateVerification(userId, secret); // Wait for updateVerification function to complete
    res.render("template", {
      title: "✅ Verification Complete",
      message: "Your email address has been verified successfully.",
    });
  } catch (e) {
    res.render("template", {
      title: "❌ Verification Failed",
      message: `⚠️ Reason : ${e.message}`,
    });
  }
});

// password reset endpoint
app.get("/recovery", (req, res) => {
  const { userId, secret } = req.query;
  console.log("userId", userId);
  console.log("secret", secret);
  res.render("reset_password", { userId, secret, message: "" });
});

// complete password reset post endpoint
app.post("/reset_password", async (req, res) => {
  const { userId, secret, password, password_confirm } = req.body;

  if (password !== password_confirm) {
    res.render("reset_password", {
      userId,
      secret,
      message: "Passwords do not match.",
    });
  }

  if (password.length < 8) {
    res.render("reset_password", {
      userId,
      secret,
      message: "Password must be at least 8 characters.",
    });
  }

  try {
    const result = await updateNewPassword(
      userId,
      secret,
      password,
      password_confirm
    ); // Wait for updatePassword function to complete
    console.log(result);
    res.render("template", {
      title: "✅ Password Changed",
      message: "Your password was changed successfully.",
    });
  } catch (err) {
    res.render("template", {
      title: "❌ Password Reset Failed",
      message: `⚠️ Reason : ${err.message}`,
    });
  }
});

// 404 error page
app.get("*", (req, res) => {
  res.render("template", { title: "❌ Error", message: "⚠️ Page not found" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
