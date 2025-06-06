import { NextResponse } from "next/server";
import { connectToDb } from "../../../../../helpers/serverHelpers";
import prisma from "../../../../../prisma";
import bcrypt from "bcrypt";
import { sendWelcomeEmail } from "../../../../../helpers/sendWelcomeEmailHelp";

export const POST = async (req: Request) => {
  try {
    const { firstName, lastName, phoneNumber, email, password } =
      await req.json();

    if (!firstName || !lastName || !phoneNumber || !email || !password) {
      return NextResponse.json(
        { message: "Invalid/Missing data" },
        { status: 422 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUserDetails = {
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      email: email,
      password: hashedPassword,
    };

    await connectToDb();

    const duplicateUser = await prisma.customer.findFirst({
      where: {
        email: email,
      },
    });

    if (duplicateUser) {
      return NextResponse.json({ message: "Duplicate User" }, { status: 409 });
    }

    const newUser = await prisma.customer.create({ data: newUserDetails });

    await sendWelcomeEmail(email);
    return NextResponse.json({ newUser }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
