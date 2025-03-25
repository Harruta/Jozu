"use client"

import { useState } from "react"
import questionSets from "@/data/Hiragana-and-Katakana.json"

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

export default function JapaneseLeetCode() {
  const currentSet = questionSets.sets[0] as QuestionSet
  const { HiraganaScript, KatakanaScript } = currentSet
  
  const [hiraganaAnswers, setHiraganaAnswers] = useState<{ [key: number]: string }>({})
  const [katakanaAnswers, setKatakanaAnswers] = useState<{ [key: number]: string }>({})
  const [submitted, setSubmitted] = useState(false)

  const handleHiraganaInputChange = (id: number, value: string) => {
    setHiraganaAnswers((prev) => ({ ...prev, [id]: value }))
    if (submitted) {
      setSubmitted(false)
    }
  }

  const handleKatakanaInputChange = (id: number, value: string) => {
    setKatakanaAnswers((prev) => ({ ...prev, [id]: value }))
    if (submitted) {
      setSubmitted(false)
    }
  }

  const handleSubmit = () => {
    setSubmitted(true)
  }

  const isHiraganaAnswerCorrect = (id: number) => {
    const question = HiraganaScript.find(q => q.id === id)
    return submitted && question?.pronunciation.toLowerCase() === hiraganaAnswers[id]?.toLowerCase()
  }

  const isKatakanaAnswerCorrect = (id: number) => {
    const question = KatakanaScript.find(q => q.id === id)
    return submitted && question?.pronunciation.toLowerCase() === katakanaAnswers[id]?.toLowerCase()
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-2xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-center mb-12">Japanese LeetCode</h1>

        {/* Hiragana Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-center mb-8">Hiragana</h2>
          <div className="space-y-8">
            {HiraganaScript.map((q) => (
              <div key={q.id} className="text-center">
                <h3 className="text-xl mb-2">
                  {q.character}
                </h3>
                <div className="relative">
                  <input
                    type="text"
                    className={`w-full max-w-md mx-auto p-2 rounded border ${
                      submitted
                        ? isHiraganaAnswerCorrect(q.id)
                          ? "border-green-500 bg-green-900/20"
                          : "border-red-500 bg-red-900/20"
                        : "border-gray-600 bg-gray-900"
                    } text-center`}
                    placeholder="Enter pronunciation"
                    value={hiraganaAnswers[q.id] || ""}
                    onChange={(e) => handleHiraganaInputChange(q.id, e.target.value)}
                  />
                  {submitted && (
                    <div className="mt-1 text-sm">
                      {isHiraganaAnswerCorrect(q.id) ? (
                        <span className="text-green-500">Correct!</span>
                      ) : (
                        <span className="text-red-500">
                          Correct answer: {q.pronunciation}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Katakana Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-center mb-8">Katakana</h2>
          <div className="space-y-8">
            {KatakanaScript.map((q) => (
              <div key={q.id} className="text-center">
                <h3 className="text-xl mb-2">
                  {q.character}
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
                    placeholder="Enter pronunciation"
                    value={katakanaAnswers[q.id] || ""}
                    onChange={(e) => handleKatakanaInputChange(q.id, e.target.value)}
                  />
                  {submitted && (
                    <div className="mt-1 text-sm">
                      {isKatakanaAnswerCorrect(q.id) ? (
                        <span className="text-green-500">Correct!</span>
                      ) : (
                        <span className="text-red-500">
                          Correct answer: {q.pronunciation}
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