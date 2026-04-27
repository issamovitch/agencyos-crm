// actions/account/account.ts
'use server';

import { prismadb } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function createAccount(data: any) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error('Unauthenticated');

  return await prismadb.crm_Accounts.create({
    data: {
      createdBy: session.user.id,
      updatedBy: session.user.id,
      name: data.name,
      office_phone: data.office_phone,
      website: data.website,
      company_id: data.company_id,
      email: data.email,
      billing_street: data.billing_street,
      billing_postal_code: data.billing_postal_code,
      billing_city: data.billing_city,
      billing_country: data.billing_country,
      description: data.description,
      assigned_to: data.assigned_to || null,
      status: 'Active',
      annual_revenue: data.annual_revenue,
      industry: data.industry,
    },
  });
}

export async function updateAccount(data: any) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error('Unauthenticated');

  return await prismadb.crm_Accounts.update({
    where: { id: data.id },
    data: {
      updatedBy: session.user.id,
      name: data.name,
      office_phone: data.office_phone,
      website: data.website,
      company_id: data.company_id,
      email: data.email,
      billing_street: data.billing_street,
      billing_postal_code: data.billing_postal_code,
      billing_city: data.billing_city,
      billing_country: data.billing_country,
      description: data.description,
      assigned_to: data.assigned_to || null,
      status: data.status,
      annual_revenue: data.annual_revenue,
      industry: data.industry,
    },
  });
}

export async function getAccounts() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error('Unauthenticated');

  return await prismadb.crm_Accounts.findMany({});
}