import db from "@/lib/db/drizzle";
import { feedback } from "@/lib/db/schema";
import { currentUser } from "@clerk/nextjs/server";

export const leaveFeedback = async ({ message, type }: { message: string; type: string }) => {
    const user = await currentUser()

    if (!user) {
        throw new Error('Something went wrong')
    }

    await db.insert(feedback).values({
        userEmail: user.emailAddresses[0].emailAddress,
        userName: user.fullName || 'User',
        message,
        type
    });

}