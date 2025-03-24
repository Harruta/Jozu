"use client"

import { useState } from "react"

const kanjiQuestions = [
  { id: 1, kanji: "来月", answer: "らいげつ" },
  { id: 2, kanji: "七月", answer: "しちがつ" },
  { id: 3, kanji: "木よう日", answer: "もくようび" },
  { id: 4, kanji: "九時", answer: "くじ" },
]

const readingOptions = [
  { id: "a", text: "来週の月曜日の午前１１時には、階段を使います。", isCorrect: true },
  { id: "b", text: "来週の月曜日の午後３時には、エレベーターを使います。", isCorrect: false },
  { id: "c", text: "来週の火曜日の午前１１時には、エレベーターを使います。", isCorrect: false },
  { id: "d", text: "来週の火曜日の午後３時には、階段を使いません。", isCorrect: false },
]

export default function JapaneseLeetCode() {
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

  const isReadingCorrect = () => submitted && selectedReadingOption === readingOptions.find((o) => o.isCorrect)?.id

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
            <p className="mb-4">アパートの皆さんへ</p>
            <p className="mb-4">
              来週の月曜日と火曜日の午前１０時から午後５時までエレベーターを使わないでください。階段を使ってください。
            </p>
          </div>

          <div className="text-center mb-6">
            <h3 className="text-xl mb-4">1. アパートの人は、来週の月曜日と火曜日には、外に出る時、どうしますか。</h3>

            <div className="space-y-4 max-w-md mx-auto text-left">
              {readingOptions.map((option) => (
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
                  : `Incorrect. The correct answer is: ${readingOptions.find((o) => o.isCorrect)?.id}`}
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

