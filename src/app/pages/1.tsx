"use client"

import { useState } from "react"
import questionSets from "@/data/japanese-questions.json"

export default function JapaneseLeetCode() {
  // We'll start with the first question set, but you can add logic to select different sets
  const currentSet = questionSets.sets[0]
  const { kanjiQuestions, readingSection } = currentSet
  
  const [kanjiAnswers, setKanjiAnswers] = useState<{ [key: number]: string }>({})
  const [selectedReadingOption, setSelectedReadingOption] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const handleKanjiInputChange = (id: number, value: string) => {
    setKanjiAnswers((prev) => ({ ...prev, [id]: value }))
    if (submitted) {
      setSubmitted(false)
    }
  }

  const handleReadingOptionChange = (optionId: string) => {
    setSelectedReadingOption(optionId)
    if (submitted) {
      setSubmitted(false)
    }
  }

  const handleSubmit = () => {
    setSubmitted(true)
  }

  const isKanjiCorrect = (id: number) =>
    submitted && kanjiAnswers[id] === kanjiQuestions.find((q) => q.id === id)?.answer

  const isReadingCorrect = () => submitted && selectedReadingOption === readingSection.options.find((o) => o.isCorrect)?.id

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-2xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-center mb-12">Japanese LeetCode</h1>

        {/* Kanji Questions Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-center mb-8">Kanji Questions</h2>

          <div className="space-y-8">
            {kanjiQuestions.map((q) => (
              <div key={q.id} className="text-center">
                <h3 className="text-xl mb-2">
                  Q{q.id}: {q.kanji}
                </h3>
                <input
                  type="text"
                  className={`w-full max-w-md mx-auto p-2 rounded border ${
                    submitted
                      ? isKanjiCorrect(q.id)
                        ? "border-green-500 bg-green-900"
                        : "border-red-500 bg-red-900"
                      : "border-gray-600 bg-gray-900"
                  } text-center`}
                  placeholder="Enter your answer"
                  value={kanjiAnswers[q.id] || ""}
                  onChange={(e) => handleKanjiInputChange(q.id, e.target.value)}
                />
                {submitted && (
                  <p className={`mt-1 ${isKanjiCorrect(q.id) ? "text-green-400" : "text-red-400"}`}>
                    {isKanjiCorrect(q.id) ? "Correct!" : `Incorrect. The correct answer is: ${q.answer}`}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Reading Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-center mb-8">Reading</h2>

          <div className="bg-gray-900 p-6 rounded-lg mb-6 text-center">
            {readingSection.passage.map((line, index) => (
              <p key={index} className="mb-4">
                {line}
              </p>
            ))}
          </div>

          <div className="text-center mb-6">
            <h3 className="text-xl mb-4">{readingSection.question}</h3>

            <div className="space-y-4 max-w-md mx-auto text-left">
              {readingSection.options.map((option) => (
                <div
                  key={option.id}
                  className={`p-3 border rounded cursor-pointer ${
                    selectedReadingOption === option.id ? "border-white bg-gray-800" : "border-gray-600"
                  } ${
                    submitted && option.id === selectedReadingOption
                      ? option.isCorrect
                        ? "border-green-500 bg-green-900"
                        : "border-red-500 bg-red-900"
                      : ""
                  }`}
                  onClick={() => handleReadingOptionChange(option.id)}
                >
                  <div className="flex items-start">
                    <div className="mr-2 font-bold">{option.id}.</div>
                    <div>{option.text}</div>
                  </div>
                </div>
              ))}
            </div>

            {submitted && selectedReadingOption && (
              <p className={`mt-4 ${isReadingCorrect() ? "text-green-400" : "text-red-400"}`}>
                {isReadingCorrect()
                  ? "Correct!"
                  : `Incorrect. The correct answer is: ${readingSection.options.find((o) => o.isCorrect)?.id}`}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            className="px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors"
            onClick={handleSubmit}
          >
            {submitted ? "Resubmit Answers" : "Submit Answers"}
          </button>

          {submitted && isReadingCorrect() && kanjiQuestions.every((q) => isKanjiCorrect(q.id)) && (
            <p className="mt-4 text-center text-lg font-semibold text-green-400">
              All your answers are correct! Great job!
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

