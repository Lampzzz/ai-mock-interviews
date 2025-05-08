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
