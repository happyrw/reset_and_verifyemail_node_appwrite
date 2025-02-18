import { Client as AppwriteClient, Account } from "appwrite";
// import { Messaging, Client as MessagingClient } from "node-appwrite";

// Account
const appwriteClient = new AppwriteClient()
  .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
  .setProject("678cf91e002fc50fabfb"); // Your project ID

const account = new Account(appwriteClient);

// Messaging
// const messagingClient = new MessagingClient()
//   .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
//   .setProject("678cf91e002fc50fabfb") // Your project ID
//   .setKey(
//     "standard_4cdd57df0b532f7b09d59a14be77a4357f5e00b9498d30e38105083a52a66f9245f63a065359606936f07635b6530ffaefe0c89cd8bd3ac7ce961fa2845573f2a4d24251fe8278cf54fb698dc29badde1f255a225d6b8c9ce81bb67b3eda808253395b84c0e6eadc4ef597503f27be06d95ec0b831af5e88efb286a75b1533ee"
//   );
// const messaging = new Messaging(messagingClient);

// // send verification email
// export const sendEmailNotification = async () => {
//   const randomNumber = Math.floor(Math.random() * 1000);

//   // HTML content for the email body
//   const emailContent = `
// <html>
//   <body>
//     <h1>Welcome!</h1>
//     <p>Thank you for being part of our community!</p>
//   </body>
// </html>
// `;

//   const message = await messaging.createEmail(
//     `${randomNumber}_455637-6d6354n`,
//     "Welcome!",
//     emailContent,
//     [],
//     ["678e917b00286cc80e0c"]
//   );
//   console.log(message);
// };

// complete verification for the client
export const updateVerification = async (userId, secret) => {
  try {
    const response = await account.updateVerification(userId, secret);
    console.log(response); // Success
    return response;
  } catch (error) {
    console.log(error); // Failure
    throw error;
  }
};

// update and reset the password
export const updateNewPassword = async (
  userId,
  secret,
  password,
  password_confirm
) => {
  try {
    const response = await account.updateRecovery(
      userId,
      secret,
      password,
      password_confirm
    );
    console.log(response); // Success
    return response;
  } catch (error) {
    console.log(error); // Failure
    throw error;
  }
};
