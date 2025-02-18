"use client"

import { useState } from "react"

const questions = [
  { id: 1, kanji: "来月", answer: "らいげつ" },
  { id: 2, kanji: "七月", answer: "しちがつ" },
  { id: 3, kanji: "木よう日", answer: "もくようび" },
  { id: 4, kanji: "九時", answer: "くじ" },
]

export default function JapaneseLeetCode() {
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({})
  const [submitted, setSubmitted] = useState(false)
  const [allCorrect, setAllCorrect] = useState(false)

  const handleInputChange = (id: number, value: string) => {
    setUserAnswers((prev) => ({ ...prev, [id]: value }))
    if (submitted) {
      setSubmitted(false)
      setAllCorrect(false)
    }
  }

  const handleSubmit = () => {
    setSubmitted(true)
    const correct = questions.every((q) => userAnswers[q.id] === q.answer)
    setAllCorrect(correct)
  }

  const isCorrect = (id: number) => submitted && userAnswers[id] === questions.find((q) => q.id === id)?.answer

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">JOZU</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left column: Answer inputs */}
            <div className="md:w-1/2 bg-white shadow overflow-hidden sm:rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Your Answers</h2>
              {questions.map((q) => (
                <div key={q.id} className="mb-4">
                  <label htmlFor={`answer-${q.id}`} className="block text-sm font-medium text-gray-700">
                    Answer for Question {q.id}
                  </label>
                  <input
                    type="text"
                    id={`answer-${q.id}`}
                    className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                      submitted
                        ? isCorrect(q.id)
                          ? "border-green-500 bg-green-50"
                          : "border-red-500 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder={`Enter answer for ${q.kanji}`}
                    value={userAnswers[q.id] || ""}
                    onChange={(e) => handleInputChange(q.id, e.target.value)}
                  />
                  {submitted && (
                    <p className={`mt-1 text-sm ${isCorrect(q.id) ? "text-green-600" : "text-red-600"}`}>
                      {isCorrect(q.id) ? "Correct!" : `Incorrect. The correct answer is: ${q.answer}`}
                    </p>
                  )}
                </div>
              ))}
              <button
                className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={handleSubmit}
              >
                {submitted ? "Resubmit Answers" : "Submit Answers"}
              </button>
              {allCorrect && (
                <p className="mt-4 text-center text-lg font-semibold text-green-600">
                  All your answers are correct! Great job!
                </p>
              )}
            </div>

            {/* Right column: Kanji questions */}
            <div className="md:w-1/2 bg-white shadow overflow-hidden sm:rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Kanji Questions</h2>
              <ul className="space-y-4">
                {questions.map((q) => (
                  <li key={q.id} className="border-b pb-2">
                    <span className="font-medium">Question {q.id}:</span>
                    <span className="ml-2 text-2xl">{q.kanji}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

