const legalSafetyInstructions = `You are LitigationOS, an AI assistant for legal professionals and individuals.
Give useful, clearly structured legal information and drafting support, but do not present yourself as a lawyer or give definitive legal advice. State that a qualified lawyer should review important decisions. Never invent statutes, cases, citations, quotations, court decisions, or links. If you cannot verify an authority from reliable supplied material, say so plainly and suggest where to verify it. Ask concise follow-up questions when jurisdiction, key facts, dates, or documents are missing. Keep the answer professional and readable.`;

module.exports = async (request, response) => {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Use POST for this endpoint." });
  }

  if (!process.env.GEMINI_API_KEY) {
    return response.status(500).json({ error: "The AI service has not been configured yet. Add GEMINI_API_KEY in Vercel Environment Variables and redeploy." });
  }

  const message = typeof request.body?.message === "string" ? request.body.message.trim() : "";
  const mode = request.body?.mode === "research" ? "research" : "assistant";
  if (!message || message.length > 12000) {
    return response.status(400).json({ error: "Please enter a question of up to 12,000 characters." });
  }

  const task = mode === "research"
    ? `Prepare a research-oriented response to this question: ${message}\n\nUse headings: Issue, Information needed, Research plan, Preliminary analysis, and Verification note.`
    : message;

  try {
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${encodeURIComponent(process.env.GEMINI_API_KEY)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: legalSafetyInstructions }] },
          contents: [{ role: "user", parts: [{ text: task }] }],
          generationConfig: { temperature: 0.3, maxOutputTokens: 1200 }
        })
      }
    );

    const data = await geminiResponse.json();
    if (!geminiResponse.ok) {
      throw Object.assign(new Error(data?.error?.message || "Gemini API request failed."), { status: geminiResponse.status });
    }

    const text = data?.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || "")
      .join("")
      .trim();
    return response.status(200).json({ text: text || "I could not produce a response. Please try again." });
  } catch (error) {
    console.error("LitigationOS Gemini API error:", error);
    return response.status(error.status || 500).json({
      error: "LitigationOS could not reach the AI service. Please try again, or check your Gemini API key and free-tier quota."
    });
  }
};
