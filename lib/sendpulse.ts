import axios from "axios";

const SENDPULSE_API_URL = "https://api.sendpulse.com";

// Function to get access token
export const getAccessToken = async () => {
  try {
    const response = await axios.post(
      `${SENDPULSE_API_URL}/oauth/access_token`,
      {
        grant_type: "client_credentials",
        client_id: "892c50d683dba3d8e89e869a93d96c52",
        client_secret: "676ae95cf7db2cbf95fe3a1ecee8a3a5",
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error("Error fetching access token:", error);
    return null;
  }
};

// Function to send email
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
        email: "ignatius.mutizwa@procoders.co.za",
      },
      to: [{ email: toEmail }],
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

// Function to create a campaign
export const createCampaign = async (
  subject: string,
  templateId: string,
  listId: string
) => {
  const token = await getAccessToken();
  if (!token) return;

  const campaignData = new URLSearchParams({
    sender_name: "Ignatius",
    sender_email: "ignatius.mutizwa@procoders.co.za",
    subject: subject,
    template_id: templateId,
    list_id: listId,
  });

  try {
    const response = await axios.post(
      `${SENDPULSE_API_URL}/campaigns`,
      campaignData.toString(),
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    console.log("Campaign created successfully:", response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error creating campaign:",
        error.response?.data || error.message
      );
    } else {
      console.error("Unexpected error:", error);
    }
  }
};

// Function to get address book ID by name
export const getAddressBookIdByName = async (name: string) => {
  const token = await getAccessToken();
  if (!token) return null;

  try {
    const response = await axios.get(`${SENDPULSE_API_URL}/addressbooks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const addressBook = response.data.find((book: any) => book.name === name);
    return addressBook ? addressBook.id : null;
  } catch (error) {
    console.error("Error fetching address books:", error);
    return null;
  }
};

// Function to add email to address book
export const addEmailToAddressBook = async (
  email: string,
  addressBookId: string,
  name: string
) => {
  const token = await getAccessToken();
  if (!token) return;

  const data = {
    emails: [
      {
        email: email,
        variables: {
          Name: name,
        },
      },
    ],
  };

  try {
    const response = await axios.post(
      `${SENDPULSE_API_URL}/addressbooks/${addressBookId}/emails`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Email added to address book successfully:", response.data);
  } catch (error) {
    console.error("Error adding email to address book:", error);
  }
};

// Function to create a template
export const createTemplate = async (name: string, body: string) => {
  const token = await getAccessToken();
  if (!token) return;

  const templateData = {
    name: name,
    body: body,
    lang: "en",
  };

  try {
    const response = await axios.post(
      `${SENDPULSE_API_URL}/template`,
      templateData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Template created successfully:", response.data);
  } catch (error) {
    console.error("Error creating template:", error);
  }
};

// Function to get all senders
export const getAllSenders = async () => {
  const token = await getAccessToken();
  if (!token) return;

  try {
    const response = await axios.get(`${SENDPULSE_API_URL}/senders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching senders:", error);
    return null;
  }
};

// Function to add a sender
export const addSender = async (email: string, name: string) => {
  const token = await getAccessToken();
  if (!token) return;

  const senderData = {
    email: email,
    name: name,
  };

  try {
    const response = await axios.post(
      `${SENDPULSE_API_URL}/senders`,
      senderData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Sender added successfully:", response.data);
  } catch (error) {
    console.error("Error adding sender:", error);
  }
};

// Add more functions for other API calls as needed...
