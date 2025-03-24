import axios from "axios";

const SENDPULSE_API_URL = "https://api.sendpulse.com";
const CLIENT_ID = "892c50d683dba3d8e89e869a93d96c52";
const CLIENT_SECRET = "676ae95cf7db2cbf95fe3a1ecee8a3a5";

const getAccessToken = async () => {
  try {
    const response = await axios.post(
      `${SENDPULSE_API_URL}/oauth/access_token`,
      {
        grant_type: "client_credentials",
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error("Error fetching access token:", error);
    return null;
  }
};

export const sendEmail = async (
  toEmail: string,
  subject: string,
  body: string
) => {
  const token = await getAccessToken();
  if (!token) return;

  const emailData = {
    email: {
      from: {
        name: "Your App Name",
        email: "ignatius.mutizwa@procoders.co.za", // Must be verified in SendPulse
      },
      to: [
        {
          email: toEmail,
        },
      ],
      subject: subject,
      body: body,
    },
  };

  try {
    const response = await axios.post(
      `${SENDPULSE_API_URL}/smtp/emails`,
      emailData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Email sent successfully:", response.data);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
