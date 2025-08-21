import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dymanic";

//POST /api/message
export const POST = async (reques) => {
  try {
    await connectDB();

    const { name, email, phone, message, property, recipient } =
      await reques.json();
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return new Response(
        JSON.stringify({ message: "You must be logged in to sent a message" }),
        { status: 401 }
      );
    }
    const { user } = sessionUser;

    // Can not sent message to self
    if (user.id === recipient) {
      return new Response(
        JSON.stringify(
          { message: "Can not sent message to yourself" },
          { status: 400 }
        )
      );
    }
    const newMessage = new Message({
      sender: user.id,
      recipient,
      property,
      name,
      email,
      phone,
      body: message,
    });

    await newMessage.save();
    return new Response(
      JSON.stringify({ message: "Message Sent" }, { status: 200 })
    );
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
