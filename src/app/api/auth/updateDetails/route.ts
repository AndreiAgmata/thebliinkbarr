import { NextResponse } from "next/server";
import { connectToDb } from "../../../../../helpers/serverHelpers";
import prisma from "../../../../../prisma";

export const PUT = async (req: Request) => {
  try {
    const { id, firstName, lastName, phoneNumber, email } = await req.json();

    if (!id || !firstName || !lastName || !phoneNumber || !email) {
      return NextResponse.json(
        { message: "Invalid/Missing data" },
        { status: 422 }
      );
    }

    const newUserDetails = {
      id: id,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      email: email,
    };

    await connectToDb();
    const updatedUser = await prisma.customer.update({
      where: { id: newUserDetails.id },
      data: {
        firstName: newUserDetails.firstName,
        lastName: newUserDetails.lastName,
        phoneNumber: newUserDetails.phoneNumber,
        email: newUserDetails.email,
      },
    });

    return NextResponse.json({ updatedUser }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
