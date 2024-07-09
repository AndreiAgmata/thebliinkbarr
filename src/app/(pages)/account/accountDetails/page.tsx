import AccountDetails from "@/components/MyAccount/AccountDetails";
import nextAuthOptions from "@/lib/AuthOptions";
import { getServerSession } from "next-auth";
import React from "react";
import { redirect } from "next/navigation";
import { connectToDb } from "../../../../../helpers/serverHelpers";
import prisma from "../../../../../prisma";

async function getCustomer(id: string) {
  try {
    await connectToDb();
    const customer = await prisma.customer.findFirst({
      where: {
        id: id,
      },
    });

    return customer;
  } catch (error) {
    console.log(error);
  }
}

async function AccountDetailsPage() {
  const session = await getServerSession(nextAuthOptions);
  if (!session?.user) {
    redirect("/");
  }

  const customer = await getCustomer(session.user.id);

  if (!customer) {
    return <p>Unable to get customer details</p>;
  }

  return <AccountDetails customerDetails={customer} />;
}

export default AccountDetailsPage;
