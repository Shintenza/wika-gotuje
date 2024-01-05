import User from '@models/User';
import { getToken } from 'next-auth/jwt';
import { connectDb } from '@utils/connectDb';
import mongoose from 'mongoose';

export const POST = async (req) => {
  const token = await getToken({ req });

  if (!token) {
    return new Response('You have to be logged in to follow', {
      status: 401,
    });
  }

  try {
    const { userId } = await req.json();
    const id = new mongoose.Types.ObjectId(userId);
    await connectDb();

    await User.findByIdAndUpdate(token.id, {
      $addToSet: { follows: id, position: 0 },
    });

    return new Response({ status: 200 });
  } catch (e) {
    console.error(e);
    return new Response('Server Error', { status: 500 });
  }
};

export const DELETE = async (req) => {
  const token = await getToken({ req });

  if (!token) {
    return new Response('You have to be logged in to unfollow', {
      status: 401,
    });
  }

  try {
    const { userId } = await req.json();
    const id = new mongoose.Types.ObjectId(userId);
    await connectDb();
    await User.findByIdAndUpdate(token.id, {
      $pull: { follows: id },
    });

    return new Response({ status: 200 });
  } catch (e) {
    console.error(e);
    return new Response('Server Error', { status: 500 });
  }
};

export const GET = async (req) => {
  const token = await getToken({ req });

  if (!token) {
    return new Response('You have to be logged in to check your follows', {
      status: 401,
    });
  }

  try {
    const userId = req.nextUrl.searchParams.get('userId');
    const id = new mongoose.Types.ObjectId(userId);
    await connectDb();
    const result = await User.findOne({
      _id: token.id,
      follows: { $in: id },
    });
    return new Response(JSON.stringify({ follows: result != null }), {
      status: 200,
    });
  } catch (e) {
    console.error(e);
    return new Response('Server Error', { status: 500 });
  }
};
