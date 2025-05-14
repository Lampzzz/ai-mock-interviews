import { db } from "@/firebase/admin";

export const createFeedback = async (params: CreateFeedbackParams) => {
  const { interviewId, userId, transcript, feedbackId } = params;

  try {
    const formattedTranscript = transcript.map(
      (sentence: { role: string; content: string }) =>
        `- ${sentence.role}: ${sentence.content}\n`
    );

    return { success: true };
  } catch (error) {
    console.error("Error saving feedback:", error);
    return { success: false };
  }
};

export async function getLatestInterviews(
  params: GetLatestInterviewsParams
): Promise<Interview[] | null> {
  const { userId, limit = 20 } = params;

  const interviews = await db
    .collection("interviews")
    .orderBy("createdAt", "desc")
    .where("finalized", "==", true)
    .where("userId", "!=", userId)
    .limit(limit)
    .get();

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
}

export async function getInterviewsByUserId(
  userId: string
): Promise<Interview[] | null> {
  const interviews = await db
    .collection("interviews")
    .where("userId", "==", userId)
    .orderBy("createdAt", "desc")
    .get();

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
}

export async function getInterviewById(id: string): Promise<Interview | null> {
  const interview = await db.collection("interviews").doc(id).get();

  return interview.data() as Interview | null;
}
