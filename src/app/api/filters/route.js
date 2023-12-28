import { connectDb } from '@utils/connectDb';
import Filter from '@models/Filter';

export const GET = async (req) => {
  try {
    await connectDb();
    const filters = await Filter.find({});
    return new Response(JSON.stringify(filters), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch all filters', { status: 500 });
  }
};
