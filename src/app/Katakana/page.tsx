"use client"

import { useState } from "react"
import questionSets from "@/data/Hiragana-and-Katakana.json"
import Link from "next/link"

interface Character {
  id: number;
  character: string;
  pronunciation: string;
}

interface QuestionSet {
  id: number;
  title: string;
  HiraganaScript: Character[];
  KatakanaScript: Character[];
}

export default function KatakanaQuiz() {
  const currentSet = questionSets.sets[0] as QuestionSet
  const { KatakanaScript } = currentSet
  
  const [katakanaAnswers, setKatakanaAnswers] = useState<{ [key: number]: string }>({})
  const [submitted, setSubmitted] = useState(false)
  const [isReversed, setIsReversed] = useState(false)

  const handleKatakanaInputChange = (id: number, value: string) => {
    setKatakanaAnswers((prev) => ({ ...prev, [id]: value }))
    if (submitted) {
      setSubmitted(false)
    }
  }

  const handleSubmit = () => {
    setSubmitted(true)
  }

  const toggleMode = () => {
    setIsReversed(!isReversed)
    setKatakanaAnswers({})
    setSubmitted(false)
  }

  const isKatakanaAnswerCorrect = (id: number) => {
    const question = KatakanaScript.find(q => q.id === id)
    if (isReversed) {
      return submitted && question?.character === katakanaAnswers[id]
    }
    return submitted && question?.pronunciation.toLowerCase() === katakanaAnswers[id]?.toLowerCase()
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-2xl mx-auto py-12 px-4">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-bold text-center">Katakana Quiz</h1>
          <Link 
            href="/Hiragana" 
            className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition-colors"
          >
            Try Hiragana Quiz
          </Link>
        </div>

        <div className="text-center mb-8">
          <button
            onClick={toggleMode}
            className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
          >
            {isReversed ? "Switch to Katakana → Romaji" : "Switch to Romaji → Katakana"}
          </button>
        </div>

        {/* Katakana Section */}
        <div className="mb-12">
          <div className="space-y-8">
            {KatakanaScript.map((q) => (
              <div key={q.id} className="text-center">
                <h3 className="text-xl mb-2">
                  {isReversed ? q.pronunciation : q.character}
                </h3>
                <div className="relative">
                  <input
                    type="text"
                    className={`w-full max-w-md mx-auto p-2 rounded border ${
                      submitted
                        ? isKatakanaAnswerCorrect(q.id)
                          ? "border-green-500 bg-green-900/20"
                          : "border-red-500 bg-red-900/20"
                        : "border-gray-600 bg-gray-900"
                    } text-center`}
                    placeholder={isReversed ? "Enter katakana character" : "Enter pronunciation"}
                    value={katakanaAnswers[q.id] || ""}
                    onChange={(e) => handleKatakanaInputChange(q.id, e.target.value)}
                  />
                  {submitted && (
                    <div className="mt-1 text-sm">
                      {isKatakanaAnswerCorrect(q.id) ? (
                        <span className="text-green-500">Correct!</span>
                      ) : (
                        <span className="text-red-500">
                          Correct answer: {isReversed ? q.character : q.pronunciation}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            className="px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors"
            onClick={handleSubmit}
          >
            {submitted ? "Try Again" : "Submit Answers"}
          </button>
        </div>
      </div>
    </div>
  )
} 