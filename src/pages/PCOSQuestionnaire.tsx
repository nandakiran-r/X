import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const PCOSQuestionnaire = () => {
  const { toast } = useToast();
  const [responses, setResponses] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [currentBatch, setCurrentBatch] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState("");

  const questions = [
    {
      id: "q1",
      text: "Do you have a tendency to grow dark, coarse hair on your upper lip, chin, breasts, chest between the breasts, back, belly, upper arms, or upper thighs?",
    },
    {
      id: "q2",
      text: "Are you experiencing male pattern baldness or hair thinning?",
    },
    {
      id: "q3",
      text: "Are you experiencing severe acne?",
    },
    {
      id: "q4",
      text: "Do you have darkened skin patches (also called Acanthosis Nigricans)?",
    },
    {
      id: "q5",
      text: "Are your periods irregular or absent?",
    },
    {
      id: "q6",
      text: "If applicable, have you experienced any infertility issues?",
      options: ["Yes", "No", "N/A"],
    },
    {
      id: "q7",
      text: "Are you experiencing unexpected changes in your weight?",
    },
    {
      id: "q8",
      text: "Do you have a family history of PCOS or diabetes?",
    },
    {
      id: "q9",
      text: "Do you experience irritability, anxiety, or depression?",
    },
    {
      id: "q10",
      text: "Do you experience fatigue even when getting a full night’s sleep?",
    },
    {
      id: "q11",
      text: "If applicable, have you been told you have cysts on your ovaries?",
      options: ["Yes", "No", "N/A"],
    },
    {
      id: "q12",
      text: "Do you spend a disproportionate amount of time thinking about food?",
    },
  ];

  // Split questions into batches of 4
  const batchSize = 4;
  const questionBatches = [];
  for (let i = 0; i < questions.length; i += batchSize) {
    questionBatches.push(questions.slice(i, i + batchSize));
  }

  const handleResponse = (questionId, response) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: response,
    }));
  };

  const handleNext = () => {
    if (currentBatch < questionBatches.length - 1) {
      setCurrentBatch((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentBatch > 0) {
      setCurrentBatch((prev) => prev - 1);
    }
  };

  const checkIfPCOS = async () => {
    const TOGETHER_API_KEY = import.meta.env.VITE_TOGETHER_API_KEY;

    try {
      setIsLoading(true);

      // Prepare the prompt with user responses (optimized for low tokens)
      const prompt = `Based on these responses, is PCOS likely? Answer in 2 lines max. If PCOS is likely, include one Ayurveda-based prevention tip for symptoms:
      ${Object.entries(responses)
        .map(([questionId, response]) => {
          const question = questions.find((q) => q.id === questionId);
          return `${question.text}: ${response}`;
        })
        .join("\n")}`;

      // Send the request to Together AI
      const response = await fetch("https://api.together.xyz/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${TOGETHER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 100, // Limit tokens for concise response
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch analysis from Together AI");
      }

      const data = await response.json();
      const result = data.choices[0].message.content;

      setIsLoading(false);
      setAnalysisResult(result);
      setShowResult(true);

      // Show the result in a toast alert
      toast({
        title: "Analysis Complete",
        description: result,
        duration: 10000, // 10 seconds
      });
    } catch (error) {
      console.error("Error fetching analysis from Together AI:", error);
      setIsLoading(false);
      toast({
        title: "Error",
        description: "Failed to fetch analysis. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = () => {
    if (Object.keys(responses).length < questions.length) {
      toast({
        title: "Incomplete Questionnaire",
        description: "Please answer all questions before submitting.",
        variant: "destructive",
      });
      return;
    }

    checkIfPCOS();
  };

  return (
    <div className="container px-4 py-6 max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>PCOS Risk Assessment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {questionBatches[currentBatch].map((question) => (
              <div key={question.id}>
                <p className="font-medium mb-2">{question.text}</p>
                <div className="flex space-x-2">
                  {(question.options || ["Yes", "No"]).map((option) => (
                    <Button
                      key={option}
                      variant={
                        responses[question.id] === option ? "default" : "outline"
                      }
                      onClick={() => handleResponse(question.id, option)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-6">
            <Button
              onClick={handlePrevious}
              disabled={currentBatch === 0}
              variant="outline"
            >
              Previous
            </Button>
            {currentBatch < questionBatches.length - 1 ? (
              <Button onClick={handleNext}>Next</Button>
            ) : (
              <Button onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? "Analyzing..." : "Submit"}
              </Button>
            )}
          </div>

          {showResult && (
            <div className="mt-6 p-4 bg-sakhi-mint/20 rounded-lg">
              <p className="font-medium whitespace-pre-wrap">{analysisResult}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PCOSQuestionnaire;